/**
 * URL constants
 */
import type { ExternalUrls } from '@/types/config/urls.type';

export const API_PATHS = {
  BASE: '/api',
  BLOG: '/api/blog',
  CONTACT: '/api/contact',
} as const;

export const BLOG_PATHS = {
  LIST: API_PATHS.BLOG,
  DETAIL: (slug: string) => `${API_PATHS.BLOG}/${slug}`,
  SEARCH: `${API_PATHS.BLOG}/search`,
  CATEGORIES: `${API_PATHS.BLOG}/categories`,
} as const;

export const PLACEHOLDER_URLS = {
  BLOG_IMAGE:
    'https://res.cloudinary.com/demo/image/upload/w_1200,h_630,c_fill,q_auto,f_auto/sample',
  AVATAR:
    'https://res.cloudinary.com/demo/image/upload/w_400,h_400,c_fill,g_face,q_auto,f_auto/face_sample',
} as const;

type ExternalUrlsType = ExternalUrls;

export const EXTERNAL_URLS: ExternalUrlsType = {
  BLOG_DATA_SOURCE: 'https://pub-d8dffa084afd41feb7c476a46103017d.r2.dev/blog-data.json',
  NOTION: {
    PAGE: (id: string) => `https://notion.so/${id}`,
  },
  SOCIAL: {
    GITHUB: 'https://github.com/tonglam',
    LINKEDIN: 'https://linkedin.com/in/tonglam',
    TWITTER: 'https://twitter.com/tonglam',
    EMAIL: 'mailto:contact@tonglan.dev',
  },
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
      CREDENTIAL_URL: 'https://www.credly.com/badges/a912a582-dba1-4a36-b497-82ddf633721d',
      IMAGE_URL:
        'https://images.credly.com/size/340x340/images/00634f82-b07f-4bbd-a6bb-53de397fc3a6/image.png',
    },
    AWS_SOLUTIONS_ARCHITECT: {
      CREDENTIAL_URL: 'https://www.credly.com/badges/a912a582-dba1-4a36-b497-82ddf633721d',
      IMAGE_URL:
        'https://images.credly.com/size/340x340/images/0e284c3f-5164-4b21-8660-0d84737941bc/image.png',
    },
  },
  PLACEHOLDERS: PLACEHOLDER_URLS,
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
} as const;

export type ApiPaths = typeof API_PATHS;
export type BlogPaths = typeof BLOG_PATHS;
export type PlaceholderUrls = typeof PLACEHOLDER_URLS;
export type Urls = typeof urls;

export default urls;
