import type { ComponentType } from 'react';
import BillingArticle from '@/content/writing/event-driven-cloud-billing.mdx';
import LiveDataArticle from '@/content/writing/reliable-live-data-pipelines.mdx';
import VehicleArticle from '@/content/writing/role-secured-vehicle-workflows.mdx';
import { articleMetadata } from './article-metadata';
import type { WritingMeta } from './types';

export type ArticleDocument = WritingMeta & { Component: ComponentType };

const components = {
  'reliable-live-data-pipelines': LiveDataArticle,
  'event-driven-cloud-billing': BillingArticle,
  'role-secured-vehicle-workflows': VehicleArticle,
} as const;

export const articles: ArticleDocument[] = articleMetadata
  .map(metadata => ({
    ...metadata,
    Component: components[metadata.slug as keyof typeof components],
  }))
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

export function getArticle(slug: string) {
  return articles.find(article => article.slug === slug);
}
