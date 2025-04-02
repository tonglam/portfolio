'use client';

import { ExternalLinkIcon, GithubIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Project } from '@/types/data.type';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface ProjectCardProps {
  project: Project;
  index: number;
}

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
    y: -5,
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 10,
    },
  },
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      key={`${project.id}`}
      variants={itemVariants}
      whileHover="hover"
      className="group bg-gray-50 dark:bg-gradient-to-br dark:from-[#1E293B] dark:to-[#2D3748] rounded-lg overflow-hidden shadow-md transition-all duration-300 h-full flex flex-col"
    >
      <div className="p-5 md:p-6 flex flex-col h-full flex-grow">
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
            {/* Mac-style dots */}
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
            {/* Technologies */}
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
          className="flex gap-2 mt-auto pt-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {/* Links */}
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
      {/* Animated Bottom Border */}
      <div className="h-1 w-full bg-gradient-to-r from-[#3B82F6] to-[#6366F1] dark:from-[#F472B6] dark:to-[#EC4899] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
    </motion.div>
  );
}
