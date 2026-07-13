import { writingMetaSchema, type WritingMeta } from './types';

const metadata = [
  {
    slug: 'reliable-live-data-pipelines',
    title: 'Building reliable live-data pipelines for a real-time FPL platform',
    description:
      'How explicit freshness, synchronized storage and repair workflows keep a live analytics product dependable.',
    publishedAt: '2026-07-13',
    updatedAt: '2026-07-13',
    tags: ['Data pipelines', 'Redis', 'Reliability'],
    minutes: 7,
    featured: true,
  },
  {
    slug: 'event-driven-cloud-billing',
    title: 'From usage records to invoices: lessons from event-driven cloud billing',
    description:
      'A sanitized view of the boundaries, contracts and failure handling that make distributed billing workflows understandable.',
    publishedAt: '2026-07-13',
    updatedAt: '2026-07-13',
    tags: ['Event-driven systems', 'Java', 'Billing'],
    minutes: 7,
    featured: true,
  },
  {
    slug: 'role-secured-vehicle-workflows',
    title: 'Designing role-secured vehicle operations and compliance workflows',
    description:
      'How a backend-heavy operational product keeps permissions, records and workflow state understandable.',
    publishedAt: '2026-07-13',
    updatedAt: '2026-07-13',
    tags: ['Next.js', 'Authentication', 'Domain modelling'],
    minutes: 6,
    featured: true,
  },
] satisfies WritingMeta[];

export const articleMetadata = writingMetaSchema.array().parse(metadata);
