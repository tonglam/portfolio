/**
 * Common constants used throughout the application
 */

export const TIME = {
  SECOND: 1000,
  MINUTE: 60 * 1000,
  HOUR: 60 * 60 * 1000,
  DAY: 24 * 60 * 60 * 1000,
  WEEK: 7 * 24 * 60 * 60 * 1000,
} as const;

export const HTTP = {
  METHODS: {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
    PATCH: 'PATCH',
  },
  STATUS: {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    RATE_LIMITED: 429,
    SERVER_ERROR: 500,
  },
  HEADERS: {
    CONTENT_TYPE: 'Content-Type',
    AUTHORIZATION: 'Authorization',
    CACHE_CONTROL: 'Cache-Control',
    RETRY_AFTER: 'Retry-After',
  },
} as const;

export const LOCALE = {
  DEFAULT: 'en-US',
  DATE_FORMAT: {
    FULL: {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    },
    SHORT: {
      year: 'numeric',
      month: 'short',
    },
  },
} as const;

export const REGEX = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  URL: /^https?:\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/,
  SLUG: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
} as const;

export const BREAKPOINTS = {
  MOBILE: 640,
  TABLET: 768,
  LAPTOP: 1024,
  DESKTOP: 1280,
  WIDE: 1536,
} as const;

export const DIMENSIONS = {
  HEADER_HEIGHT: 64,
  FOOTER_HEIGHT: 60,
  SIDEBAR_WIDTH: 250,
  CONTAINER_WIDTH: 1200,
  NAV_HEIGHT: 56,
} as const;

export const LIMITS = {
  MAX_PAGE_SIZE: 100,
  MIN_PASSWORD_LENGTH: 8,
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  MAX_TITLE_LENGTH: 100,
  MAX_DESCRIPTION_LENGTH: 500,
  MAX_TAGS: 10,
} as const;

export type TimeConstants = typeof TIME;
export type HttpConstants = typeof HTTP;
export type LocaleConstants = typeof LOCALE;
export type RegexConstants = typeof REGEX;
export type BreakpointConstants = typeof BREAKPOINTS;
export type DimensionConstants = typeof DIMENSIONS;
export type LimitConstants = typeof LIMITS;

const common = {
  TIME,
  HTTP,
  LOCALE,
  REGEX,
  BREAKPOINTS,
  DIMENSIONS,
  LIMITS,
} as const;

export type Common = typeof common;
export default common;
