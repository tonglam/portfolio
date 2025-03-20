'use client';

import { useIcons } from '@/components/providers/IconProvider';
import UI from '@/config/ui.config';
import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';

/**
 * A button that appears when scrolling down and allows users to quickly return to the top of the page
 * @returns JSX.Element | null The rendered BackToTopButton component or null if icon is not found
 */
export default function BackToTopButton(): JSX.Element | null {
  const { getIcon } = useIcons();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = useCallback(() => {
    /**
     * Toggles the visibility of the back-to-top button based on scroll position
     */
    if (window.scrollY > UI.SCROLL_THRESHOLD) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, []);

  useEffect((): (() => void) => {
    window.addEventListener('scroll', toggleVisibility);

    return (): void => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  /**
   * Smoothly scrolls the window to the top
   */
  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const ArrowUpIcon = getIcon('ArrowUpIcon');
  if (!ArrowUpIcon) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 bg-gradient-to-r from-[#3B82F6] to-[#6366F1] dark:from-[#F472B6] dark:to-[#EC4899] text-white p-3 rounded-full shadow-lg hover:from-[#6366F1] hover:to-[#3B82F6] dark:hover:from-[#EC4899] dark:hover:to-[#F472B6] transition flex items-center justify-center z-50"
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowUpIcon className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
