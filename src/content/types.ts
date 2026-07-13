import { z } from 'zod';

export const caseStudySchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  eyebrow: z.string().min(1),
  summary: z.string().min(1),
  cardFocus: z.string().min(1),
  period: z.string().min(1),
  role: z.string().min(1),
  ownership: z.array(z.string().min(1)).min(1),
  evidence: z.array(z.object({ label: z.string(), value: z.string() })).min(1),
  capabilities: z.array(z.string().min(1)).min(1),
  challenge: z.string().min(1),
  architecture: z.object({
    description: z.string().min(1),
    stages: z.array(z.object({ label: z.string(), detail: z.string() })).min(2),
  }),
  decisions: z.array(
    z.object({
      title: z.string(),
      context: z.string(),
      decision: z.string(),
      tradeoff: z.string(),
      outcome: z.string(),
    })
  ),
  operatingConcerns: z
    .array(
      z.object({
        label: z.string(),
        title: z.string(),
        detail: z.string(),
      })
    )
    .min(1),
  reflection: z.object({
    summary: z.string(),
    learned: z.string(),
    next: z.string(),
  }),
  gallery: z.array(
    z.object({
      src: z.string(),
      alt: z.string(),
      caption: z.string(),
      width: z.number(),
      height: z.number(),
    })
  ),
  links: z.array(z.object({ label: z.string(), href: z.string().url(), event: z.string() })),
});

export const writingMetaSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  publishedAt: z.string().date(),
  updatedAt: z.string().date(),
  tags: z.array(z.string()).min(1),
  minutes: z.number().int().positive(),
  featured: z.boolean(),
});

export const archivePostSchema = z.object({
  id: z.string(),
  title: z.string(),
  summary: z.string(),
  category: z.string(),
  tags: z.array(z.string()),
  url: z.string().url(),
  date: z.string(),
  minutes: z.number().nullable(),
});

export type CaseStudy = z.infer<typeof caseStudySchema>;
export type WritingMeta = z.infer<typeof writingMetaSchema>;
export type ArchivePost = z.infer<typeof archivePostSchema>;
