'use client';

import { ProcessedBlogPost } from '@/types/blog.type';
import { BlogActions } from './component/BlogActions';

interface BlogSectionProps {
  initialPosts: ProcessedBlogPost[];
  initialTotalPages: number;
  initialCategories: string[];
  initialCategory?: string;
  initialSearchQuery?: string;
  initialError?: string;
}

export function BlogSection({
  initialPosts = [],
  initialTotalPages = 0,
  initialCategories = ['All'],
  initialCategory = 'All',
  initialSearchQuery = '',
  initialError,
}: BlogSectionProps) {
  return (
    <section className="min-h-screen" id="blog">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Blog</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Explore my thoughts, tutorials, and insights on software development, technology, and
            more.
          </p>
        </div>

        <BlogActions
          initialPosts={initialPosts}
          initialTotalPages={initialTotalPages}
          initialCategories={initialCategories}
          initialCategory={initialCategory}
          initialSearchQuery={initialSearchQuery}
          initialError={initialError}
        />
      </div>
    </section>
  );
}
