import { EXTERNAL_URLS } from '@/config';
import type { NotionPost, ProcessedBlogPost } from '@/types/api/blog.type';
import { extractFileUrl, extractRichText, extractTitleText } from './notion.service.util';

/**
 * Cached blog data
 */
let cachedPosts: ProcessedBlogPost[] | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 60 * 1000; // 1 minute in milliseconds

/**
 * Logger utility for development environment
 */
const logger = {
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
      const tags =
        post.properties.Tags &&
        typeof post.properties.Tags === 'object' &&
        'multi_select' in post.properties.Tags
          ? post.properties.Tags.multi_select?.map(tag => tag.name) || []
          : [];

      return {
        id: post.id,
        title: extractTitleText(post.properties.Title),
        summary: extractRichText(post.properties.Description),
        excerpt: extractRichText(post.properties.Description),
        slug: extractRichText(post.properties.Slug),
        category: extractRichText(post.properties.Category),
        tags,
        coverImage: extractFileUrl(post.properties.CoverImage),
        dateCreated: new Date().toISOString(), // This should be replaced with actual creation date
        published:
          post.properties.Published &&
          typeof post.properties.Published === 'object' &&
          'checkbox' in post.properties.Published
            ? post.properties.Published.checkbox
            : false,
      };
    });

    // Update cache
    cachedPosts = processedPosts;
    lastFetchTime = now;

    return processedPosts;
  } catch (error) {
    logger.error('Failed to fetch and process blog posts', error as Error);
    throw error;
  }
}
