/**
 * URL-related type definitions
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
  AVATAR: string;
}

export interface GoogleMapsUrls {
  SEARCH: (address: string) => string;
}

export interface SocialUrls {
  GITHUB: string;
  LINKEDIN: string;
  TWITTER: string;
  EMAIL: string;
}

export interface CompanyInfo {
  URL: string;
  LOGO: string;
}

export interface CompanyUrls {
  ESURFING_CLOUD: CompanyInfo;
  NETEASE: CompanyInfo;
  CHINA_TELECOM: CompanyInfo;
}

export interface CertificateInfo {
  CREDENTIAL_URL: string;
  IMAGE_URL: string;
}

export interface CertificateUrls {
  AWS_CLOUD_PRACTITIONER: CertificateInfo;
  AWS_SOLUTIONS_ARCHITECT: CertificateInfo;
}

export interface ExternalUrls {
  BLOG_DATA_SOURCE: string;
  NOTION: NotionUrls;
  SOCIAL: SocialUrls;
  MAPS: GoogleMapsUrls;
  COMPANY: CompanyUrls;
  CERTIFICATES: CertificateUrls;
  PLACEHOLDERS: PlaceholderUrls;
}
