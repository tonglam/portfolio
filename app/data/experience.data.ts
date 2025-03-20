/**
 * Professional experience data
 * Contains work history, roles, responsibilities, and achievements
 */

import { EXTERNAL_URLS } from '@/config';
import type { CompanyDetails, ExperienceItem, ProfessionalSkill } from '@/types/data/data.type';

export const experienceData: ExperienceItem[] = [
  {
    period: 'Dec 2021 - Jun 2023',
    title: 'Senior Software Engineer',
    company: 'eSurfing Cloud',
  },
  {
    period: 'Jan 2018 - Dec 2021',
    title: 'Senior Software Engineer',
    company: 'NetEase, Inc',
  },
  {
    period: 'Jul 2014 - Jan 2018',
    title: 'Junior Software Engineer',
    company: 'China Telecom Corporation Limited',
  },
];

// Specific skills gained throughout career
export const gainedSkills: string[] = [
  'Java',
  'JavaScript',
  'TypeScript',
  'Python',
  'HTML/CSS',
  'SpringBoot',
  'React.js',
  'Next.js',
  'Node.js',
  'Flask',
  'MySQL',
  'PostgreSQL',
  'MongoDB',
  'Redis',
  'Sqlite',
  'Jenkins',
  'Docker',
  'Nginx',
  'Kubernetes',
  'Microservices',
  'DevOps',
  'Cloud',
  'Agile development',
  'AWS',
  'AI Coding',
];

// Professional skills data
export const skillsData: ProfessionalSkill[] = [
  { name: 'System Architecture & Design', percentage: 90 },
  { name: 'Frontend Development', percentage: 85 },
  { name: 'Backend Development', percentage: 100 },
  { name: 'Cloud Infrastructure', percentage: 70 },
  { name: 'DevOps', percentage: 80 },
  { name: 'Testing, Quality Assurance & Automation', percentage: 70 },
  { name: 'Data Management & Database Optimization', percentage: 80 },
  { name: 'Soft Skills & Communication', percentage: 90 },
  { name: 'Emerging Technologies & Trends', percentage: 80 },
];

// Company details with responsibilities and technologies
export const companyDetails: CompanyDetails = {
  'eSurfing Cloud': {
    logo: EXTERNAL_URLS.COMPANY.ESURFING_CLOUD.LOGO,
    url: EXTERNAL_URLS.COMPANY.ESURFING_CLOUD.URL,
    displayName: 'China Telecom eSurfing Cloud',
    responsibilities: [
      'Led the development of core modules for the cloud billing system using microservices architecture',
      'Implemented CI/CD pipelines for automated testing and deployment',
      'Optimized application performance and scalability on cloud infrastructure',
      'Provided technical leadership and mentorship to junior developers',
    ],
    technologies: [
      'Java',
      'SpringBoot',
      'MySQL',
      'Microservices',
      'Redis',
      'Docker',
      'Kubernetes',
      'Cloud',
      'Agile development',
    ],
    achievements: [
      'Led the successful development and deployment of core modules for the cloud billing system, achieving project milestones and client satisfaction',
    ],
  },
  'NetEase, Inc': {
    logo: EXTERNAL_URLS.COMPANY.NETEASE.LOGO,
    url: EXTERNAL_URLS.COMPANY.NETEASE.URL,
    displayName: 'NetEase Games',
    responsibilities: [
      'Developed and maintained backend services for multiple mobile games',
      'Designed and implemented RESTful APIs for game features',
      'Collaborated with cross-functional teams to deliver game updates',
    ],
    technologies: [
      'Java',
      'SpringBoot',
      'MySQL',
      'MongoDB',
      'Nginx',
      'DevOps',
      'HTML/CSS',
      'JavaScript',
    ],
    achievements: [
      'Played a crucial role in the design and development of operation center systems, contributing to the seamless integration and operation of multiple game platforms',
    ],
  },
  'China Telecom Corporation Limited': {
    logo: EXTERNAL_URLS.COMPANY.CHINA_TELECOM.LOGO,
    url: EXTERNAL_URLS.COMPANY.CHINA_TELECOM.URL,
    displayName: 'China Telecom Corporation Limited',
    responsibilities: [
      'Developed and maintained program code for the core CRM service, focusing on financial transactions',
      'Implemented order cost calculation, billing, and refund processes',
      'Collaborated in systems integration, database administration, and software configuration tasks',
      'Performed code reviews, software testing, and debugging',
      'Assisted in test automation and configuration management',
    ],
    technologies: ['Java', 'SpringBoot', 'MySQL'],
    achievements: [
      'Successfully implemented order cost calculation, billing, and refund processes, ensuring accuracy and efficiency in financial transactions',
    ],
  },
};
