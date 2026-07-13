import type { Metadata } from 'next';
import { ArticleCard, JsonLd, PageIntro } from '@/src/components/ui';
import { site } from '@/src/content/site';
import { articles } from '@/src/content/writing';

const description =
  'Read engineering articles by Qitong Lan about live-data reliability, event-driven cloud billing and role-secured full-stack product workflows.';

export const metadata: Metadata = {
  title: 'Engineering Writing',
  description,
  alternates: { canonical: '/writing' },
  openGraph: {
    type: 'website',
    url: '/writing',
    title: 'Engineering Writing by Qitong Lan',
    description,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Engineering Writing by Qitong Lan',
    description,
  },
};

export default function WritingPage() {
  const canonical = `${site.url}/writing`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Engineering Writing by Qitong Lan',
    description,
    url: canonical,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: articles.map((article, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: article.title,
        url: `${canonical}/${article.slug}`,
      })),
    },
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageIntro
        eyebrow="Writing / engineering practice"
        title="Notes from systems I’ve built and worked on."
        summary="Technical reasoning grounded in product delivery, commercial experience and current hands-on projects."
      />
      <section className="shell writing-page-list" aria-label="Published articles">
        {articles.map((article, index) => (
          <ArticleCard key={article.slug} article={article} index={index} headingLevel={2} />
        ))}
      </section>
    </>
  );
}
