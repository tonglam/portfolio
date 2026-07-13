import type { MetadataRoute } from 'next';
import { articleMetadata } from '@/src/content/article-metadata';
import { caseStudies } from '@/src/content/case-studies';
import { site } from '@/src/content/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const updated = new Date('2026-07-13');
  return [
    { url: site.url, lastModified: updated, changeFrequency: 'monthly', priority: 1 },
    ...caseStudies.map(study => ({
      url: `${site.url}/work/${study.slug}`,
      lastModified: updated,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
    {
      url: `${site.url}/writing`,
      lastModified: updated,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...articleMetadata.map(article => ({
      url: `${site.url}/writing/${article.slug}`,
      lastModified: new Date(article.updatedAt),
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    })),
  ];
}
