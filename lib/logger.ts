/**
 * Production-ready logger for Next.js
 * Supports log levels and handles errors gracefully
 */

export enum LogLevel {
  ERROR = 'ERROR',
  WARN = 'WARN',
  INFO = 'INFO',
  DEBUG = 'DEBUG',
}

type LogMessage = string | Error | unknown;

// Production-ready logger
export const logger = {
  error: (error: LogMessage, context?: string): void => {
    // Always log errors in any environment
    const prefix = context ? `[ERROR][${context}]` : '[ERROR]';
    console.error(prefix, error);
  },

  warn: (message: LogMessage, context?: string): void => {
    // Log warnings in development and production
    const prefix = context ? `[WARN][${context}]` : '[WARN]';
    console.warn(prefix, message);
  },

  info: (message: string, context?: string): void => {
    // Only log info in development
    if (process.env.NODE_ENV !== 'production') {
      const prefix = context ? `[INFO][${context}]` : '[INFO]';
      console.warn(prefix, message);
    }
  },

  debug: (message: string, context?: string): void => {
    // Only log debug in development
    if (process.env.NODE_ENV === 'development') {
      const prefix = context ? `[DEBUG][${context}]` : '[DEBUG]';
      console.warn(prefix, message);
    }
  },
};

// Export types for better TypeScript support
export type Logger = typeof logger;
