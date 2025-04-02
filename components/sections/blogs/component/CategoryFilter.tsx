'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import React from 'react';

const MotionDiv = motion.div;
const MotionButton = motion.button;

export interface CategoryFilterProps {
  categories: string[];
  currentCategory: string;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onCategoryChange: (category: string) => void;
}

export function CategoryFilter({
  categories,
  currentCategory,
  searchQuery,
  onSearchChange,
  onCategoryChange,
}: CategoryFilterProps) {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value);
  };

  const clearSearch = () => {
    onSearchChange('');
  };

  return (
    <MotionDiv
      className="flex flex-col gap-4 mb-10 md:px-4 lg:px-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
        <div className="relative flex-grow max-w-md">
          <Input
            type="text"
            placeholder="Search blog posts..."
            value={searchQuery}
            onChange={handleSearchChange}
            id="blog-search"
            name="blog-search"
            autoComplete="off"
            className="pl-10 pr-16 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-lg w-full h-10"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
              aria-label="Clear search"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-2">
        {categories
          .slice()
          .sort((a, b) => {
            if (a === 'All') return -1;
            if (b === 'All') return 1;
            const aIsCITS = a.includes('CITS');
            const bIsCITS = b.includes('CITS');
            if (aIsCITS && !bIsCITS) return 1;
            if (!aIsCITS && bIsCITS) return -1;
            return a.localeCompare(b);
          })
          .map((category, index) => (
            <MotionDiv
              key={category}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.3 }}
            >
              <Button
                variant="outline"
                onClick={() => onCategoryChange(category)}
                className={`rounded-full text-sm py-2 px-6 cursor-pointer border ${
                  currentCategory === category
                    ? 'bg-[#E75A98] hover:bg-[#D8488A] text-white border-[#E75A98]'
                    : 'bg-transparent border-[#E75A98] text-[#E75A98] hover:bg-[#E75A98]/10 dark:border-[#E75A98] dark:text-white'
                }`}
              >
                {category}
              </Button>
            </MotionDiv>
          ))}
      </div>
    </MotionDiv>
  );
}
