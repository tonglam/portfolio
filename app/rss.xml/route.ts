import { articleMetadata } from '@/src/content/article-metadata';
import { site } from '@/src/content/site';

export const dynamic = 'force-static';

function escape(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

export function GET() {
  const items = articleMetadata
    .map(
      article => `
    <item>
      <title>${escape(article.title)}</title>
      <link>${site.url}/writing/${article.slug}</link>
      <guid isPermaLink="true">${site.url}/writing/${article.slug}</guid>
      <pubDate>${new Date(`${article.publishedAt}T00:00:00Z`).toUTCString()}</pubDate>
      <description>${escape(article.description)}</description>
    </item>`
    )
    .join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0"><channel><title>Qitong Lan — Engineering Writing</title><link>${site.url}/writing</link><description>${escape(site.description)}</description><language>en-au</language>${items}</channel></rss>`;
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
