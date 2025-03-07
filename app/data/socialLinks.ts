/**
 * Social media profile links
 * Single source of truth for all social media links used throughout the site
 */
import { EXTERNAL_URLS } from '@/config';

/**
 * Social profile interface
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
 * Main social profiles with structured data
 */
export const socialProfiles: SocialProfile[] = [
  {
    id: 'github',
    name: 'GitHub',
    url: EXTERNAL_URLS.SOCIAL.GITHUB,
    icon: 'GithubIcon',
    username: 'tonglam',
    ariaLabel: 'View GitHub profile',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    url: EXTERNAL_URLS.SOCIAL.LINKEDIN,
    icon: 'LinkedinIcon',
    username: 'qitonglan',
    ariaLabel: 'Connect on LinkedIn',
  },
  {
    id: 'twitter',
    name: 'X (Twitter)',
    url: EXTERNAL_URLS.SOCIAL.TWITTER,
    icon: 'XIcon',
    username: 'tong_lam_14',
    ariaLabel: 'Follow on X (Twitter)',
  },
];

/**
 * Get a specific social profile by ID
 * @param {string} id - The ID of the social profile to retrieve
 * @returns {SocialProfile|undefined} The social profile object or undefined if not found
 */
export const getSocialProfile = (id: string): SocialProfile | undefined => {
  return socialProfiles.find(profile => profile.id === id);
};

export default socialProfiles;
