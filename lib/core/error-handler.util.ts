/**
 * Centralized error handling utility
 * Provides consistent error handling across the application
 */

import { HTTP_STATUS } from '@/types/config/http.type';
import { NextResponse } from 'next/server';
import { logger } from './logger.util';

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

interface RouteErrorOptions {
  status?: number;
  headers?: Record<string, string>;
}

/**
 * Handles route errors and returns a consistent NextResponse
 */
export function handleRouteError(
  error: unknown,
  context = 'API Route',
  options?: RouteErrorOptions
): NextResponse {
  logger.error(error, context);

  const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
  const status =
    options?.status ?? (error instanceof AppError ? error.status : HTTP_STATUS.SERVER_ERROR);

  return NextResponse.json(
    {
      success: false,
      error: {
        message: errorMessage,
        details: error instanceof AppError ? error.details : undefined,
      },
    },
    {
      status,
      headers: options?.headers,
    }
  );
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
