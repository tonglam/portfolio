import { useIcons } from '@/components/providers/IconProvider';
import socialProfiles from '@/data/socialLinks.data';
import { cn } from '@/lib/utils';
import type { FooterLogoProps } from '@/types/components/footer.type';
import { motion } from 'framer-motion';
import Link from 'next/link';

export function FooterLogo({ className }: FooterLogoProps): JSX.Element {
  const { getIcon } = useIcons();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn('', className)}
    >
      <Link
        href="/"
        className="bg-clip-text text-transparent bg-gradient-to-r from-[#2563EB] to-[#4F46E5] dark:from-[#38BDF8] dark:to-[#818CF8] text-2xl font-bold inline-block mb-4"
      >
        Tong
      </Link>
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
        Full-stack engineer evolving for the new era of tech.
      </p>
      <div className="flex space-x-3">
        {socialProfiles.map(profile => {
          const IconComponent = getIcon(profile.icon);
          if (!IconComponent) return null;

          return (
            <Link
              key={profile.id}
              href={profile.url}
              target="_blank"
              aria-label={profile.ariaLabel}
              className="transition-transform hover:scale-110"
            >
              <IconComponent
                size={20}
                className="text-gray-400 hover:text-[#2563EB] dark:hover:text-[#38BDF8] transition-colors duration-300"
              />
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
}
