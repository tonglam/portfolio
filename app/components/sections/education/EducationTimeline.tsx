'use client';

import type { EducationItem } from '@/types/data/data.type';
import { motion } from 'framer-motion';
import { EducationCard } from './EducationCard';

interface TimelineAnimationProps {
  educationData: EducationItem[];
}

export function EducationTimeline({ educationData }: TimelineAnimationProps): JSX.Element {
  return (
    <>
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#2563EB] to-[#4F46E5] dark:from-[#38BDF8] dark:to-[#818CF8]"
      >
        Education Journey
      </motion.h2>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#3B82F6] to-[#6366F1] dark:from-[#F472B6] dark:to-[#EC4899] transform -translate-x-1/2 md:translate-x-0 z-0 mx-8 md:mx-0"></div>

        {/* Education items */}
        <div className="relative z-10">
          {educationData.map((edu, index) => (
            <EducationCard key={index} education={edu} index={index} />
          ))}
        </div>

        {/* Timeline end dot */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="absolute left-8 md:left-1/2 bottom-0 w-8 h-8 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#6366F1] dark:from-[#F472B6] dark:to-[#EC4899] transform -translate-x-1/2 z-20 flex items-center justify-center"
        >
          <span className="text-white text-xs">✓</span>
        </motion.div>
      </div>
    </>
  );
}
