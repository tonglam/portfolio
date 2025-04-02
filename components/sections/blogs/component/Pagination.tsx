'use client';

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

const MotionDiv = motion.div;
const MotionButton = motion.button;

interface CustomPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function CustomPagination({ currentPage, totalPages, onPageChange }: CustomPaginationProps) {
  if (totalPages <= 1) {
    return null; // Don't render if only one page or less
  }

  return (
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
              onPageChange(Math.max(1, currentPage - 1));
            }
          }}
          disabled={currentPage === 1}
          className={`flex items-center px-3 py-2 rounded-lg transition-all duration-200 ${
            currentPage === 1
              ? 'text-gray-400 cursor-not-allowed opacity-50'
              : 'hover:bg-gradient-to-r hover:from-[#2563EB]/10 hover:to-[#4F46E5]/10 dark:hover:from-[#38BDF8]/10 dark:hover:to-[#818CF8]/10 text-gray-700 dark:text-gray-300'
          }`}
          aria-label="Go to previous page"
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
                  onClick={() => onPageChange(page)}
                  className={`flex items-center justify-center h-9 w-9 rounded-lg font-medium transition-all duration-200 ${
                    isCurrentPage
                      ? 'bg-gradient-to-r from-[#2563EB] to-[#4F46E5] dark:from-[#38BDF8] dark:to-[#818CF8] text-white shadow-md'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-[#2563EB]/10 hover:to-[#4F46E5]/10 dark:hover:from-[#38BDF8]/10 dark:hover:to-[#818CF8]/10'
                  }`}
                  aria-label={`Go to page ${page}${isCurrentPage ? ', current page' : ''}`}
                  aria-current={isCurrentPage ? 'page' : undefined}
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
                  aria-hidden="true"
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
              onPageChange(Math.min(totalPages, currentPage + 1));
            }
          }}
          disabled={currentPage === totalPages}
          className={`flex items-center px-3 py-2 rounded-lg transition-all duration-200 ${
            currentPage === totalPages
              ? 'text-gray-400 cursor-not-allowed opacity-50'
              : 'hover:bg-gradient-to-r hover:from-[#2563EB]/10 hover:to-[#4F46E5]/10 dark:hover:from-[#38BDF8]/10 dark:hover:to-[#818CF8]/10 text-gray-700 dark:text-gray-300'
          }`}
          aria-label="Go to next page"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="h-4 w-4 ml-1" />
        </MotionButton>
      </div>
    </MotionDiv>
  );
}
