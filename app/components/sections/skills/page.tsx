import { flattenedSkillsData, skillsData } from '@/data/skills.data';
import { SkillCategories } from './SkillCategories';
import { SkillsCarousel } from './SkillsCarousel';

export default function Skills(): JSX.Element {
  return (
    <section id="skills" className="py-16 md:py-20 bg-gray-50 dark:bg-transparent">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#2563EB] to-[#4F46E5] dark:from-[#38BDF8] dark:to-[#818CF8]">
          Skills
        </h2>

        <div className="relative overflow-hidden">
          <SkillsCarousel skills={flattenedSkillsData} />
        </div>

        {/* Skills categories */}
        <div className="mt-12 md:mt-16">
          <SkillCategories categories={skillsData.categories} />
        </div>
      </div>
    </section>
  );
}
