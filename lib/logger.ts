/**
 * Safe logger for Next.js
 * Avoids worker thread issues and handles errors gracefully
 */

// Simple logger that won't crash
export const logger = {
  info: (message: string): void => {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[INFO] ${message}`);
    }
  },

  error: (error: unknown): void => {
    if (process.env.NODE_ENV !== 'production') {
      console.error('[ERROR]', error);
    }
  },

  warn: (message: string): void => {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`[WARN] ${message}`);
    }
  },

  debug: (message: string): void => {
    if (process.env.NODE_ENV === 'development') {
      console.debug(`[DEBUG] ${message}`);
    }
  },
};

// Export types for better TypeScript support
export type Logger = typeof logger;
