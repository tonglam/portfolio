/**
 * Pagination Component Props
 */
export interface PaginationProps {
  /** Current page number */
  currentPage: number;
  /** Total number of pages */
  totalPages: number;
  /** Callback function when page changes */
  onPageChange: (page: number) => void;
  /** Optional className for styling */
  className?: string;
}

/**
 * Loading State Props
 */
export interface LoadingStateProps {
  /** Loading message */
  message?: string;
  /** Optional className for styling */
  className?: string;
}

/**
 * Error State Props
 */
export interface ErrorStateProps {
  /** Error message */
  message: string;
  /** Optional retry function */
  onRetry?: () => void;
  /** Optional className for styling */
  className?: string;
}

/**
 * Empty State Props
 */
export interface EmptyStateProps {
  /** Empty state message */
  message: string;
  /** Optional action button text */
  actionText?: string;
  /** Optional action function */
  onAction?: () => void;
  /** Optional className for styling */
  className?: string;
}

/**
 * Tooltip Props
 */
export interface TooltipProps {
  /** Tooltip content */
  content: string;
  /** Tooltip position */
  position?: 'top' | 'right' | 'bottom' | 'left';
  /** Optional className for styling */
  className?: string;
  /** Children elements */
  children: React.ReactNode;
}

/**
 * Button Props
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button variant */
  variant?: 'default' | 'outline' | 'ghost' | 'link';
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
  /** Loading state */
  isLoading?: boolean;
  /** Optional icon */
  icon?: React.ReactNode;
  /** Optional className for styling */
  className?: string;
}
