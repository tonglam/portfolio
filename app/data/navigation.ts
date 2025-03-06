/**
 * Navigation data for the site
 * Contains all navigation links and their properties
 */

export interface NavigationItem {
  name: string;
  href: string;
  icon?: string;
  isExternal?: boolean;
  label?: string;
}

export const navigationItems: NavigationItem[] = [
  { name: 'About', href: '#about', label: 'ABOUT' },
  { name: 'Experience', href: '#experience', label: 'EXPERIENCE' },
  { name: 'Education', href: '#education', label: 'EDUCATION' },
  { name: 'Skills', href: '#skills', label: 'SKILLS' },
  { name: 'Projects', href: '#projects', label: 'PROJECTS' },
  { name: 'Blogs', href: '#blogs', label: 'BLOGS' },
  { name: 'Contact', href: '#contact', label: 'CONTACT' },
];

export default navigationItems;
