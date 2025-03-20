'use client';

import { contactData } from '@/app/data/contact.data';
import { navigationItems as navigationLinks } from '@/app/data/navigation.data';
import socialProfiles from '@/app/data/socialLinks.data';
import { EmailIcon, GithubIcon, LinkedinIcon, LocationIcon, XIcon } from '@/components/icons';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Map of icon components for easy reference - consistent with other components
const socialIcons: Record<string, React.FC<{ size?: string | number; className?: string }>> = {
  GithubIcon,
  LinkedinIcon,
  XIcon,
};

export default function Footer(): JSX.Element {
  return (
    <footer className="pt-16 pb-8 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gradient-to-r dark:from-[#0F172A] dark:to-[#1E293B]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
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
                  // Ensure icon exists in our map before rendering
                  const IconComponent = socialIcons[profile.icon];
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
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                Quick Links
              </h3>
              <ul className="space-y-2">
                {navigationLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-gray-600 dark:text-gray-400 hover:text-[#2563EB] dark:hover:text-[#38BDF8] transition-colors duration-300 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                Contact Info
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <EmailIcon size={18} className="text-[#2563EB] dark:text-[#38BDF8] mt-0.5" />
                  <a
                    href={`mailto:${contactData.email}`}
                    className="text-gray-600 dark:text-gray-400 text-sm hover:text-[#2563EB] dark:hover:text-[#38BDF8] transition-colors duration-300"
                  >
                    {contactData.email}
                  </a>
                </li>
                <li className="flex items-start space-x-3">
                  <LocationIcon size={18} className="text-[#2563EB] dark:text-[#38BDF8] mt-0.5" />
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      contactData.address
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 text-sm hover:text-[#2563EB] dark:hover:text-[#38BDF8] transition-colors duration-300 cursor-pointer"
                  >
                    {contactData.address}
                  </a>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-gray-800 my-6"></div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-gray-500 dark:text-gray-400 text-sm mb-4 md:mb-0 text-center"
          >
            © {new Date().getFullYear()} Developed by{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2563EB] to-[#4F46E5] dark:from-[#38BDF8] dark:to-[#818CF8]">
              Tong
            </span>
            . All rights reserved.
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
