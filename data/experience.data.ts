import { EXTERNAL_URLS } from '@/config/urls.config';
import { CompanyDetails, ExperienceItem, ProfessionalSkill } from '@/types/data.type';

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
