'use client';

import { CheckIcon } from '@/components/icons';
import type { CompanyDetail } from '@/types/data/data.type';
import Image from 'next/image';
import Link from 'next/link';

interface ExperienceCardProps {
  title: string;
  period: string;
  companyDetails: CompanyDetail;
}

export default function ExperienceCard({
  title,
  period,
  companyDetails,
}: ExperienceCardProps): JSX.Element {
  return (
    <div className="bg-[#1E293B] rounded-xl overflow-hidden shadow-lg">
      <div className="p-6 md:p-8">
        {/* Header - Logo, Title and Period */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
          <div className="flex items-center mb-4 sm:mb-0">
            <div className="w-12 h-12 mr-4 relative flex-shrink-0 bg-white dark:bg-gray-800 rounded-full p-1 shadow-sm border border-gray-200 dark:border-gray-700">
              <Image
                src={
                  companyDetails.logo ||
                  'https://res.cloudinary.com/demo/image/upload/w_100,h_100,c_fill,q_auto,f_auto/placeholder'
                }
                alt={`${companyDetails.displayName} Logo`}
                width={48}
                height={48}
                className="rounded-full object-contain"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">{title}</h3>
              {companyDetails.url ? (
                <Link
                  href={companyDetails.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#38BDF8] hover:underline font-medium"
                >
                  {companyDetails.displayName}
                </Link>
              ) : (
                <span className="text-[#38BDF8] font-medium">{companyDetails.displayName}</span>
              )}
            </div>
          </div>
          <div className="inline-block px-5 py-2 rounded-full bg-[#38BDF8]/10 text-[#38BDF8] text-sm font-medium">
            {period}
          </div>
        </div>

        {/* Key Responsibilities */}
        <div className="mb-8">
          <h4 className="text-sm font-semibold text-gray-300 mb-4">Key Responsibilities:</h4>
          <ul className="space-y-3">
            {companyDetails.responsibilities.map((responsibility, idx) => (
              <li key={idx} className="flex items-start">
                <CheckIcon className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm">{responsibility}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technologies */}
        <div className="mb-8">
          <h4 className="text-sm font-semibold text-gray-300 mb-4">Technologies:</h4>
          <div className="flex flex-wrap gap-2">
            {companyDetails.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="text-xs px-3 py-1.5 rounded-full bg-gray-800 text-gray-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Key Achievements */}
        {companyDetails.achievements && companyDetails.achievements.length > 0 && (
          <div className="mt-8">
            <h4 className="text-sm font-semibold text-gray-300 mb-4">Key Achievements:</h4>
            {companyDetails.achievements.map((achievement: string, idx: number) => (
              <div
                key={idx}
                className="bg-[#111827] rounded-lg p-4 border-l-4 border-[#60A5FA] mb-3 last:mb-0"
              >
                <p className="text-gray-200 text-sm">{achievement}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
