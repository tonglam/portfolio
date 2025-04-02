import { Button } from '@/components/ui/button';
import { EXTERNAL_URLS } from '@/config/urls.config';
import Link from 'next/link';

export default function ActionButtons() {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
      <Link href="#contact" className="w-full sm:w-auto">
        <Button className="w-full bg-white dark:bg-[#1E293B] hover:bg-gray-100 dark:hover:bg-gradient-to-r dark:hover:from-[#1E293B] dark:hover:to-[#334155] text-gray-900 dark:text-white border border-[#2563EB] dark:border-[#38BDF8] text-sm h-10">
          CONTACT ME 👋
        </Button>
      </Link>
      <Link
        href={EXTERNAL_URLS.RESUME}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full sm:w-auto"
      >
        <Button className="w-full bg-gradient-to-r from-[#3B82F6] to-[#6366F1] dark:from-[#F472B6] dark:to-[#EC4899] hover:from-[#6366F1] hover:to-[#3B82F6] dark:hover:from-[#EC4899] dark:hover:to-[#F472B6] text-white text-sm h-10">
          GET RESUME ⬇
        </Button>
      </Link>
    </div>
  );
}
