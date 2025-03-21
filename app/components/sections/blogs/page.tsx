import type { BlogSectionProps } from '@/types/components/blog.type';
import { Suspense } from 'react';
import { BlogsContent } from './BlogsContent';
import { BlogsHeader } from './BlogsHeader';

export default function Blogs({
  initialCategory = 'All',
  initialSearchQuery = '',
}: BlogSectionProps): JSX.Element {
  return (
    <section id="blogs" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <BlogsHeader
          title="Blogs"
          subtitle="Explore my thoughts, tutorials, and insights on software development, technology, and more."
        />
        <Suspense
          fallback={
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
            </div>
          }
        >
          <BlogsContent initialCategory={initialCategory} initialSearchQuery={initialSearchQuery} />
        </Suspense>
      </div>
    </section>
  );
}
