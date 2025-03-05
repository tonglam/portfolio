/**
 * Application Constants
 *
 * This file contains all the constants used throughout the application.
 * Centralizing these values makes it easier to maintain and update them.
 */

// API URLs
export const API_URLS = {
  // Blog API endpoints
  BLOG: {
    LIST: "/api/blog",
    DETAIL: (slug) => `/api/blog/${slug}`,
    SEARCH: "/api/blog/search",
    CATEGORIES: "/api/blog/categories",
  },
  // Contact API endpoints
  CONTACT: {
    SEND: "/api/contact",
  },
};

// External URLs
export const EXTERNAL_URLS = {
  // Blog data source
  BLOG_DATA_SOURCE:
    "https://pub-d8dffa084afd41feb7c476a46103017d.r2.dev/blog-data.json",

  // Notion URLs
  NOTION: {
    PAGE: (id) => `https://www.notion.so/${id.replace(/-/g, "")}`,
  },

  // Placeholder images
  PLACEHOLDERS: {
    BLOG_IMAGE: "https://via.placeholder.com/1470x800",
    COMPANY_LOGO: "https://via.placeholder.com/100",
  },

  // Map search
  GOOGLE_MAPS: {
    SEARCH: (address) =>
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        address
      )}`,
  },

  // Social media and project links
  SOCIAL: {
    GITHUB: "https://github.com/tonglam",
    LINKEDIN: "https://www.linkedin.com/in/qitonglan/",
    TWITTER: "https://x.com/tong_lam_14",
  },

  PROJECT: {
    GITHUB: "https://github.com",
    DEMO: "https://demo.com",
  },

  // Company websites
  COMPANY: {
    ESURFING_CLOUD: {
      URL: "https://www.esurfingcloud.com/",
      LOGO: "https://media.licdn.com/dms/image/v2/D560BAQH82DslRiJ2kQ/company-logo_100_100/company-logo_100_100/0/1685497414232?e=1749081600&v=beta&t=re1qSuRl4fNR5hpaRMQOKA_1ybOKsKODTuyx-LcAObw",
    },
    NETEASE: {
      URL: "https://www.neteasegames.com/",
      LOGO: "https://media.licdn.com/dms/image/v2/C510BAQEq55a369mthA/company-logo_100_100/company-logo_100_100/0/1631411965736/netease_logo?e=1749081600&v=beta&t=ZZ-r9EK1avN3PS72kLAhMDhMAcNVJQCV26et-I6yG5Y",
    },
    CHINA_TELECOM: {
      URL: "https://www.chinatelecom-h.com/en/global/home.php",
      LOGO: "https://media.licdn.com/dms/image/v2/C4D0BAQEChOu06vSNew/company-logo_100_100/company-logo_100_100/0/1631342960927?e=1749081600&v=beta&t=cDPENsKVKA-dH8u4NHjFuzjytCnkMdi73HfaV8v1FJI",
    },
  },

  // Certificates
  CERTIFICATES: {
    AWS_CLOUD_PRACTITIONER: {
      CREDENTIAL_URL:
        "https://www.credly.com/badges/a912a582-dba1-4a36-b497-82ddf633721d/public_url",
      IMAGE_URL:
        "https://images.credly.com/size/110x110/images/00634f82-b07f-4bbd-a6bb-53de397fc3a6/image.png",
    },
    AWS_SOLUTIONS_ARCHITECT: {
      CREDENTIAL_URL:
        "https://www.credly.com/badges/a912a582-dba1-4a36-b497-82ddf633721d/public_url",
      IMAGE_URL:
        "https://images.credly.com/size/340x340/images/0e284c3f-5164-4b21-8660-0d84737941bc/image.png",
    },
  },
};

// Cache settings
export const CACHE_SETTINGS = {
  BLOG: {
    CONTROL: "public, max-age=3600, stale-while-revalidate=86400", // 1 hour fresh, 24 hours stale
    REVALIDATE: 3600, // Revalidate every hour
  },
};

// Default values
export const DEFAULTS = {
  BLOG: {
    LIMIT: 6,
    MIN_READ: "3 Min Read",
  },
};
