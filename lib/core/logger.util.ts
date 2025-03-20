/**
 * Production-ready logger for Next.js
 * Supports log levels and handles errors gracefully
 */

import { LogLevel, type LogMessage } from '@/types/config/log.type';

// Production-ready logger
export const logger = {
  error: (error: LogMessage, context?: string): void => {
    // Always log errors in any environment
    const prefix = context ? `[${LogLevel.ERROR}][${context}]` : `[${LogLevel.ERROR}]`;
    console.error(prefix, error);
  },

  warn: (message: LogMessage, context?: string): void => {
    // Log warnings in development and production
    const prefix = context ? `[${LogLevel.WARN}][${context}]` : `[${LogLevel.WARN}]`;
    console.warn(prefix, message);
  },
};

// Export types for better TypeScript support
export type Logger = typeof logger;
