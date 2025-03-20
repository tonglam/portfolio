import type { ErrorMessages } from '@/types/config/errors.type';
import { LIMITS } from './common.config';

/**
 * Error messages used throughout the application
 */

export const ERRORS: ErrorMessages = {
  AUTH: {
    INVALID_CREDENTIALS: 'Invalid email or password',
    UNAUTHORIZED: 'You must be logged in to access this resource',
    FORBIDDEN: 'You do not have permission to access this resource',
    SESSION_EXPIRED: 'Your session has expired. Please log in again',
    NOT_AUTHENTICATED: 'You must be logged in to perform this action',
  },
  VALIDATION: {
    REQUIRED_FIELD: (field: string) => `${field} is required`,
    INVALID_EMAIL: 'Invalid email address',
    INVALID_URL: 'Please enter a valid URL',
    INVALID_PASSWORD: `Password must be at least ${LIMITS.MIN_PASSWORD_LENGTH} characters long`,
    PASSWORDS_DO_NOT_MATCH: 'Passwords do not match',
    MAX_LENGTH: (field: string, length: number) => `${field} cannot exceed ${length} characters`,
    MIN_LENGTH: (field: string, length: number) => `${field} must be at least ${length} characters`,
    INVALID_FORMAT: (field: string) => `Invalid ${field.toLowerCase()} format`,
    INVALID_VALUE: (field: string) => `Invalid ${field.toLowerCase()} value`,
    MAX_FILE_SIZE: `File size cannot exceed ${LIMITS.MAX_FILE_SIZE / (1024 * 1024)}MB`,
    MAX_TAGS: `Cannot add more than ${LIMITS.MAX_TAGS} tags`,
  },
  API: {
    RATE_LIMITED: 'Too many requests. Please try again later.',
    SERVER_ERROR: 'An unexpected error occurred. Please try again later.',
    NOT_FOUND: (resource: string) => `${resource} not found`,
    ALREADY_EXISTS: (resource: string) => `${resource} already exists`,
    INVALID_REQUEST: 'Invalid request',
    UNAUTHORIZED: 'You are not authorized to perform this action',
    FORBIDDEN: 'Access denied',
  },
  FORM: {
    SUBMIT_ERROR: 'Failed to submit form. Please try again.',
    INVALID_INPUT: 'Please check your input and try again.',
    REQUIRED_FIELDS: 'Please fill in all required fields',
  },
  FILE: {
    UPLOAD_FAILED: 'Failed to upload file',
    INVALID_TYPE: 'Invalid file type',
    TOO_LARGE: `File size exceeds limit of ${LIMITS.MAX_FILE_SIZE / (1024 * 1024)}MB`,
    NOT_FOUND: 'File not found',
  },
} as const;

export type Errors = typeof ERRORS;
export default ERRORS;
