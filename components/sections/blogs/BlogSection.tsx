'use client';

import { ProcessedBlogPost } from '@/types/blog.type';
import { motion } from 'framer-motion';
import { BlogActions } from './component/BlogActions';

interface BlogSectionProps {
  initialPosts: ProcessedBlogPost[];
  initialTotalPages: number;
  initialCategories: string[];
  initialCategory?: string;
  initialSearchQuery?: string;
  initialError?: string;
}

export function BlogSection({
  initialPosts = [],
  initialTotalPages = 0,
  initialCategories = ['All'],
  initialCategory = 'All',
  initialSearchQuery = '',
  initialError,
}: BlogSectionProps) {
  return (
    <section className="min-h-screen" id="blog">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-3xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#2563EB] to-[#4F46E5] dark:from-[#38BDF8] dark:to-[#818CF8]"
          >
            Blog
          </motion.h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Explore my thoughts, tutorials, and insights on software development, technology, and
            more.
          </p>
        </div>

        <BlogActions
          initialPosts={initialPosts}
          initialTotalPages={initialTotalPages}
          initialCategories={initialCategories}
          initialCategory={initialCategory}
          initialSearchQuery={initialSearchQuery}
          initialError={initialError}
        />
      </div>
    </section>
  );
}
