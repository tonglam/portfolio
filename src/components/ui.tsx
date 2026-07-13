import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import type { CaseStudy, WritingMeta } from '@/src/content/types';
import { formatPublicationDate } from '@/src/content/format';

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
          sizes="(max-width: 1040px) 100vw, 55vw"
        />
        <span className="work-image-caption">
          <small>{image.label}</small>
          {image.caption}
          {image.note ? <em>{image.note}</em> : null}
        </span>
      </Link>
      <div className="work-card-body">
        <div className="work-meta">
          <span>0{index + 1}</span>
          <span>{study.period}</span>
        </div>
        <p className="work-kicker">{study.eyebrow}</p>
        <h3>{study.title}</h3>
        <p>{study.summary}</p>
        <p className="work-role">
          <span>Ownership</span>
          {study.role}
        </p>
        <div className="evidence-row">
          {study.evidence.map(item => (
            <span key={item.label}>
              <small>{item.label}</small>
              {item.value}
            </span>
          ))}
        </div>
        <div className="work-focus">
          <span>Engineering focus</span>
          <p>{study.cardFocus}</p>
        </div>
        <Link href={`/work/${study.slug}`} className="text-link">
          Read the case study <ArrowRight aria-hidden="true" size={17} />
        </Link>
      </div>
    </article>
  );
}

export function ArticleCard({
  article,
  index,
  headingLevel = 3,
}: {
  article: WritingMeta;
  index: number;
  headingLevel?: 2 | 3;
}) {
  const Heading = headingLevel === 2 ? 'h2' : 'h3';

  return (
    <article className="article-card">
      <div className="article-index">0{index + 1}</div>
      <div>
        <p className="article-meta">
          {formatPublicationDate(article.publishedAt)} · {article.minutes} min read
        </p>
        <Heading>
          <Link href={`/writing/${article.slug}`}>{article.title}</Link>
        </Heading>
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
