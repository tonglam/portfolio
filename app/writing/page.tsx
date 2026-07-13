import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ArticleCard, PageIntro } from '@/src/components/ui';
import { articles } from '@/src/content/writing';

export const metadata: Metadata = {
  title: 'Engineering Writing',
  description:
    'Engineering notes on live-data reliability, event-driven billing and role-secured product workflows.',
  alternates: { canonical: '/writing' },
};

export default function WritingPage() {
  return (
    <>
      <PageIntro
        eyebrow="Writing / engineering practice"
        title="Notes from systems I have built."
        summary="Technical reasoning grounded in product delivery, commercial experience and current hands-on projects."
      />
      <section className="shell writing-page-list" aria-label="Published articles">
        {articles.map((article, index) => (
          <ArticleCard key={article.slug} article={article} index={index} />
        ))}
        <div className="archive-callout">
          <div>
            <p className="eyebrow">Earlier notes</p>
            <h2>Looking for the original archive?</h2>
            <p>
              Course notes and earlier technical posts remain available without competing with the
              current engineering work.
            </p>
          </div>
          <Link className="text-link" href="/writing/archive">
            Open the archive <ArrowRight aria-hidden="true" size={17} />
          </Link>
        </div>
      </section>
    </>
  );
}
