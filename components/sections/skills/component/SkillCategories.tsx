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
import { SkillCategory } from '@/types/data.type';
import { motion } from 'framer-motion';
import { ComponentType } from 'react';

interface SkillCategoriesProps {
  categories: SkillCategory[];
}

export function SkillCategories({ categories }: SkillCategoriesProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
      {categories.map((category, index) => (
        <SkillCategoryCard
          key={index}
          title={category.name}
          skills={category.skills}
          delay={0.1 + index * 0.1}
        />
      ))}
    </div>
  );
}

interface SkillCategoryCardProps {
  title: string;
  skills: SkillCategory['skills'];
  delay?: number;
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

function SkillCategoryCard({ title, skills, delay = 0 }: SkillCategoryCardProps) {
  return (
    <motion.div
      className="bg-white dark:bg-gradient-to-br dark:from-[#1E293B] dark:to-[#2D3748] rounded-lg p-5 md:p-6 shadow-md h-full"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <h3 className="text-lg md:text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#2563EB] to-[#4F46E5] dark:from-[#38BDF8] dark:to-[#818CF8]">
        {title}
      </h3>
      <ul className="space-y-3">
        {skills.map((skill, index) => {
          const IconComponent = iconMap[skill.icon];
          return (
            <motion.li
              key={index}
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: delay + index * 0.1 }}
            >
              {IconComponent ? (
                <IconComponent size={20} className={skill.color} />
              ) : (
                <div className="w-5 h-5 bg-gray-300 rounded-sm"></div>
              )}
              <span className="text-gray-700 dark:text-gray-300">{skill.name}</span>
            </motion.li>
          );
        })}
      </ul>
    </motion.div>
  );
}
