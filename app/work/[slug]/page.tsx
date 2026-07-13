import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { TrackedLink } from '@/src/components/tracked-link';
import { JsonLd, PageIntro } from '@/src/components/ui';
import { caseStudies, getCaseStudy } from '@/src/content/case-studies';
import { site } from '@/src/content/site';

export const dynamicParams = false;
export function generateStaticParams() {
  return caseStudies.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return {
    title: study.title,
    description: study.summary,
    alternates: { canonical: `/work/${study.slug}` },
    openGraph: {
      type: 'article',
      url: `/work/${study.slug}`,
      title: study.title,
      description: study.summary,
    },
    twitter: { card: 'summary_large_image', title: study.title, description: study.summary },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();
  const canonical = `${site.url}/work/${study.slug}`;
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: study.title,
      description: study.summary,
      url: canonical,
      author: { '@type': 'Person', name: site.name, url: site.url },
      keywords: study.capabilities.join(', '),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
        { '@type': 'ListItem', position: 2, name: 'Work', item: `${site.url}/#work` },
        { '@type': 'ListItem', position: 3, name: study.title, item: canonical },
      ],
    },
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageIntro
        eyebrow={`${study.eyebrow} / ${study.period}`}
        title={study.title}
        summary={study.summary}
      >
        <div className="page-intro-actions">
          {study.links.map(link => (
            <TrackedLink
              key={link.href}
              className="button button-secondary"
              href={link.href}
              event={link.event}
            >
              {link.label} <ArrowUpRight aria-hidden="true" size={17} />
            </TrackedLink>
          ))}
        </div>
      </PageIntro>

      <div className="case-layout shell">
        <aside className="case-aside" aria-label="Case study overview">
          <div>
            <span>Role</span>
            <p>{study.role}</p>
          </div>
          <div>
            <span>Period</span>
            <p>{study.period}</p>
          </div>
          <div>
            <span>Technical context</span>
            <p>{study.capabilities.join(' · ')}</p>
          </div>
        </aside>
        <div className="case-content">
          <section aria-labelledby="evidence-heading">
            <p className="eyebrow">Evidence</p>
            <h2 id="evidence-heading">What this work demonstrates.</h2>
            <div className="case-evidence">
              {study.evidence.map(item => (
                <div key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
          </section>
          <section aria-labelledby="scope-heading">
            <p className="eyebrow">Scope</p>
            <h2 id="scope-heading">Ownership and operating context.</h2>
            <p className="case-lead">{study.challenge}</p>
            <ul className="ownership-list">
              {study.ownership.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="architecture-heading">
            <p className="eyebrow">Architecture</p>
            <h2 id="architecture-heading">A deliberate path through the system.</h2>
            <p className="case-lead">{study.architecture.description}</p>
            <ol className="architecture-flow">
              {study.architecture.stages.map((stage, index) => (
                <li key={stage.label}>
                  <span>0{index + 1}</span>
                  <strong>{stage.label}</strong>
                  <p>{stage.detail}</p>
                </li>
              ))}
            </ol>
          </section>
          <section aria-labelledby="decisions-heading">
            <p className="eyebrow">Decisions & trade-offs</p>
            <h2 id="decisions-heading">Why the system takes this shape.</h2>
            <div className="decision-list">
              {study.decisions.map((item, index) => (
                <article key={item.title}>
                  <span>0{index + 1}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>
                      <strong>Context.</strong> {item.context}
                    </p>
                    <p>
                      <strong>Decision.</strong> {item.decision}
                    </p>
                    <p>
                      <strong>Result.</strong> {item.outcome}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>
          <section aria-labelledby="gallery-heading">
            <p className="eyebrow">Product views</p>
            <h2 id="gallery-heading">The system made visible.</h2>
            <div className="case-gallery">
              {study.gallery.map(image => (
                <figure key={image.src}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    sizes="(max-width: 900px) 100vw, 820px"
                  />
                  <figcaption>{image.caption}</figcaption>
                </figure>
              ))}
            </div>
          </section>
          <Link className="back-link" href="/#work">
            <ArrowLeft aria-hidden="true" size={17} /> Back to selected work
          </Link>
        </div>
      </div>
    </>
  );
}
