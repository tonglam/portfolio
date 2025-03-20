'use client';

import { Button } from '@/components/ui/button';
import UI from '@/config/ui.config';
import { springItemVariants, staggerContainerVariants } from '@/lib/utils/animations.util';
import { formatErrorMessage, isValidResponse, retryWithBackoff } from '@/lib/utils/error.util';
import type {
  BlogPostsApiResponse,
  BlogSearchApiResponse,
  LegacyBlogResponse,
  ProcessedBlogPost,
} from '@/types/api/blog.type';
import type { BlogGridProps } from '@/types/components/blog.type';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { BlogCard } from './BlogCard';

export function BlogGrid({ searchQuery, activeCategory }: BlogGridProps): JSX.Element {
  const [posts, setPosts] = useState<ProcessedBlogPost[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch blog posts based on current filters
  useEffect(() => {
    async function fetchPosts(): Promise<void> {
      setIsLoading(true);
      setError(null);

      try {
        // Build query parameters
        const params = new URLSearchParams();
        if (activeCategory !== 'All') params.append('category', activeCategory);
        params.append('page', currentPage.toString());
        params.append('limit', '9');

        // Use search endpoint if searching, otherwise use regular endpoint
        const endpoint = searchQuery
          ? `/api/blog/search?${params}&q=${searchQuery}`
          : `/api/blog?${params}`;

        const result = await retryWithBackoff(async () => {
          const response = await fetch(endpoint);
          return isValidResponse<BlogPostsApiResponse | BlogSearchApiResponse | LegacyBlogResponse>(
            response
          );
        });

        if ('success' in result) {
          if (result.success && result.data) {
            if ('posts' in result.data) {
              setPosts(result.data.posts);
              setTotalPages(result.data.pagination.totalPages || 1);
            } else if ('results' in result.data) {
              const searchPosts = result.data.results.map(item => item.post);
              setPosts(searchPosts);
              setTotalPages(result.data.pagination.totalPages || 1);
            }
          } else if (result.error?.message) {
            throw new Error(result.error.message);
          }
        } else if ('posts' in result) {
          // Legacy format fallback
          setPosts(result.posts);
          setTotalPages(result.totalPages || 1);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (err) {
        setError(formatErrorMessage(err));
        setPosts([]);
        setTotalPages(1);
      } finally {
        setIsLoading(false);
      }
    }

    void fetchPosts();
  }, [activeCategory, currentPage, searchQuery]);

  if (isLoading && posts.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error && posts.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-2">
          Oops! Something went wrong
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {error || "We couldn't load the blog posts. Please try again."}
        </p>
        <Button onClick={() => setCurrentPage(UI.PAGINATION.DEFAULT_PAGE)}>Try Again</Button>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-2">
          No posts found
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {searchQuery || activeCategory !== 'All'
            ? 'Try different search terms or categories'
            : 'No blog posts available yet'}
        </p>
        {(searchQuery || activeCategory !== 'All') && (
          <Button onClick={() => setCurrentPage(UI.PAGINATION.DEFAULT_PAGE)}>Clear Filters</Button>
        )}
      </div>
    );
  }

  return (
    <>
      <motion.div
        variants={staggerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-12 flex justify-center"
        >
          <div className="flex flex-wrap items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-sm border border-gray-100 dark:border-gray-700">
            {/* Previous Button */}
            <Button
              variant="ghost"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className={`flex items-center px-3 py-2 rounded-lg transition-all duration-200 ${
                currentPage === 1
                  ? 'text-gray-400 cursor-not-allowed opacity-50'
                  : 'hover:bg-gradient-to-r hover:from-[#2563EB]/10 hover:to-[#4F46E5]/10 dark:hover:from-[#38BDF8]/10 dark:hover:to-[#818CF8]/10 text-gray-700 dark:text-gray-300'
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span className="hidden sm:inline">Previous</span>
            </Button>

            {/* Page Numbers */}
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
                const isCurrentPage = page === currentPage;
                const isFirstPage = page === 1;
                const isLastPage = page === totalPages;
                const isAdjacentToCurrentPage = Math.abs(page - currentPage) === 1;

                if (isCurrentPage || isFirstPage || isLastPage || isAdjacentToCurrentPage) {
                  return (
                    <Button
                      key={page}
                      variant={isCurrentPage ? 'default' : 'ghost'}
                      onClick={() => setCurrentPage(page)}
                      className={`flex items-center justify-center h-9 w-9 rounded-lg font-medium transition-all duration-200 ${
                        isCurrentPage
                          ? 'bg-gradient-to-r from-[#2563EB] to-[#4F46E5] dark:from-[#38BDF8] dark:to-[#818CF8] text-white shadow-md'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-[#2563EB]/10 hover:to-[#4F46E5]/10 dark:hover:from-[#38BDF8]/10 dark:hover:to-[#818CF8]/10'
                      }`}
                    >
                      {page}
                    </Button>
                  );
                } else if (
                  (page === 2 && currentPage > 3) ||
                  (page === totalPages - 1 && currentPage < totalPages - 2)
                ) {
                  return (
                    <span
                      key={page}
                      className="flex h-9 w-9 items-center justify-center text-gray-500 dark:text-gray-400"
                    >
                      ...
                    </span>
                  );
                }

                return null;
              })}
            </div>

            {/* Next Button */}
            <Button
              variant="ghost"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className={`flex items-center px-3 py-2 rounded-lg transition-all duration-200 ${
                currentPage === totalPages
                  ? 'text-gray-400 cursor-not-allowed opacity-50'
                  : 'hover:bg-gradient-to-r hover:from-[#2563EB]/10 hover:to-[#4F46E5]/10 dark:hover:from-[#38BDF8]/10 dark:hover:to-[#818CF8]/10 text-gray-700 dark:text-gray-300'
              }`}
            >
              <span className="hidden sm:inline">Next</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Button>
          </div>
        </motion.div>
      )}
    </>
  );
}
