import type { MetadataRoute } from 'next';
import { articleMetadata } from '@/src/content/article-metadata';
import { caseStudies } from '@/src/content/case-studies';
import { site } from '@/src/content/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const latestContentUpdate = [
    site.updatedAt,
    ...caseStudies.map(study => study.updatedAt),
    ...articleMetadata.map(article => article.updatedAt),
  ]
    .sort()
    .at(-1)!;

  return [
    { url: site.url, lastModified: new Date(latestContentUpdate) },
    ...caseStudies.map(study => ({
      url: `${site.url}/work/${study.slug}`,
      lastModified: new Date(study.updatedAt),
    })),
    {
      url: `${site.url}/writing`,
      lastModified: new Date(latestContentUpdate),
    },
    ...articleMetadata.map(article => ({
      url: `${site.url}/writing/${article.slug}`,
      lastModified: new Date(article.updatedAt),
    })),
  ];
}
