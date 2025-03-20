'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ActionButtons(): JSX.Element {
  /**
   * Handles the resume download event
   * In a production environment, this would track analytics
   */
  const handleDownloadResume = (): void => {
    // Track download event if analytics are implemented
    // Analytics tracking would go here
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
      <Link href="#contact" className="w-full sm:w-auto">
        <Button className="w-full bg-white dark:bg-[#1E293B] hover:bg-gray-100 dark:hover:bg-gradient-to-r dark:hover:from-[#1E293B] dark:hover:to-[#334155] text-gray-900 dark:text-white border border-[#2563EB] dark:border-[#38BDF8] text-sm h-10 cursor-pointer">
          CONTACT ME 👋
        </Button>
      </Link>
      <a
        href="https://qitonglan.com/resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleDownloadResume}
      >
        <Button className="w-full sm:w-auto bg-gradient-to-r from-[#3B82F6] to-[#6366F1] dark:from-[#F472B6] dark:to-[#EC4899] hover:from-[#6366F1] hover:to-[#3B82F6] dark:hover:from-[#EC4899] dark:hover:to-[#F472B6] text-white text-sm h-10 cursor-pointer">
          GET RESUME ⬇
        </Button>
      </a>
    </div>
  );
}
