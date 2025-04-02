import { motion } from 'framer-motion';

export function Copyright() {
  return (
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
  );
}
