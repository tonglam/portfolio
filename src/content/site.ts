export const site = {
  name: 'Qitong Lan',
  shortName: 'Tong Lan',
  url: 'https://www.qitonglan.com',
  email: 'qitonglan@gmail.com',
  location: 'Perth, WA',
  workRights: 'Full Australian working rights',
  description:
    'Perth-based software engineer with 8+ years of commercial experience building backend platforms, APIs, data workflows, and web products.',
  social: {
    github: 'https://github.com/tonglam',
    linkedin: 'https://www.linkedin.com/in/qitonglan',
  },
  resumes: [
    {
      label: 'Backend & Platform CV',
      href: '/resume/qitong-lan-cv-backend-platform.pdf',
      detail: 'APIs, distributed systems, SQL and cloud',
      event: 'download_cv_backend',
    },
    {
      label: 'Full-Stack & Product CV',
      href: '/resume/qitong-lan-cv-full-stack-product.pdf',
      detail: 'React, Next.js, Node.js and end-to-end delivery',
      event: 'download_cv_full_stack',
    },
  ],
} as const;

export const experience = [
  {
    period: 'Dec 2021 — Jun 2023',
    title: 'Senior Software Engineer',
    company: 'China Telecom Cloud Technology Co., Ltd.',
    summary:
      'Delivered backend services as one of three senior engineers on a distributed cloud billing program, guiding three junior engineers within the workstream.',
    proof: 'Java/Spring Boot · Node.js · Kafka · billing and invoice APIs',
  },
  {
    period: 'Jan 2018 — Dec 2021',
    title: 'Senior Software Engineer',
    company: 'NetEase Games',
    summary:
      'Developed workflow automation and authenticated applications supporting operations across 50+ games and services for hundreds of thousands of VIP customers.',
    proof: 'Java/Spring Boot · APIs · MySQL · MongoDB · production support',
  },
  {
    period: 'Jul 2014 — Jan 2018',
    title: 'Junior Software Engineer',
    company: 'China Telecom Corporation Limited',
    summary:
      'Built and supported CRM components for order, billing, customer, and account-provisioning workflows serving telecommunications services across Guangdong.',
    proof: 'Java · Spring · SQL optimisation · enterprise CRM',
  },
] as const;

export const capabilities = [
  {
    index: '01',
    title: 'Backend & platform systems',
    description:
      'API contracts, distributed services, event-driven workflows and production support across Java/Spring Boot and TypeScript/Node.js.',
    evidence: 'Cloud billing · telecom CRM · LetLetMe services',
  },
  {
    index: '02',
    title: 'Data-intensive products',
    description:
      'Relational modelling, SQL, Redis caching, scheduled ingestion and synchronization paths designed around freshness and recovery.',
    evidence: 'LetLetMe live-data pipeline · cloud billing events',
  },
  {
    index: '03',
    title: 'End-to-end delivery',
    description:
      'Backend-heavy web products delivered from domain modelling and APIs through React/Next.js interfaces, testing and deployment.',
    evidence: 'LetLetMe · Vehicle Operations · enterprise tools',
  },
  {
    index: '04',
    title: 'Cloud & operations',
    description:
      'Practical delivery using Docker, AWS, Vercel, Cloudflare, CI/CD, observability and hands-on production troubleshooting.',
    evidence: 'LetLetMe operations · enterprise CI/CD · AWS credentials',
  },
] as const;

export const credentials = [
  {
    title: 'AWS Certified Solutions Architect — Associate',
    year: '2025',
    href: 'https://www.credly.com/badges/4ca74e6e-cd0c-4ed7-a377-4bf7f9f9bd0e',
  },
  {
    title: 'AWS Certified Cloud Practitioner',
    year: '2025',
    href: 'https://www.credly.com/badges/a19f51dc-d001-48f0-a959-4d62d2b07761',
  },
] as const;
