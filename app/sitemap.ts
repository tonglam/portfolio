import { CACHE_SETTINGS, EXTERNAL_URLS } from '@/config';
import { logger } from '@/lib/core/logger.util';
import type { ExtendedNotionPost } from '@/types/api/blog.type';
import type { RichTextItem } from '@/types/api/notion.type';
import { SitemapError } from '@/types/config/errors.type';
import type { MetadataRoute } from 'next';

/**
 * Helper function to extract plain text from Notion rich text
 */
function extractPlainText(richText: RichTextItem[] | RichTextItem | undefined): string {
  if (!richText) {
    return '';
  }

  // Handle array case
  if (Array.isArray(richText)) {
    if (richText.length === 0) return '';
    return richText.map(item => item.plain_text || '').join('');
  }

  // Handle single item case
  return richText.plain_text || '';
}

/**
 * Generates a dynamic sitemap for the website including all blog posts
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Base URL of the website
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourportfolio.com';

  // Static routes with their update frequency
  const staticRoutes = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    // Add any other static routes here
  ];

  // Fetch blog posts from the R2 storage with caching
  try {
    const response = await fetch(EXTERNAL_URLS.BLOG_DATA_SOURCE, {
      next: {
        revalidate: CACHE_SETTINGS.BLOG.REVALIDATE,
        tags: ['blog-posts'],
      },
      headers: {
        'Cache-Control': CACHE_SETTINGS.BLOG.CONTROL,
      },
    });

    if (!response.ok) {
      throw new SitemapError(`Failed to fetch blog posts: ${response.statusText}`, response.status);
    }

    const allPosts = (await response.json()) as ExtendedNotionPost[];

    // Create sitemap entries for blog posts
    const blogPosts = allPosts
      .filter(post => post.properties?.Title && post.properties?.Published?.checkbox !== false)
      .map(post => {
        const title = post.properties?.Title?.title
          ? extractPlainText(post.properties.Title.title)
          : '';

        // Create slug from title
        const slug = title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');

        const lastModified = post.last_edited_time ? new Date(post.last_edited_time) : new Date();

        return {
          url: `${baseUrl}/blog/${slug}`,
          lastModified,
          changeFrequency: 'monthly' as const,
          priority: 0.7,
        };
      });

    // Return combined static routes and blog posts
    return [...staticRoutes, ...blogPosts];
  } catch (error) {
    const errorMessage =
      error instanceof SitemapError ? error.message : 'Failed to generate sitemap';

    logger.error({ error, message: errorMessage }, 'Sitemap Generation Error');

    // Fallback to static routes only if blog post fetching fails
    return staticRoutes;
  }
}
