'use client';

import { getBlogPosts } from '@/app/actions/blog';
import { useDebounce } from '@/hooks/use-debounce';
import type { ProcessedBlogPost } from '@/types/blog.type';
import { useEffect, useRef, useState } from 'react';
import { BlogGrid } from './BlogGrid';
import { CategoryFilter } from './CategoryFilter';

interface BlogActionsProps {
  initialPosts: ProcessedBlogPost[];
  initialTotalPages: number;
  initialCategories: string[];
  initialCategory: string;
  initialSearchQuery: string;
  initialError?: string;
}

export function BlogActions({
  initialPosts,
  initialTotalPages,
  initialCategories,
  initialCategory,
  initialSearchQuery,
  initialError,
}: BlogActionsProps) {
  // State managed by BlogActions
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentCategory, setCurrentCategory] = useState<string>(initialCategory || 'All');
  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery || '');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFirstRender, setIsFirstRender] = useState<boolean>(true);
  const fetchingRef = useRef<boolean>(false);

  // Debounce the search query here
  const debouncedSearchQuery = useDebounce<string>(searchQuery, { delay: 300 });

  // Client-side state for displaying posts
  const [displayPosts, setDisplayPosts] = useState<ProcessedBlogPost[]>(initialPosts);
  const [displayTotalPages, setDisplayTotalPages] = useState<number>(initialTotalPages);
  const [displayError, setDisplayError] = useState<string | undefined>(initialError);

  // Renamed handler: This just updates the immediate search query state
  const handleSearchInputChange = (value: string) => {
    setSearchQuery(value);
    // Reset page only if the search term changes significantly (optional, could check length > 2 etc.)
    if (value !== searchQuery) {
      setCurrentPage(1);
    }
    // Don't set isLoading here, wait for debounce
  };

  const handleCategoryChange = (category: string) => {
    if (category !== currentCategory) {
      // Don't set loading immediately, let useEffect handle it
      setCurrentCategory(category);
      setCurrentPage(1);
      setSearchQuery(''); // Clear search query state here
    }
  };

  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      // Don't set loading immediately, let useEffect handle it
      setCurrentPage(page);
      // Scroll to the top of the blog section after page state is set
      document.getElementById('blog')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Effect to handle initial render skip
  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    }
  }, [isFirstRender]);

  // Effect to trigger loading and fetch data based on debounced search or other changes
  useEffect(() => {
    // Don't run on first render
    if (isFirstRender) {
      return;
    }

    // Set loading state when dependencies change (after debounce for search)
    setIsLoading(true);

    const fetchData = async () => {
      if (fetchingRef.current) return; // Prevent concurrent fetches

      try {
        fetchingRef.current = true;

        const categoryToFetch = currentCategory !== 'All' ? currentCategory : undefined;
        const searchToFetch = debouncedSearchQuery || undefined;

        // Use server action with debounced search query
        const data = await getBlogPosts(currentPage, categoryToFetch, searchToFetch);

        setDisplayPosts(data.posts || []);
        setDisplayTotalPages(data.totalPages || 0);
        setDisplayError(data.error);
      } catch (error) {
        console.error('Error fetching blog data:', error);
        setDisplayError(error instanceof Error ? error.message : 'Failed to fetch blog data');
      } finally {
        setIsLoading(false);
        fetchingRef.current = false;
      }
    };

    fetchData();
    // Depend on currentPage, currentCategory, and DEBOUNCED search query
  }, [currentPage, currentCategory, debouncedSearchQuery, isFirstRender]);

  return (
    <div className="space-y-8">
      <CategoryFilter
        categories={initialCategories}
        currentCategory={currentCategory}
        // Pass the state and the *input change* handler
        searchQuery={searchQuery}
        onSearchChange={handleSearchInputChange}
        onCategoryChange={handleCategoryChange}
      />

      <BlogGrid
        posts={displayPosts}
        totalPages={displayTotalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        error={displayError}
        isLoading={isLoading}
      />
    </div>
  );
}
