'use client';

import { CompanyDetails, ExperienceItem } from '@/types/data.type';
import { ExperienceCard } from './ExperienceCard';

interface ExperienceCardsProps {
  experienceData: ExperienceItem[];
  companyDetails: CompanyDetails;
}

export function ExperienceCards({ experienceData, companyDetails }: ExperienceCardsProps) {
  return (
    <div className="space-y-8">
      {experienceData.map((exp, index) => {
        const company = companyDetails[exp.company] || {
          responsibilities: [],
          technologies: [],
          displayName: exp.company,
        };

        return <ExperienceCard key={index} experience={exp} company={company} index={index} />;
      })}
    </div>
  );
}
