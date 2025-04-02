'use client';

import { motion } from 'framer-motion';

interface SkillTagsProps {
  skills: string[];
}

export function SkillTags({ skills }: SkillTagsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="mt-6 bg-white dark:bg-gradient-to-br dark:from-[#1E293B] dark:to-[#2D3748] rounded-xl p-6 shadow-lg"
    >
      <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Skills Gained</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="text-xs px-3 py-1.5 rounded-full bg-[#3B82F6]/10 dark:bg-[#F472B6]/10 text-[#3B82F6] dark:text-[#F472B6]"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
