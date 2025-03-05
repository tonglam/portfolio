import { EXTERNAL_URLS } from "@/config/constants";

export const experienceData = [
  {
    period: "Dec 2021 - Jun 2023",
    title: "Senior Software Engineer",
    company: "eSurfing Cloud",
  },
  {
    period: "Jan 2018 - Dec 2021",
    title: "Senior Software Engineer",
    company: "NetEase, Inc",
  },
  {
    period: "Jul 2014 - Jan 2018",
    title: "Junior Software Engineer",
    company: "China Telecom Corporation Limited",
  },
];

// Specific skills gained throughout career
export const gainedSkills = [
  "Java",
  "JavaScript",
  "TypeScript",
  "Python",
  "HTML/CSS",
  "SpringBoot",
  "React.js",
  "Next.js",
  "Node.js",
  "Flask",
  "MySQL",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "Sqlite",
  "Jenkins",
  "Docker",
  "Nginx",
  "Kubernetes",
  "Microservices",
  "DevOps",
  "Cloud",
  "Agile development",
  "AWS",
  "AI Coding",
];

// Professional skills data
export const skillsData = [
  { name: "System Architecture & Design", percentage: 90 },
  { name: "Frontend Development", percentage: 85 },
  { name: "Backend Development", percentage: 100 },
  { name: "Cloud Infrastructure", percentage: 70 },
  { name: "DevOps", percentage: 80 },
  { name: "Testing, Quality Assurance & Automation", percentage: 70 },
  { name: "Data Management & Database Optimization", percentage: 80 },
  { name: "Soft Skills & Communication", percentage: 90 },
  { name: "Emerging Technologies & Trends", percentage: 80 },
];

// Company details with responsibilities and technologies
export const companyDetails = {
  "eSurfing Cloud": {
    logo: EXTERNAL_URLS.COMPANY.ESURFING_CLOUD.LOGO,
    url: EXTERNAL_URLS.COMPANY.ESURFING_CLOUD.URL,
    displayName: "China Telecom eSurfing Cloud",
    responsibilities: [
      "Led the development of core modules for the cloud billing system using microservices architecture",
      "Implemented CI/CD pipelines for automated testing and deployment",
      "Optimized application performance and scalability on cloud infrastructure",
    ],
    technologies: [
      "Java",
      "Spring Boot",
      "Spring Cloud",
      "MySQL",
      "Redis",
      "Kafka",
      "Docker",
      "Kubernetes",
      "Jenkins",
      "Git",
    ],
  },
  "NetEase Games": {
    logo: EXTERNAL_URLS.COMPANY.NETEASE.LOGO,
    url: EXTERNAL_URLS.COMPANY.NETEASE.URL,
    displayName: "NetEase Games",
    responsibilities: [
      "Developed and maintained backend services for multiple mobile games",
      "Designed and implemented RESTful APIs for game features",
      "Collaborated with cross-functional teams to deliver game updates",
    ],
    technologies: [
      "Java",
      "Spring Boot",
      "MySQL",
      "Redis",
      "RabbitMQ",
      "Docker",
      "Git",
    ],
  },
  "China Telecom": {
    logo: EXTERNAL_URLS.COMPANY.CHINA_TELECOM.LOGO,
    url: EXTERNAL_URLS.COMPANY.CHINA_TELECOM.URL,
    displayName: "China Telecom",
    responsibilities: [
      "Developed and maintained enterprise applications for telecommunications services",
      "Implemented data processing pipelines for customer analytics",
      "Collaborated with business teams to define requirements and deliver solutions",
    ],
    technologies: [
      "Java",
      "Spring Framework",
      "Oracle",
      "Hibernate",
      "Maven",
      "SVN",
    ],
  },
};
