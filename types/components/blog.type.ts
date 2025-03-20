import type { ProcessedBlogPost } from '@/types/api/blog.type';

/**
 * Blog Grid Component Props
 */
export interface BlogGridProps {
  /** Current search query string */
  searchQuery: string;
  /** Currently selected category */
  activeCategory: string;
}

/**
 * Blog Card Component Props
 */
export interface BlogCardProps {
  /** Blog post data to display */
  blog: ProcessedBlogPost;
}

/**
 * Category Filter Component Props
 */
export interface CategoryFilterProps {
  /** Callback when search query changes */
  onSearchChange: (query: string) => void;
  /** Callback when category selection changes */
  onCategoryChange: (category: string) => void;
}

/**
 * Blogs Header Component Props
 */
export interface BlogsHeaderProps {
  /** Title of the blogs section */
  title: string;
  /** Optional subtitle or description */
  subtitle?: string;
}

/**
 * Blog Section Component Props
 */
export interface BlogSectionProps {
  /** Initial category to display */
  initialCategory?: string;
  /** Initial search query */
  initialSearchQuery?: string;
}
