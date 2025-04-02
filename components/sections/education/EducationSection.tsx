'use client';

import { educationData } from '@/data/education.data';
import { EducationHeader } from './component/EducationHeader';
import { EducationStats } from './component/EducationStats';
import { EducationTimeline } from './component/EducationTimeline';

export function EducationSection() {
  return (
    <div className="py-16 md:py-20 bg-white dark:bg-gradient-to-b dark:from-[#0F172A] dark:to-[#1E293B]">
      <EducationHeader />
      <EducationTimeline educationData={educationData} />
      <EducationStats />
    </div>
  );
}
