import { EXTERNAL_URLS } from '@/config/urls.config';
import { SocialProfile } from '@/types/data.type';

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
    url: EXTERNAL_URLS.SOCIAL.X,
    icon: 'XIcon',
    username: 'tong_lam_14',
    ariaLabel: 'Follow on X (Twitter)',
  },
];

export const getSocialProfile = (id: string): SocialProfile | undefined => {
  return socialProfiles.find(profile => profile.id === id);
};

export default socialProfiles;
