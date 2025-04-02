import { BlogSection } from '../BlogSection';
import { BlogPostsServer } from './BlogPostsServer';
import { CategoriesServer } from './CategoriesServer';

interface BlogSectionWrapperProps {
  initialPage?: number;
  initialCategory?: string;
  initialSearchQuery?: string;
}

export async function BlogSectionWrapper({
  initialPage = 1,
  initialCategory = 'All',
  initialSearchQuery = '',
}: BlogSectionWrapperProps) {
  try {
    // Fetch categories and posts in parallel for better performance
    const [categoriesData, postsData] = await Promise.all([
      CategoriesServer(),
      BlogPostsServer({
        initialPage,
        initialCategory: initialCategory !== 'All' ? initialCategory : undefined,
        initialSearch: initialSearchQuery || undefined,
      }),
    ]);

    return (
      <BlogSection
        initialPosts={postsData.posts}
        initialCategories={categoriesData.categories}
        initialTotalPages={postsData.totalPages}
        initialCategory={initialCategory}
        initialSearchQuery={initialSearchQuery}
        initialError={postsData.error}
      />
    );
  } catch (error) {
    console.error('Error in BlogSectionWrapper:', error);

    // Provide fallback data in case of errors
    return (
      <BlogSection
        initialPosts={[]}
        initialCategories={['All']}
        initialTotalPages={0}
        initialCategory={initialCategory}
        initialSearchQuery={initialSearchQuery}
        initialError="Failed to load blog content"
      />
    );
  }
}
