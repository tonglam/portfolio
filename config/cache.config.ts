import type { CacheSettings } from '@/types/config/cache.type';

export const CACHE_SETTINGS: CacheSettings = {
  BLOG: {
    CONTROL: 'public, max-age=3600, stale-while-revalidate=86400', // 1 hour fresh, 24 hours stale
    REVALIDATE: 3600, // Revalidate every hour
    NO_CACHE: {
      CONTROL: 'no-cache, no-store, must-revalidate',
      PRAGMA: 'no-cache',
      EXPIRES: '0',
    },
    CATEGORIES: {
      CONTROL: 'public, max-age=86400, stale-while-revalidate=604800', // 24 hours fresh, 7 days stale
      REVALIDATE: 86400, // Revalidate every 24 hours
    },
  },
};
