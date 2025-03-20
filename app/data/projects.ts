/**
 * Project data for the portfolio
 * Contains information about personal and professional projects
 */

export interface ProjectImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface ProjectLink {
  type: 'github' | 'demo' | 'documentation' | 'website' | 'article' | 'video';
  url: string;
  label: string;
}

export enum ProjectCategory {
  FRONTEND = 'Frontend',
  BACKEND = 'Backend',
  FULLSTACK = 'Full Stack',
  OTHER = 'Other',
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  thumbnail?: string;
  images?: ProjectImage[];
  technologies: string[];
  links?: ProjectLink[];
  featured?: boolean;
  displayOnHome?: boolean;
  date?: string;
  categories: ProjectCategory[];
  code?: string;
  order?: number;
}

// Helper function to create links with multiple types
const createProjectLinks = (
  links: { type: ProjectLink['type']; url: string; label?: string }[]
): ProjectLink[] => {
  return links.map(link => ({
    type: link.type,
    url: link.url,
    label: link.label || `${link.type.charAt(0).toUpperCase()}${link.type.slice(1)}`,
  }));
};

export const projectsData: Project[] = [
  {
    id: 'portfolio',
    title: 'Portfolio',
    description:
      'Personal portfolio website built with Next.js, TypeScript, and Tailwind CSS, featuring project showcases and responsive design.',
    technologies: ['TypeScript', 'Next.js', 'Tailwind CSS', 'React', 'Framer Motion'],
    categories: [ProjectCategory.FRONTEND],
    links: createProjectLinks([
      { type: 'github', url: 'https://github.com/tonglam/portfolio' },
      { type: 'demo', url: 'https://www.qitonglan.com' },
    ]),
    featured: true,
    displayOnHome: true,
    order: 1,
  },
  {
    id: 'askify',
    title: 'Askify',
    description:
      'A modern request forum platform built with Flask, featuring user authentication, real-time updates, and interactive discussion threads.',
    technologies: ['Python', 'Flask', 'SQLite', 'Bootstrap'],
    categories: [ProjectCategory.FULLSTACK],
    links: createProjectLinks([
      { type: 'github', url: 'https://github.com/tonglam/Askify' },
      { type: 'demo', url: 'https://askify-q4k0.onrender.com' },
    ]),
    order: 2,
  },
  {
    id: 'letletme-api',
    title: 'LetLetMe API',
    description:
      'High-performance RESTful API service built with Bun and Elysia.js, powering the LetLetMe Fantasy Premier League analytics platform with ultra-fast data processing.',
    technologies: ['TypeScript', 'Bun', 'Elysia.js', 'MySQL', 'Redis'],
    categories: [ProjectCategory.BACKEND],
    links: createProjectLinks([
      { type: 'github', url: 'https://github.com/tonglam/letletme-api' },
      { type: 'demo', url: 'https://api.letletme.top' },
    ]),
    featured: true,
    order: 6,
  },
  {
    id: 'letletme-web',
    title: 'LetLetMe Web',
    description:
      'Frontend application for letletme.top, providing a comprehensive user interface for Fantasy Premier League data analytics and team management.',
    technologies: ['TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'Ant Design'],
    categories: [ProjectCategory.FRONTEND],
    links: createProjectLinks([
      { type: 'github', url: 'https://github.com/tonglam/letletme-web' },
      { type: 'demo', url: 'https://letletme.top' },
    ]),
    featured: true,
    displayOnHome: true,
    order: 4,
  },
  {
    id: 'letletme-data',
    title: 'LetLetMe Data',
    description:
      'Advanced data analytics tool for Fantasy Premier League (FPL) managers, providing statistical insights, team optimization, and performance analysis.',
    technologies: ['TypeScript', 'Node.js', 'Data Analysis', 'API Integration', 'MySQL'],
    categories: [ProjectCategory.BACKEND],
    links: createProjectLinks([
      { type: 'github', url: 'https://github.com/tonglam/letletme_data' },
    ]),
    featured: true,
    order: 5,
  },
  {
    id: 'notion-page-db',
    title: 'Notion Page DB',
    description:
      'Tool for managing and synchronizing Notion pages and databases, with automated content organization.',
    technologies: ['TypeScript', 'Notion API', 'Cloudflare Workers'],
    categories: [ProjectCategory.BACKEND],
    links: createProjectLinks([
      { type: 'github', url: 'https://github.com/tonglam/notion-page-db' },
    ]),
  },
  {
    id: 'notion2worker',
    title: 'Notion2Worker',
    description:
      'Cloudflare Worker that retrieves Notion database content and efficiently stores it in Cloudflare R2 storage.',
    technologies: ['JavaScript', 'Cloudflare Workers', 'Notion API', 'R2 Storage'],
    categories: [ProjectCategory.BACKEND],
    links: createProjectLinks([
      { type: 'github', url: 'https://github.com/tonglam/notion2Worker' },
    ]),
  },
  {
    id: 'miniprogram-letletme',
    title: 'MiniProgram LetLetMe',
    description:
      'WeChat Mini Program offering FPL tools including team information, deadline countdown, live scores, and mini-league rankings.',
    technologies: ['JavaScript', 'WeChat Mini Program', 'Mobile Development', 'WeChat API'],
    categories: [ProjectCategory.FRONTEND],
    links: createProjectLinks([
      { type: 'github', url: 'https://github.com/tonglam/miniprogram-letletme' },
      { type: 'demo', url: 'https://qitonglan.com/miniprogram.webp' },
    ]),
    featured: true,
    order: 3,
  },
  {
    id: 'fpl-data-public',
    title: 'FPL Data Public',
    description:
      'Public version of the FPL data processing system, providing core functionality for fantasy league data analysis.',
    technologies: ['Java', 'Spring Boot', 'MySQL', 'Redis'],
    categories: [ProjectCategory.BACKEND],
    links: createProjectLinks([
      { type: 'github', url: 'https://github.com/tonglam/fpl-data-public' },
    ]),
  },
  {
    id: 'fpl-public',
    title: 'FPL Public',
    description:
      'Public version of the letletme.top backend service, handling core fantasy league functionalities.',
    technologies: ['JavaScript', 'Java', 'Spring Boot', 'MySQL', 'Redis'],
    categories: [ProjectCategory.FULLSTACK],
    links: createProjectLinks([{ type: 'github', url: 'https://github.com/tonglam/fpl-public' }]),
  },
  {
    id: 'fpldle-python',
    title: 'FPLdle Python',
    description:
      'Python implementation of an FPL-themed word game, similar to Wordle but focused on fantasy league content.',
    technologies: ['Python', 'Game Development'],
    categories: [ProjectCategory.BACKEND],
    links: createProjectLinks([
      { type: 'github', url: 'https://github.com/tonglam/fpldle-python' },
    ]),
  },
  {
    id: 'fpl-analysis-2223',
    title: 'FPL Analysis 22/23',
    description:
      'Comprehensive analysis of the Fantasy Premier League 2022-2023 season data using R statistical computing.',
    technologies: ['R', 'Data Analysis', 'Statistical Computing'],
    categories: [ProjectCategory.OTHER],
    links: createProjectLinks([
      { type: 'github', url: 'https://github.com/tonglam/fpl_analysis_2223' },
      { type: 'article', url: 'https://rpubs.com/tonglam/1077811' },
    ]),
  },
  {
    id: 'telegrambot-public',
    title: 'Telegram Bot Public',
    description:
      'Spring Boot-based Telegram bot for the LetLetMe platform, providing automated FPL updates and notifications.',
    technologies: ['Java', 'Spring Boot', 'Telegram API'],
    categories: [ProjectCategory.BACKEND],
    links: createProjectLinks([
      { type: 'github', url: 'https://github.com/tonglam/telegramBot-public' },
    ]),
  },
  {
    id: 'letletme-apikey',
    title: 'LetLetMe APIKey',
    description:
      'API key management system for LetLetMe services, handling authentication and access control.',
    technologies: ['JavaScript', 'Shell', 'Cloudflare Workers'],
    categories: [ProjectCategory.BACKEND],
    links: createProjectLinks([
      { type: 'github', url: 'https://github.com/tonglam/letletme-apikey' },
    ]),
  },
];

// Enhanced helper functions for better filtering
export const getHomePageProjects = (): Project[] => {
  return projectsData.filter(project => project.displayOnHome);
};

export const getProjectsByCategory = (category: ProjectCategory): Project[] => {
  return projectsData.filter(project => project.categories.includes(category));
};

export const getProjectsByCategories = (categories: ProjectCategory[]): Project[] => {
  return projectsData.filter(project =>
    categories.some(category => project.categories.includes(category))
  );
};

export const getProjectsByAllCategories = (categories: ProjectCategory[]): Project[] => {
  return projectsData.filter(project =>
    categories.every(category => project.categories.includes(category))
  );
};

export const getFeaturedProjects = (): Project[] => {
  return projectsData.filter(project => project.featured);
};

export const getCategoriesForProject = (projectId: string): ProjectCategory[] => {
  const project = projectsData.find(p => p.id === projectId);
  return project ? project.categories : [];
};

export default projectsData;
