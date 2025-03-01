"use client";

import { CheckIcon } from "@/components/icons";
import { experienceData } from "@/data/experience";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Experience() {
  // Company details with responsibilities
  const companyDetails = {
    "eSurfing Cloud": {
      logo: "https://media.licdn.com/dms/image/v2/D560BAQH82DslRiJ2kQ/company-logo_100_100/company-logo_100_100/0/1685497414232?e=1749081600&v=beta&t=re1qSuRl4fNR5hpaRMQOKA_1ybOKsKODTuyx-LcAObw",
      url: "https://www.esurfingcloud.com/",
      displayName: "China Telecom eSurfing Cloud",
      responsibilities: [
        "Led the development of cloud-native applications using microservices architecture",
        "Implemented CI/CD pipelines for automated testing and deployment",
        "Optimized application performance and scalability on cloud infrastructure",
      ],
      technologies: ["React", "Node.js", "Docker", "Kubernetes", "AWS"],
    },
    "NetEase, Inc": {
      logo: "https://media.licdn.com/dms/image/v2/C510BAQEq55a369mthA/company-logo_100_100/company-logo_100_100/0/1631411965736/netease_logo?e=1749081600&v=beta&t=ZZ-r9EK1avN3PS72kLAhMDhMAcNVJQCV26et-I6yG5Y",
      url: "https://www.neteasegames.com/",
      displayName: "NetEase, Inc",
      responsibilities: [
        "Developed and maintained high-traffic web applications",
        "Designed and implemented RESTful APIs for mobile applications",
        "Collaborated with cross-functional teams to deliver features on schedule",
      ],
      technologies: ["JavaScript", "TypeScript", "React", "Redux", "MongoDB"],
    },
    "China Telecom Corporation Limited": {
      logo: "https://media.licdn.com/dms/image/v2/C4D0BAQEChOu06vSNew/company-logo_100_100/company-logo_100_100/0/1631342960927?e=1749081600&v=beta&t=cDPENsKVKA-dH8u4NHjFuzjytCnkMdi73HfaV8v1FJI",
      url: "https://www.chinatelecom-h.com/en/global/home.php",
      displayName: "China Telecom Corporation Limited",
      responsibilities: [
        "Built and maintained internal web applications",
        "Implemented database solutions for data management",
        "Provided technical support and troubleshooting",
      ],
      technologies: ["Java", "Spring", "MySQL", "HTML/CSS", "JavaScript"],
    },
  };

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
                <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
                  Career Growth
                </h3>

                <div className="relative">
                  {/* Career path line */}
                  <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#3B82F6] to-[#6366F1] dark:from-[#F472B6] dark:to-[#EC4899] z-0"></div>

                  {experienceData.map((exp, index) => (
                    <div
                      key={index}
                      className="relative z-10 mb-8 last:mb-0 pl-10"
                    >
                      {/* Timeline dot */}
                      <div className="absolute left-3 top-0 w-6 h-6 rounded-full bg-white dark:bg-[#1E293B] border-4 border-[#3B82F6] dark:border-[#F472B6] transform -translate-x-1/2 z-20"></div>

                      <div className="text-sm text-[#2563EB] dark:text-[#38BDF8] mb-1">
                        {exp.period}
                      </div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {exp.title}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {companyDetails[exp.company]?.displayName ||
                          exp.company}
                      </div>
                    </div>
                  ))}

                  {/* Career path end dot */}
                  <div className="absolute left-3 bottom-0 w-6 h-6 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#6366F1] dark:from-[#F472B6] dark:to-[#EC4899] transform -translate-x-1/2 z-20 flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                </div>

                {/* Career stats */}
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="bg-gray-50 dark:bg-[#0F172A] rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#3B82F6] to-[#6366F1] dark:from-[#F472B6] dark:to-[#EC4899]">
                      9+
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Years Experience
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-[#0F172A] rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#3B82F6] to-[#6366F1] dark:from-[#F472B6] dark:to-[#EC4899]">
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
                  {Array.from(
                    new Set(
                      experienceData.flatMap(
                        (exp) => companyDetails[exp.company]?.technologies || []
                      )
                    )
                  ).map((tech, index) => (
                    <span
                      key={index}
                      className="text-xs px-3 py-1.5 rounded-full bg-[#3B82F6]/10 dark:bg-[#F472B6]/10 text-[#3B82F6] dark:text-[#F472B6]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Professional Growth - Moved from right side to here */}
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
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-700 dark:text-gray-300">
                        Frontend Development
                      </span>
                      <span className="text-[#2563EB] dark:text-[#38BDF8]">
                        90%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "90%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.1 }}
                        className="h-full bg-gradient-to-r from-[#3B82F6] to-[#6366F1] dark:from-[#F472B6] dark:to-[#EC4899] rounded-full"
                      ></motion.div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-700 dark:text-gray-300">
                        Backend Development
                      </span>
                      <span className="text-[#2563EB] dark:text-[#38BDF8]">
                        85%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "85%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="h-full bg-gradient-to-r from-[#3B82F6] to-[#6366F1] dark:from-[#F472B6] dark:to-[#EC4899] rounded-full"
                      ></motion.div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-700 dark:text-gray-300">
                        Cloud Infrastructure
                      </span>
                      <span className="text-[#2563EB] dark:text-[#38BDF8]">
                        80%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "80%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="h-full bg-gradient-to-r from-[#3B82F6] to-[#6366F1] dark:from-[#F472B6] dark:to-[#EC4899] rounded-full"
                      ></motion.div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-700 dark:text-gray-300">
                        DevOps
                      </span>
                      <span className="text-[#2563EB] dark:text-[#38BDF8]">
                        75%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "75%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="h-full bg-gradient-to-r from-[#3B82F6] to-[#6366F1] dark:from-[#F472B6] dark:to-[#EC4899] rounded-full"
                      ></motion.div>
                    </div>
                  </div>
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

                      {/* Achievements - Only show for first job */}
                      {index === 0 && (
                        <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
                          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                            Key Achievements:
                          </h4>
                          <div className="bg-[#2563EB]/5 dark:bg-[#38BDF8]/5 rounded-lg p-3 border-l-4 border-[#2563EB] dark:border-[#38BDF8]">
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                              Led the migration of legacy systems to cloud
                              infrastructure, resulting in a 40% reduction in
                              operational costs and 60% improvement in
                              application performance.
                            </p>
                          </div>
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
