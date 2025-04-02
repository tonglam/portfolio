import { EmailIcon, LocationIcon } from '@/components/icons';
import { EXTERNAL_URLS } from '@/config/urls.config';
import { contactData } from '@/data/contact.data';
import { motion } from 'framer-motion';
import Link from 'next/link';

export function ContactInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Contact Info</h3>
      <ul className="space-y-3">
        <li className="flex items-start space-x-3">
          <EmailIcon size={18} className="text-[#2563EB] dark:text-[#38BDF8] mt-0.5" />
          <Link
            href={EXTERNAL_URLS.SOCIAL.EMAIL}
            className="text-gray-600 dark:text-gray-400 text-sm hover:text-[#2563EB] dark:hover:text-[#38BDF8] transition-colors duration-300"
          >
            {contactData.email}
          </Link>
        </li>
        <li className="flex items-start space-x-3">
          <LocationIcon size={18} className="text-[#2563EB] dark:text-[#38BDF8] mt-0.5" />
          <Link
            href={EXTERNAL_URLS.MAPS.SEARCH(contactData.address)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-400 text-sm hover:text-[#2563EB] dark:hover:text-[#38BDF8] transition-colors duration-300 cursor-pointer"
          >
            {contactData.address}
          </Link>
        </li>
      </ul>
    </motion.div>
  );
}
