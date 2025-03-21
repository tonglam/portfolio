import { useIcons } from '@/components/providers/IconProvider';
import { contactData } from '@/data/contact.data';
import { cn } from '@/lib/utils';
import type { ContactInfoProps } from '@/types/components/footer.type';
import { motion } from 'framer-motion';

export function ContactInfo({ className }: ContactInfoProps): JSX.Element {
  const { getIcon } = useIcons();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={cn('', className)}
    >
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Contact Info</h3>
      <ul className="space-y-3">
        <li className="flex items-start space-x-3">
          {getIcon('EmailIcon')?.({
            size: 18,
            className: 'text-[#2563EB] dark:text-[#38BDF8] mt-0.5',
          })}
          <a
            href={`mailto:${contactData.email}`}
            className="text-gray-600 dark:text-gray-400 text-sm hover:text-[#2563EB] dark:hover:text-[#38BDF8] transition-colors duration-300"
          >
            {contactData.email}
          </a>
        </li>
        <li className="flex items-start space-x-3">
          {getIcon('LocationIcon')?.({
            size: 18,
            className: 'text-[#2563EB] dark:text-[#38BDF8] mt-0.5',
          })}
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
  );
}
