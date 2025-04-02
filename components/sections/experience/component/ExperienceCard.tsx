'use client';

import { AchievementsList } from '@/components/sections/experience/component/AchievementsList';
import { CompanyHeader } from '@/components/sections/experience/component/CompanyHeader';
import { ResponsibilitiesList } from '@/components/sections/experience/component/ResponsibilitiesList';
import { TechnologyTags } from '@/components/sections/experience/component/TechnologyTags';
import { CompanyDetails, ExperienceItem } from '@/types/data.type';
import { motion } from 'framer-motion';

interface ExperienceCardProps {
  experience: ExperienceItem;
  company: CompanyDetails[string];
  index: number;
}

export function ExperienceCard({ experience, company, index }: ExperienceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
    >
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ type: 'spring', stiffness: 300, damping: 10 }}
        className="bg-white dark:bg-gradient-to-br dark:from-[#1E293B] dark:to-[#2D3748] rounded-xl overflow-hidden shadow-lg group"
      >
        <div className="p-6 md:p-8">
          <CompanyHeader title={experience.title} company={company} period={experience.period} />

          {/* Responsibilities */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Key Responsibilities:
            </h4>
            <ResponsibilitiesList responsibilities={company.responsibilities} />
          </div>

          {/* Technologies used */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Technologies:
            </h4>
            <TechnologyTags technologies={company.technologies} />
          </div>

          {/* Achievements - Show for all jobs */}
          {company.achievements && company.achievements.length > 0 && (
            <AchievementsList achievements={company.achievements} />
          )}
        </div>

        {/* Gradient bottom border that appears on hover */}
        <div className="h-1 w-full bg-gradient-to-r from-[#3B82F6] to-[#6366F1] dark:from-[#F472B6] dark:to-[#EC4899] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
      </motion.div>
    </motion.div>
  );
}
