'use client';

import {
  AgileIcon,
  AwsIcon,
  BoltNewIcon,
  BootstrapIcon,
  BunIcon,
  ConfluenceIcon,
  CssIcon,
  CursorIcon,
  DockerIcon,
  ElysiaIcon,
  ExpressIcon,
  FlaskIcon,
  GithubActionsIcon,
  GithubProjectsIcon,
  GitIcon,
  HtmlIcon,
  JavaIcon,
  JavascriptIcon,
  JenkinsIcon,
  JestIcon,
  JiraIcon,
  JunitIcon,
  KanbanIcon,
  MCPIcon,
  MongodbIcon,
  MysqlIcon,
  NestjsIcon,
  NextjsIcon,
  NginxIcon,
  NodejsIcon,
  NpmIcon,
  PostgresqlIcon,
  PostmanIcon,
  PytestIcon,
  PythonIcon,
  ReactIcon,
  RedisIcon,
  ReduxIcon,
  ShadcnIcon,
  ShellIcon,
  SpringBootIcon,
  SqliteIcon,
  StrapiIcon,
  SupabaseIcon,
  TypescriptIcon,
  V0Icon,
  VitestIcon,
  WindsurfIcon,
} from '@/components/icons';
import { Skill } from '@/types/data.type';
import { motion } from 'framer-motion';
import { ComponentType } from 'react';

interface SkillsCarouselProps {
  skills: Skill[];
}

export function SkillsCarousel({ skills }: SkillsCarouselProps) {
  return (
    <>
      {/* First row of skills moving from right to left */}
      <SkillsRow skills={skills.slice(0, 8)} direction="left" speed={35} />

      {/* Second row of skills moving from left to right */}
      <SkillsRow skills={skills.slice(8, 16)} direction="right" speed={30} />
    </>
  );
}

const iconMap: {
  [key: string]: ComponentType<{ size?: number; className?: string }> | undefined;
} = {
  ReactIcon,
  NodejsIcon,
  JavascriptIcon,
  TypescriptIcon,
  HtmlIcon,
  CssIcon,
  PythonIcon,
  JavaIcon,
  SpringBootIcon,
  ExpressIcon,
  NestjsIcon,
  NextjsIcon,
  FlaskIcon,
  DockerIcon,
  AwsIcon,
  NginxIcon,
  MongodbIcon,
  PostgresqlIcon,
  MysqlIcon,
  RedisIcon,
  SqliteIcon,
  JunitIcon,
  VitestIcon,
  PytestIcon,
  JestIcon,
  PostmanIcon,
  GitIcon,
  JenkinsIcon,
  JiraIcon,
  AgileIcon,
  KanbanIcon,
  ShellIcon,
  ConfluenceIcon,
  GithubProjectsIcon,
  ReduxIcon,
  StrapiIcon,
  NpmIcon,
  BunIcon,
  ElysiaIcon,
  GithubActionsIcon,
  BootstrapIcon,
  ShadcnIcon,
  SupabaseIcon,
  V0Icon,
  BoltNewIcon,
  CursorIcon,
  WindsurfIcon,
  MCPIcon,
};

function SkillsRow({
  skills,
  direction = 'left',
  speed = 25,
}: {
  skills: Skill[];
  direction?: 'left' | 'right';
  speed?: number;
}) {
  // Double the skills array to create a seamless loop
  const duplicatedSkills = [...skills, ...skills];

  return (
    <div className="py-4 flex whitespace-nowrap overflow-hidden">
      <motion.div
        className="flex gap-4 md:gap-8"
        initial={{ x: direction === 'left' ? 0 : -100 * skills.length }}
        animate={{ x: direction === 'left' ? -100 * skills.length : 0 }}
        transition={{
          repeat: Infinity,
          repeatType: 'loop',
          duration: speed,
          ease: 'linear',
        }}
      >
        {duplicatedSkills.map((skill, index) => {
          // Get the specific IconComponent from the map
          const IconComponent = iconMap[skill.icon];
          return (
            <div
              key={`${skill.name}-${index}`}
              className="bg-white dark:bg-gradient-to-br dark:from-[#1E293B] dark:to-[#2D3748] rounded-lg p-3 sm:p-4 md:p-6 flex flex-col items-center justify-center hover:bg-gray-50 dark:hover:from-[#2D3748] dark:hover:to-[#1E293B] transition flex-shrink-0 w-24 sm:w-28 md:w-32 shadow-md"
            >
              {/* Render the specific IconComponent or fallback */}
              {IconComponent ? (
                <IconComponent size={28} className={skill.color} />
              ) : (
                <div className="w-7 h-7 bg-gray-300 rounded-sm"></div> // Fallback square
              )}
              <span className="text-center whitespace-nowrap mt-2 text-xs sm:text-sm">
                {skill.name}
              </span>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
