/**
 * Skills data for the Skills section
 */

import type { Skill, SkillsData } from '@/types/data/data.type';

// Organized skills data by categories
export const skillsData: SkillsData = {
  categories: [
    {
      name: 'Programming Languages',
      skills: [
        { name: 'Java', icon: 'JavaIcon', color: 'text-red-600' },
        { name: 'JavaScript', icon: 'JavascriptIcon', color: 'text-yellow-500' },
        { name: 'TypeScript', icon: 'TypescriptIcon', color: 'text-blue-600' },
        { name: 'Python', icon: 'PythonIcon', color: 'text-blue-500' },
        { name: 'SQL', icon: 'MysqlIcon', color: 'text-gray-600' },
        { name: 'Shell', icon: 'ShellIcon', color: 'text-green-400' },
      ],
    },
    {
      name: 'Frontend Technologies',
      skills: [
        { name: 'HTML', icon: 'HtmlIcon', color: 'text-orange-500' },
        { name: 'CSS', icon: 'CssIcon', color: 'text-blue-500' },
        { name: 'Bootstrap', icon: 'BootstrapIcon', color: 'text-purple-600' },
        { name: 'shadcn/ui', icon: 'ShadcnIcon', color: 'text-gray-800 dark:text-gray-200' },
        { name: 'React.js', icon: 'ReactIcon', color: 'text-cyan-400' },
        {
          name: 'Next.js',
          icon: 'NextjsIcon',
          color: 'text-black dark:text-white',
        },
      ],
    },
    {
      name: 'Backend Technologies',
      skills: [
        { name: 'Spring Boot', icon: 'SpringBootIcon', color: 'text-green-600' },
        { name: 'Node.js', icon: 'NodejsIcon', color: 'text-green-500' },
        { name: 'Express.js', icon: 'ExpressIcon', color: 'text-gray-400' },
        { name: 'Bun', icon: 'BunIcon', color: 'text-pink-500' },
        { name: 'Elysia.js', icon: 'ElysiaIcon', color: 'text-purple-500' },
        { name: 'Flask', icon: 'FlaskIcon', color: 'text-gray-700' },
      ],
    },
    {
      name: 'Database Technologies',
      skills: [
        { name: 'SQLite', icon: 'SqliteIcon', color: 'text-blue-400' },
        { name: 'PostgreSQL', icon: 'PostgresqlIcon', color: 'text-blue-700' },
        { name: 'MySQL', icon: 'MysqlIcon', color: 'text-blue-500' },
        { name: 'Redis', icon: 'RedisIcon', color: 'text-red-500' },
        { name: 'MongoDB', icon: 'MongodbIcon', color: 'text-green-600' },
        { name: 'Supabase', icon: 'SupabaseIcon', color: 'text-emerald-600' },
      ],
    },
    {
      name: 'Testing & Quality Assurance',
      skills: [
        { name: 'JUnit', icon: 'JunitIcon', color: 'text-green-700' },
        { name: 'Jest', icon: 'JestIcon', color: 'text-orange-600' },
        { name: 'Vitest', icon: 'VitestIcon', color: 'text-emerald-500' },
        { name: 'Pytest', icon: 'PytestIcon', color: 'text-blue-400' },
        { name: 'Postman', icon: 'PostmanIcon', color: 'text-orange-500' },
      ],
    },
    {
      name: 'DevOps & Infrastructure',
      skills: [
        { name: 'Docker', icon: 'DockerIcon', color: 'text-blue-500' },
        { name: 'Nginx', icon: 'NginxIcon', color: 'text-green-500' },
        { name: 'AWS', icon: 'AwsIcon', color: 'text-yellow-500' },
        { name: 'Jenkins', icon: 'JenkinsIcon', color: 'text-red-500' },
        { name: 'GitHub Actions', icon: 'GithubActionsIcon', color: 'text-blue-600' },
      ],
    },
    {
      name: 'Project Management',
      skills: [
        { name: 'Agile Development', icon: 'AgileIcon', color: 'text-blue-500' },
        { name: 'Kanban', icon: 'KanbanIcon', color: 'text-teal-500' },
        { name: 'Jira', icon: 'JiraIcon', color: 'text-blue-600' },
        { name: 'Confluence', icon: 'ConfluenceIcon', color: 'text-blue-400' },
        {
          name: 'GitHub Projects',
          icon: 'GithubProjectsIcon',
          color: 'text-purple-600',
        },
      ],
    },
    {
      name: 'AI Tools',
      skills: [
        { name: 'v0', icon: 'V0Icon', color: 'text-black dark:text-white' }, // Vercel brand color
        { name: 'bolt.new', icon: 'BoltNewIcon', color: 'text-[#1389FD]' }, // StackBlitz blue
        { name: 'Cursor', icon: 'CursorIcon', color: 'text-[#7C3AED]' }, // Cursor purple
        { name: 'Windsurf', icon: 'WindsurfIcon', color: 'text-[#0EA5E9]' }, // Windsurf blue
        { name: 'MCP', icon: 'MCPIcon', color: 'text-[#6366F1]' }, // Indigo color
      ],
    },
  ],
};

// Legacy format to maintain backward compatibility with existing components
export const flattenedSkillsData: Skill[] = skillsData.categories.reduce<Skill[]>(
  (acc, category) => [...acc, ...category.skills],
  []
);

export default skillsData;
