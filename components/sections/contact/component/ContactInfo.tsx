'use client';

import { EmailIcon, LocationIcon } from '@/components/icons';
import { ContactData } from '@/types/data.type';
import { motion } from 'framer-motion';
import { ContactItem } from './ContactItem';
import { SocialLinks } from './SocialLinks';
import { WorkAvailability } from './WorkAvailability';

interface ContactInfoProps {
  contactData: ContactData;
}

export function ContactInfo({ contactData }: ContactInfoProps) {
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
          <ContactItem
            icon={EmailIcon}
            title="Email"
            value={contactData.email}
            href={`mailto:${contactData.email}`}
          />

          <ContactItem
            icon={LocationIcon}
            title="Location"
            value={contactData.address}
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              contactData.address
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          />
        </div>
      </div>

      <SocialLinks socialLinks={contactData.socialLinks} />

      <WorkAvailability />
    </motion.div>
  );
}
