'use client';

import { ExternalLinkIcon, GithubIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { ProjectCategory, projectsData } from '@/data/projects';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

export default function Projects(): JSX.Element {
  const [activeCategory, setActiveCategory] = useState<'All' | ProjectCategory>('All');
  const [visibleProjects, setVisibleProjects] = useState(6);
  const [isLoading, setIsLoading] = useState(false);

  // Get all categories from the ProjectCategory enum plus 'All'
  const categories = ['All', ...Object.values(ProjectCategory)];

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

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 10,
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  return (
    <section
      id="projects"
      className="py-16 md:py-20 bg-white dark:bg-gradient-to-b dark:from-[#1E293B] dark:to-[#0F172A]"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#2563EB] to-[#4F46E5] dark:from-[#38BDF8] dark:to-[#818CF8]">
            PROJECTS
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto text-sm md:text-base">
            Explore my portfolio of projects showcasing my skills in web development, from
            responsive front-end designs to complex back-end systems.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center md:justify-start gap-2 mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {categories.map((category, index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.3 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant={activeCategory === category ? 'default' : 'outline'}
                  className={`rounded-full text-xs sm:text-sm ${
                    activeCategory === category
                      ? 'bg-gradient-to-r from-[#3B82F6] to-[#6366F1] dark:from-[#F472B6] dark:to-[#EC4899] text-white'
                      : 'border-[#3B82F6] dark:border-[#F472B6] text-gray-700 dark:text-gray-300'
                  }`}
                  onClick={() => {
                    setActiveCategory(category as 'All' | ProjectCategory);
                    setVisibleProjects(6);
                  }}
                >
                  {category}
                </Button>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.slice(0, visibleProjects).map((project, index) => (
              <motion.div
                key={index}
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
                    className="flex justify-between items-center mt-auto"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    {project.links?.find(link => link.type === 'demo') && (
                      <Link
                        href={project.links.find(link => link.type === 'demo')?.url || '#'}
                        target="_blank"
                      >
                        <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                          <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full border-[#3B82F6] dark:border-[#F472B6] flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 cursor-pointer group relative"
                          >
                            <ExternalLinkIcon
                              className="text-[#3B82F6] dark:text-[#F472B6]"
                              size={18}
                            />
                            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                              Live Demo
                            </span>
                          </Button>
                        </motion.div>
                      </Link>
                    )}

                    {project.links?.find(link => link.type === 'github') && (
                      <Link
                        href={project.links.find(link => link.type === 'github')?.url || '#'}
                        target="_blank"
                      >
                        <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                          <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full border-[#3B82F6] dark:border-[#F472B6] flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 cursor-pointer group relative"
                          >
                            <GithubIcon className="text-[#3B82F6] dark:text-[#F472B6]" size={18} />
                            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                              Source Code
                            </span>
                          </Button>
                        </motion.div>
                      </Link>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Load More Button */}
        {visibleProjects < filteredProjects.length && (
          <motion.div
            className="flex justify-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
              <Button
                onClick={handleLoadMore}
                disabled={isLoading}
                className="bg-gradient-to-r from-[#3B82F6] to-[#6366F1] dark:from-[#F472B6] dark:to-[#EC4899] hover:from-[#6366F1] hover:to-[#3B82F6] dark:hover:from-[#EC4899] dark:hover:to-[#F472B6] text-white"
              >
                {isLoading ? 'Loading...' : 'Load More'}
              </Button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
