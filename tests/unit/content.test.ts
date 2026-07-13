import { access, readFile, stat } from 'node:fs/promises';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import robots from '@/app/robots';
import sitemap from '@/app/sitemap';
import { GET as getRss } from '@/app/rss.xml/route';
import { archiveGroups, archivePosts } from '@/src/content/archive';
import { articleMetadata, estimateReadingMinutes } from '@/src/content/article-metadata';
import { caseStudies } from '@/src/content/case-studies';
import { site } from '@/src/content/site';

describe('portfolio content', () => {
  it('publishes exactly the approved launch case studies and articles', () => {
    expect(caseStudies.map(({ slug }) => slug)).toEqual(['letletme', 'vehicle-operations']);
    expect(articleMetadata).toHaveLength(3);
    expect(articleMetadata.every(({ featured }) => featured)).toBe(true);
  });

  it('preserves the complete legacy writing source as static metadata', () => {
    expect(archivePosts).toHaveLength(272);
    expect(archivePosts.every(({ url }) => url.startsWith('https://'))).toBe(true);
    expect(archiveGroups.flatMap(([, posts]) => posts)).toHaveLength(272);
    expect(archiveGroups.map(([year]) => year)).toEqual(
      [...archiveGroups.map(([year]) => year)].sort((a, b) => b.localeCompare(a))
    );
    for (const [, posts] of archiveGroups) {
      const times = posts.map(({ date }) => new Date(date).getTime());
      expect(times).toEqual([...times].sort((a, b) => b - a));
    }
  });

  it('does not publish removed unsupported metrics', async () => {
    const files = [
      'src/content/site.ts',
      'src/content/case-studies.ts',
      'content/writing/event-driven-cloud-billing.mdx',
      'content/writing/reliable-live-data-pipelines.mdx',
      'content/writing/role-secured-vehicle-workflows.mdx',
    ];
    const copy = (
      await Promise.all(files.map(file => readFile(join(process.cwd(), file), 'utf8')))
    ).join('\n');
    expect(copy).not.toMatch(/30% efficiency/i);
    expect(copy).not.toMatch(/millions of daily transactions/i);
  });

  it('derives article reading time from the published MDX', () => {
    for (const article of articleMetadata) {
      expect(article.minutes).toBe(estimateReadingMinutes(article.slug));
      expect(article.minutes).toBeGreaterThanOrEqual(4);
    }
  });

  it('labels synthetic Vehicle visuals and authenticated access explicitly', () => {
    const vehicle = caseStudies.find(({ slug }) => slug === 'vehicle-operations');
    expect(vehicle).toBeDefined();
    expect(vehicle?.gallery.every(({ label }) => label === 'Sanitized product illustration')).toBe(
      true
    );
    expect(vehicle?.gallery.every(({ note }) => note?.includes('Synthetic demo data'))).toBe(true);
    expect(vehicle?.links.find(({ event }) => event === 'visit_vehicle_live')?.note).toBe(
      'Sign-in required'
    );
  });

  it('generates a sitemap containing only real canonical routes', () => {
    const entries = sitemap();
    const routes = entries.map(({ url }) => url);
    expect(routes).toContain(site.url);
    expect(routes).toContain(site.url + '/work/letletme');
    expect(routes).toContain(site.url + '/work/vehicle-operations');
    expect(routes).toContain(site.url + '/writing');
    expect(routes).not.toContain(site.url + '/about');
    expect(routes).not.toContain(site.url + '/writing/archive');
    expect(entries.every(({ lastModified }) => lastModified instanceof Date)).toBe(true);
  });

  it('keeps noindex pages crawlable so crawlers can observe their metadata', () => {
    expect(JSON.stringify(robots())).not.toContain('/writing/archive');
  });

  it('provides concise search titles and page-specific descriptions', () => {
    expect(new Set(articleMetadata.map(({ seoTitle }) => seoTitle)).size).toBe(
      articleMetadata.length
    );
    expect(articleMetadata.every(({ seoTitle }) => seoTitle.length <= 40)).toBe(true);
    expect(caseStudies.every(({ seoDescription }) => seoDescription.length <= 160)).toBe(true);
  });

  it('generates an RSS document for all three articles', async () => {
    const response = getRss();
    const xml = await response.text();
    expect(response.headers.get('content-type')).toContain('application/rss+xml');
    expect((xml.match(/<item>/g) ?? []).length).toBe(3);
    for (const article of articleMetadata)
      expect(xml).toContain(site.url + '/writing/' + article.slug);
  });

  it('ships both current approved resume files', async () => {
    expect(new Set(site.resumes.map(({ href }) => href)).size).toBe(site.resumes.length);
    expect(new Set(site.resumes.map(({ event }) => event)).size).toBe(site.resumes.length);
    for (const resume of site.resumes) {
      const path = join(process.cwd(), 'public', resume.href);
      await access(path);
      expect((await stat(path)).size).toBeGreaterThan(100_000);
    }
  });
});
