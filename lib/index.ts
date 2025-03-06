/**
 * Central exports for the lib directory
 * This file provides a clean interface for importing utilities
 */

// Core utilities
export * from './codeHighlighter';
export * from './config-validator';
export * from './dependency-container';
export * from './error-handler';
export { logger, type Logger } from './logger';
export { cn } from './utils';

// Re-export specific subdirectory exports using the new files
export * as api from './api';
export * as services from './services';
export * as utils from './utils-reexport';
