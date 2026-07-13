import { caseStudySchema, type CaseStudy } from './types';

const studies = [
  {
    slug: 'letletme',
    title: 'LetLetMe FPL Platform',
    eyebrow: 'Real-time analytics & workflow platform',
    summary:
      'A maintained full-stack Fantasy Premier League platform that turns fast-moving external data into live analytics, tournament workflows, notifications, and companion experiences.',
    cardFocus:
      'Keeping live scores, tournament state and notifications consistent when upstream data changes.',
    period: 'April 2020 — present',
    role: 'Builder and maintainer across product, backend services, data workflows and cloud delivery',
    ownership: [
      'Product and architecture decisions across web, API, processing and delivery surfaces',
      'Scheduled ingestion, normalization, scoring, cache/database synchronization and recovery paths',
      'Deployment and operation across Vercel, Cloudflare, VPS services, Docker and GitHub Actions',
    ],
    evidence: [
      { label: 'Reach', value: '800+ users' },
      { label: 'Surfaces', value: 'Web, WeChat and bot delivery' },
      { label: 'Runtime', value: 'Live data, scheduled jobs and recovery workflows' },
    ],
    outcomes: [
      'Used by 800+ users across its product surfaces.',
      'Maintained and operated continuously as a personal product since April 2020.',
      'Shared scoring and tournament rules serve web, WeChat and bot experiences.',
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
        { label: 'Client surfaces', detail: 'Web, WeChat and Telegram delivery' },
      ],
    },
    decisions: [
      {
        title: 'Separate ingestion from user-facing reads',
        context: 'External sources can be slow or temporarily inconsistent.',
        decision:
          'Run ingestion and normalization as scheduled background workflows, then serve product reads from controlled storage and cache layers.',
        tradeoff:
          'Product reads use controlled freshness windows instead of fetching providers on demand, so scheduled workflows need deliberate monitoring and recovery.',
        outcome: 'User-facing routes do not depend directly on external-provider response time.',
      },
      {
        title: 'Make cache repair an operating workflow',
        context: 'Redis and relational records can drift after partial failures or delayed jobs.',
        decision:
          'Add verification, rebuild and rerun paths rather than assuming every synchronization step succeeds.',
        tradeoff:
          'Repair paths add operational code and explicit checks, but avoid using a full cache reset as the default response to partial failure.',
        outcome:
          'The system can recover deliberately without treating cache resets as the default response.',
      },
      {
        title: 'Keep product surfaces behind shared rules',
        context: 'Web, bot and companion experiences consume overlapping domain state.',
        decision:
          'Centralize scoring and workflow rules in backend services and expose them through APIs.',
        tradeoff:
          'Shared APIs require stable contracts and careful changes, but keep each client from recreating domain rules.',
        outcome: 'Clients can evolve independently without duplicating core calculations.',
      },
    ],
    operatingConcerns: [
      {
        label: 'Freshness',
        title: 'Make staleness visible and intentional',
        detail:
          'Scheduled refresh windows and controlled read layers keep product behaviour understandable when upstream data changes quickly.',
      },
      {
        label: 'Recovery',
        title: 'Treat repair as part of the product runtime',
        detail:
          'Verification, rebuild and rerun paths give partial failures a deliberate recovery route instead of relying on manual cache clearing.',
      },
      {
        label: 'Consistency',
        title: 'Keep shared rules behind the API boundary',
        detail:
          'Web, companion and bot experiences consume the same scoring and workflow behaviour from backend services.',
      },
    ],
    reflection: {
      summary:
        'Operating LetLetMe over time reinforced that reliability is a product behaviour, not a single infrastructure component.',
      learned:
        'Cached data needs an explicit lifecycle: when it becomes fresh, how it can drift, and how the system restores agreement after interruption.',
      next: 'Continue tightening observability and recovery workflows as the product and its live-data surfaces evolve.',
    },
    sectionHeadings: {
      overview: 'Owning the product loop.',
      context: 'Live data rarely fails cleanly.',
      architecture: 'From provider payloads to product state.',
      decisions: 'Three choices that shaped reliability.',
      operations: 'Freshness, recovery and shared rules.',
      evidence: 'A maintained product in use.',
      reflection: 'Reliability became a product concern.',
    },
    gallery: [
      {
        src: '/work/letletme/desktop-workflow.png',
        alt: 'LetLetMe desktop tournament workflow with filters, ownership and ranking controls',
        label: 'Live product screen',
        caption: 'Tournament workflow backed by synchronized product state.',
        width: 1600,
        height: 900,
      },
      {
        src: '/work/letletme/desktop-analytics.png',
        alt: 'LetLetMe analytics view showing live fantasy football data',
        label: 'Live product screen',
        caption: 'Freshness-sensitive analytics served through explicit cache behaviour.',
        width: 1600,
        height: 900,
      },
      {
        src: '/work/letletme/live-tournament.png',
        alt: 'LetLetMe mobile tournament experience',
        label: 'Live product screen',
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
    title: 'Vehicle Operations & Compliance Platform',
    eyebrow: 'Role-secured operational product',
    summary:
      'A deployed backend-heavy web application for vehicle, driver, inspection, agreement, signature, document and compliance workflows.',
    cardFocus:
      'Making role-secured operational records understandable across inspections, signatures, agreements and documents.',
    period: '2025',
    role: 'Full-stack product design and implementation',
    ownership: [
      'Domain modelling for vehicles, users and operational records',
      'Shared authorization policy for authenticated agreement operations',
      'Server-rendered data views with focused client interaction for forms and tables',
    ],
    evidence: [
      { label: 'Access', value: '4 application roles' },
      { label: 'Workflow', value: 'Inspection → agreement → signature' },
      { label: 'Delivery', value: 'Deployed app + public source' },
    ],
    outcomes: [
      'A deployed application demonstrates the role-secured operational workflow.',
      'The public repository exposes the implementation, schema and focused policy tests.',
      'Agreement signing has explicit state transitions from draft through signature or termination.',
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
      'The interface needs to stay simple while the server preserves access rules and an understandable record trail across vehicles, drivers, inspections, agreements, signatures and supporting documents.',
    architecture: {
      description:
        'Next.js Server Components render data-heavy views. Agreement endpoints use a shared server authorization boundary, while the signing route validates transport input and delegates the workflow transition, persistence and invitation email to a service.',
      stages: [
        { label: 'User interface', detail: 'Server-rendered dashboards, forms and tables' },
        { label: 'Authentication', detail: 'Better Auth sessions and active-user checks' },
        { label: 'Authorization', detail: 'Shared admin and manager policy boundary' },
        { label: 'Workflow service', detail: 'Signing transition, persistence and invitation' },
        { label: 'Typed data', detail: 'Drizzle models and migrations' },
        { label: 'PostgreSQL', detail: 'Supabase-hosted operational records' },
      ],
    },
    decisions: [
      {
        title: 'Centralize agreement authorization',
        context:
          'Repeated session and role queries can drift between endpoints and omit important checks.',
        decision:
          'Use one server helper for the session, active-user lookup and allowed-role policy across agreement endpoints.',
        tradeoff:
          'The shared boundary adds a module dependency, but removes repeated authorization implementations.',
        outcome: 'Agreement mutations now apply the same admin and manager access policy.',
      },
      {
        title: 'Put signing orchestration behind a service',
        context:
          'The finalisation route previously mixed authorization, database reads, state changes, link generation and email delivery.',
        decision:
          'Keep request parsing in the route and move agreement lookup, state validation, persistence and invitation delivery into a named service.',
        tradeoff:
          'Email remains an external side effect after persistence, so a failed send returns a retryable error while retaining the same signing token.',
        outcome:
          'The HTTP entry point is small enough to review while the workflow has one implementation.',
      },
      {
        title: 'Model the agreement lifecycle explicitly',
        context:
          'Documents, signatures and compliance records need clear relationships to the operational subject.',
        decision:
          'Represent draft, pending-signature, signed and terminated states with permitted transitions.',
        tradeoff:
          'Explicit workflow records require more domain modelling and migrations, but preserve the relationships needed for auditability.',
        outcome:
          'Invalid reversals and actions on terminated agreements are rejected before persistence.',
      },
    ],
    operatingConcerns: [
      {
        label: 'Access',
        title: 'Enforce roles at the request boundary',
        detail:
          'A shared server helper checks the session, active user and permitted roles before agreement mutations run.',
      },
      {
        label: 'Integrity',
        title: 'Model supporting evidence as structured records',
        detail:
          'Agreements, inspections, signatures and documents retain clear relationships to the vehicle and workflow they support.',
      },
      {
        label: 'Delivery',
        title: 'Keep the client boundary deliberately small',
        detail:
          'Server-rendered views handle data-heavy screens while focused client components provide forms, tables and immediate feedback.',
      },
    ],
    reflection: {
      summary:
        'The project demonstrates that operational software becomes easier to use when permissions, record structure and interface state are designed together.',
      learned:
        'Compliance workflows should expose their state and evidence clearly instead of hiding important relationships inside generic attachments.',
      next: 'Extend automated workflow coverage and operational feedback as the product continues to mature.',
    },
    sectionHeadings: {
      overview: 'From vehicle records to signed agreements.',
      context: 'Permissions and auditability shape the workflow.',
      architecture: 'A server-led operational application.',
      decisions: 'Three implementation choices behind the product.',
      operations: 'Access, state and delivery boundaries.',
      evidence: 'A sanitized view of the working product.',
      reflection: 'Designing the record and interface together.',
    },
    gallery: [
      {
        src: '/work/vehicle/operations-overview.svg',
        alt: 'Sanitized vehicle operations dashboard illustration using synthetic fleet and compliance data',
        label: 'Sanitized product illustration',
        note: 'Synthetic demo data — not a production screenshot.',
        caption: 'A focused operational overview, designed around records requiring attention.',
        width: 1600,
        height: 1000,
      },
      {
        src: '/work/vehicle/workflow-detail.svg',
        alt: 'Sanitized vehicle workflow illustration using synthetic agreement, inspection, signature and document data',
        label: 'Sanitized product illustration',
        note: 'Synthetic demo data — not a production screenshot.',
        caption: 'Explicit workflow state keeps supporting records understandable.',
        width: 1600,
        height: 1000,
      },
    ],
    links: [
      {
        label: 'Open deployed application',
        href: 'https://vehicle-track-amber.vercel.app',
        event: 'visit_vehicle_live',
        note: 'Sign-in required',
      },
      {
        label: 'View implementation branch',
        href: 'https://github.com/tonglam/vehicle-track/tree/codex/vehicle-evidence-hardening',
        event: 'visit_vehicle_source',
      },
    ],
  },
] satisfies CaseStudy[];

export const caseStudies = caseStudySchema.array().parse(studies);
export function getCaseStudy(slug: string) {
  return caseStudies.find(study => study.slug === slug);
}
