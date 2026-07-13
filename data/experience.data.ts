import { EXTERNAL_URLS } from '@/config/urls.config';
import { CompanyDetails, ExperienceItem } from '@/types/data.type';

export const experienceData: ExperienceItem[] = [
  {
    period: 'Dec 2021 - Jun 2023',
    title: 'Senior Software Engineer',
    company: 'China Telecom Cloud Technology',
  },
  {
    period: 'Jan 2018 - Dec 2021',
    title: 'Senior Software Engineer',
    company: 'NetEase Games',
  },
  {
    period: 'Jul 2014 - Jan 2018',
    title: 'Junior Software Engineer',
    company: 'China Telecom Corporation Limited',
  },
];

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
  'Microservices',
  'DevOps',
  'Cloud',
  'Agile development',
  'AWS',
  'Kafka',
];

export const companyDetails: CompanyDetails = {
  'China Telecom Cloud Technology': {
    logo: EXTERNAL_URLS.COMPANY.ESURFING_CLOUD.LOGO,
    url: EXTERNAL_URLS.COMPANY.ESURFING_CLOUD.URL,
    displayName: 'China Telecom Cloud Technology Co., Ltd.',
    responsibilities: [
      'Delivered backend services as one of three senior engineers on a distributed cloud billing program',
      'Built Java/Spring Boot and Node.js APIs for usage calculation, discounts, billing, invoices, and account data',
      'Implemented Kafka-based event processing for asynchronous billing workflows',
      'Guided three junior engineers within the workstream and supported production delivery',
    ],
    technologies: [
      'Java',
      'SpringBoot',
      'MySQL',
      'Microservices',
      'Redis',
      'Docker',
      'Kafka',
      'Cloud',
      'Agile development',
    ],
    achievements: [
      'Delivered and supported independently deployable billing services with versioned API contracts and event-driven processing',
    ],
  },
  'NetEase Games': {
    logo: EXTERNAL_URLS.COMPANY.NETEASE.LOGO,
    url: EXTERNAL_URLS.COMPANY.NETEASE.URL,
    displayName: 'NetEase Games',
    responsibilities: [
      'Developed workflow automation for ticket creation, engagement, and user segmentation across 50+ games',
      'Built secure APIs and authenticated workflows for platforms serving hundreds of thousands of VIP customers',
      'Worked with QA, product, and operations teams through delivery and production support',
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
      'Delivered and supported game-operations tools, authenticated applications, and repeatable deployment workflows',
    ],
  },
  'China Telecom Corporation Limited': {
    logo: EXTERNAL_URLS.COMPANY.CHINA_TELECOM.LOGO,
    url: EXTERNAL_URLS.COMPANY.CHINA_TELECOM.URL,
    displayName: 'China Telecom Corporation Limited',
    responsibilities: [
      'Built and supported backend CRM services for order processing, billing, customer management, and account provisioning',
      'Optimised SQL and refactored legacy Java service logic for maintainability and response performance',
      'Troubleshot daily production issues and delivered tested changes under established deployment standards',
    ],
    technologies: ['Java', 'SpringBoot', 'MySQL'],
    achievements: ['Supported provincial telecommunications services used across Guangdong'],
  },
};
