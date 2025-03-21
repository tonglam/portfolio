import { navigationItems } from '@/data/navigation.data';
import type { DesktopNavProps } from '@/types/components/navigation.type';
import Link from 'next/link';

export function DesktopNav({ activeSection }: DesktopNavProps): JSX.Element {
  return (
    <div className="hidden md:flex items-center space-x-3 lg:space-x-6">
      {navigationItems.map((link, index) => (
        <Link
          key={index}
          href={link.href}
          className={`text-xs lg:text-sm transition-colors duration-200 relative group ${
            activeSection === link.href.substring(1)
              ? 'text-[#38BDF8]'
              : 'text-gray-300 hover:text-[#38BDF8]'
          }`}
        >
          {link.label}
          <span
            className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-[#38BDF8] transition-all duration-200 ${
              activeSection === link.href.substring(1) ? 'w-full' : 'group-hover:w-full'
            }`}
          ></span>
        </Link>
      ))}
    </div>
  );
}
