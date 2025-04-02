import { navigationItems } from '@/data/navigation.data';
import { motion } from 'framer-motion';
import Link from 'next/link';

export function QuickLinks() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Quick Links</h3>
      <ul className="space-y-2">
        {navigationItems.map((link, index) => (
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
  );
}
