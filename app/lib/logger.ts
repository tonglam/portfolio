import pino from 'pino';

// Configure logger
export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  // Format logs for development environment
  ...(process.env.NODE_ENV === 'development' && {
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
      },
    },
  }),
});

// Export types for better TypeScript support
export type Logger = typeof logger;
