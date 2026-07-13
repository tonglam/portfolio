import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import type { CaseStudy, WritingMeta } from '@/src/content/types';

export function SectionHeading({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <header className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {intro ? <p className="section-intro">{intro}</p> : null}
    </header>
  );
}

export function CaseStudyCard({ study, index }: { study: CaseStudy; index: number }) {
  const image = study.gallery[0];
  return (
    <article className="work-card">
      <Link
        href={`/work/${study.slug}`}
        className="work-image"
        aria-label={`Read ${study.title} case study`}
      >
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes="(max-width: 760px) 100vw, 50vw"
        />
      </Link>
      <div className="work-card-body">
        <div className="work-meta">
          <span>0{index + 1}</span>
          <span>{study.eyebrow}</span>
        </div>
        <h3>{study.title}</h3>
        <p>{study.summary}</p>
        <div className="evidence-row">
          {study.evidence.slice(0, 2).map(item => (
            <span key={item.label}>
              <small>{item.label}</small>
              {item.value}
            </span>
          ))}
        </div>
        <Link href={`/work/${study.slug}`} className="text-link">
          Read the case study <ArrowRight aria-hidden="true" size={17} />
        </Link>
      </div>
    </article>
  );
}

export function ArticleCard({ article, index }: { article: WritingMeta; index: number }) {
  return (
    <article className="article-card">
      <div className="article-index">0{index + 1}</div>
      <div>
        <p className="article-meta">
          {article.publishedAt} · {article.minutes} min read
        </p>
        <h3>
          <Link href={`/writing/${article.slug}`}>{article.title}</Link>
        </h3>
        <p>{article.description}</p>
        <div className="tag-row">
          {article.tags.map(tag => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
      <Link
        className="round-link"
        href={`/writing/${article.slug}`}
        aria-label={`Read ${article.title}`}
      >
        <ArrowUpRight aria-hidden="true" size={19} />
      </Link>
    </article>
  );
}

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}

export function PageIntro({
  eyebrow,
  title,
  summary,
  children,
}: {
  eyebrow: string;
  title: string;
  summary: string;
  children?: ReactNode;
}) {
  return (
    <section className="page-intro shell">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p>{summary}</p>
      {children}
    </section>
  );
}
