'use client';

import { GithubIcon, LinkedinIcon, XIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import socialProfiles from '@/data/socialLinks.data';
import Link from 'next/link';

// Define icon types for TypeScript
type SocialIconType = 'GithubIcon' | 'LinkedinIcon' | 'XIcon';
type IconComponent = typeof GithubIcon;

// Map of icon components for easy reference
const socialIcons: Record<SocialIconType, IconComponent> = {
  GithubIcon,
  LinkedinIcon,
  XIcon,
};

export default function SocialButtons(): JSX.Element {
  return (
    <div className="flex space-x-4">
      {socialProfiles.map(profile => {
        // Type-safe icon lookup
        const iconName = profile.icon as SocialIconType;
        const IconComponent = socialIcons[iconName];

        if (!IconComponent) return null;

        return (
          <Link key={profile.id} href={profile.url} target="_blank" aria-label={profile.ariaLabel}>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-10 h-10 sm:w-12 sm:h-12 border-[#3B82F6] dark:border-[#F472B6] hover:bg-gradient-to-r hover:from-[#3B82F6]/20 hover:to-[#6366F1]/20 dark:hover:from-[#F472B6]/20 dark:hover:to-[#EC4899]/20 flex items-center justify-center"
            >
              <IconComponent className="text-[#3B82F6] dark:text-[#F472B6]" size={20} />
            </Button>
          </Link>
        );
      })}
    </div>
  );
}
