export const CACHE_SETTINGS = {
  BLOG: {
    CATEGORIES: {
      REVALIDATE: 86400, // 24 hours in seconds
      CONTROL: 'public, max-age=86400, must-revalidate',
    },
    LIST: {
      REVALIDATE: 86400, // 24 hours in seconds
      CONTROL: 'public, max-age=86400, must-revalidate',
    },
    SEARCH: {
      REVALIDATE: 0, // No cache for search
      CONTROL: 'no-store, no-cache, must-revalidate',
    },
  },
} as const;
