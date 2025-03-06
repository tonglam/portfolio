/**
 * Project data for the portfolio
 * Contains information about personal and professional projects
 */

import { EXTERNAL_URLS } from '@/config/constants';

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
  date?: string;
  category: 'Frontend' | 'Backend' | 'Full Stack' | 'Mobile' | 'Other';
  code?: string;
}

// Helper function to convert githubUrl and demoUrl to links array
const createLinks = (githubUrl?: string, demoUrl?: string): ProjectLink[] => {
  const links: ProjectLink[] = [];

  if (githubUrl) {
    links.push({
      type: 'github',
      url: githubUrl,
      label: 'GitHub Repository',
    });
  }

  if (demoUrl) {
    links.push({
      type: 'demo',
      url: demoUrl,
      label: 'Live Demo',
    });
  }

  return links;
};

export const projectsData: Project[] = [
  {
    id: 'financial-app',
    title: 'AI Powered Financial App',
    description:
      'An AI-powered financial mobile application that helps users manage their finances and make informed decisions.',
    technologies: [
      'Express',
      'MongoDB',
      'OpenAI API',
      'AWS SES',
      'AWS S3',
      'Node Mailer',
      'Joi',
      'Puppeteer',
      'EC2',
      'PM2',
      'Nginx',
    ],
    category: 'Backend',
    links: createLinks(EXTERNAL_URLS.PROJECT.GITHUB, EXTERNAL_URLS.PROJECT.DEMO),
    code: `const project = {
  name: 'AI Powered Financial App',
  tools: ['Express', 'MongoDB', 'OpenAI API', 'AWS SES',
          'AWS S3', 'Node Mailer', 'Joi', 'Puppeteer', 'EC2', 'PM2',
          'Nginx'],
  myRole: 'Backend Developer',
  Description: 'Me and my team built an AI-powered financial mobile application. I have developed API using Express, Typescript, OpenAI, AWS, and MongoDB. Used OTP via AWS SES, Google, and Facebook for the authentication system. Built AI assistants using OpenAI's latest model and trained using our dataset. Voice messages are converted to text using AWS Transcribe. The app fetches data from Google Sheets and generates a PDF term sheet, sent via AWS SES.',
};`,
    featured: true,
  },
  {
    id: 'travel-agency',
    title: 'Travel Agency App',
    description:
      'A comprehensive travel agency application that allows users to book trips, explore destinations, and manage their travel plans.',
    technologies: [
      'NextJS',
      'Tailwind CSS',
      'Google Maps',
      'NestJS',
      'TypeScript',
      'MySQL',
      'AWS S3',
      'Sun-Editor',
      'Gmail Passkey',
    ],
    category: 'Full Stack',
    links: createLinks(EXTERNAL_URLS.PROJECT.GITHUB, EXTERNAL_URLS.PROJECT.DEMO),
    code: `const project = {
  name: 'Travel Agency App',
  tools: ['NextJS', 'Tailwind CSS', 'Google Maps', 'NestJS',
          'TypeScript', 'MySQL', 'AWS S3', 'Sun-Editor', 'Gmail Passkey'],
};`,
    featured: true,
  },
  {
    id: 'ecommerce-platform',
    title: 'E-commerce Platform',
    description:
      'A feature-rich e-commerce platform with product management, cart functionality, payment processing, and order tracking.',
    technologies: ['React', 'Redux', 'Node.js', 'Express', 'MongoDB', 'Stripe', 'AWS S3', 'JWT'],
    category: 'Full Stack',
    links: createLinks(EXTERNAL_URLS.PROJECT.GITHUB, EXTERNAL_URLS.PROJECT.DEMO),
  },
  {
    id: 'chat-app',
    title: 'Real-time Chat Application',
    description:
      'A real-time chat application with private messaging, group chats, and file sharing capabilities.',
    technologies: ['React', 'Socket.io', 'Express', 'MongoDB', 'JWT', 'Redis'],
    category: 'Full Stack',
    links: createLinks(EXTERNAL_URLS.PROJECT.GITHUB),
  },
  {
    id: 'portfolio',
    title: 'Portfolio Website',
    description:
      'A responsive portfolio website showcasing projects, skills, and contact information.',
    technologies: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'TypeScript'],
    category: 'Frontend',
    links: createLinks(EXTERNAL_URLS.PROJECT.GITHUB, EXTERNAL_URLS.PROJECT.DEMO),
  },
  {
    id: 'task-management',
    title: 'Task Management System',
    description:
      'A comprehensive task management system with project tracking, task assignment, and progress monitoring.',
    technologies: ['React', 'Redux', 'Node.js', 'Express', 'MongoDB', 'JWT'],
    category: 'Full Stack',
    links: createLinks(EXTERNAL_URLS.PROJECT.GITHUB),
  },
  {
    id: 'weather-dashboard',
    title: 'Weather Dashboard',
    description:
      'A weather dashboard that displays current weather conditions and forecasts for multiple locations.',
    technologies: ['React', 'OpenWeather API', 'Chart.js', 'Tailwind CSS'],
    category: 'Frontend',
    links: createLinks(EXTERNAL_URLS.PROJECT.GITHUB, EXTERNAL_URLS.PROJECT.DEMO),
  },
  {
    id: 'blog-platform',
    title: 'Blog Platform',
    description:
      'A blog platform with content management, user authentication, and commenting functionality.',
    technologies: ['Next.js', 'Prisma', 'PostgreSQL', 'NextAuth.js', 'Tailwind CSS'],
    category: 'Full Stack',
    links: createLinks(EXTERNAL_URLS.PROJECT.GITHUB, EXTERNAL_URLS.PROJECT.DEMO),
  },
  {
    id: 'recipe-app',
    title: 'Recipe Sharing App',
    description: 'A recipe sharing application where users can discover, share, and save recipes.',
    technologies: ['React Native', 'Firebase', 'Redux', 'Expo'],
    category: 'Mobile',
    links: createLinks(EXTERNAL_URLS.PROJECT.GITHUB),
  },
  {
    id: 'inventory-system',
    title: 'Inventory Management System',
    description: 'An inventory management system for tracking products, orders, and stock levels.',
    technologies: ['React', 'Node.js', 'Express', 'MySQL', 'Docker'],
    category: 'Full Stack',
    links: createLinks(EXTERNAL_URLS.PROJECT.GITHUB, EXTERNAL_URLS.PROJECT.DEMO),
  },
];

export default projectsData;
