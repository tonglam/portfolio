import ui from '@/config/ui.config';
import type { ApiError } from '@/types/api/common.type';

/**
 * Retry a function with exponential backoff
 * @param fn Function to retry
 * @param retryCount Current retry count
 * @param maxRetries Maximum number of retries
 * @param baseDelay Base delay in milliseconds
 * @returns Promise that resolves with the function result
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  retryCount = 0,
  maxRetries = ui.RETRY.MAX_ATTEMPTS,
  baseDelay = ui.RETRY.BASE_DELAY_MS
): Promise<T> {
  try {
    return await fn();
  } catch (error: unknown) {
    if (retryCount >= maxRetries) {
      throw error;
    }

    const delay = Math.min(
      baseDelay * Math.pow(2, retryCount),
      baseDelay * Math.pow(2, maxRetries)
    );

    await new Promise(resolve => setTimeout(resolve, delay));

    return retryWithBackoff(fn, retryCount + 1, maxRetries, baseDelay);
  }
}

/**
 * Format error message from API error or Error object
 * @param error Error object
 * @returns Formatted error message
 */
export function formatErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  if (typeof error === 'object' && error !== null && 'message' in error) {
    return String((error as { message: unknown }).message);
  }
  return 'An unknown error occurred';
}

/**
 * Extract error message from API error
 * @param error API error object
 * @returns Error message
 */
export function getApiErrorMessage(error: ApiError | undefined): string {
  return error?.message || 'An unknown error occurred';
}

/**
 * Check if response is ok and has expected data
 * @param response API response
 * @returns True if response is valid
 */
export function isValidResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}
