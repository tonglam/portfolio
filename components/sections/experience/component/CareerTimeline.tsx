import { CareerStats } from '@/components/sections/experience/component/CareerStats';
import { SkillTags } from '@/components/sections/experience/component/SkillTags';
import { TimelineList } from '@/components/sections/experience/component/TimelineList';
import { CompanyDetails, ExperienceItem } from '@/types/data.type';

interface CareerTimelineProps {
  experienceData: ExperienceItem[];
  gainedSkills: string[];
  companyDetails: CompanyDetails;
}

export function CareerTimeline({
  experienceData,
  gainedSkills,
  companyDetails,
}: CareerTimelineProps) {
  return (
    <div className="sticky top-24">
      <div className="bg-white dark:bg-gradient-to-br dark:from-[#1E293B] dark:to-[#2D3748] rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-bold mb-6 text-gray-900 dark:text-white">Career Timeline</h3>

        <TimelineList experienceData={experienceData} companyDetails={companyDetails} />

        <CareerStats yearsOfExperience={8} numberOfCompanies={3} />
      </div>

      <SkillTags skills={gainedSkills} />
    </div>
  );
}
