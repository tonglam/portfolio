/**
 * URL constants
 */
import type { ExternalUrls } from '@/types/urls.type';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export const API_PATHS = {
  BLOG: '/blog',
  CONTACT: '/contact',
} as const;

export const BLOG_PATHS = {
  LIST: `/api${API_PATHS.BLOG}`,
  DETAIL: (slug: string) => `/api${API_PATHS.BLOG}/${slug}`,
  SEARCH: `/api${API_PATHS.BLOG}/search`,
  CATEGORIES: `/api${API_PATHS.BLOG}/categories`,
} as const;

export const PLACEHOLDER_URLS = {
  BLOG: {
    CARD: 'https://res.cloudinary.com/demo/image/upload/w_400,h_300,c_fill,q_auto,f_auto/sample',
    HERO: 'https://res.cloudinary.com/demo/image/upload/w_1200,h_630,c_fill,q_auto,f_auto/sample',
    THUMBNAIL:
      'https://res.cloudinary.com/demo/image/upload/w_100,h_100,c_fill,q_auto,f_auto/sample',
  },
  AVATAR: 'https://gravatar.com/bluedragon00000',
} as const;

type ExternalUrlsType = ExternalUrls;

export const EXTERNAL_URLS: ExternalUrlsType = {
  NOTION: {
    PAGE: (id: string) => `https://notion.so/${id}`,
  },
  SOCIAL: {
    GITHUB: 'https://github.com/tonglam',
    LINKEDIN: 'https://www.linkedin.com/in/qitonglan/',
    X: 'https://x.com/tong_lam_14',
    EMAIL: 'mailto:qilonglan@gmail.com',
  },
  RESUME: 'https://qitonglan.com/resume.pdf',
  MAPS: {
    SEARCH: (address: string) => `https://www.google.com/maps/search/?api=1&query=${address}`,
  },
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
  CERTIFICATES: {
    AWS_CLOUD_PRACTITIONER: {
      CREDENTIAL_URL: 'https://www.credly.com/badges/a19f51dc-d001-48f0-a959-4d62d2b07761',
      IMAGE_URL:
        'https://images.credly.com/size/340x340/images/00634f82-b07f-4bbd-a6bb-53de397fc3a6/image.png',
    },
    AWS_SOLUTIONS_ARCHITECT: {
      CREDENTIAL_URL: 'https://www.credly.com/badges/4ca74e6e-cd0c-4ed7-a377-4bf7f9f9bd0e',
      IMAGE_URL:
        'https://images.credly.com/size/340x340/images/0e284c3f-5164-4b21-8660-0d84737941bc/image.png',
    },
  },
  PLACEHOLDERS: PLACEHOLDER_URLS,
} as const;

export const CLOUDFLARE_API_PATHS = {
  D1_QUERY: (accountId: string, databaseId: string) =>
    `https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${databaseId}/query`,
} as const;

export const urls = {
  api: {
    blog: BLOG_PATHS,
    contact: {
      send: API_PATHS.CONTACT,
    },
  },
  external: EXTERNAL_URLS,
  placeholders: PLACEHOLDER_URLS,
  cloudflare: CLOUDFLARE_API_PATHS,
} as const;

export type ApiPaths = typeof API_PATHS;
export type BlogPaths = typeof BLOG_PATHS;
export type PlaceholderUrls = typeof PLACEHOLDER_URLS;
export type Urls = typeof urls;
export type CloudflareApiPaths = typeof CLOUDFLARE_API_PATHS;

export default urls;
