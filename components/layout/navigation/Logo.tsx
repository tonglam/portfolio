import { cn } from '@/lib';
import Link from 'next/link';

export function Logo() {
  return (
    <Link
      href="/"
      className={cn(
        'bg-clip-text text-transparent text-xl sm:text-2xl font-bold',
        'bg-gradient-to-r from-[#38BDF8] to-[#818CF8]'
      )}
    >
      TONG
    </Link>
  );
}
