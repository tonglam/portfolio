/**
 * Error message type definitions
 */

export interface ValidationErrors {
  REQUIRED_FIELD: (field: string) => string;
  INVALID_FORMAT: (field: string) => string;
  INVALID_VALUE: (field: string) => string;
  INVALID_EMAIL: string;
  INVALID_PASSWORD: string;
  INVALID_URL: string;
  PASSWORDS_DO_NOT_MATCH: string;
  MAX_LENGTH: (field: string, length: number) => string;
  MIN_LENGTH: (field: string, length: number) => string;
  MAX_FILE_SIZE: string;
  MAX_TAGS: string;
}

export interface ApiErrors {
  NOT_FOUND: (resource: string) => string;
  SERVER_ERROR: string;
  UNAUTHORIZED: string;
  FORBIDDEN: string;
  RATE_LIMITED: string;
  ALREADY_EXISTS: (resource: string) => string;
  INVALID_REQUEST: string;
}

export interface AuthErrors {
  INVALID_CREDENTIALS: string;
  SESSION_EXPIRED: string;
  NOT_AUTHENTICATED: string;
  UNAUTHORIZED: string;
  FORBIDDEN: string;
}

export interface FileErrors {
  UPLOAD_FAILED: string;
  INVALID_TYPE: string;
  TOO_LARGE: string;
  NOT_FOUND: string;
}

export interface ErrorMessages {
  VALIDATION: ValidationErrors;
  API: ApiErrors;
  AUTH: AuthErrors;
  FORM?: Record<string, string>;
  FILE: FileErrors;
}

export class SitemapError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500
  ) {
    super(message);
    this.name = 'SitemapError';
  }
}
