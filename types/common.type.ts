/**
 * Common type definitions used across the application
 */

export type ApiErrorCode =
  | 'NOT_FOUND'
  | 'BAD_REQUEST'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'INTERNAL_SERVER_ERROR'
  | 'CONFIGURATION_ERROR';

export interface ApiError {
  code: ApiErrorCode;
  message: string;
  details?: unknown;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
  message?: string;
}

export interface PaginationData {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasMore: boolean;
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
  data: T & {
    pagination: PaginationData;
  };
}

export interface Metadata {
  createdAt: string;
  updatedAt?: string;
}

export interface Image {
  url: string;
  alt?: string;
}

export interface Link {
  url: string;
  label: string;
}

export const createApiError = (
  code: ApiErrorCode,
  message: string,
  details?: unknown
): ApiError => ({
  code,
  message,
  details,
});
