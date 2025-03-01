"use client";

import { skillsData } from "@/data/skills";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

export default function Skills() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <section
      id="skills"
      className="py-16 md:py-20 bg-gray-50 dark:bg-transparent"
    >
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#2563EB] to-[#4F46E5] dark:from-[#38BDF8] dark:to-[#818CF8]"
        >
          Skills
        </motion.h2>

        <div className="relative overflow-hidden" ref={containerRef}>
          {/* First row of skills moving from right to left */}
          <SkillsRow
            skills={skillsData.slice(0, 8)}
            direction="left"
            speed={35}
          />

          {/* Second row of skills moving from left to right */}
          <SkillsRow
            skills={skillsData.slice(8)}
            direction="right"
            speed={30}
          />
        </div>

        {/* Skill categories */}
        <div className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          <SkillCategory
            title="Frontend"
            skills={[
              "HTML",
              "CSS",
              "Javascript",
              "Typescript",
              "React",
              "Redux",
            ]}
            delay={0.1}
          />
          <SkillCategory
            title="Backend"
            skills={["Node.js", "Express", "NestJS", "MongoDB", "MySQL"]}
            delay={0.3}
          />
          <SkillCategory
            title="DevOps"
            skills={["Nginx", "Docker", "AWS", "CI/CD", "Git"]}
            delay={0.5}
          />
        </div>
      </div>
    </section>
  );
}

function SkillsRow({ skills, direction, speed }) {
  // Double the skills array to create a seamless loop
  const duplicatedSkills = [...skills, ...skills];

  return (
    <div className="py-4 flex whitespace-nowrap overflow-hidden">
      <motion.div
        className="flex gap-4 md:gap-8"
        initial={{ x: direction === "left" ? 0 : -100 * skills.length }}
        animate={{ x: direction === "left" ? -100 * skills.length : 0 }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: speed,
          ease: "linear",
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

function SkillCategory({ title, skills, delay }) {
  return (
    <motion.div
      className="bg-white dark:bg-gradient-to-br dark:from-[#1E293B] dark:to-[#2D3748] rounded-lg p-5 md:p-6 shadow-md h-full"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <h3 className="text-lg md:text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#2563EB] to-[#4F46E5] dark:from-[#38BDF8] dark:to-[#818CF8]">
        {title}
      </h3>
      <ul className="space-y-2">
        {skills.map((skill, index) => (
          <motion.li
            key={index}
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: delay + index * 0.1 }}
          >
            <span className="w-2 h-2 bg-gradient-to-r from-[#3B82F6] to-[#6366F1] dark:from-[#F472B6] dark:to-[#EC4899] rounded-full"></span>
            <span className="text-gray-700 dark:text-gray-300">{skill}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}
