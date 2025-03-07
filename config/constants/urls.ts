/**
 * URL constants
 */

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

export const EXTERNAL_URLS = {
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
} as const;

export const PLACEHOLDER_URLS = {
  BLOG_IMAGE:
    'https://res.cloudinary.com/demo/image/upload/w_1200,h_630,c_fill,q_auto,f_auto/sample',
  AVATAR:
    'https://res.cloudinary.com/demo/image/upload/w_400,h_400,c_fill,g_face,q_auto,f_auto/face_sample',
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
export type ExternalUrls = typeof EXTERNAL_URLS;
export type PlaceholderUrls = typeof PLACEHOLDER_URLS;
export type Urls = typeof urls;

export default urls;
