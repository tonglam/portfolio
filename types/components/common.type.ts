import type { ReactNode } from 'react';

/**
 * Common component props with children
 */
export interface ComponentWithChildrenProps {
  children: ReactNode;
}

/**
 * Common icon component props
 */
export interface IconProps {
  size?: string | number;
  className?: string;
}

/**
 * Error Boundary Props
 */
export interface ErrorBoundaryProps {
  /** Child components to be rendered */
  children: ReactNode;
  /** Optional custom fallback UI */
  fallback?: ReactNode;
  /** Optional error handler */
  onError?: (error: Error, info: React.ErrorInfo) => void;
  /** Whether to show full screen error UI */
  fullScreen?: boolean;
  /** Optional class name for styling */
  className?: string;
}

/**
 * Error Boundary State
 */
export interface ErrorBoundaryState {
  /** Whether an error has occurred */
  hasError: boolean;
  /** The error that occurred */
  error?: Error;
}
