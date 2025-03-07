import { DEFAULTS, EXTERNAL_URLS } from '@/config';
import type { NotionPost, ProcessedBlogPost } from '@/types/api/blog';
import type { NotionPropertyValue } from '@/types/api/notion';
import type {
  FilesPropertyItemObjectResponse,
  RichTextPropertyItemObjectResponse,
  TitlePropertyItemObjectResponse,
  UrlPropertyItemObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';

/**
 * Cached blog data
 */
let cachedPosts: ProcessedBlogPost[] | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 60 * 1000; // 1 minute in milliseconds

/**
 * Logger utility for development environment
 */
interface Logger {
  info: (message: string, ...args: (string | number | boolean | object)[]) => void;
  error: (message: string, error?: Error | string) => void;
}

const logger: Logger = {
  info: (message: string, ...args: (string | number | boolean | object)[]): void => {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`[Blog Service] ${message}`, ...args);
    }
  },
  error: (message: string, error?: Error | string): void => {
    console.error(`[Blog Service Error] ${message}`, error);
  },
};

// Define a more specific type for our custom title property
interface CustomTitleProperty {
  title?: Array<{ plain_text?: string; [key: string]: unknown }>;
  [key: string]: unknown;
}

// Near the top of the file, add these interfaces
interface RichTextItem {
  plain_text: string;
  [key: string]: unknown;
}

// Update the isRichTextItem function to be more strict
function isRichTextItem(item: unknown): item is RichTextItem {
  if (!item || typeof item !== 'object') return false;

  const obj = item as Record<string, unknown>;
  return 'plain_text' in obj && typeof obj.plain_text === 'string';
}

/**
 * Helper function to extract text from title property
 * Handles both Notion API's TitlePropertyItemObjectResponse and our custom types
 */
function extractTitleText(
  title: TitlePropertyItemObjectResponse | NotionPropertyValue | CustomTitleProperty | undefined
): string {
  if (!title) return '';

  // Handle official Notion API type
  if (
    title &&
    typeof title === 'object' &&
    'type' in title &&
    title.type === 'title' &&
    'title' in title &&
    Array.isArray(title.title)
  ) {
    let result = '';
    for (const richText of title.title) {
      if (isRichTextItem(richText)) {
        result += richText.plain_text;
      }
    }
    return result;
  }

  // Handle array type (NotionPropertyValue sometimes has title as an array)
  if (Array.isArray(title)) {
    return title
      .filter(isRichTextItem)
      .map(item => item.plain_text)
      .join('');
  }

  // Handle custom title property
  if (title && typeof title === 'object' && 'title' in title && Array.isArray(title.title)) {
    return title.title
      .filter(isRichTextItem)
      .map(item => item.plain_text)
      .join('');
  }

  return '';
}

/**
 * Helper function to extract text from rich text property
 * Handles both Notion API's RichTextPropertyItemObjectResponse and our custom types
 */
function extractRichText(
  richText:
    | RichTextPropertyItemObjectResponse
    | NotionPropertyValue
    | CustomTitleProperty
    | undefined
): string {
  if (!richText) return '';

  // Handle official Notion API type
  if (
    richText &&
    typeof richText === 'object' &&
    'type' in richText &&
    richText.type === 'rich_text' &&
    'rich_text' in richText &&
    Array.isArray(richText.rich_text)
  ) {
    let result = '';
    for (const text of richText.rich_text) {
      if (isRichTextItem(text)) {
        result += text.plain_text;
      }
    }
    return result;
  }

  // Handle array type
  if (Array.isArray(richText)) {
    return richText
      .filter(isRichTextItem)
      .map((item: RichTextItem) => item.plain_text)
      .join('');
  }

  // Handle rich_text property of custom type
  if (
    richText &&
    typeof richText === 'object' &&
    'rich_text' in richText &&
    Array.isArray(richText.rich_text)
  ) {
    return richText.rich_text
      .filter(isRichTextItem)
      .map((item: RichTextItem) => item.plain_text)
      .join('');
  }

  return '';
}

/**
 * Type guard for NotionPost array
 */
function isNotionPostArray(data: unknown): data is NotionPost[] {
  return (
    Array.isArray(data) &&
    data.every(
      item => typeof item === 'object' && item !== null && 'id' in item && 'properties' in item
    )
  );
}

/**
 * Fetches blog posts from the data source and processes them
 * Uses in-memory caching to avoid redundant fetches
 */
export async function fetchAndProcessBlogPosts(bypassCache = false): Promise<ProcessedBlogPost[]> {
  // Use cache if available and fresh
  const now = Date.now();
  if (!bypassCache && cachedPosts && now - lastFetchTime < CACHE_DURATION) {
    logger.info('Using cached blog posts');
    return cachedPosts;
  }

  logger.info('Fetching fresh blog posts');

  try {
    // Fetch data from R2 storage
    const response = await fetch(EXTERNAL_URLS.BLOG_DATA_SOURCE, {
      cache: 'no-store', // Ensure we get fresh data when requested
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch blog data: ${response.status}`);
    }

    const data: unknown = await response.json();

    if (!isNotionPostArray(data)) {
      throw new Error('Invalid blog data format');
    }

    // Process posts: extract required fields
    const processedPosts = data.map((post): ProcessedBlogPost => {
      const getFileUrl = (
        file:
          | FilesPropertyItemObjectResponse
          | UrlPropertyItemObjectResponse
          | NotionPropertyValue
          | undefined
      ): string => {
        if (
          file &&
          typeof file === 'object' &&
          'type' in file &&
          file.type === 'url' &&
          'url' in file
        ) {
          return file.url || '';
        }
        if (
          file &&
          typeof file === 'object' &&
          'type' in file &&
          file.type === 'files' &&
          'files' in file &&
          Array.isArray(file.files) &&
          file.files.length > 0
        ) {
          const firstFile = file.files[0];
          if (firstFile.type === 'external' && 'external' in firstFile) {
            return firstFile.external.url || '';
          }
          if (firstFile.type === 'file' && 'file' in firstFile) {
            return firstFile.file.url || '';
          }
        }
        if (file && typeof file === 'object' && 'url' in file && typeof file.url === 'string') {
          return file.url;
        }
        return '';
      };

      const tags =
        post.properties.Tags &&
        typeof post.properties.Tags === 'object' &&
        'multi_select' in post.properties.Tags
          ? post.properties.Tags.multi_select || []
          : [];

      return {
        id: post.id,
        title: extractTitleText(post.properties.Title),
        summary: extractRichText(post.properties.Summary),
        excerpt: extractRichText(post.properties.Excerpt),
        slug: extractRichText(post.properties.Slug),
        category: post.properties.Category.select?.name || '',
        tags: tags.map(tag => tag.name),
        coverImage: getFileUrl(post.properties.CoverImage),
        originalCoverImage: getFileUrl(post.properties.OriginalCoverImage),
        dateCreated: post.properties.DateCreated.date?.start || '',
        noteCreated: post.created_time,
        noteEdited: post.last_edited_time,
        published: post.properties.Published.checkbox,
        featured: post.properties.Featured.checkbox,
        notionUrl: post.url,
        readingTime: extractRichText(post.properties.ReadingTime) || DEFAULTS.BLOG.MIN_READ,
        content: extractRichText(post.properties.Content),
      };
    });

    // Update cache
    cachedPosts = processedPosts;
    lastFetchTime = now;

    return processedPosts;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logger.error('Failed to fetch and process blog posts', errorMessage);
    throw new Error(`Failed to fetch and process blog posts: ${errorMessage}`);
  }
}

/**
 * Gets all published blog posts, optionally filtered by category
 */
export async function getPublishedPosts(category?: string | null): Promise<ProcessedBlogPost[]> {
  const allPosts = await fetchAndProcessBlogPosts();

  // Filter to only published posts
  let publishedPosts = allPosts.filter(post => post.published);

  // Filter by category if provided
  if (category && category.toLowerCase() !== 'all') {
    publishedPosts = publishedPosts.filter(
      post => post.category.toLowerCase() === category.toLowerCase()
    );
  }

  // Sort by date (newest first)
  publishedPosts.sort(
    (a, b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()
  );

  return publishedPosts;
}

/**
 * Gets a single blog post by slug
 */
export async function getPostBySlug(slug: string): Promise<ProcessedBlogPost | null> {
  const allPosts = await fetchAndProcessBlogPosts();
  return allPosts.find(post => post.slug === slug && post.published) || null;
}

/**
 * Gets unique categories from published posts
 */
export async function getCategories(): Promise<string[]> {
  const publishedPosts = await getPublishedPosts();

  // Extract and deduplicate categories
  const categories = Array.from(new Set(publishedPosts.map(post => post.category))).filter(Boolean);

  // Sort alphabetically
  categories.sort();

  // Add "All" as the first category
  return ['All', ...categories];
}

/**
 * Searches published posts
 */
export async function searchPosts(
  query: string,
  category?: string | null
): Promise<ProcessedBlogPost[]> {
  // Get filtered published posts
  const publishedPosts = await getPublishedPosts(category);

  // If no query, just return the posts
  if (!query.trim()) {
    return publishedPosts;
  }

  // Search across fields
  const searchTerm = query.toLowerCase();
  return publishedPosts.filter(post => {
    // Search in title
    if (post.title.toLowerCase().includes(searchTerm)) return true;

    // Search in summary
    if (post.summary.toLowerCase().includes(searchTerm)) return true;

    // Search in excerpt
    if (post.excerpt.toLowerCase().includes(searchTerm)) return true;

    // Search in category
    if (post.category.toLowerCase().includes(searchTerm)) return true;

    // Search in tags
    if (post.tags.some(tag => tag.toLowerCase().includes(searchTerm))) return true;

    return false;
  });
}
