import type { Image, Link, Metadata } from '../common';
import type { ProjectUrlType } from '../config/urls';

/**
 * Project types
 */
export interface Project extends Metadata {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  links: Array<{
    type: ProjectUrlType;
    url: string;
    label: string;
  }>;
  featured: boolean;
  image?: Image;
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

/**
 * Skill types
 */
export interface Skill {
  name: string;
  icon: string;
  level: number; // 1-5
  category: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  description: string;
  skills: Skill[];
}

/**
 * Certificate types
 */
export interface Certificate extends Metadata {
  id: string;
  name: string;
  organization: string;
  issueDate: string;
  expiryDate?: string;
  credentialURL: string;
  credentialID?: string;
  description: string;
  skills: string[];
  logo?: string;
}

/**
 * Social profile types
 */
export interface SocialProfile extends Link {
  id: string;
  username: string;
  ariaLabel: string;
}
