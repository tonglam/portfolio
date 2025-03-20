'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import type { BlogCardProps } from '@/types/components/blog.type';
import { motion } from 'framer-motion';
import Image from 'next/image';

export function BlogCard({ blog }: BlogCardProps): JSX.Element {
  return (
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
              src={blog.r2ImageUrl || '/images/placeholder.jpg'}
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
          <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }} className="mt-auto">
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
  );
}
