import { LIMITS, TIME } from './common';

/**
 * Default values and settings
 */

export const BLOG_DEFAULTS = {
  limit: LIMITS.MAX_PAGE_SIZE,
  minRead: '3 Min Read',
  pagination: {
    itemsPerPage: 10,
    maxPages: 5,
  },
} as const;

export const CACHE_DEFAULTS = {
  control: `public, max-age=${TIME.HOUR / TIME.SECOND}, stale-while-revalidate=${TIME.DAY / TIME.SECOND}`,
  revalidate: TIME.HOUR / TIME.SECOND,
} as const;

export const API_DEFAULTS = {
  retryAttempts: 3,
  timeout: 10 * TIME.SECOND,
  rateLimit: {
    windowMs: TIME.MINUTE,
    maxRequests: 60,
  },
} as const;

export const IMAGE_DEFAULTS = {
  quality: 75,
  maxWidth: 1920,
  maxHeight: 1080,
  formats: ['webp', 'jpeg'] as const,
  maxSize: LIMITS.MAX_FILE_SIZE,
} as const;

export const defaults = {
  blog: BLOG_DEFAULTS,
  cache: CACHE_DEFAULTS,
  api: API_DEFAULTS,
  image: IMAGE_DEFAULTS,
} as const;

export type BlogDefaults = typeof BLOG_DEFAULTS;
export type CacheDefaults = typeof CACHE_DEFAULTS;
export type ApiDefaults = typeof API_DEFAULTS;
export type ImageDefaults = typeof IMAGE_DEFAULTS;
export type Defaults = typeof defaults;

export default defaults;
