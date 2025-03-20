'use client';

import { ErrorBoundary } from '@/components/ui/error-boundary';
import type { BlogSectionProps } from '@/types/components/blog.type';
import { useState } from 'react';
import { BlogGrid } from './BlogGrid';
import { CategoryFilter } from './CategoryFilter';

export function BlogsContent({
  initialCategory = 'All',
  initialSearchQuery = '',
}: BlogSectionProps): JSX.Element {
  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery);
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);

  return (
    <ErrorBoundary>
      <CategoryFilter onSearchChange={setSearchQuery} onCategoryChange={setActiveCategory} />
      <BlogGrid searchQuery={searchQuery} activeCategory={activeCategory} />
    </ErrorBoundary>
  );
}
