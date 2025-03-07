/**
 * Centralized error handling utility
 * Provides consistent error handling across the application
 */

import { logger } from '@/lib/logger';

// HTTP status codes
const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  RATE_LIMITED: 429,
  SERVER_ERROR: 500,
};

/**
 * Error class with HTTP status code
 */
export class AppError extends Error {
  public readonly status: number;
  public readonly code?: string;
  public readonly details?: unknown;

  constructor(
    message: string,
    status: number = HTTP_STATUS.SERVER_ERROR,
    code?: string,
    details?: unknown
  ) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
    this.code = code;
    this.details = details;
    // Capturing stack trace, excluding constructor call from it
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Standard API errors
 */
export const ApiErrors = {
  BAD_REQUEST: (message = 'Bad request', code?: string, details?: unknown): AppError =>
    new AppError(message, HTTP_STATUS.BAD_REQUEST, code, details),

  UNAUTHORIZED: (message = 'Unauthorized', code?: string, details?: unknown): AppError =>
    new AppError(message, HTTP_STATUS.UNAUTHORIZED, code, details),

  FORBIDDEN: (message = 'Forbidden', code?: string, details?: unknown): AppError =>
    new AppError(message, HTTP_STATUS.FORBIDDEN, code, details),

  NOT_FOUND: (message = 'Resource not found', code?: string, details?: unknown): AppError =>
    new AppError(message, HTTP_STATUS.NOT_FOUND, code, details),

  RATE_LIMITED: (message = 'Too many requests', code?: string, details?: unknown): AppError =>
    new AppError(message, HTTP_STATUS.RATE_LIMITED, code, details),

  INTERNAL: (message = 'Internal server error', code?: string, details?: unknown): AppError =>
    new AppError(message, HTTP_STATUS.SERVER_ERROR, code, details),
};

/**
 * Handles errors in API routes
 */
export function handleApiError(error: unknown): {
  status: number;
  error: { message: string; code?: string; details?: unknown };
} {
  // If it's our custom error, use its properties
  if (error instanceof AppError) {
    logger.error({
      message: error.message,
      status: error.status,
      code: error.code,
      stack: error.stack,
    });

    return {
      status: error.status,
      error: {
        message: error.message,
        code: error.code,
        details: error.details,
      },
    };
  }

  // Handle regular errors
  const message = error instanceof Error ? error.message : 'Unknown error occurred';
  logger.error({
    message,
    stack: error instanceof Error ? error.stack : undefined,
  });

  return {
    status: HTTP_STATUS.SERVER_ERROR,
    error: {
      message,
      code: 'INTERNAL_ERROR',
    },
  };
}

/**
 * Safe JSON parsing with error handling
 */
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json) as T;
  } catch (error) {
    logger.error(`Error parsing JSON: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return fallback;
  }
}
