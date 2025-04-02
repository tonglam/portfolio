'use client';

import { Button } from '@/components/ui/button';
import { Project } from '@/types/data.type';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { ProjectCard } from './ProjectCard';

interface ProjectGridProps {
  projects: Project[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export function ProjectGrid({ projects }: ProjectGridProps) {
  const [visibleProjects, setVisibleProjects] = useState(6);

  const handleLoadMore = (): void => {
    setVisibleProjects(prev => Math.min(prev + 3, projects.length));
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div className="space-y-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.slice(0, visibleProjects).map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>

        {projects.length > visibleProjects && (
          <motion.div
            className="flex justify-center mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              variant="outline"
              size="lg"
              onClick={handleLoadMore}
              className="border-[#3B82F6] dark:border-[#F472B6] text-[#3B82F6] dark:text-[#F472B6] hover:bg-[#3B82F6]/10 dark:hover:bg-[#F472B6]/10"
            >
              Load More Projects
            </Button>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
