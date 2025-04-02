'use server';

import { db } from '@/lib/db.util';
import { revalidatePath } from 'next/cache';

// Define type for blog data response
type BlogDataResponse = {
  posts: any[];
  totalPages: number;
  currentPage: number;
  error?: string;
  timestamp?: number;
};

// Module-level cache storage with timestamp
const cache = new Map<string, BlogDataResponse>();
const CACHE_EXPIRY = 86400000; // 24 hours in milliseconds

/**
 * Server action for fetching blog posts
 * This can be called from client components
 */
export async function getBlogPosts(
  page: number,
  category?: string,
  search?: string
): Promise<BlogDataResponse> {
  try {
    // Ensure primitive types are properly passed
    const pageNum = Number(page) || 1;
    const categoryStr = category?.toString();
    const searchStr = search?.toString();

    // Create a unique cache key for this specific request
    const cacheKey = `blog-${pageNum}-${categoryStr || 'all'}-${searchStr || 'none'}`;

    // Check if we have a valid cached response
    const now = Date.now();
    const cachedData = cache.get(cacheKey);

    if (cachedData && cachedData.timestamp && now - cachedData.timestamp < CACHE_EXPIRY) {
      return cachedData;
    }

    // If no cache hit, fetch from database
    let result: BlogDataResponse;

    // Use direct database queries
    if (searchStr && searchStr.length > 0) {
      // Use search functionality
      const searchResult = await db.blog.search({
        query: searchStr,
        limit: 6,
        offset: (pageNum - 1) * 6,
        category: categoryStr,
      });

      result = {
        posts: searchResult.items,
        totalPages: Math.ceil(searchResult.total / 6),
        currentPage: pageNum,
        error: undefined,
        timestamp: now,
      };
    } else {
      // Use regular listing
      const offset = (pageNum - 1) * 6;
      const [posts, total] = await Promise.all([
        db.blog.findMany({ limit: 6, offset, category: categoryStr }),
        db.blog.count({ category: categoryStr }),
      ]);

      result = {
        posts,
        totalPages: Math.ceil(total / 6),
        currentPage: pageNum,
        error: undefined,
        timestamp: now,
      };
    }

    // Store in cache
    cache.set(cacheKey, result);

    return result;
  } catch (error) {
    console.error('Server action error:', error);
    return {
      posts: [],
      totalPages: 0,
      currentPage: Number(page) || 1,
      error: 'Failed to fetch blog posts',
    };
  }
}

/**
 * Clears the blog cache
 */
export async function revalidateBlogCache() {
  // Clear the module cache
  cache.clear();

  // Also revalidate the paths
  revalidatePath('/blog');
  revalidatePath('/');

  return { revalidated: true };
}
