import { projectsData } from '@/data/projects.data';
import { CategoryFilter } from './CategoryFilter';
import { ProjectGrid } from './ProjectGrid';

export default function Projects(): JSX.Element {
  return (
    <section
      id="projects"
      className="py-16 md:py-20 bg-white dark:bg-gradient-to-b dark:from-[#1E293B] dark:to-[#0F172A]"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#2563EB] to-[#4F46E5] dark:from-[#38BDF8] dark:to-[#818CF8]">
          PROJECTS
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto text-sm md:text-base text-center">
          Explore my portfolio of projects showcasing my skills in web development, from responsive
          front-end designs to complex back-end systems.
        </p>

        <CategoryFilter projectsData={projectsData} />
        <ProjectGrid projectsData={projectsData} />
      </div>
    </section>
  );
}
