'use client';

import { useIcons } from '@/components/providers/IconProvider';
import { Button } from '@/components/ui/button';
import type { Project, ProjectCategory } from '@/types/data/data.type';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

interface ProjectGridProps {
  projectsData: Project[];
}

export function ProjectGrid({ projectsData }: ProjectGridProps): JSX.Element | null {
  const { getIcon } = useIcons();
  const ExternalLinkIcon = getIcon('ExternalLinkIcon');
  const GithubIcon = getIcon('GithubIcon');

  if (!ExternalLinkIcon || !GithubIcon) return null;

  const [activeCategory, setActiveCategory] = useState<'All' | ProjectCategory>('All');
  const [visibleProjects, setVisibleProjects] = useState(6);
  const [isLoading, setIsLoading] = useState(false);

  // Filter projects based on active category and sort by order
  const filteredProjects =
    activeCategory === 'All'
      ? [...projectsData].sort((a, b) => (a.order || 999) - (b.order || 999))
      : [...projectsData]
          .filter(project => project.categories[0] === activeCategory)
          .sort((a, b) => (a.order || 999) - (b.order || 999));

  const handleLoadMore = (): void => {
    setIsLoading(true);
    // Simulate loading delay
    setTimeout(() => {
      setVisibleProjects(prev => Math.min(prev + 3, filteredProjects.length));
      setIsLoading(false);
    }, 600);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
      },
    },
    hover: {
      y: -10,
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 10,
      },
    },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div key={activeCategory} className="space-y-8">
        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap gap-2 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {['All', ...new Set(projectsData.map(project => project.categories[0]))].map(category => (
            <Button
              key={category}
              variant="outline"
              onClick={() => setActiveCategory(category as 'All' | ProjectCategory)}
              className={`rounded-full text-sm py-2 px-6 cursor-pointer border ${
                activeCategory === category
                  ? 'bg-[#3B82F6] hover:bg-[#2563EB] text-white border-[#3B82F6] dark:bg-[#F472B6] dark:hover:bg-[#E55A98] dark:border-[#F472B6]'
                  : 'bg-transparent border-[#3B82F6] text-[#3B82F6] hover:bg-[#3B82F6]/10 dark:border-[#F472B6] dark:text-[#F472B6] dark:hover:bg-[#F472B6]/10'
              }`}
            >
              {category}
            </Button>
          ))}
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.slice(0, visibleProjects).map((project, index) => (
            <motion.div
              key={`${project.id}-${index}`}
              variants={itemVariants}
              whileHover="hover"
              className="bg-gray-50 dark:bg-gradient-to-br dark:from-[#1E293B] dark:to-[#2D3748] rounded-lg overflow-hidden shadow-md transition-all duration-300 h-full"
            >
              <div className="p-5 md:p-6 flex flex-col h-full">
                <motion.div
                  className="mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
                    {project.categories[0]}
                  </span>
                </motion.div>

                <div className="flex items-center justify-between mb-4">
                  <motion.h3
                    className="text-lg md:text-xl font-bold text-gray-900 dark:text-white line-clamp-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {project.title}
                  </motion.h3>
                  <motion.div
                    className="flex items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <motion.div
                      className="w-3 h-3 rounded-full bg-red-500"
                      whileHover={{ scale: 1.2 }}
                    ></motion.div>
                    <motion.div
                      className="w-3 h-3 rounded-full bg-yellow-500"
                      whileHover={{ scale: 1.2 }}
                    ></motion.div>
                    <motion.div
                      className="w-3 h-3 rounded-full bg-green-500"
                      whileHover={{ scale: 1.2 }}
                    ></motion.div>
                  </motion.div>
                </div>

                <motion.div
                  className="mb-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
                    {project.description}
                  </p>
                </motion.div>

                <motion.div
                  className="mb-4 flex-grow"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 6).map((tech, techIndex) => (
                      <motion.span
                        key={techIndex}
                        className="text-xs px-2 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + techIndex * 0.05 }}
                        whileHover={{
                          scale: 1.1,
                          backgroundColor: 'rgba(59, 130, 246, 0.2)',
                          color: '#3B82F6',
                        }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                    {project.technologies.length > 6 && (
                      <motion.span
                        className="text-xs px-2 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8 }}
                      >
                        +{project.technologies.length - 6}
                      </motion.span>
                    )}
                  </div>
                </motion.div>

                <motion.div
                  className="flex gap-2 mt-auto"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  {project.links?.map((link, linkIndex) => (
                    <Link key={linkIndex} href={link.url} target="_blank" rel="noopener noreferrer">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-[#3B82F6] dark:border-[#F472B6] text-[#3B82F6] dark:text-[#F472B6] hover:bg-[#3B82F6]/10 dark:hover:bg-[#F472B6]/10"
                      >
                        {link.type === 'github' ? (
                          <GithubIcon className="w-4 h-4 mr-2" />
                        ) : (
                          <ExternalLinkIcon className="w-4 h-4 mr-2" />
                        )}
                        {link.label}
                      </Button>
                    </Link>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Load More Button */}
        {filteredProjects.length > visibleProjects && (
          <motion.div
            className="flex justify-center mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Button
              variant="outline"
              size="lg"
              onClick={handleLoadMore}
              disabled={isLoading}
              className="border-[#3B82F6] dark:border-[#F472B6] text-[#3B82F6] dark:text-[#F472B6] hover:bg-[#3B82F6]/10 dark:hover:bg-[#F472B6]/10"
            >
              {isLoading ? 'Loading...' : 'Load More Projects'}
            </Button>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
