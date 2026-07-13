import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { writingMetaSchema, type WritingMeta } from './types';

export function estimateReadingMinutes(slug: string) {
  const source = readFileSync(join(process.cwd(), 'content', 'writing', `${slug}.mdx`), 'utf8');
  const readableText = source
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#*_`>[\]()|:-]/g, ' ');
  const words = readableText.match(/[\p{L}\p{N}][\p{L}\p{N}'’.-]*/gu)?.length ?? 0;
  return Math.max(1, Math.ceil(words / 200));
}

const metadata = [
  {
    slug: 'reliable-live-data-pipelines',
    title: 'Building reliable live-data pipelines for a real-time FPL platform',
    description:
      'How explicit freshness, synchronized storage and repair workflows keep a live analytics product dependable.',
    publishedAt: '2026-07-13',
    updatedAt: '2026-07-13',
    tags: ['Data pipelines', 'Redis', 'Reliability'],
    minutes: estimateReadingMinutes('reliable-live-data-pipelines'),
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
    minutes: estimateReadingMinutes('event-driven-cloud-billing'),
    featured: true,
  },
  {
    slug: 'role-secured-vehicle-workflows',
    title: 'Designing role-secured vehicle operations and compliance workflows',
    description:
      'How a full-stack operational product keeps permissions, records and workflow state understandable.',
    publishedAt: '2026-07-13',
    updatedAt: '2026-07-13',
    tags: ['Next.js', 'Authentication', 'Domain modelling'],
    minutes: estimateReadingMinutes('role-secured-vehicle-workflows'),
    featured: true,
  },
] satisfies WritingMeta[];

export const articleMetadata = writingMetaSchema.array().parse(metadata);
