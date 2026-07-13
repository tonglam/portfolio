import type { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';
import { PageIntro } from '@/src/components/ui';
import { archiveGroups, archivePosts } from '@/src/content/archive';

export const metadata: Metadata = {
  title: 'Writing Archive',
  description: 'Earlier technical notes and study material by Qitong Lan.',
  alternates: { canonical: '/writing/archive' },
  robots: { index: false, follow: true },
};

export default function ArchivePage() {
  return (
    <>
      <PageIntro
        eyebrow="Writing archive"
        title="Earlier notes, kept quietly available."
        summary={`${archivePosts.length} earlier technical and study notes are preserved here. They open in their original Notion pages.`}
      />
      <section className="shell archive-groups" aria-label="Archived writing">
        {archiveGroups.map(([year, posts], groupIndex) => (
          <details key={year} open={groupIndex === 0}>
            <summary>
              <span>{year}</span>
              <small>{posts.length} notes</small>
            </summary>
            <ul>
              {posts.map(post => (
                <li key={post.id}>
                  <a href={post.url}>
                    <span>
                      <strong>{post.title}</strong>
                      <small>
                        {post.category}
                        {post.minutes ? ` · ${post.minutes} min` : ''}
                      </small>
                    </span>
                    <ArrowUpRight aria-hidden="true" size={17} />
                  </a>
                </li>
              ))}
            </ul>
          </details>
        ))}
      </section>
    </>
  );
}
