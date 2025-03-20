'use client';

import { Button } from '@/components/ui/button';
import type { Project } from '@/types/data/data.type';
import { ProjectCategory } from '@/types/data/data.type';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface CategoryFilterProps {
  projectsData: Project[];
}

export function CategoryFilter({ projectsData: _projectsData }: CategoryFilterProps): JSX.Element {
  const [activeCategory, setActiveCategory] = useState<'All' | ProjectCategory>('All');

  // Get all categories from the ProjectCategory enum plus 'All'
  const categories = ['All', ...Object.values(ProjectCategory)];

  return (
    <motion.div
      className="flex flex-wrap justify-center md:justify-start gap-2 mb-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      {categories.map((category, index) => (
        <motion.div
          key={category}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 * index, duration: 0.3 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant={activeCategory === category ? 'default' : 'outline'}
              className={`rounded-full text-xs sm:text-sm ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-[#3B82F6] to-[#6366F1] dark:from-[#F472B6] dark:to-[#EC4899] text-white'
                  : 'border-[#3B82F6] dark:border-[#F472B6] text-gray-700 dark:text-gray-300'
              }`}
              onClick={() => {
                setActiveCategory(category as 'All' | ProjectCategory);
              }}
            >
              {category}
            </Button>
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
}
