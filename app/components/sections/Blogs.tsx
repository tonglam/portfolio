'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { fixDarkAnimation } from '@/components/ui/theme-fix';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { UI } from '@/config/constants';
import { useDebounce } from '@/hooks/use-debounce';
import type {
  BlogPost,
  LocalBlogApiResponse,
  LocalCategoriesApiResponse,
  LocalSearchApiResponse,
} from '@/types/data/blog.type';
import type { HTMLMotionProps } from 'framer-motion';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import Image from 'next/image';
import type { ChangeEvent } from 'react';
import { useCallback, useEffect, useState } from 'react';

// Create fixed motion components
const MotionH2 = (props: HTMLMotionProps<'h2'>): JSX.Element => (
  <motion.h2 {...fixDarkAnimation(props)} />
);
const MotionDiv = (props: HTMLMotionProps<'div'>): JSX.Element => (
  <motion.div {...fixDarkAnimation(props)} />
);
const MotionButton = (props: HTMLMotionProps<'button'>): JSX.Element => (
  <motion.button {...fixDarkAnimation(props)} />
);

export default function Blogs(): JSX.Element {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>(['All']);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(UI.PAGINATION.DEFAULT_PAGE);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [_hasMorePosts, setHasMorePosts] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [_isCategoryLoading, _setIsCategoryLoading] = useState<boolean>(false);
  const [_isSearching, setIsSearching] = useState<boolean>(false);
  const [_error, setError] = useState<string | null>(null);
  const debouncedSearchQuery = useDebounce(searchQuery, { delay: UI.ANIMATION_TIMING.DEBOUNCE_MS });
  const postsPerPage = UI.PAGINATION.DEFAULT_POSTS_PER_PAGE;

  // Type guard functions
  const isBlogApiResponse = (data: unknown): data is LocalBlogApiResponse => {
    return (
      typeof data === 'object' &&
      data !== null &&
      'success' in data &&
      data.success === true &&
      'data' in data &&
      typeof data.data === 'object' &&
      data.data !== null &&
      'posts' in data.data &&
      Array.isArray(data.data.posts) &&
      'pagination' in data.data &&
      typeof data.data.pagination === 'object'
    );
  };

  const isSearchApiResponse = (data: unknown): data is LocalSearchApiResponse => {
    return (
      typeof data === 'object' &&
      data !== null &&
      'success' in data &&
      data.success === true &&
      'data' in data &&
      typeof data.data === 'object' &&
      data.data !== null &&
      'results' in data.data &&
      Array.isArray(data.data.results)
    );
  };

  const isLegacyResponse = (data: unknown): boolean => {
    return (
      typeof data === 'object' &&
      data !== null &&
      'posts' in data &&
      Array.isArray((data as { posts: unknown }).posts)
    );
  };

  // Fetch blog posts based on current filters
  const fetchFilteredBlogs = useCallback(async () => {
    try {
      setIsLoading(true);

      // Only show searching UI when explicitly searching
      if (!debouncedSearchQuery && activeCategory === 'All') {
        setIsSearching(false);
      }

      // Build query parameters
      const params = new URLSearchParams();
      if (activeCategory !== 'All') params.append('category', activeCategory);
      params.append('page', currentPage.toString());
      params.append('limit', postsPerPage.toString()); // Use the constant

      // Use search endpoint if searching, otherwise use regular endpoint
      const endpoint = debouncedSearchQuery
        ? `/api/blog/search?${params}&q=${debouncedSearchQuery}`
        : `/api/blog?${params}`;

      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error(`Failed to fetch blog posts: ${response.status}`);
      }

      const result: unknown = await response.json();

      // Check for new API response format (with success and data properties)
      if (isBlogApiResponse(result)) {
        setPosts(result.data.posts);
        setTotalPages(result.data.pagination.totalPages || 1);
        setHasMorePosts(result.data.pagination.hasMore || false);
      } else if (isSearchApiResponse(result)) {
        // Map search results to blog post format
        const posts = result.data.results.map(item => item.post);
        setPosts(posts);
        setTotalPages(result.data.pagination.totalPages || 1);
        setHasMorePosts(result.data.pagination.hasMore || false);
      }
      // Legacy format fallback
      else if (isLegacyResponse(result)) {
        const legacyData = result as { posts: BlogPost[]; totalPages?: number };
        setPosts(legacyData.posts);
        setTotalPages(legacyData.totalPages || 1);
        setHasMorePosts(false);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'Unknown error occurred');
      setPosts([]); // Clear blogs on error
      setTotalPages(1);
      setHasMorePosts(false);
    } finally {
      setIsLoading(false);
      setIsSearching(false);
    }
  }, [activeCategory, currentPage, debouncedSearchQuery, postsPerPage]);

  // Fetch categories with a retry mechanism
  const fetchCategories = useCallback(async (retryCount = 0) => {
    try {
      const response = await fetch('/api/blog/categories');
      const result = (await response.json()) as LocalCategoriesApiResponse;

      if (result.success && result.data && result.data.categories) {
        setCategories(result.data.categories);
      } else {
        setCategories(['All']);
      }
    } catch {
      // Retry on error with exponential backoff
      const maxRetries = UI.RETRY.MAX_ATTEMPTS;
      if (retryCount < maxRetries) {
        // Exponential backoff
        const delay = Math.pow(2, retryCount) * UI.RETRY.BASE_DELAY_MS;
        await new Promise(resolve => setTimeout(resolve, delay));
        void fetchCategories(retryCount + 1);
      } else {
        // Default to just showing 'All' if we can't fetch categories
        setCategories(['All']);
      }
    }
  }, []);

  // Initial data fetch
  useEffect(() => {
    void fetchCategories();
  }, [fetchCategories]);

  // Fetch blogs when filters change
  useEffect(() => {
    void fetchFilteredBlogs();
  }, [fetchFilteredBlogs]);

  // Reset page number when category or search query changes
  useEffect(() => {
    setCurrentPage(UI.PAGINATION.DEFAULT_PAGE);
  }, [activeCategory, debouncedSearchQuery]);

  // Handle search input change
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);
    if (e.target.value.trim() !== '') {
      setIsSearching(true);
    }
  };

  // Handle category change
  const handleCategoryChange = (category: string): void => {
    setActiveCategory(category);
    // Only set searching flag if changing from "All" to a specific category
    if (category !== 'All') {
      setIsSearching(true);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <section id="blogs" className="py-16 md:py-20 bg-gray-50 dark:bg-transparent">
      <div className="container mx-auto px-4">
        <MotionH2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#2563EB] to-[#4F46E5] dark:from-[#38BDF8] dark:to-[#818CF8]"
        >
          Blogs
        </MotionH2>

        {isLoading && posts.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
          </div>
        ) : _error && posts.length === 0 ? (
          <div className="text-center py-10">
            <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-2">
              Oops! Something went wrong
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {_error || "We couldn't load the blog posts. Please try again."}
            </p>
            <Button onClick={() => void fetchFilteredBlogs()}>Try Again</Button>
          </div>
        ) : (
          <>
            {/* Category Filter */}
            <MotionDiv
              className="flex flex-col gap-4 mb-10 md:px-4 lg:px-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {/* Search Bar */}
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
                    <MotionDiv
                      key={category}
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
                    </MotionDiv>
                  ))}
              </div>
            </MotionDiv>

            {/* Blog Grid */}
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
              </div>
            ) : posts.length > 0 ? (
              <MotionDiv
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                <AnimatePresence mode="sync">
                  {posts.map((blog, index) => (
                    <MotionDiv
                      key={`blog-${blog.id || blog.slug || index}`}
                      variants={itemVariants}
                      exit={{ opacity: 0, y: 20 }}
                      className="h-full"
                    >
                      <a
                        href={blog.originalPageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block h-full"
                      >
                        <Card className="bg-white dark:bg-gradient-to-br dark:from-[#1E293B] dark:to-[#2D3748] border-0 overflow-hidden shadow-md h-full flex flex-col hover:shadow-xl transition-all duration-300">
                          <div className="relative h-48 w-full overflow-hidden">
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 0.3 }}
                              className="h-full w-full relative"
                            >
                              <Image
                                src={blog.r2ImageUrl}
                                alt={blog.title}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover"
                              />
                            </motion.div>
                          </div>
                          <div className="p-4 sm:p-6 flex-grow flex flex-col">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-xs sm:text-sm bg-clip-text text-transparent bg-gradient-to-r from-[#2563EB] to-[#4F46E5] dark:from-[#38BDF8] dark:to-[#818CF8]">
                                {blog.date}
                              </span>
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                {blog.minRead
                                  ? blog.minRead.toString().includes('Min')
                                    ? blog.minRead
                                    : `${blog.minRead} Min Read`
                                  : '3 Min Read'}
                              </span>
                            </div>
                            <h3 className="text-base sm:text-lg font-bold mb-2 text-gray-900 dark:text-white line-clamp-2">
                              {blog.title}
                            </h3>
                            {/* Remove the category section and replace with improved tags display */}
                            {blog.tags && blog.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 mb-3">
                                {blog.tags.map((tag, i) => (
                                  <span
                                    key={i}
                                    className="text-xs px-2.5 py-1 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 text-gray-700 dark:text-gray-300 font-medium shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200 dark:border-gray-700"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <p className="text-gray-700 dark:text-gray-300 mb-4 flex-grow text-sm line-clamp-3 cursor-help">
                                    {blog.summary}
                                  </p>
                                </TooltipTrigger>
                                <TooltipContent
                                  side="top"
                                  align="center"
                                  className="max-w-md w-[320px] p-3 text-wrap break-words bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg"
                                >
                                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                    {blog.summary}
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <motion.div
                              whileHover={{ x: 5 }}
                              transition={{ duration: 0.2 }}
                              className="mt-auto"
                            >
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="outline"
                                      className="w-full border-[#2563EB] dark:border-[#38BDF8] hover:from-[#2563EB]/10 hover:to-[#4F46E5]/10 dark:hover:from-[#38BDF8]/10 dark:hover:to-[#818CF8]/10 text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#4F46E5] dark:from-[#38BDF8] dark:to-[#818CF8] text-sm cursor-pointer flex items-center justify-center group"
                                    >
                                      Read More
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-200"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                                        />
                                      </svg>
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Opens original page in new tab</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </motion.div>
                          </div>
                        </Card>
                      </a>
                    </MotionDiv>
                  ))}
                </AnimatePresence>
              </MotionDiv>
            ) : (
              <div className="text-center py-10">
                <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-2">
                  No posts found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {debouncedSearchQuery || activeCategory !== 'All'
                    ? 'Try different search terms or categories'
                    : 'No blog posts available yet'}
                </p>
                {(debouncedSearchQuery || activeCategory !== 'All') && (
                  <Button
                    onClick={() => {
                      setSearchQuery('');
                      setActiveCategory('All');
                    }}
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mt-12 flex justify-center"
              >
                <div className="flex flex-wrap items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-sm border border-gray-100 dark:border-gray-700">
                  {/* Previous Button */}
                  <MotionButton
                    whileHover={currentPage > 1 ? { scale: 1.05 } : {}}
                    whileTap={currentPage > 1 ? { scale: 0.95 } : {}}
                    onClick={() => {
                      if (currentPage > 1) {
                        setCurrentPage(prev => Math.max(1, prev - 1));
                      }
                    }}
                    disabled={currentPage === 1}
                    className={`flex items-center px-3 py-2 rounded-lg transition-all duration-200 ${
                      currentPage === 1
                        ? 'text-gray-400 cursor-not-allowed opacity-50'
                        : 'hover:bg-gradient-to-r hover:from-[#2563EB]/10 hover:to-[#4F46E5]/10 dark:hover:from-[#38BDF8]/10 dark:hover:to-[#818CF8]/10 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    <span className="hidden sm:inline">Previous</span>
                  </MotionButton>

                  {/* Page Numbers */}
                  <div className="flex gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
                      // Show current page, first, last, and adjacent pages
                      const isCurrentPage = page === currentPage;
                      const isFirstPage = page === 1;
                      const isLastPage = page === totalPages;
                      const isAdjacentToCurrentPage = Math.abs(page - currentPage) === 1;

                      if (isCurrentPage || isFirstPage || isLastPage || isAdjacentToCurrentPage) {
                        return (
                          <MotionButton
                            key={page}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setCurrentPage(page)}
                            className={`flex items-center justify-center h-9 w-9 rounded-lg font-medium transition-all duration-200 ${
                              isCurrentPage
                                ? 'bg-gradient-to-r from-[#2563EB] to-[#4F46E5] dark:from-[#38BDF8] dark:to-[#818CF8] text-white shadow-md'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-[#2563EB]/10 hover:to-[#4F46E5]/10 dark:hover:from-[#38BDF8]/10 dark:hover:to-[#818CF8]/10'
                            }`}
                          >
                            {page}
                          </MotionButton>
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
                            <MoreHorizontal className="h-5 w-5" />
                          </span>
                        );
                      }

                      return null;
                    })}
                  </div>

                  {/* Next Button */}
                  <MotionButton
                    whileHover={currentPage < totalPages ? { scale: 1.05 } : {}}
                    whileTap={currentPage < totalPages ? { scale: 0.95 } : {}}
                    onClick={() => {
                      if (currentPage < totalPages) {
                        setCurrentPage(prev => Math.min(totalPages, prev + 1));
                      }
                    }}
                    disabled={currentPage === totalPages}
                    className={`flex items-center px-3 py-2 rounded-lg transition-all duration-200 ${
                      currentPage === totalPages
                        ? 'text-gray-400 cursor-not-allowed opacity-50'
                        : 'hover:bg-gradient-to-r hover:from-[#2563EB]/10 hover:to-[#4F46E5]/10 dark:hover:from-[#38BDF8]/10 dark:hover:to-[#818CF8]/10 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <span className="hidden sm:inline">Next</span>
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </MotionButton>
                </div>
              </MotionDiv>
            )}
          </>
        )}
      </div>
    </section>
  );
}
