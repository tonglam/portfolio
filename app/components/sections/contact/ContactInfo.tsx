'use client';

import { useIcons } from '@/components/providers/IconProvider';
import type { ContactData, SocialLink } from '@/types/data/contact.type';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface ContactInfoProps {
  contactData: ContactData;
}

export function ContactInfo({ contactData }: ContactInfoProps): JSX.Element | null {
  const { getIcon } = useIcons();

  const EmailIcon = getIcon('EmailIcon');
  const LocationIcon = getIcon('LocationIcon');
  const GithubIcon = getIcon('GithubIcon');
  const LinkedinIcon = getIcon('LinkedinIcon');
  const XIcon = getIcon('XIcon');

  if (!EmailIcon || !LocationIcon) return null;

  const socialIcons = {
    GithubIcon,
    LinkedinIcon,
    XIcon,
  };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, delay: 0.2 },
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="flex flex-col justify-between"
    >
      <div>
        <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
          Contact Information
        </h3>

        <div className="space-y-6 mb-8">
          <motion.div
            className="flex items-start gap-4"
            whileHover={{ x: 5 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <div className="bg-gradient-to-r from-[#3B82F6] to-[#6366F1] dark:from-[#F472B6] dark:to-[#EC4899] p-3 rounded-lg shadow-md flex items-center justify-center">
              <EmailIcon size={20} className="text-white" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Email</h4>
              <a
                href={`mailto:${contactData.email}`}
                className="text-base font-medium text-gray-900 dark:text-white hover:text-[#2563EB] dark:hover:text-[#38BDF8] transition-colors"
              >
                {contactData.email}
              </a>
            </div>
          </motion.div>

          <motion.div
            className="flex items-start gap-4"
            whileHover={{ x: 5 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <div className="bg-gradient-to-r from-[#3B82F6] to-[#6366F1] dark:from-[#F472B6] dark:to-[#EC4899] p-3 rounded-lg shadow-md flex items-center justify-center">
              <LocationIcon size={20} className="text-white" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                Location
              </h4>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  contactData.address
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-medium text-gray-900 dark:text-white hover:text-[#2563EB] dark:hover:text-[#38BDF8] transition-colors"
              >
                {contactData.address}
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Follow Me</h3>
        <div className="grid grid-cols-5 gap-4">
          {contactData.socialLinks.map((profile: SocialLink) => {
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

      <div className="mt-8 bg-gradient-to-r from-[#3B82F6]/10 to-[#6366F1]/10 dark:from-[#F472B6]/10 dark:to-[#EC4899]/10 p-6 rounded-xl border border-[#3B82F6]/20 dark:border-[#F472B6]/20">
        <h4 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
          Let&apos;s Work Together
        </h4>
        <p className="text-gray-700 dark:text-gray-300 text-sm">
          I&apos;m currently available for freelance work. If you have a project that you want to
          get started or think you need my help with something, then get in touch.
        </p>
      </div>
    </motion.div>
  );
}
