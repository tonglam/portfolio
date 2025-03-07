import { DEFAULTS, EXTERNAL_URLS } from '@/config';
import type { NotionPost, ProcessedBlogPost } from '@/types/api/blog';
import type {
  FilesPropertyItemObjectResponse,
  RichTextItemResponse,
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

/**
 * Helper function to extract text from title property
 */
function extractTitleText(title: TitlePropertyItemObjectResponse): string {
  let result = '';
  if (Array.isArray(title.title)) {
    for (const richText of title.title) {
      if (isRichTextItem(richText)) {
        result += richText.plain_text;
      }
    }
  }
  return result;
}

/**
 * Helper function to extract text from rich text property
 */
function extractRichText(richText: RichTextPropertyItemObjectResponse): string {
  let result = '';
  if (Array.isArray(richText.rich_text)) {
    for (const text of richText.rich_text) {
      if (isRichTextItem(text)) {
        result += text.plain_text;
      }
    }
  }
  return result;
}

/**
 * Type guard for RichTextItemResponse
 */
function isRichTextItem(text: unknown): text is RichTextItemResponse {
  return (
    typeof text === 'object' &&
    text !== null &&
    'plain_text' in text &&
    typeof (text as RichTextItemResponse).plain_text === 'string'
  );
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

    // Process posts: extract required fields with safe extraction
    const processedPosts = data.map((post): ProcessedBlogPost => {
      // Safer property extraction with defaults
      const getFileUrl = (
        file: FilesPropertyItemObjectResponse | UrlPropertyItemObjectResponse | undefined
      ): string => {
        if (!file) return '';

        if (file.type === 'url') {
          return file.url || '';
        }
        if (file.type === 'files' && file.files.length > 0) {
          const firstFile = file.files[0];
          if ('file' in firstFile) {
            return firstFile.file.url;
          }
          if ('external' in firstFile) {
            return firstFile.external.url;
          }
        }
        return '';
      };

      // Safe extraction helpers
      const safeExtractTitle = (prop: unknown): string => {
        try {
          if (!prop || typeof prop !== 'object' || !('title' in prop)) return '';
          return extractTitleText(prop as TitlePropertyItemObjectResponse);
        } catch {
          return '';
        }
      };

      const safeExtractRichText = (prop: unknown): string => {
        try {
          if (!prop || typeof prop !== 'object' || !('rich_text' in prop)) return '';
          return extractRichText(prop as RichTextPropertyItemObjectResponse);
        } catch {
          return '';
        }
      };

      return {
        id: post.id || `mock-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        title: safeExtractTitle(post.properties?.Title) || 'Untitled Post',
        summary: safeExtractRichText(post.properties?.Summary) || '',
        excerpt: safeExtractRichText(post.properties?.Excerpt) || 'No excerpt available',
        slug: safeExtractRichText(post.properties?.Slug) || `post-${Date.now()}`,
        category: post.properties?.Category?.select?.name || 'Uncategorized',
        tags: post.properties?.Tags?.multi_select?.map(tag => tag.name) || [],
        coverImage:
          getFileUrl(post.properties?.CoverImage) || EXTERNAL_URLS.PLACEHOLDERS.BLOG_IMAGE,
        originalCoverImage: getFileUrl(post.properties?.OriginalCoverImage) || '',
        dateCreated:
          post.properties?.DateCreated?.date?.start || new Date().toISOString().split('T')[0],
        noteCreated: post.created_time || new Date().toISOString(),
        noteEdited: post.last_edited_time || new Date().toISOString(),
        published: post.properties?.Published?.checkbox || true,
        featured: post.properties?.Featured?.checkbox || false,
        notionUrl: post.url || '',
        readingTime: safeExtractRichText(post.properties?.ReadingTime) || DEFAULTS.BLOG.MIN_READ,
        content: safeExtractRichText(post.properties?.Content) || 'No content available',
      };
    });

    // Update cache
    cachedPosts = processedPosts;
    lastFetchTime = now;

    return processedPosts;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logger.error('Failed to fetch and process blog posts', errorMessage);

    // If we have cached data, return it even if it's stale
    if (cachedPosts) {
      logger.info('Using stale cached data as fallback');
      return cachedPosts;
    }

    // If we have no cache, return mock data
    logger.info('No cache available, returning mock blog data');
    return [
      {
        id: 'mock-1',
        title: 'Getting Started with Next.js',
        summary: 'Learn how to build modern web applications with Next.js',
        excerpt: 'Next.js is a powerful framework for building React applications...',
        slug: 'getting-started-with-nextjs',
        category: 'Development',
        tags: ['Next.js', 'React', 'JavaScript'],
        coverImage: 'https://via.placeholder.com/1470x800',
        originalCoverImage: '',
        dateCreated: new Date().toISOString().split('T')[0],
        noteCreated: new Date().toISOString(),
        noteEdited: new Date().toISOString(),
        published: true,
        featured: true,
        notionUrl: '',
        readingTime: '5 Min Read',
        content: 'This is a mock article about Next.js...',
      },
      {
        id: 'mock-2',
        title: 'Advanced TypeScript Techniques',
        summary: 'Mastering TypeScript for better code quality',
        excerpt: 'TypeScript offers many advanced features that can improve your codebase...',
        slug: 'advanced-typescript-techniques',
        category: 'Development',
        tags: ['TypeScript', 'JavaScript', 'Programming'],
        coverImage: 'https://via.placeholder.com/1470x800',
        originalCoverImage: '',
        dateCreated: new Date(Date.now() - 86400000).toISOString().split('T')[0],
        noteCreated: new Date(Date.now() - 86400000).toISOString(),
        noteEdited: new Date(Date.now() - 86400000).toISOString(),
        published: true,
        featured: false,
        notionUrl: '',
        readingTime: '7 Min Read',
        content: 'This is a mock article about TypeScript...',
      },
      {
        id: 'mock-3',
        title: 'The Future of AI in Software Development',
        summary: 'How AI is changing the landscape of programming',
        excerpt: 'Artificial Intelligence is revolutionizing how we build software...',
        slug: 'future-of-ai-in-software-development',
        category: 'Technology',
        tags: ['AI', 'Machine Learning', 'Future Tech'],
        coverImage: 'https://via.placeholder.com/1470x800',
        originalCoverImage: '',
        dateCreated: new Date(Date.now() - 172800000).toISOString().split('T')[0],
        noteCreated: new Date(Date.now() - 172800000).toISOString(),
        noteEdited: new Date(Date.now() - 172800000).toISOString(),
        published: true,
        featured: true,
        notionUrl: '',
        readingTime: '10 Min Read',
        content: 'This is a mock article about AI in software development...',
      },
    ];
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
  try {
    logger.info('Fetching categories from posts');
    const publishedPosts = await getPublishedPosts();

    // Extract and deduplicate categories
    const categories = Array.from(new Set(publishedPosts.map(post => post.category))).filter(
      Boolean
    );

    // Sort alphabetically
    categories.sort();

    // Add "All" as the first category
    return ['All', ...categories];
  } catch (error: unknown) {
    // Log the error
    const errorMessage = error instanceof Error ? error : String(error);
    logger.error('Failed to fetch categories from posts', errorMessage);
    logger.info('Using fallback categories');

    // Return fallback categories if we can't fetch real data
    return ['All', 'Development', 'Design', 'Career', 'Technology'];
  }
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
