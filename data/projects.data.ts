import { ProjectLink } from '@/types/data.type';

import { Project } from '@/types/data.type';

import { ProjectCategory } from '@/types/data.type';

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
    id: 'letletme-platform',
    title: 'LetLetMe FPL Platform',
    description:
      'Real-time Fantasy Premier League analytics and tournament platform used by 800+ users, with scheduled ingestion, live-data synchronisation, APIs, and Redis-backed caching.',
    technologies: ['TypeScript', 'Node.js', 'React', 'Next.js', 'PostgreSQL', 'Redis'],
    categories: [ProjectCategory.FULLSTACK, ProjectCategory.BACKEND],
    links: createProjectLinks([
      { type: 'github', url: 'https://github.com/tonglam/letletme-case-study' },
      { type: 'demo', url: 'https://letletme.top' },
    ]),
    featured: true,
    displayOnHome: true,
    order: 1,
  },
  {
    id: 'vehicle-operations',
    title: 'Vehicle Operations & Compliance Platform',
    description:
      'Role-secured platform for vehicle, driver, inspection, agreement, signature, document, and compliance workflows.',
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Drizzle ORM', 'Better Auth'],
    categories: [ProjectCategory.FULLSTACK],
    links: createProjectLinks([
      { type: 'github', url: 'https://github.com/tonglam/vehicle-track' },
      { type: 'demo', url: 'https://vehicle-track-amber.vercel.app' },
    ]),
    featured: true,
    displayOnHome: true,
    order: 2,
  },
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
    order: 3,
  },
];

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
