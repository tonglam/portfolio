'use client';

import { projectsData } from '@/data/projects.data';
import { ProjectCategory } from '@/types/data.type';
import { useState } from 'react';
import { CategoryFilter } from './component/CategoryFilter';
import { ProjectGrid } from './component/ProjectGrid';

export function ProjectSection() {
  const [activeCategory, setActiveCategory] = useState<'All' | ProjectCategory>('All');

  // Filter projects based on active category
  const filteredProjects =
    activeCategory === 'All'
      ? [...projectsData].sort((a, b) => (a.order || 999) - (b.order || 999))
      : [...projectsData]
          .filter(project => project.categories[0] === activeCategory)
          .sort((a, b) => (a.order || 999) - (b.order || 999));

  const handleCategoryChange = (category: 'All' | ProjectCategory) => {
    setActiveCategory(category);
  };

  return (
    <>
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#2563EB] to-[#4F46E5] dark:from-[#38BDF8] dark:to-[#818CF8]">
        PROJECTS
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto text-sm md:text-base text-center">
        Explore my portfolio of projects showcasing my skills in web development, from responsive
        front-end designs to complex back-end systems.
      </p>

      <CategoryFilter
        projectsData={projectsData}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ProjectGrid projects={filteredProjects} />
    </>
  );
}
