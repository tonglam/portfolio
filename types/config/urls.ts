/**
 * URL type definitions
 */

// API URLs
export interface ApiEndpoints {
  blog: {
    posts: string;
    post: (slug: string) => string;
    search: string;
    categories: string;
  };
  contact: {
    send: string;
  };
}

// External service URLs
export interface ServiceUrls {
  notion: {
    page: (id: string) => string;
  };
  googleMaps: {
    search: (address: string) => string;
  };
}

// Social media URLs
export interface SocialUrls {
  github: string;
  linkedin: string;
  twitter: string;
  email: string;
}

// Project-related URLs
export type ProjectUrlType = 'github' | 'demo' | 'documentation' | 'website' | 'article' | 'video';

export interface ProjectUrls {
  type: ProjectUrlType;
  url: string;
}

// Company-related URLs
export interface CompanyProfile {
  name: string;
  url: string;
  logo: string;
}

// Certificate-related URLs
export interface CertificateUrls {
  credential: string;
  image: string;
}

// All external URLs
export interface ExternalUrls {
  api: ApiEndpoints;
  services: ServiceUrls;
  social: SocialUrls;
  companies: Record<string, CompanyProfile>;
  certificates: Record<string, CertificateUrls>;
}
