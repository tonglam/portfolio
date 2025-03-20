import type {
  NotionFile,
  NotionPost,
  NotionRichTextProperty,
  NotionTitle,
  ProcessedBlogPost,
} from '@/app/api/blog/types';
import { EXTERNAL_URLS } from '@/config';
import { logger } from '@/lib/logger';

// Cache for blog posts
let cachedPosts: ProcessedBlogPost[] | null = null;
let lastFetchTime = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// Helper functions for logging
const warn = (message: string): void => {
  logger.warn(message);
};

const logError = (message: string, err: unknown): void => {
  logger.error({ error: err }, message);
};

/**
 * Fetches and processes blog posts from the data source
 */
export async function fetchAndProcessBlogPosts(bypassCache = false): Promise<ProcessedBlogPost[]> {
  // Use cache if available and fresh
  const now = Date.now();
  if (!bypassCache && cachedPosts && now - lastFetchTime < CACHE_TTL) {
    warn('Using cached blog posts');
    return cachedPosts;
  }

  try {
    // Fetch data from R2 storage
    const response = await fetch(EXTERNAL_URLS.BLOG_DATA_SOURCE);

    if (!response.ok) {
      throw new Error(`Failed to fetch blog data: ${response.status}`);
    }

    const data: unknown = await response.json();

    if (!Array.isArray(data)) {
      throw new Error('Invalid data format: expected an array');
    }

    // Process posts
    const processedPosts = data.map((post: NotionPost): ProcessedBlogPost => {
      // Safer property extraction with defaults
      const safeExtractTitle = (titleProp: unknown): string => {
        if (
          titleProp &&
          typeof titleProp === 'object' &&
          'title' in titleProp &&
          Array.isArray((titleProp as NotionTitle).title) &&
          (titleProp as NotionTitle).title.length > 0 &&
          typeof (titleProp as NotionTitle).title[0] === 'object' &&
          (titleProp as NotionTitle).title[0] &&
          'plain_text' in (titleProp as NotionTitle).title[0]
        ) {
          return (titleProp as NotionTitle).title[0].plain_text;
        }
        return 'Untitled Post';
      };

      const safeExtractRichText = (textProp: unknown): string => {
        if (
          textProp &&
          typeof textProp === 'object' &&
          'rich_text' in textProp &&
          Array.isArray((textProp as NotionRichTextProperty).rich_text) &&
          (textProp as NotionRichTextProperty).rich_text.length > 0 &&
          typeof (textProp as NotionRichTextProperty).rich_text[0] === 'object' &&
          (textProp as NotionRichTextProperty).rich_text[0] &&
          'plain_text' in (textProp as NotionRichTextProperty).rich_text[0]
        ) {
          return (textProp as NotionRichTextProperty).rich_text[0].plain_text;
        }
        return '';
      };

      const getFileUrl = (fileProp: unknown): string => {
        if (
          fileProp &&
          typeof fileProp === 'object' &&
          'url' in fileProp &&
          typeof (fileProp as NotionFile).url === 'string'
        ) {
          return (fileProp as NotionFile).url;
        }
        return '';
      };

      const properties = post.properties || {};

      return {
        id:
          post.id && typeof post.id === 'string'
            ? post.id
            : `post-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        title: safeExtractTitle(properties.Title) || 'Untitled Post',
        summary: safeExtractRichText(properties.Summary) || '',
        excerpt: safeExtractRichText(properties.Excerpt) || 'No excerpt available',
        slug: safeExtractRichText(properties.Slug) || `post-${Date.now()}`,
        category: properties.Category?.select?.name || 'Uncategorized',
        tags: properties.Tags?.multi_select?.map(tag => tag.name) || [],
        coverImage: getFileUrl(properties.CoverImage) || EXTERNAL_URLS.PLACEHOLDERS.BLOG_IMAGE,
        originalCoverImage: getFileUrl(properties.OriginalCoverImage) || '',
        dateCreated: properties.DateCreated?.date?.start || new Date().toISOString().split('T')[0],
        noteCreated:
          post.created_time && typeof post.created_time === 'string'
            ? post.created_time
            : new Date().toISOString(),
        noteEdited:
          post.last_edited_time && typeof post.last_edited_time === 'string'
            ? post.last_edited_time
            : new Date().toISOString(),
        published: properties.Published?.checkbox ?? true,
        featured: properties.Featured?.checkbox ?? false,
        notionUrl: post.url && typeof post.url === 'string' ? post.url : '',
        readingTime: safeExtractRichText(properties.ReadingTime) || '5 Min Read',
        content: safeExtractRichText(properties.Content) || 'No content available',
      };
    });

    // Update cache
    cachedPosts = processedPosts;
    lastFetchTime = now;

    return processedPosts;
  } catch (err) {
    logError('Failed to fetch and process blog posts', err);
    throw err;
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
 * Gets unique categories from published posts
 */
export async function getCategories(): Promise<string[]> {
  try {
    warn('Fetching categories from posts');
    const publishedPosts = await getPublishedPosts();

    // Extract and deduplicate categories
    const categories = Array.from(new Set(publishedPosts.map(post => post.category))).filter(
      Boolean
    );

    // Sort alphabetically
    categories.sort();

    // Add "All" as the first category
    return ['All', ...categories];
  } catch (err: unknown) {
    logError('Failed to fetch categories from posts', err);
    throw err;
  }
}

/**
 * Gets a single blog post by slug
 */
export async function getPostBySlug(slug: string): Promise<ProcessedBlogPost | null> {
  const allPosts = await fetchAndProcessBlogPosts();
  return allPosts.find(post => post.slug === slug && post.published) || null;
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
