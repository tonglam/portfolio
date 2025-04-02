'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import type { ComponentType } from 'react';

interface ContactItemProps {
  icon: ComponentType<{ size?: number; className?: string }>;
  title: string;
  value: string;
  href: string;
  target?: string;
  rel?: string;
}

export function ContactItem({ icon: Icon, title, value, href, target, rel }: ContactItemProps) {
  return (
    <motion.div
      className="flex items-start gap-4"
      whileHover={{ x: 5 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
    >
      <div className="bg-gradient-to-r from-[#3B82F6] to-[#6366F1] dark:from-[#F472B6] dark:to-[#EC4899] p-3 rounded-lg shadow-md flex items-center justify-center">
        <Icon size={20} className="text-white" />
      </div>
      <div>
        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{title}</h4>
        <Link
          href={href}
          target={target}
          rel={rel}
          className="text-base font-medium text-gray-900 dark:text-white hover:text-[#2563EB] dark:hover:text-[#38BDF8] transition-colors"
        >
          {value}
        </Link>
      </div>
    </motion.div>
  );
}
