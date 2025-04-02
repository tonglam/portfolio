import { CompanyDetails } from '@/types/data.type';
import Image from 'next/image';
import Link from 'next/link';

interface CompanyHeaderProps {
  title: string;
  company: CompanyDetails[string];
  period: string;
}

export function CompanyHeader({ title, company, period }: CompanyHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
      <div className="flex items-center mb-4 sm:mb-0">
        <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-gray-200 dark:border-gray-800">
          <Image
            src={
              company.logo ||
              'https://res.cloudinary.com/demo/image/upload/w_100,h_100,c_fill,q_auto,f_auto/placeholder'
            }
            alt={company.displayName}
            width={40}
            height={40}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="ml-3">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
          {company.url ? (
            <Link
              href={company.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#2563EB] dark:text-[#38BDF8] hover:underline font-medium"
            >
              {company.displayName}
            </Link>
          ) : (
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              {company.displayName}
            </span>
          )}
        </div>
      </div>
      <div className="inline-block px-4 py-2 rounded-full bg-[#2563EB]/10 dark:bg-[#38BDF8]/10 text-[#2563EB] dark:text-[#38BDF8] text-sm font-medium">
        {period}
      </div>
    </div>
  );
}
