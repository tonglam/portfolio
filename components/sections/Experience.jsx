"use client";

import { CheckIcon } from "@/components/icons";
import {
  companyDetails,
  experienceData,
  gainedSkills,
  skillsData,
} from "@/data/experience";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Experience() {
  return (
    <section
      id="experience"
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
            <div className="sticky top-24">
              <div className="bg-white dark:bg-gradient-to-br dark:from-[#1E293B] dark:to-[#2D3748] rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-bold mb-6 text-gray-900 dark:text-white">
                  Career Timeline
                </h3>

                <div className="relative py-8">
                  {/* Career path line */}
                  <div className="absolute left-3 top-0 bottom-0 w-1 bg-gradient-to-b from-[#3B82F6] via-[#6366F1] to-[#8B5CF6] dark:from-[#F472B6] dark:via-[#EC4899] dark:to-[#D946EF] z-0 rounded-full"></div>

                  {experienceData.map((exp, index) => (
                    <div
                      key={index}
                      className="relative z-10 mb-20 last:mb-10 pl-12"
                    >
                      {/* Timeline dot with pulse effect */}
                      <div className="absolute left-3 top-0 transform -translate-x-1/2 z-20">
                        <div className="w-7 h-7 rounded-full bg-white dark:bg-[#1E293B] border-4 border-[#3B82F6] dark:border-[#F472B6] flex items-center justify-center">
                          {index === 0 && (
                            <span className="text-[#3B82F6] dark:text-[#F472B6] text-xs font-bold"></span>
                          )}
                        </div>
                        {/* Pulse effect */}
                        <div className="absolute top-0 left-0 w-7 h-7 rounded-full bg-[#3B82F6]/30 dark:bg-[#F472B6]/30 animate-ping"></div>
                      </div>

                      {/* Date badge */}
                      <div className="inline-block px-3 py-1 rounded-full bg-[#3B82F6]/10 dark:bg-[#F472B6]/10 text-[#3B82F6] dark:text-[#F472B6] text-sm font-medium mb-2">
                        {exp.period}
                      </div>
                      <div className="font-semibold text-lg text-gray-900 dark:text-white mb-1">
                        {exp.title}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 border-l-2 border-gray-200 dark:border-gray-700 pl-3">
                        {companyDetails[exp.company]?.displayName ||
                          exp.company}
                      </div>
                    </div>
                  ))}

                  {/* Career path end dot */}
                  <div className="absolute left-3 bottom-0 w-7 h-7 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#6366F1] dark:from-[#F472B6] dark:to-[#EC4899] transform -translate-x-1/2 z-20 flex items-center justify-center">
                    <span className="text-white text-xs">⭐</span>
                  </div>
                </div>

                {/* Career stats */}
                <div className="grid grid-cols-2 gap-4 mt-12">
                  <div className="bg-gray-50 dark:bg-[#0F172A] rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#3B82F6] to-[#6366F1] dark:from-[#F472B6] dark:to-[#EC4899]">
                      9+
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Years Experience
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-[#0F172A] rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#3B82F6] to-[#6366F1] dark:from-[#F472B6] dark:to-[#EC4899]">
                      3
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Companies
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills gained */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-6 bg-white dark:bg-gradient-to-br dark:from-[#1E293B] dark:to-[#2D3748] rounded-xl p-6 shadow-lg"
              >
                <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
                  Skills Gained
                </h3>
                <div className="flex flex-wrap gap-2">
                  {gainedSkills.map((skill, index) => (
                    <span
                      key={index}
                      className="text-xs px-3 py-1.5 rounded-full bg-[#3B82F6]/10 dark:bg-[#F472B6]/10 text-[#3B82F6] dark:text-[#F472B6]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Professional Growth */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="bg-white dark:bg-gradient-to-br dark:from-[#1E293B] dark:to-[#2D3748] rounded-xl p-6 shadow-lg mt-6"
              >
                <h3 className="text-lg font-bold mb-6 text-gray-900 dark:text-white">
                  Professional Growth
                </h3>

                <div className="space-y-4">
                  {skillsData.map((skill, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700 dark:text-gray-300">
                          {skill.name}
                        </span>
                        <span className="text-[#2563EB] dark:text-[#38BDF8]">
                          {skill.percentage}%
                        </span>
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
            </div>
          </motion.div>

          {/* Right side - Detailed Experience Cards */}
          <div className="md:col-span-8 space-y-8">
            {experienceData.map((exp, index) => {
              const company = companyDetails[exp.company] || {
                responsibilities: [],
                technologies: [],
                displayName: exp.company,
              };

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                >
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    className="bg-white dark:bg-gradient-to-br dark:from-[#1E293B] dark:to-[#2D3748] rounded-xl overflow-hidden shadow-lg group"
                  >
                    <div className="p-6 md:p-8">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                        <div className="flex items-center mb-4 sm:mb-0">
                          <div className="w-12 h-12 mr-4 relative flex-shrink-0 bg-white dark:bg-gray-800 rounded-full p-1 shadow-sm border border-gray-200 dark:border-gray-700">
                            <Image
                              src={
                                company.logo ||
                                "https://via.placeholder.com/100"
                              }
                              alt={`${company.displayName} Logo`}
                              width={48}
                              height={48}
                              className="rounded-full object-contain"
                            />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                              {exp.title}
                            </h3>
                            {company.url ? (
                              <Link
                                href={company.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#2563EB] dark:text-[#38BDF8] hover:underline font-medium"
                              >
                                {company.displayName}
                              </Link>
                            ) : (
                              <span className="text-gray-700 dark:text-gray-300 font-medium">
                                {company.displayName}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="inline-block px-4 py-2 rounded-full bg-[#2563EB]/10 dark:bg-[#38BDF8]/10 text-[#2563EB] dark:text-[#38BDF8] text-sm font-medium">
                          {exp.period}
                        </div>
                      </div>

                      {/* Responsibilities */}
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                          Key Responsibilities:
                        </h4>
                        <ul className="space-y-2">
                          {company.responsibilities.map(
                            (responsibility, idx) => (
                              <li key={idx} className="flex items-start">
                                <CheckIcon className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-600 dark:text-gray-400 text-sm">
                                  {responsibility}
                                </span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>

                      {/* Technologies used */}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                          Technologies:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {company.technologies.map((tech, idx) => (
                            <span
                              key={idx}
                              className="text-xs px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Achievements - Show for all jobs */}
                      {company.achievements &&
                        company.achievements.length > 0 && (
                          <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
                            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                              Key Achievements:
                            </h4>
                            {company.achievements.map((achievement, idx) => (
                              <div
                                key={idx}
                                className="bg-[#2563EB]/5 dark:bg-[#38BDF8]/5 rounded-lg p-3 border-l-4 border-[#2563EB] dark:border-[#38BDF8] mb-2 last:mb-0"
                              >
                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                  {achievement}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                    </div>

                    {/* Gradient bottom border that appears on hover */}
                    <div className="h-1 w-full bg-gradient-to-r from-[#3B82F6] to-[#6366F1] dark:from-[#F472B6] dark:to-[#EC4899] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
