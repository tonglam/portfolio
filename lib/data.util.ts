import { DEFAULTS } from '@/config';
import { db } from '@/lib/db.util';
import type { BlogPostsApiResponse } from '@/types/blog.type';
import { ApiErrorCode } from '@/types/common.type';

/**
 * Fetches blog posts with optional filtering by category and search query
 * This now uses the direct database access functions from db.util.ts
 */
export async function fetchBlogPosts(
  page: number = 1,
  category?: string,
  search?: string
): Promise<BlogPostsApiResponse> {
  try {
    if (search) {
      // Use search function
      const searchResult = await db.blog.search({
        query: search,
        limit: DEFAULTS.BLOG.LIMIT,
        offset: (page - 1) * DEFAULTS.BLOG.LIMIT,
        category,
      });

      return {
        success: true,
        data: {
          posts: searchResult.items,
          pagination: {
            currentPage: page,
            totalPages: Math.ceil(searchResult.total / DEFAULTS.BLOG.LIMIT),
            totalItems: searchResult.total,
            itemsPerPage: DEFAULTS.BLOG.LIMIT,
            hasMore: searchResult.total > page * DEFAULTS.BLOG.LIMIT,
          },
        },
      };
    } else {
      // Use regular listing
      const offset = (page - 1) * DEFAULTS.BLOG.LIMIT;

      // Get posts and total count in parallel
      const [posts, totalItems] = await Promise.all([
        db.blog.findMany({
          limit: DEFAULTS.BLOG.LIMIT,
          offset,
          category,
        }),
        db.blog.count({ category }),
      ]);

      return {
        success: true,
        data: {
          posts,
          pagination: {
            currentPage: page,
            totalPages: Math.ceil(totalItems / DEFAULTS.BLOG.LIMIT),
            totalItems,
            itemsPerPage: DEFAULTS.BLOG.LIMIT,
            hasMore: totalItems > page * DEFAULTS.BLOG.LIMIT,
          },
        },
      };
    }
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return {
      success: false,
      error: {
        code: 'INTERNAL_SERVER_ERROR' as ApiErrorCode,
        message: 'Failed to fetch blog posts',
      },
      data: {
        posts: [],
        pagination: {
          currentPage: page,
          totalPages: 0,
          totalItems: 0,
          itemsPerPage: DEFAULTS.BLOG.LIMIT,
          hasMore: false,
        },
      },
    };
  }
}

/**
 * Fetches all available blog categories directly from the data source
 */
export async function fetchCategories(): Promise<string[]> {
  try {
    // Get categories from database
    const categories = await db.blog.getCategories();

    // Always ensure 'All' is the first category
    return ['All', ...categories.filter((cat: string) => cat !== 'All')];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return ['All'];
  }
}

/**
 * Searches blog posts by query term
 */
export async function searchBlogPosts(
  query: string,
  page: number = 1
): Promise<BlogPostsApiResponse> {
  return fetchBlogPosts(page, undefined, query);
}
