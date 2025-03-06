'use client';

import { educationData } from '@/data/education';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function Education(): JSX.Element {
  return (
    <section
      id="education"
      className="py-16 md:py-20 bg-white dark:bg-gradient-to-b dark:from-[#0F172A] dark:to-[#1E293B]"
    >
      <div className="container mx-auto px-4">
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
              <motion.div
                key={index}
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
                  <div className="absolute left-8 md:left-1/2 w-6 h-6 rounded-full bg-white dark:bg-[#1E293B] border-4 border-[#3B82F6] dark:border-[#F472B6] transform -translate-x-1/2 z-20"></div>

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

                      <div className="flex items-center mb-4">
                        {edu.institution === 'The University of Western Australia' ? (
                          <>
                            <div className="w-10 h-10 mr-3 relative flex-shrink-0 bg-white dark:bg-gray-800 rounded-full p-1 shadow-sm">
                              <Image
                                src="https://media.licdn.com/dms/image/v2/C560BAQGONb5202Ubeg/company-logo_100_100/company-logo_100_100/0/1630613105542/university_of_western_australia_logo?e=1749081600&v=beta&t=L8PV7DjySb_vptPju4VcHBIIr2FCK8xSyDo45PTAkOE"
                                alt="UWA Logo"
                                width={40}
                                height={40}
                                className="rounded-full object-contain"
                              />
                            </div>
                            <Link
                              href="https://www.uwa.edu.au/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-700 dark:text-gray-300 hover:text-[#2563EB] dark:hover:text-[#38BDF8] transition-colors duration-300 font-medium"
                            >
                              {edu.institution}
                            </Link>
                          </>
                        ) : edu.institution === 'Hunan University' ? (
                          <>
                            <div className="w-10 h-10 mr-3 relative flex-shrink-0 bg-white dark:bg-gray-800 rounded-full p-1 shadow-sm">
                              <Image
                                src="https://media.licdn.com/dms/image/v2/C510BAQHo9p4G79briw/company-logo_100_100/company-logo_100_100/0/1630564627893/hunan_university_logo?e=1749081600&v=beta&t=phNRpnSfV7LGVoEoNlHy5xRXVq9nQQWVM2ZXaJJKe3s"
                                alt="Hunan University Logo"
                                width={40}
                                height={40}
                                className="rounded-full object-contain"
                              />
                            </div>
                            <Link
                              href="https://www-en.hnu.edu.cn/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-700 dark:text-gray-300 hover:text-[#2563EB] dark:hover:text-[#38BDF8] transition-colors duration-300 font-medium"
                            >
                              {edu.institution}
                            </Link>
                          </>
                        ) : (
                          <span className="text-gray-700 dark:text-gray-300 font-medium">
                            {edu.institution}
                          </span>
                        )}
                      </div>

                      {/* Education details */}
                      <div className="mt-3">
                        <div className="space-y-2">
                          {edu.details &&
                            edu.details.map((detail, detailIndex) => (
                              <div key={detailIndex} className="flex items-center">
                                <span className="w-2 h-2 bg-[#3B82F6] dark:bg-[#F472B6] rounded-full mr-2"></span>
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                  {detail}
                                </span>
                              </div>
                            ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
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

        {/* Education stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto"
        >
          <div className="bg-white dark:bg-gradient-to-br dark:from-[#1E293B] dark:to-[#2D3748] rounded-lg p-4 text-center shadow-md">
            <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#3B82F6] to-[#6366F1] dark:from-[#F472B6] dark:to-[#EC4899]">
              6+
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Years of Learning</div>
          </div>
          <div className="bg-white dark:bg-gradient-to-br dark:from-[#1E293B] dark:to-[#2D3748] rounded-lg p-4 text-center shadow-md">
            <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#3B82F6] to-[#6366F1] dark:from-[#F472B6] dark:to-[#EC4899]">
              2
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Degrees</div>
          </div>
          <div className="bg-white dark:bg-gradient-to-br dark:from-[#1E293B] dark:to-[#2D3748] rounded-lg p-4 text-center shadow-md">
            <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#3B82F6] to-[#6366F1] dark:from-[#F472B6] dark:to-[#EC4899]">
              10+
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Projects</div>
          </div>
          <div className="bg-white dark:bg-gradient-to-br dark:from-[#1E293B] dark:to-[#2D3748] rounded-lg p-4 text-center shadow-md">
            <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#3B82F6] to-[#6366F1] dark:from-[#F472B6] dark:to-[#EC4899]">
              ∞
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Learning Mindset</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
