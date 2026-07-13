import { ArrowRight, ArrowUpRight, MapPin } from 'lucide-react';
import Link from 'next/link';
import { CopyEmail } from '@/src/components/copy-email';
import { SystemMap } from '@/src/components/system-map';
import { TrackedLink } from '@/src/components/tracked-link';
import { ArticleCard, CaseStudyCard, JsonLd, SectionHeading } from '@/src/components/ui';
import { caseStudies } from '@/src/content/case-studies';
import { capabilities, credentials, experience, site } from '@/src/content/site';
import { articles } from '@/src/content/writing';

export default function HomePage() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: site.name,
      url: site.url,
      email: `mailto:${site.email}`,
      jobTitle: 'Full-Stack Software Engineer',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Perth',
        addressRegion: 'WA',
        addressCountry: 'AU',
      },
      sameAs: [site.social.linkedin, site.social.github],
      alumniOf: { '@type': 'CollegeOrUniversity', name: 'The University of Western Australia' },
      knowsAbout: [
        'Full-stack product delivery',
        'React',
        'Next.js',
        'TypeScript',
        'API design',
        'Distributed systems',
        'Java',
        'Cloud delivery',
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Qitong Lan Portfolio',
      url: site.url,
      description: site.description,
    },
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <section className="hero shell">
        <div className="hero-copy reveal-1">
          <p className="availability">
            <span aria-hidden="true" /> Open to Perth, hybrid and remote software roles
          </p>
          <h1>I build dependable products across interfaces, APIs, data and cloud.</h1>
          <p className="hero-intro">
            Hands-on full-stack software engineer with 8+ years of commercial experience across
            cloud billing, telecommunications CRM, game operations and current web products.
          </p>
          <div className="hero-location">
            <MapPin aria-hidden="true" size={17} /> {site.location} · {site.workRights}
          </div>
          <div className="hero-actions">
            <Link className="button button-primary" href="#work">
              View case studies <ArrowRight aria-hidden="true" size={17} />
            </Link>
            <details className="hero-resume">
              <summary className="button button-secondary">
                Download résumé <ArrowRight aria-hidden="true" size={17} />
              </summary>
              <div className="hero-resume-panel">
                {site.resumes.map(resume => (
                  <TrackedLink key={resume.href} href={resume.href} event={resume.event} download>
                    <span>{resume.label}</span>
                    <small>{resume.detail}</small>
                  </TrackedLink>
                ))}
              </div>
            </details>
          </div>
        </div>
        <div className="reveal-2">
          <SystemMap />
        </div>
        <div className="proof-strip reveal-3" aria-label="Career evidence">
          <div>
            <strong>8+</strong>
            <span>years commercial engineering</span>
          </div>
          <div>
            <strong>800+</strong>
            <span>LetLetMe users</span>
          </div>
          <div>
            <strong>50+</strong>
            <span>games supported at NetEase</span>
          </div>
          <div>
            <strong>Perth</strong>
            <span>full Australian working rights</span>
          </div>
        </div>
      </section>

      <section id="work" className="section shell">
        <SectionHeading
          eyebrow="Selected work / 01"
          title="Products built for real operating conditions."
          intro="Two products, shown through architecture, decisions and defensible evidence—not just technology lists."
        />
        <div className="work-grid">
          {caseStudies.map((study, index) => (
            <CaseStudyCard key={study.slug} study={study} index={index} />
          ))}
        </div>
      </section>

      <section id="experience" className="section section-ruled shell">
        <SectionHeading
          eyebrow="Commercial experience / 02"
          title="Enterprise depth, current hands-on delivery."
          intro="Eight-plus years across billing, CRM and game operations, followed by postgraduate study while continuing to build and operate software."
        />
        <div className="timeline">
          {experience.map((role, index) => (
            <article key={role.company} className="timeline-row">
              <div className="timeline-index">0{index + 1}</div>
              <p className="timeline-period">{role.period}</p>
              <div>
                <h3>{role.title}</h3>
                <p className="timeline-company">{role.company}</p>
              </div>
              <div>
                <p>{role.summary}</p>
                <p className="timeline-proof">{role.proof}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="return-note">
          <p className="eyebrow">Postgraduate study / 2023 — 2025</p>
          <p>
            After leaving my commercial role in June 2023, I undertook a Master of Information
            Technology at UWA. During that period I continued hands-on development through LetLetMe
            and other software projects. With the degree completed, I am focused on returning to a
            commercial engineering team.
          </p>
        </div>
      </section>

      <section className="section shell">
        <SectionHeading
          eyebrow="Capabilities / 03"
          title="Technical range anchored to delivery."
          intro="Four engineering surfaces, each linked to commercial systems or maintained product evidence."
        />
        <div className="capability-grid">
          {capabilities.map(capability => (
            <article key={capability.index} className="capability-card">
              <span>{capability.index}</span>
              <h3>{capability.title}</h3>
              <p>{capability.description}</p>
              <small>{capability.evidence}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="section writing-section">
        <div className="shell">
          <SectionHeading
            eyebrow="Writing / 04"
            title="Engineering notes from systems I’ve built and worked on."
            intro="Practical reasoning about reliability, event-driven billing and role-secured product workflows."
          />
          <div className="article-list">
            {articles.map((article, index) => (
              <ArticleCard key={article.slug} article={article} index={index} />
            ))}
          </div>
          <Link className="text-link writing-link" href="/writing">
            Browse all writing <ArrowRight aria-hidden="true" size={17} />
          </Link>
        </div>
      </section>

      <section id="about" className="section shell about-grid">
        <div>
          <p className="eyebrow">About / 05</p>
          <h2 className="about-title">Full-stack delivery with substantial backend depth.</h2>
        </div>
        <div className="about-copy">
          <p>
            I work best in hands-on engineering roles where system boundaries, data behaviour and
            the user experience need to make sense together.
          </p>
          <p>
            I currently deliver products across TypeScript, React, Next.js, Node.js, APIs, data and
            cloud deployment. That end-to-end work is backed by substantial commercial experience
            with Java/Spring Boot services, distributed workflows and SQL.
          </p>
          <div className="education-block">
            <div>
              <span>Education</span>
              <strong>Master of Information Technology</strong>
              <small>The University of Western Australia · Jul 2023 — Jul 2025</small>
            </div>
            <div className="credential-list">
              <span>Credentials</span>
              {credentials.map(credential => (
                <a key={credential.href} href={credential.href}>
                  {credential.title} <small>{credential.year}</small>
                  <ArrowUpRight aria-hidden="true" size={15} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="shell contact-grid">
          <div>
            <p className="eyebrow">Contact / 06</p>
            <h2>Let’s talk about how I can contribute to your engineering team.</h2>
          </div>
          <div className="contact-actions">
            <TrackedLink
              className="contact-email"
              href={`mailto:${site.email}`}
              event="contact_email"
            >
              {site.email} <ArrowUpRight aria-hidden="true" size={22} />
            </TrackedLink>
            <CopyEmail />
            <TrackedLink
              className="text-action"
              href={site.social.linkedin}
              event="contact_linkedin"
            >
              LinkedIn <ArrowUpRight aria-hidden="true" size={17} />
            </TrackedLink>
            <TrackedLink className="text-action" href={site.social.github} event="contact_github">
              GitHub <ArrowUpRight aria-hidden="true" size={17} />
            </TrackedLink>
          </div>
        </div>
      </section>
    </>
  );
}
