export interface ApiResponse<T> {
  data: T;
  success: boolean;
}

export interface ApiError {
  error: string;
  code: ApiErrorCode;
  success: false;
}

export type ApiErrorCode =
  | 'CATEGORIES_FETCH_ERROR'
  | 'INTERNAL_SERVER_ERROR'
  | 'NOT_FOUND'
  | 'BLOG_FETCH_ERROR';

export const createApiError = (code: ApiErrorCode, message: string): ApiError => ({
  error: message,
  code,
  success: false,
});
