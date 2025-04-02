'use client';

import { GithubIcon, LinkedinIcon, XIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import socialProfiles from '@/data/socialLinks.data';
import type { IconComponent } from '@/types/icon.type';
import Link from 'next/link';

const SOCIAL_ICONS: Record<string, IconComponent> = {
  GithubIcon,
  LinkedinIcon,
  XIcon,
} as const;

export default function SocialButtons() {
  return (
    <div className="flex space-x-4">
      {socialProfiles.map(profile => {
        const Icon = SOCIAL_ICONS[profile.icon];

        return (
          <Link key={profile.id} href={profile.url} target="_blank">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-10 h-10 sm:w-12 sm:h-12 border-[#3B82F6] dark:border-[#F472B6] hover:bg-gradient-to-r hover:from-[#3B82F6]/20 hover:to-[#6366F1]/20 dark:hover:from-[#F472B6]/20 dark:hover:to-[#EC4899]/20 flex items-center justify-center"
              aria-label={profile.ariaLabel}
            >
              <Icon className="text-[#3B82F6] dark:text-[#F472B6]" size={20} />
            </Button>
          </Link>
        );
      })}
    </div>
  );
}
