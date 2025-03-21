'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import UI from '@/config/ui.config';
import { useDebounce } from '@/hooks/use-debounce';
import { fadeInVariants } from '@/lib/utils/animations.util';
import { isValidResponse, retryWithBackoff } from '@/lib/utils/error.util';
import type { ApiResponse } from '@/types/api/common.type';
import type { CategoryFilterProps } from '@/types/components/blog.type';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface CategoryResponse {
  categories: string[];
}

export function CategoryFilter({
  onSearchChange,
  onCategoryChange,
}: CategoryFilterProps): JSX.Element {
  const [categories, setCategories] = useState<string[]>(['All']);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [_isLoading, setIsLoading] = useState<boolean>(false);
  const debouncedSearchQuery = useDebounce(searchQuery, { delay: UI.ANIMATION_TIMING.DEBOUNCE_MS });

  // Handle debounced search
  useEffect(() => {
    onSearchChange(debouncedSearchQuery);
  }, [debouncedSearchQuery, onSearchChange]);

  // Fetch categories with retry mechanism
  const fetchCategories = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const result = await retryWithBackoff(async () => {
        const response = await fetch('/api/blog/categories');
        return isValidResponse<ApiResponse<CategoryResponse>>(response);
      });

      if (result.success && result.data?.categories) {
        // Don't add 'All' here since it's already included in the API response
        setCategories(result.data.categories);
      } else {
        throw new Error(result.error?.message || 'Failed to fetch categories');
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories(['All']);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    void fetchCategories();
  }, []);

  // Handle search input change
  const handleSearchChange = (value: string): void => {
    setSearchQuery(value);
  };

  // Handle category change
  const handleCategoryChange = (category: string): void => {
    setActiveCategory(category);
    onCategoryChange(category);
  };

  return (
    <motion.div
      className="flex flex-col gap-4 mb-10 md:px-4 lg:px-8"
      variants={fadeInVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
        <div className="relative flex-grow max-w-md">
          <Input
            type="text"
            placeholder="Search blog posts..."
            value={searchQuery}
            onChange={e => handleSearchChange(e.target.value)}
            id="blog-search"
            name="blog-search"
            autoComplete="off"
            className="pr-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-lg"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="w-5 h-5 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mt-2">
        {categories
          .sort((a, b) => {
            if (a === 'All') return -1; // "All" always first
            if (b === 'All') return 1;

            // Check if either category is CITS (Computer Science)
            const aIsCITS = a.includes('CITS');
            const bIsCITS = b.includes('CITS');

            // Sort CITS categories to the end
            if (aIsCITS && !bIsCITS) return 1; // CITS categories at the end
            if (!aIsCITS && bIsCITS) return -1; // Non-CITS categories first

            // Sort alphabetically within each group
            return a.localeCompare(b);
          })
          .map((category, index) => (
            <motion.div
              key={`${category}-${index}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.3 }}
            >
              <Button
                variant="outline"
                onClick={() => handleCategoryChange(category)}
                className={`rounded-full text-sm py-2 px-6 cursor-pointer border ${
                  activeCategory === category
                    ? 'bg-[#E75A98] hover:bg-[#D8488A] text-white border-[#E75A98]'
                    : 'bg-transparent border-[#E75A98] text-[#E75A98] hover:bg-[#E75A98]/10 dark:border-[#E75A98] dark:text-white'
                }`}
              >
                {category}
              </Button>
            </motion.div>
          ))}
      </div>
    </motion.div>
  );
}
