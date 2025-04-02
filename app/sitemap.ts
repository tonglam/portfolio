import { logger } from '@/lib/logger.util';
import type { MetadataRoute } from 'next';

/**
 * Generates a dynamic sitemap for the website including all blog posts
 * Revalidates every 24 hours to ensure fresh content while maintaining performance
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!baseUrl) {
    logger.error('NEXT_PUBLIC_SITE_URL environment variable is not set');
    throw new Error('Site URL not configured. Cannot generate sitemap.');
  }

  // Basic static routes with prioritized homepage
  const staticRoutes: MetadataRoute.Sitemap = [
    '',
    '/about',
    '/experience',
    '/education',
    '/skills',
    '/projects',
    '/blog',
    '/contact',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? ('daily' as const) : ('weekly' as const),
    priority: route === '' ? 1 : 0.8,
  }));

  return staticRoutes;
}
