import { motion } from 'framer-motion';

interface TimelineDotProps {
  position?: 'start' | 'middle' | 'end';
}

export function TimelineDot({ position = 'middle' }: TimelineDotProps) {
  if (position === 'end') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="absolute left-8 md:left-1/2 bottom-0 w-8 h-8 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#6366F1] dark:from-[#F472B6] dark:to-[#EC4899] transform -translate-x-1/2 z-20 flex items-center justify-center"
      >
        <span className="text-white text-xs">✓</span>
      </motion.div>
    );
  }

  return (
    <div className="absolute left-8 md:left-1/2 w-6 h-6 rounded-full bg-white dark:bg-[#1E293B] border-4 border-[#3B82F6] dark:border-[#F472B6] transform -translate-x-1/2 z-20"></div>
  );
}
