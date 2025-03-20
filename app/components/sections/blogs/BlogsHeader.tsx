import type { BlogsHeaderProps } from '@/types/components/blog.type';

export function BlogsHeader({ title, subtitle }: BlogsHeaderProps): JSX.Element {
  return (
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#2563EB] to-[#4F46E5] dark:from-[#38BDF8] dark:to-[#818CF8] mb-4">
        {title}
      </h2>
      {subtitle && <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  );
}
