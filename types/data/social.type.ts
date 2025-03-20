import type { LucideProps } from 'lucide-react';
import type { FC } from 'react';

export type SocialIconType = 'GithubIcon' | 'LinkedinIcon' | 'XIcon';
export type IconComponent = FC<LucideProps>;

export interface SocialProfile {
  id: string;
  url: string;
  icon: SocialIconType;
  ariaLabel: string;
}

export interface Certificate {
  id: string;
  name: string;
  shortName: string;
  imageUrl: string;
  credentialUrl: string;
}
