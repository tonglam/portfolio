import { fetchBlogPosts, fetchCategories } from '@/lib/data.util';
import type { ProcessedBlogPost } from '@/types/blog.type';

interface BlogDataServerProps {
  page?: number;
  category?: string;
  searchQuery?: string;
  children: (props: {
    posts: ProcessedBlogPost[];
    totalPages: number;
    categories: string[];
    error?: string;
  }) => React.ReactNode;
}

export async function BlogDataServer({
  page = 1,
  category,
  searchQuery,
  children,
}: BlogDataServerProps) {
  // Fetch categories
  const categories = await fetchCategories();

  // Fetch blog posts based on parameters
  const blogData = await fetchBlogPosts(page, category, searchQuery);

  // Extract data with null checks
  const posts = blogData.data?.posts || [];
  const totalPages = blogData.data?.pagination?.totalPages || 0;
  const error = blogData.error?.message;

  // Return data through render prop pattern
  return children({
    posts,
    totalPages,
    categories,
    error,
  });
}
