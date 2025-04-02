'use client';

import { motion } from 'framer-motion';

export function EducationStats() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto"
    >
      <div className="bg-white dark:bg-gradient-to-br dark:from-[#1E293B] dark:to-[#2D3748] rounded-lg p-4 text-center shadow-md">
        <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#3B82F6] to-[#6366F1] dark:from-[#F472B6] dark:to-[#EC4899]">
          6+
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">Years of Learning</div>
      </div>
      <div className="bg-white dark:bg-gradient-to-br dark:from-[#1E293B] dark:to-[#2D3748] rounded-lg p-4 text-center shadow-md">
        <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#3B82F6] to-[#6366F1] dark:from-[#F472B6] dark:to-[#EC4899]">
          2
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">Degrees</div>
      </div>
      <div className="bg-white dark:bg-gradient-to-br dark:from-[#1E293B] dark:to-[#2D3748] rounded-lg p-4 text-center shadow-md">
        <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#3B82F6] to-[#6366F1] dark:from-[#F472B6] dark:to-[#EC4899]">
          10+
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">Projects</div>
      </div>
      <div className="bg-white dark:bg-gradient-to-br dark:from-[#1E293B] dark:to-[#2D3748] rounded-lg p-4 text-center shadow-md">
        <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#3B82F6] to-[#6366F1] dark:from-[#F472B6] dark:to-[#EC4899]">
          ∞
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">Learning Mindset</div>
      </div>
    </motion.div>
  );
}
