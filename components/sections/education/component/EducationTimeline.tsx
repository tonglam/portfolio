import { EducationItem } from '@/types/data.type';
import { EducationCard } from './EducationCard';
import { TimelineDot } from './TimelineDot';

interface EducationTimelineProps {
  educationData: EducationItem[];
}

export function EducationTimeline({ educationData }: EducationTimelineProps) {
  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#3B82F6] to-[#6366F1] dark:from-[#F472B6] dark:to-[#EC4899] transform -translate-x-1/2 md:translate-x-0 z-0 mx-8 md:mx-0"></div>

      {/* Education items */}
      <div className="relative z-10">
        {educationData.map((edu, index) => (
          <EducationCard key={index} education={edu} index={index} />
        ))}
      </div>

      {/* Timeline end dot */}
      <TimelineDot position="end" />
    </div>
  );
}
