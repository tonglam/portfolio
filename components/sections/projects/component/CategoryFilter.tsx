'use client';

import { Project, ProjectCategory } from '@/types/data.type';
import { motion } from 'framer-motion';
import { CategoryButton } from './CategoryButton';

interface CategoryFilterProps {
  projectsData: Project[];
  activeCategory: 'All' | ProjectCategory;
  onCategoryChange: (category: 'All' | ProjectCategory) => void;
}

export function CategoryFilter({
  projectsData: _projectsData,
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) {
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
        <CategoryButton
          key={category}
          category={category as 'All' | ProjectCategory}
          isActive={activeCategory === category}
          onClick={() => onCategoryChange(category as 'All' | ProjectCategory)}
          index={index}
        />
      ))}
    </motion.div>
  );
}
