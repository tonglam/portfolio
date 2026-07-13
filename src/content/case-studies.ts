import { caseStudySchema, type CaseStudy } from './types';

const studies = [
  {
    slug: 'letletme',
    title: 'LetLetMe FPL Platform',
    eyebrow: 'Real-time analytics & workflow platform',
    summary:
      'A maintained full-stack Fantasy Premier League platform that turns fast-moving external data into live analytics, tournament workflows, notifications, and companion experiences.',
    period: 'April 2020 — present',
    role: 'Builder and maintainer across product, backend services, data workflows and cloud delivery',
    ownership: [
      'Product and architecture decisions across web, API, processing and delivery surfaces',
      'Scheduled ingestion, normalization, scoring, cache/database synchronization and recovery paths',
      'Deployment and operation across Vercel, Cloudflare, VPS services, Docker and GitHub Actions',
    ],
    evidence: [
      { label: 'Reach', value: '800+ users' },
      { label: 'Surfaces', value: 'Web, mobile companion and bot delivery' },
      { label: 'Runtime', value: 'Live data, scheduled jobs and recovery workflows' },
    ],
    capabilities: [
      'Next.js',
      'TypeScript',
      'Node.js',
      'REST',
      'GraphQL',
      'PostgreSQL',
      'MySQL',
      'Redis',
      'Docker',
    ],
    challenge:
      'Live sports data changes quickly, while product views, tournament state, notifications and derived scores need to agree. The system therefore needs explicit freshness rules and recovery paths instead of treating caching as a transparent performance layer.',
    architecture: {
      description:
        'External live data is ingested and normalized before synchronized writes update relational storage and Redis. APIs and workflow services expose that state to product clients and notification channels.',
      stages: [
        { label: 'External sources', detail: 'Live fixtures, players, events and scoring inputs' },
        { label: 'Scheduled ingestion', detail: 'Fetch, validate, normalize and score' },
        { label: 'Source of truth', detail: 'PostgreSQL/MySQL domain records' },
        { label: 'Live cache', detail: 'Redis-backed freshness-sensitive reads' },
        { label: 'Product APIs', detail: 'REST, GraphQL and workflow services' },
        { label: 'Client surfaces', detail: 'Web, companion client and Telegram delivery' },
      ],
    },
    decisions: [
      {
        title: 'Separate ingestion from user-facing reads',
        context: 'External sources can be slow or temporarily inconsistent.',
        decision:
          'Run ingestion and normalization as scheduled background workflows, then serve product reads from controlled storage and cache layers.',
        outcome: 'User-facing routes do not depend directly on external-provider response time.',
      },
      {
        title: 'Make cache repair an operating workflow',
        context: 'Redis and relational records can drift after partial failures or delayed jobs.',
        decision:
          'Add verification, rebuild and rerun paths rather than assuming every synchronization step succeeds.',
        outcome:
          'The system can recover deliberately without treating cache resets as the default response.',
      },
      {
        title: 'Keep product surfaces behind shared rules',
        context: 'Web, bot and companion experiences consume overlapping domain state.',
        decision:
          'Centralize scoring and workflow rules in backend services and expose them through APIs.',
        outcome: 'Clients can evolve independently without duplicating core calculations.',
      },
    ],
    gallery: [
      {
        src: '/work/letletme/desktop-workflow.png',
        alt: 'LetLetMe desktop tournament workflow with filters, ownership and ranking controls',
        caption: 'Tournament workflow backed by synchronized product state.',
        width: 1600,
        height: 900,
      },
      {
        src: '/work/letletme/desktop-analytics.png',
        alt: 'LetLetMe analytics view showing live fantasy football data',
        caption: 'Freshness-sensitive analytics served through explicit cache behaviour.',
        width: 1600,
        height: 900,
      },
      {
        src: '/work/letletme/live-tournament.png',
        alt: 'LetLetMe mobile tournament experience',
        caption: 'A companion workflow using the same backend rules and live state.',
        width: 680,
        height: 900,
      },
    ],
    links: [
      { label: 'Open live product', href: 'https://letletme.top', event: 'visit_letletme_live' },
      {
        label: 'Read GitHub case study',
        href: 'https://github.com/tonglam/letletme-case-study',
        event: 'visit_letletme_case_study',
      },
    ],
  },
  {
    slug: 'vehicle-operations',
    title: 'Vehicle Operations & Compliance',
    eyebrow: 'Role-secured operational product',
    summary:
      'A backend-heavy web platform for vehicle, driver, inspection, agreement, signature, document and compliance workflows.',
    period: '2025',
    role: 'Full-stack product design and implementation',
    ownership: [
      'Domain modelling for vehicles, users and operational records',
      'Authenticated and role-secured application boundaries',
      'Server-rendered data views with focused client interaction for forms and tables',
    ],
    evidence: [
      { label: 'Access', value: 'Role-secured workflows' },
      { label: 'Records', value: 'Inspections, agreements and documents' },
      { label: 'Delivery', value: 'Next.js, PostgreSQL and Vercel' },
    ],
    capabilities: [
      'Next.js',
      'TypeScript',
      'Better Auth',
      'Drizzle ORM',
      'PostgreSQL',
      'Supabase',
      'Vercel',
    ],
    challenge:
      'Operational tools need a simple interface while preserving permission boundaries and an understandable record trail across vehicles, drivers, inspections, agreements, signatures and supporting documents.',
    architecture: {
      description:
        'Next.js Server Components render data-heavy views. Route handlers validate requests and enforce roles before thin service boundaries apply domain rules and persist typed records through Drizzle.',
      stages: [
        { label: 'User interface', detail: 'Server-rendered dashboards, forms and tables' },
        { label: 'Authentication', detail: 'Better Auth sessions and role checks' },
        { label: 'Route boundary', detail: 'Request parsing and Zod validation' },
        { label: 'Domain services', detail: 'Operational rules and workflow state' },
        { label: 'Typed data', detail: 'Drizzle models and migrations' },
        { label: 'PostgreSQL', detail: 'Supabase-hosted operational records' },
      ],
    },
    decisions: [
      {
        title: 'Keep route handlers thin',
        context:
          'Authentication, validation and business rules become difficult to test when mixed together.',
        decision:
          'Use route handlers for transport concerns and service modules for domain behaviour.',
        outcome: 'Permissions and workflow rules have clearer ownership boundaries.',
      },
      {
        title: 'Prefer server-rendered operational views',
        context:
          'Most dashboard screens are data-heavy and do not require a fully client-rendered application.',
        decision:
          'Use Server Components by default and isolate client code to tables, forms and immediate feedback.',
        outcome:
          'The browser receives less application JavaScript while retaining focused interaction.',
      },
      {
        title: 'Model auditability into the workflow',
        context:
          'Documents, signatures and compliance records need clear relationships to the operational subject.',
        decision:
          'Represent the record lifecycle explicitly instead of attaching unstructured files to vehicles.',
        outcome: 'Operators can follow the state and supporting evidence of each workflow.',
      },
    ],
    gallery: [
      {
        src: '/work/vehicle/operations-overview.svg',
        alt: 'Vehicle operations dashboard concept showing fleet status, inspections and compliance records',
        caption: 'A focused operational overview, designed around records requiring attention.',
        width: 1600,
        height: 1000,
      },
      {
        src: '/work/vehicle/workflow-detail.svg',
        alt: 'Vehicle compliance record workflow showing agreement, inspection, signature and document stages',
        caption: 'Explicit workflow state keeps supporting records understandable.',
        width: 1600,
        height: 1000,
      },
    ],
    links: [
      {
        label: 'Open live product',
        href: 'https://vehicle-track-amber.vercel.app',
        event: 'visit_vehicle_live',
      },
      {
        label: 'View source repository',
        href: 'https://github.com/tonglam/vehicle-track',
        event: 'visit_vehicle_source',
      },
    ],
  },
] satisfies CaseStudy[];

export const caseStudies = caseStudySchema.array().parse(studies);
export function getCaseStudy(slug: string) {
  return caseStudies.find(study => study.slug === slug);
}
