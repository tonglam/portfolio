/**
 * Application Constants
 *
 * This file contains all the constants used throughout the application.
 * Centralizing these values makes it easier to maintain and update them.
 */

// API URLs interfaces
export interface BlogApiUrls {
  LIST: string;
  DETAIL: (slug: string) => string;
  SEARCH: string;
  CATEGORIES: string;
}

export interface ContactApiUrls {
  SEND: string;
}

export interface ApiUrls {
  BLOG: BlogApiUrls;
  CONTACT: ContactApiUrls;
}

// External URL interfaces
export interface NotionUrls {
  PAGE: (id: string) => string;
}

export interface PlaceholderUrls {
  BLOG_IMAGE: string;
}

export interface GoogleMapsUrls {
  SEARCH: (address: string) => string;
}

export interface SocialUrls {
  GITHUB: string;
  LINKEDIN: string;
  TWITTER: string;
}

export interface ProjectUrls {
  GITHUB: string;
  DEMO: string;
}

export interface CompanyInfo {
  URL: string;
  LOGO: string;
}

export interface CompanyUrls {
  ESURFING_CLOUD: CompanyInfo;
  NETEASE: CompanyInfo;
  CHINA_TELECOM: CompanyInfo;
  [key: string]: CompanyInfo;
}

export interface CertificateInfo {
  CREDENTIAL_URL: string;
  IMAGE_URL: string;
}

export interface CertificateUrls {
  AWS_CLOUD_PRACTITIONER: CertificateInfo;
  AWS_SOLUTIONS_ARCHITECT: CertificateInfo;
  [key: string]: CertificateInfo;
}

export interface ExternalUrls {
  BLOG_DATA_SOURCE: string;
  NOTION: NotionUrls;
  PLACEHOLDERS: PlaceholderUrls;
  GOOGLE_MAPS: GoogleMapsUrls;
  SOCIAL: SocialUrls;
  PROJECT: ProjectUrls;
  COMPANY: CompanyUrls;
  CERTIFICATES: CertificateUrls;
}

// Cache settings interfaces
export interface BlogCacheSettings {
  CONTROL: string;
  REVALIDATE: number;
}

export interface CacheSettings {
  BLOG: BlogCacheSettings;
}

// Default values interfaces
export interface BlogDefaults {
  LIMIT: number;
  MIN_READ: string;
}

export interface Defaults {
  BLOG: BlogDefaults;
}

// API URLs
export const API_URLS: ApiUrls = {
  // Blog API endpoints
  BLOG: {
    LIST: '/api/blog',
    DETAIL: (slug: string) => `/api/blog/${slug}`,
    SEARCH: '/api/blog/search',
    CATEGORIES: '/api/blog/categories',
  },
  // Contact API endpoints
  CONTACT: {
    SEND: '/api/contact',
  },
};

// External URLs
export const EXTERNAL_URLS: ExternalUrls = {
  // Blog data source
  BLOG_DATA_SOURCE: 'https://pub-d8dffa084afd41feb7c476a46103017d.r2.dev/blog-data.json',

  // Notion URLs
  NOTION: {
    PAGE: (id: string) => `https://www.notion.so/${id.replace(/-/g, '')}`,
  },

  // Placeholder images
  PLACEHOLDERS: {
    BLOG_IMAGE:
      'https://res.cloudinary.com/demo/image/upload/w_1470,h_800,c_fill,q_auto,f_auto/sample',
  },

  // Map search
  GOOGLE_MAPS: {
    SEARCH: (address: string) =>
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`,
  },

  // Social media and project links
  SOCIAL: {
    GITHUB: 'https://github.com/tonglam',
    LINKEDIN: 'https://www.linkedin.com/in/qitonglan/',
    TWITTER: 'https://x.com/tong_lam_14',
  },

  PROJECT: {
    GITHUB: 'https://github.com',
    DEMO: 'https://demo.com',
  },

  // Company websites
  COMPANY: {
    ESURFING_CLOUD: {
      URL: 'https://www.esurfingcloud.com/',
      LOGO: 'https://media.licdn.com/dms/image/v2/D560BAQH82DslRiJ2kQ/company-logo_100_100/company-logo_100_100/0/1685497414232?e=1749081600&v=beta&t=re1qSuRl4fNR5hpaRMQOKA_1ybOKsKODTuyx-LcAObw',
    },
    NETEASE: {
      URL: 'https://www.neteasegames.com/',
      LOGO: 'https://media.licdn.com/dms/image/v2/C510BAQEq55a369mthA/company-logo_100_100/company-logo_100_100/0/1631411965736/netease_logo?e=1749081600&v=beta&t=ZZ-r9EK1avN3PS72kLAhMDhMAcNVJQCV26et-I6yG5Y',
    },
    CHINA_TELECOM: {
      URL: 'https://www.chinatelecom-h.com/en/global/home.php',
      LOGO: 'https://media.licdn.com/dms/image/v2/C4D0BAQEChOu06vSNew/company-logo_100_100/company-logo_100_100/0/1631342960927?e=1749081600&v=beta&t=cDPENsKVKA-dH8u4NHjFuzjytCnkMdi73HfaV8v1FJI',
    },
  },

  // Certificates
  CERTIFICATES: {
    AWS_CLOUD_PRACTITIONER: {
      CREDENTIAL_URL:
        'https://www.credly.com/badges/a912a582-dba1-4a36-b497-82ddf633721d/public_url',
      IMAGE_URL:
        'https://images.credly.com/size/110x110/images/00634f82-b07f-4bbd-a6bb-53de397fc3a6/image.png',
    },
    AWS_SOLUTIONS_ARCHITECT: {
      CREDENTIAL_URL:
        'https://www.credly.com/badges/a912a582-dba1-4a36-b497-82ddf633721d/public_url',
      IMAGE_URL:
        'https://images.credly.com/size/340x340/images/0e284c3f-5164-4b21-8660-0d84737941bc/image.png',
    },
  },
};

// Cache settings
export const CACHE_SETTINGS: CacheSettings = {
  BLOG: {
    CONTROL: 'public, max-age=3600, stale-while-revalidate=86400', // 1 hour fresh, 24 hours stale
    REVALIDATE: 3600, // Revalidate every hour
  },
};

// Default values
export const DEFAULTS: Defaults = {
  BLOG: {
    LIMIT: 6,
    MIN_READ: '3 Min Read',
  },
};

/**
 * Error messages for validation and API responses
 */
export interface ValidationErrors {
  REQUIRED_FIELD: (field: string) => string;
  INVALID_FORMAT: (field: string) => string;
  INVALID_VALUE: (field: string) => string;
}

export interface ApiErrors {
  NOT_FOUND: (resource: string) => string;
  SERVER_ERROR: string;
  UNAUTHORIZED: string;
  FORBIDDEN: string;
}

export interface ErrorMessages {
  VALIDATION: ValidationErrors;
  API: ApiErrors;
}

/**
 * Error messages
 */
export const ERRORS: ErrorMessages = {
  VALIDATION: {
    REQUIRED_FIELD: (field: string) => `${field} is required`,
    INVALID_FORMAT: (field: string) => `${field} has an invalid format`,
    INVALID_VALUE: (field: string) => `${field} has an invalid value`,
  },
  API: {
    NOT_FOUND: (resource: string) => `${resource} not found`,
    SERVER_ERROR: 'An internal server error occurred',
    UNAUTHORIZED: 'You must be logged in to access this resource',
    FORBIDDEN: 'You do not have permission to access this resource',
  },
};

/**
 * UI constants for layout, animations, and UI elements
 */
export interface UiConstants {
  SCROLL_THRESHOLD: number;
  ANIMATION_TIMING: {
    DEBOUNCE_MS: number;
    TYPEWRITER_DELAY_MS: number;
  };
  PAGINATION: {
    DEFAULT_POSTS_PER_PAGE: number;
    DEFAULT_PAGE: number;
  };
  RETRY: {
    MAX_ATTEMPTS: number;
    BASE_DELAY_MS: number;
  };
}

/**
 * UI constants
 */
export const UI: UiConstants = {
  SCROLL_THRESHOLD: 300, // px
  ANIMATION_TIMING: {
    DEBOUNCE_MS: 500, // ms
    TYPEWRITER_DELAY_MS: 50, // ms
  },
  PAGINATION: {
    DEFAULT_POSTS_PER_PAGE: 6,
    DEFAULT_PAGE: 1,
  },
  RETRY: {
    MAX_ATTEMPTS: 3,
    BASE_DELAY_MS: 1000, // ms
  },
};
