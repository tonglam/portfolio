'use client';

import { CustomPagination } from '@/components/sections/blogs/component/Pagination';
import { Button } from '@/components/ui/button';
import UI from '@/config/ui.config';
import { springItemVariants, staggerContainerVariants } from '@/lib/animations.util';
import type { ProcessedBlogPost } from '@/types/blog.type';
import { motion } from 'framer-motion';
import { BlogCard } from './BlogCard';
import { BlogCardSkeleton } from './BlogCardSkeleton';

interface BlogGridProps {
  posts: ProcessedBlogPost[];
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  error?: string;
  isLoading?: boolean;
}

export function BlogGrid({
  posts,
  totalPages,
  currentPage,
  onPageChange,
  error,
  isLoading = false,
}: BlogGridProps) {
  // Show loading state
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <BlogCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="text-center py-10">
        <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-2">
          Oops! Something went wrong
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
        <Button onClick={() => onPageChange(UI.PAGINATION.DEFAULT_PAGE)}>Try Again</Button>
      </div>
    );
  }

  // Show no posts message
  if (posts.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-2">
          No posts found
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Try different search terms or categories
        </p>
        <Button onClick={() => onPageChange(UI.PAGINATION.DEFAULT_PAGE)}>Clear Filters</Button>
      </div>
    );
  }

  return (
    <>
      <motion.div
        variants={staggerContainerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {posts.map((blog, index) => (
          <motion.div
            key={`blog-${blog.id || blog.slug || index}`}
            variants={springItemVariants}
            className="h-full"
          >
            <BlogCard blog={blog} />
          </motion.div>
        ))}
      </motion.div>

      {/* Pagination */}
      {totalPages > 1 && (
        <CustomPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </>
  );
}
