enum LogLevel {
  ERROR = 'ERROR',
  WARN = 'WARN',
  INFO = 'INFO',
  DEBUG = 'DEBUG',
}

type LogMessage = string | Error | unknown;

export const logger = {
  error: (error: LogMessage, context?: string): void => {
    const prefix = context ? `[${LogLevel.ERROR}][${context}]` : `[${LogLevel.ERROR}]`;
    console.error(prefix, error);
  },

  warn: (message: LogMessage, context?: string): void => {
    const prefix = context ? `[${LogLevel.WARN}][${context}]` : `[${LogLevel.WARN}]`;
    console.warn(prefix, message);
  },
};

export type Logger = typeof logger;
