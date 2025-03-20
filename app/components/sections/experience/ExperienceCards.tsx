'use client';

import { useIcons } from '@/components/providers/IconProvider';
import type { CompanyDetails, ExperienceItem } from '@/types/data/data.type';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface ExperienceCardsProps {
  experienceData: ExperienceItem[];
  companyDetails: CompanyDetails;
}

export function ExperienceCards({
  experienceData,
  companyDetails,
}: ExperienceCardsProps): JSX.Element | null {
  const { getIcon } = useIcons();
  const CheckIcon = getIcon('CheckIcon');

  if (!CheckIcon) return null;

  return (
    <div className="space-y-8">
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
              transition={{ type: 'spring', stiffness: 300, damping: 10 }}
              className="bg-white dark:bg-gradient-to-br dark:from-[#1E293B] dark:to-[#2D3748] rounded-xl overflow-hidden shadow-lg group"
            >
              <div className="p-6 md:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                  <div className="flex items-center mb-4 sm:mb-0">
                    <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-gray-200 dark:border-gray-800">
                      <Image
                        src={
                          company.logo ||
                          'https://res.cloudinary.com/demo/image/upload/w_100,h_100,c_fill,q_auto,f_auto/placeholder'
                        }
                        alt={company.displayName}
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
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
                    {company.responsibilities.map((responsibility, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckIcon className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-400 text-sm">
                          {responsibility}
                        </span>
                      </li>
                    ))}
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
              </div>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
