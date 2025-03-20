/**
 * Common type definitions used across the application
 */

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export interface Pagination {
  page: number;
  limit: number;
  totalPages: number;
  totalItems: number;
  hasMore: boolean;
}

export type ApiErrorCode =
  | 'NOT_FOUND'
  | 'BAD_REQUEST'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'INTERNAL_SERVER_ERROR';

export interface ApiError {
  code: ApiErrorCode;
  message: string;
  details?: unknown;
}

export interface Metadata {
  createdAt: string;
  updatedAt?: string;
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
