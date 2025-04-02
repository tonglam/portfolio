'use client';

import { companyDetails, experienceData, gainedSkills, skillsData } from '@/data/experience.data';
import { motion } from 'framer-motion';
import { CareerTimeline } from './component/CareerTimeline';
import { ExperienceCards } from './component/ExperienceCards';

export function ExperienceSection() {
  return (
    <section id="experience" className=" bg-gray-50 dark:bg-transparent">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#2563EB] to-[#4F46E5] dark:from-[#38BDF8] dark:to-[#818CF8]"
        >
          Professional Journey
        </motion.h2>

        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-start">
          {/* Left side - Career Path Visualization */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-4 relative"
          >
            <CareerTimeline
              experienceData={experienceData}
              gainedSkills={gainedSkills}
              skillsData={skillsData}
              companyDetails={companyDetails}
            />
          </motion.div>

          {/* Right side - Detailed Experience Cards */}
          <div className="md:col-span-8">
            <ExperienceCards experienceData={experienceData} companyDetails={companyDetails} />
          </div>
        </div>
      </div>
    </section>
  );
}
