import type { Metadata } from 'next';
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
        title="Notes from systems I’ve built and worked on."
        summary="Technical reasoning grounded in product delivery, commercial experience and current hands-on projects."
      />
      <section className="shell writing-page-list" aria-label="Published articles">
        {articles.map((article, index) => (
          <ArticleCard key={article.slug} article={article} index={index} />
        ))}
      </section>
    </>
  );
}
