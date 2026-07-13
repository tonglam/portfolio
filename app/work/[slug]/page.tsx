import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { TrackedLink } from '@/src/components/tracked-link';
import { JsonLd } from '@/src/components/ui';
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
  const sections = [
    { id: 'overview', index: '01', label: 'Overview' },
    { id: 'context', index: '02', label: 'System context' },
    { id: 'architecture', index: '03', label: 'Architecture' },
    { id: 'decisions', index: '04', label: 'Key decisions' },
    { id: 'operations', index: '05', label: 'Operating concerns' },
    { id: 'evidence', index: '06', label: 'Evidence & outcomes' },
    { id: 'reflection', index: '07', label: 'Reflection' },
  ] as const;
  const heroImage = study.gallery[0];

  return (
    <>
      <JsonLd data={jsonLd} />
      <section className="case-hero shell">
        <div className="case-hero-copy">
          <p className="eyebrow">Case study / verified engineering evidence</p>
          <p className="case-hero-kicker">
            {study.eyebrow} <span aria-hidden="true">/</span> {study.period}
          </p>
          <h1>{study.title}</h1>
          <p className="case-hero-summary">{study.summary}</p>
          <div className="case-hero-actions">
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
        </div>
        <figure className="case-hero-visual">
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            width={heroImage.width}
            height={heroImage.height}
            priority
            sizes="(max-width: 1040px) 100vw, 56vw"
          />
          <figcaption>
            <span>Primary product view</span>
            {heroImage.caption}
          </figcaption>
        </figure>
        <div className="case-hero-evidence" aria-label="Project evidence">
          {study.evidence.map(item => (
            <div key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </div>
      </section>

      <div className="case-layout shell">
        <aside className="case-aside">
          <nav className="case-toc" aria-label="Case study contents">
            <p>Case file</p>
            <ol>
              {sections.map(section => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>
                    <span>{section.index}</span>
                    {section.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <div className="case-aside-meta" aria-label="Case study overview">
            <div>
              <span>Role</span>
              <p>{study.role}</p>
            </div>
            <div>
              <span>Technical context</span>
              <p>{study.capabilities.join(' · ')}</p>
            </div>
          </div>
        </aside>
        <div className="case-content">
          <section id="overview" aria-labelledby="overview-heading">
            <p className="eyebrow">01 / Overview</p>
            <h2 id="overview-heading">Ownership across the working system.</h2>
            <p className="case-lead">{study.role}.</p>
            <ul className="ownership-list">
              {study.ownership.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section id="context" aria-labelledby="context-heading">
            <p className="eyebrow">02 / System context</p>
            <h2 id="context-heading">The constraint behind the interface.</h2>
            <p className="case-statement">{study.challenge}</p>
            <div className="case-focus-callout">
              <span>Engineering focus</span>
              <p>{study.cardFocus}</p>
            </div>
          </section>

          <section id="architecture" aria-labelledby="architecture-heading">
            <p className="eyebrow">03 / Architecture</p>
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

          <section id="decisions" aria-labelledby="decisions-heading">
            <p className="eyebrow">04 / Key decisions</p>
            <h2 id="decisions-heading">Why the system takes this shape.</h2>
            <div className="decision-list">
              {study.decisions.map((item, index) => (
                <article key={item.title}>
                  <span>0{index + 1}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <dl>
                      <div>
                        <dt>Problem</dt>
                        <dd>{item.context}</dd>
                      </div>
                      <div>
                        <dt>Decision</dt>
                        <dd>{item.decision}</dd>
                      </div>
                      <div className="decision-tradeoff">
                        <dt>Trade-off</dt>
                        <dd>{item.tradeoff}</dd>
                      </div>
                      <div className="decision-result">
                        <dt>Result</dt>
                        <dd>{item.outcome}</dd>
                      </div>
                    </dl>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="operations" aria-labelledby="operations-heading">
            <p className="eyebrow">05 / Operating concerns</p>
            <h2 id="operations-heading">What has to remain true at runtime.</h2>
            <div className="operating-grid">
              {study.operatingConcerns.map((concern, index) => (
                <article key={concern.label}>
                  <span>
                    0{index + 1} / {concern.label}
                  </span>
                  <h3>{concern.title}</h3>
                  <p>{concern.detail}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="evidence" aria-labelledby="evidence-heading">
            <p className="eyebrow">06 / Evidence &amp; outcomes</p>
            <h2 id="evidence-heading">The system made visible.</h2>
            <div className="case-gallery">
              {study.gallery.slice(1).map(image => (
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

          <section id="reflection" aria-labelledby="reflection-heading">
            <p className="eyebrow">07 / Reflection</p>
            <h2 id="reflection-heading">What the work changed in my approach.</h2>
            <p className="case-statement">{study.reflection.summary}</p>
            <div className="reflection-grid">
              <div>
                <span>Learned</span>
                <p>{study.reflection.learned}</p>
              </div>
              <div>
                <span>Next</span>
                <p>{study.reflection.next}</p>
              </div>
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
