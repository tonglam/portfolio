import type { Metadata } from '@/types/common.type';
import type { FC } from 'react';

/**
 * Project types
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

/**
 * Navigation types
 */
export interface NavigationItem {
  name: string;
  href: string;
  icon?: string;
  isExternal?: boolean;
  label?: string;
}

/**
 * About types
 */
export interface AboutData {
  title: string;
  content: string;
}

/**
 * Contact types
 */
export interface ContactData {
  intro: string;
  email: string;
  address: string;
  socialLinks: SocialProfile[];
}

/**
 * Social profile types
 */
export interface SocialProfile {
  id: string;
  name: string;
  url: string;
  icon: string;
  username: string;
  ariaLabel: string;
}

/**
 * Education types
 */
export interface EducationItem {
  period: string;
  institution: string;
  degree: string;
  details: string[];
}

/**
 * Experience types
 */
export type ExperienceType = 'fulltime' | 'parttime' | 'contract' | 'freelance' | 'internship';

export interface Experience extends Metadata {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string | null;
  description: string;
  skills: string[];
  achievements: string[];
  type: ExperienceType;
  logo?: string;
  url?: string;
}

export interface ExperienceItem {
  period: string;
  title: string;
  company: string;
}

export interface ProfessionalSkill {
  name: string;
  percentage: number;
}

export interface CompanyDetail {
  logo: string;
  url: string;
  displayName: string;
  responsibilities: string[];
  technologies: string[];
  achievements?: string[];
}

export interface CompanyDetails {
  [companyName: string]: CompanyDetail;
}

/**
 * Skill types
 */
export interface Skill {
  name: string;
  icon: FC<{ size?: string | number; className?: string }>;
  color: string;
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
}

export interface SkillsData {
  categories: SkillCategory[];
}

/**
 * Certificate types
 */
export interface Certificate {
  id: string;
  name: string;
  shortName: string;
  issuer: string;
  issueDate: string;
  credentialId: string;
  credentialUrl: string;
  imageUrl: string;
  skills: string[];
}
