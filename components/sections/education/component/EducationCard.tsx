'use client';

import { EducationItem } from '@/types/data.type';
import { motion } from 'framer-motion';
import { EducationDetails } from './EducationDetails';
import { InstitutionInfo } from './InstitutionInfo';
import { TimelineDot } from './TimelineDot';

interface EducationCardProps {
  education: EducationItem;
  index: number;
}

export function EducationCard({ education: edu, index }: EducationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="mb-12 md:mb-16 relative"
    >
      <div
        className={`flex flex-col md:flex-row items-start ${
          index % 2 === 0 ? 'md:flex-row-reverse' : ''
        }`}
      >
        {/* Timeline dot */}
        <TimelineDot />

        {/* Content */}
        <div
          className={`ml-16 md:ml-0 md:w-1/2 ${
            index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'
          }`}
        >
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white dark:bg-gradient-to-br dark:from-[#1E293B] dark:to-[#2D3748] rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800"
          >
            <div className="inline-block px-3 py-1 rounded-full bg-[#2563EB]/10 dark:bg-[#38BDF8]/10 text-[#2563EB] dark:text-[#38BDF8] text-xs font-medium mb-3">
              {edu.period}
            </div>

            <h3 className="text-lg md:text-xl font-bold mb-3 text-gray-900 dark:text-white">
              {edu.degree}
            </h3>

            <InstitutionInfo institution={edu.institution} />

            {/* Education details */}
            <EducationDetails details={edu.details} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
