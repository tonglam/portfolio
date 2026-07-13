import type { MetadataRoute } from 'next';
import { site } from '@/src/content/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/writing/archive'] },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
