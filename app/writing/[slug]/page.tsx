import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import { JsonLd } from '@/src/components/ui';
import { site } from '@/src/content/site';
import { articles, getArticle } from '@/src/content/writing';

export const dynamicParams = false;
export function generateStaticParams() {
  return articles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/writing/${article.slug}` },
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.description,
      url: `/writing/${article.slug}`,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      tags: article.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const { Component } = article;
  const canonical = `${site.url}/writing/${article.slug}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    url: canonical,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    keywords: article.tags.join(', '),
    author: { '@type': 'Person', name: site.name, url: site.url },
    publisher: { '@type': 'Person', name: site.name, url: site.url },
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <article className="article-page shell">
        <header className="article-header">
          <Link className="back-link" href="/writing">
            <ArrowLeft aria-hidden="true" size={17} /> All writing
          </Link>
          <p className="eyebrow">
            {article.publishedAt} · {article.minutes} min read
          </p>
          <h1>{article.title}</h1>
          <p>{article.description}</p>
          <div className="tag-row">
            {article.tags.map(tag => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </header>
        <div className="prose">
          <Component />
        </div>
      </article>
    </>
  );
}
