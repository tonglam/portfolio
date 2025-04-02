import { navigationItems } from '@/data/navigation.data';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface MobileNavProps {
  isOpen: boolean;
  activeSection: string;
  onLinkClick: () => void;
}

export function MobileNav({ isOpen, activeSection, onLinkClick }: MobileNavProps) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      className="md:hidden mt-4 bg-[#1E293B] rounded-lg p-4 shadow-lg mobile-menu-container"
    >
      <div className="flex flex-col space-y-2">
        {navigationItems.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className={`py-2 px-4 rounded-md transition-colors duration-200 ${
              activeSection === link.href.substring(1)
                ? 'bg-[#0F172A] text-[#38BDF8]'
                : 'text-gray-300 hover:bg-[#0F172A] hover:text-[#38BDF8]'
            }`}
            onClick={onLinkClick}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </motion.div>
  );
}
