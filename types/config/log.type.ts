/**
 * Logging configuration types
 */

export enum LogLevel {
  ERROR = 'ERROR',
  WARN = 'WARN',
  INFO = 'INFO',
  DEBUG = 'DEBUG',
}

export interface LogContext {
  level: LogLevel;
  context?: string;
  timestamp?: string;
}

export type LogMessage = string | Error | unknown;
