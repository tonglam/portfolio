import { db } from '@/lib/db.util';
import { unstable_cache } from 'next/cache';

// Cache the categories fetching for 24 hours (86400 seconds)
export const getCachedCategories = unstable_cache(
  async () => {
    try {
      // Fetch categories directly from the database
      const categories = await db.blog.getCategories();
      return categories;
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  },
  ['blog-categories'], // cache key
  { revalidate: 86400, tags: ['blog-categories'] } // 24 hour cache + tag for manual invalidation
);

export async function CategoriesServer() {
  const categories = await getCachedCategories();

  // Return the categories as a serializable prop
  return {
    categories: ['All', ...categories.filter((cat: string) => cat !== 'All')],
  };
}
