/**
 * Centralized error handling utilities
 */

import { HTTP } from '@/config/common.config';
import ui from '@/config/ui.config';
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
    status: number = HTTP.STATUS.SERVER_ERROR,
    code?: string,
    details?: unknown
  ) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
    this.code = code;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Standard API errors
 */
export const ApiErrors = {
  BAD_REQUEST: (message = 'Bad request', code?: string, details?: unknown): AppError =>
    new AppError(message, HTTP.STATUS.BAD_REQUEST, code, details),

  UNAUTHORIZED: (message = 'Unauthorized', code?: string, details?: unknown): AppError =>
    new AppError(message, HTTP.STATUS.UNAUTHORIZED, code, details),

  FORBIDDEN: (message = 'Forbidden', code?: string, details?: unknown): AppError =>
    new AppError(message, HTTP.STATUS.FORBIDDEN, code, details),

  NOT_FOUND: (message = 'Resource not found', code?: string, details?: unknown): AppError =>
    new AppError(message, HTTP.STATUS.NOT_FOUND, code, details),

  RATE_LIMITED: (message = 'Too many requests', code?: string, details?: unknown): AppError =>
    new AppError(message, HTTP.STATUS.RATE_LIMITED, code, details),

  INTERNAL: (message = 'Internal server error', code?: string, details?: unknown): AppError =>
    new AppError(message, HTTP.STATUS.SERVER_ERROR, code, details),
};

/**
 * Error handling utilities
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

export function isValidResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

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
    options?.status ?? (error instanceof AppError ? error.status : HTTP.STATUS.SERVER_ERROR);

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
