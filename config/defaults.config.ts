import { LIMITS, TIME } from './common.config';

/**
 * Default values and settings
 */
export const DEFAULTS = {
  BLOG: {
    LIMIT: 6,
    MIN_READ: '3 Min Read',
    BATCH_SIZE: 50,
    PAGINATION: {
      ITEMS_PER_PAGE: 10,
      MAX_PAGES: 5,
    },
    CACHE: {
      LIST: {
        REVALIDATE: TIME.DAY / TIME.SECOND, // 24 hours
        CONTROL: `public, max-age=${TIME.DAY / TIME.SECOND}, must-revalidate`,
      },
      DETAIL: {
        REVALIDATE: TIME.DAY / TIME.SECOND, // 24 hours
        CONTROL: `public, max-age=${TIME.DAY / TIME.SECOND}, must-revalidate`,
      },
      CATEGORIES: {
        REVALIDATE: TIME.DAY / TIME.SECOND, // 24 hours
        CONTROL: `public, max-age=${TIME.DAY / TIME.SECOND}, must-revalidate`,
      },
      SEARCH: {
        REVALIDATE: 0, // No cache for search
        CONTROL: 'no-store, no-cache, must-revalidate',
      },
    },
  },
  CACHE: {
    CONTROL: `public, max-age=${TIME.HOUR / TIME.SECOND}, stale-while-revalidate=${TIME.DAY / TIME.SECOND}`,
    REVALIDATE: TIME.HOUR / TIME.SECOND,
  },
  API: {
    RETRY_ATTEMPTS: 3,
    TIMEOUT: 10 * TIME.SECOND,
    RATE_LIMIT: {
      WINDOW_MS: TIME.MINUTE,
      MAX_REQUESTS: 60,
    },
  },
  IMAGE: {
    QUALITY: 75,
    MAX_WIDTH: 1920,
    MAX_HEIGHT: 1080,
    FORMATS: ['webp', 'jpeg'] as const,
    MAX_SIZE: LIMITS.MAX_FILE_SIZE,
  },
} as const;

export type Defaults = typeof DEFAULTS;
export default DEFAULTS;
