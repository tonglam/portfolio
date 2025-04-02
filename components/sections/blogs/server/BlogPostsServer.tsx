'use server';

import { db } from '@/lib/db.util';
import { unstable_cache } from 'next/cache';

// Cache blog posts fetch for initial page load (24 hours - 86400 seconds)
export const getCachedBlogPosts = unstable_cache(
  async (page: number = 1, category?: string, search?: string) => {
    if (search) {
      // Use search functionality
      const result = await db.blog.search({
        query: search,
        limit: 6,
        offset: (page - 1) * 6,
        category,
      });

      return {
        success: true,
        data: {
          posts: result.items,
          pagination: {
            currentPage: page,
            totalPages: Math.ceil(result.total / 6),
            totalItems: result.total,
            itemsPerPage: 6,
            hasMore: result.total > page * 6,
          },
        },
      };
    } else {
      // Use regular listing
      const offset = (page - 1) * 6;
      const [posts, total] = await Promise.all([
        db.blog.findMany({ limit: 6, offset, category }),
        db.blog.count({ category }),
      ]);

      return {
        success: true,
        data: {
          posts,
          pagination: {
            currentPage: page,
            totalPages: Math.ceil(total / 6),
            totalItems: total,
            itemsPerPage: 6,
            hasMore: total > page * 6,
          },
        },
      };
    }
  },
  // Fixed the cache key to use an array of strings instead of a function
  ['blog-posts'],
  { revalidate: 86400, tags: ['blog-posts'] } // 24 hour cache + tag for manual invalidation
);

// Initial server component for blog posts
export async function BlogPostsServer({
  initialPage = 1,
  initialCategory,
  initialSearch,
}: {
  initialPage?: number;
  initialCategory?: string;
  initialSearch?: string;
}) {
  // Use cached data for initial render
  const blogData = await getCachedBlogPosts(initialPage, initialCategory, initialSearch);

  // Return serializable data
  return {
    posts: blogData.data?.posts || [],
    totalPages: blogData.data?.pagination?.totalPages || 0,
    currentPage: blogData.data?.pagination?.currentPage || 1,
    error: blogData.success ? undefined : 'Failed to fetch blog posts',
  };
}
