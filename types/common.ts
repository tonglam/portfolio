/**
 * Common type definitions shared across the application
 */

// Common pagination type used across API responses
export interface Pagination {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasMore: boolean;
}

// Base API response type
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: {
    message: string;
    code?: number;
    details?: unknown;
  };
}

// Common metadata interface
export interface Metadata {
  createdAt: string;
  updatedAt?: string;
}

// Common link interface
export interface Link {
  url: string;
  label: string;
  icon?: string;
}

// Common image interface
export interface Image {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
}
