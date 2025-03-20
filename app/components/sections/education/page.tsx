import { educationData } from '@/data/education.data';
import { EducationTimeline } from './EducationTimeline';

export default function Education(): JSX.Element {
  return (
    <section
      id="education"
      className="py-16 md:py-20 bg-white dark:bg-gradient-to-b dark:from-[#0F172A] dark:to-[#1E293B]"
    >
      <div className="container mx-auto px-4">
        <EducationTimeline educationData={educationData} />
      </div>
    </section>
  );
}
