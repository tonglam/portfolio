import { CompanyDetails, ExperienceItem } from '@/types/data.type';

interface TimelineListProps {
  experienceData: ExperienceItem[];
  companyDetails: CompanyDetails;
}

export function TimelineList({ experienceData, companyDetails }: TimelineListProps) {
  return (
    <div className="relative py-8">
      {/* Career path line */}
      <div className="absolute left-3 top-0 bottom-0 w-1 bg-gradient-to-b from-[#3B82F6] via-[#6366F1] to-[#8B5CF6] dark:from-[#F472B6] dark:via-[#EC4899] dark:to-[#D946EF] z-0 rounded-full"></div>

      {experienceData.map((exp, index) => (
        <div key={index} className="relative z-10 mb-20 last:mb-10 pl-12">
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
            {companyDetails[exp.company]?.displayName || exp.company}
          </div>
        </div>
      ))}

      {/* Career path end dot */}
      <div className="absolute left-3 bottom-0 w-7 h-7 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#6366F1] dark:from-[#F472B6] dark:to-[#EC4899] transform -translate-x-1/2 z-20 flex items-center justify-center">
        <span className="text-white text-xs">⭐</span>
      </div>
    </div>
  );
}
