'use client';

import type { Skill } from '@/types/data/data.type';
import { motion } from 'framer-motion';

interface SkillsCarouselProps {
  skills: Skill[];
}

export function SkillsCarousel({ skills }: SkillsCarouselProps): JSX.Element {
  return (
    <>
      {/* First row of skills moving from right to left */}
      <SkillsRow skills={skills.slice(0, 8)} direction="left" speed={35} />

      {/* Second row of skills moving from left to right */}
      <SkillsRow skills={skills.slice(8, 16)} direction="right" speed={30} />
    </>
  );
}

function SkillsRow({
  skills,
  direction = 'left',
  speed = 25,
}: {
  skills: Skill[];
  direction?: 'left' | 'right';
  speed?: number;
}): JSX.Element {
  // Double the skills array to create a seamless loop
  const duplicatedSkills = [...skills, ...skills];

  return (
    <div className="py-4 flex whitespace-nowrap overflow-hidden">
      <motion.div
        className="flex gap-4 md:gap-8"
        initial={{ x: direction === 'left' ? 0 : -100 * skills.length }}
        animate={{ x: direction === 'left' ? -100 * skills.length : 0 }}
        transition={{
          repeat: Infinity,
          repeatType: 'loop',
          duration: speed,
          ease: 'linear',
        }}
      >
        {duplicatedSkills.map((skill, index) => {
          const IconComponent = skill.icon;
          return (
            <div
              key={`${skill.name}-${index}`}
              className="bg-white dark:bg-gradient-to-br dark:from-[#1E293B] dark:to-[#2D3748] rounded-lg p-3 sm:p-4 md:p-6 flex flex-col items-center justify-center hover:bg-gray-50 dark:hover:from-[#2D3748] dark:hover:to-[#1E293B] transition flex-shrink-0 w-24 sm:w-28 md:w-32 shadow-md"
            >
              <IconComponent size={28} className={skill.color} />
              <span className="text-center whitespace-nowrap mt-2 text-xs sm:text-sm">
                {skill.name}
              </span>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
