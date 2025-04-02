'use client';

import { Button } from '@/components/ui/button';
import { ProjectCategory } from '@/types/data.type';
import { motion } from 'framer-motion';

interface CategoryButtonProps {
  category: 'All' | ProjectCategory;
  isActive: boolean;
  onClick: () => void;
  index: number;
}

export function CategoryButton({ category, isActive, onClick, index }: CategoryButtonProps) {
  return (
    <motion.div
      key={category}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 * index, duration: 0.3 }}
    >
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          variant={isActive ? 'default' : 'outline'}
          className={`rounded-full text-xs sm:text-sm ${
            isActive
              ? 'bg-gradient-to-r from-[#3B82F6] to-[#6366F1] dark:from-[#F472B6] dark:to-[#EC4899] text-white'
              : 'border-[#3B82F6] dark:border-[#F472B6] text-gray-700 dark:text-gray-300'
          }`}
          onClick={onClick}
        >
          {category}
        </Button>
      </motion.div>
    </motion.div>
  );
}
