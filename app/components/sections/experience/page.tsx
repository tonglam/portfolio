import { companyDetails, experienceData, gainedSkills, skillsData } from '@/data/experience.data';
import { CareerTimeline } from './CareerTimeline';
import { ExperienceCards } from './ExperienceCards';

export default function Experience(): JSX.Element {
  return (
    <section id="experience" className="py-16 md:py-20 bg-gray-50 dark:bg-transparent">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-start">
          {/* Left side - Career Path Visualization */}
          <div className="md:col-span-4">
            <CareerTimeline
              experienceData={experienceData}
              gainedSkills={gainedSkills}
              skillsData={skillsData}
            />
          </div>

          {/* Right side - Detailed Experience Cards */}
          <div className="md:col-span-8">
            <ExperienceCards experienceData={experienceData} companyDetails={companyDetails} />
          </div>
        </div>
      </div>
    </section>
  );
}
