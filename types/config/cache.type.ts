/**
 * Cache-related type definitions
 */

export interface BlogCacheSettings {
  CONTROL: string;
  REVALIDATE: number;
  NO_CACHE: {
    CONTROL: string;
    PRAGMA: string;
    EXPIRES: string;
  };
  CATEGORIES: {
    CONTROL: string;
    REVALIDATE: number;
  };
}

export interface CacheSettings {
  BLOG: BlogCacheSettings;
}

/**
 * Cache configuration types
 */

export const REVALIDATION_TIME = {
  SHORT: 300, // 5 minutes
  MEDIUM: 1800, // 30 minutes
  LONG: 3600, // 1 hour
  VERY_LONG: 86400, // 24 hours
} as const;

export type RevalidationTime = (typeof REVALIDATION_TIME)[keyof typeof REVALIDATION_TIME];
