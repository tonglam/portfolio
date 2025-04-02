'use client';

import { GithubIcon, LinkedinIcon, XIcon } from '@/components/icons';
import { motion } from 'framer-motion';
import Link from 'next/link';
import type { ComponentType } from 'react';

interface SocialLink {
  id: string;
  icon: string;
  url: string;
  ariaLabel: string;
}

interface SocialLinksProps {
  socialLinks: SocialLink[];
}

export function SocialLinks({ socialLinks }: SocialLinksProps) {
  const socialIcons: {
    [key: string]: ComponentType<{ size?: number; className?: string }> | undefined;
  } = {
    GithubIcon,
    LinkedinIcon,
    XIcon,
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Follow Me</h3>
      <div className="grid grid-cols-5 gap-4">
        {socialLinks.map((profile: SocialLink) => {
          const Icon = socialIcons[profile.icon as keyof typeof socialIcons];
          return Icon ? (
            <motion.div key={profile.id} whileHover={{ y: -5 }} whileTap={{ scale: 0.95 }}>
              <Link href={profile.url} target="_blank" aria-label={profile.ariaLabel}>
                <div className="bg-gradient-to-r from-[#3B82F6] to-[#6366F1] dark:from-[#F472B6] dark:to-[#EC4899] hover:from-[#6366F1] hover:to-[#3B82F6] dark:hover:from-[#EC4899] dark:hover:to-[#F472B6] p-3 rounded-lg shadow-md flex items-center justify-center transition-all duration-300">
                  <Icon size={20} className="text-gray-100" />
                </div>
              </Link>
            </motion.div>
          ) : null;
        })}
      </div>
    </div>
  );
}
