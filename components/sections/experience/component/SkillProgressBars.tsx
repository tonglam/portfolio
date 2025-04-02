'use client';

import { ProfessionalSkill } from '@/types/data.type';
import { motion } from 'framer-motion';

interface SkillProgressBarsProps {
  skills: ProfessionalSkill[];
}

export function SkillProgressBars({ skills }: SkillProgressBarsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="bg-white dark:bg-gradient-to-br dark:from-[#1E293B] dark:to-[#2D3748] rounded-xl p-6 shadow-lg mt-6"
    >
      <h3 className="text-lg font-bold mb-6 text-gray-900 dark:text-white">Professional Growth</h3>

      <div className="space-y-4">
        {skills.map((skill, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-700 dark:text-gray-300">{skill.name}</span>
              <span className="text-[#2563EB] dark:text-[#38BDF8]">{skill.percentage}%</span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.percentage}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.1 + index * 0.1 }}
                className="h-full bg-gradient-to-r from-[#3B82F6] to-[#6366F1] dark:from-[#F472B6] dark:to-[#EC4899] rounded-full"
              ></motion.div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
