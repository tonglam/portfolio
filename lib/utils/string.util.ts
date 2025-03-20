import type { RichTextItem } from '@/types/api/notion.type';

/**
 * Extracts plain text from Notion rich text array
 */
export function extractPlainText(richText: RichTextItem[] | RichTextItem | undefined): string {
  if (!richText) {
    return '';
  }

  if (Array.isArray(richText)) {
    return richText.map(item => item.plain_text || '').join('');
  }

  return richText.plain_text || '';
}

/**
 * Generates an excerpt from content
 */
export function generateExcerpt(content: string, maxLength = 160): string {
  if (!content) return '...';

  // Clean up content
  const cleanContent = content.replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim();

  if (cleanContent.length <= maxLength) {
    return cleanContent;
  }

  // Look for natural breaking points
  let excerpt = cleanContent.substring(0, maxLength);
  const lastPeriod = excerpt.lastIndexOf('.');
  const lastQuestion = excerpt.lastIndexOf('?');
  const lastExclamation = excerpt.lastIndexOf('!');
  const lastSentenceEnd = Math.max(lastPeriod, lastQuestion, lastExclamation);

  if (lastSentenceEnd > maxLength * 0.5) {
    excerpt = cleanContent.substring(0, lastSentenceEnd + 1);
  } else {
    const lastSpace = excerpt.lastIndexOf(' ');
    if (lastSpace > 0) {
      excerpt = excerpt.substring(0, lastSpace);
    }
    excerpt += '...';
  }

  return excerpt.replace(/!Image/g, '').trim();
}

/**
 * Extracts tags from content
 */
export function extractTags(content: string, title?: string, category?: string): string[] {
  const tags: string[] = [];

  // Add category as tag
  if (category?.trim()) {
    if (category.startsWith('CITS')) {
      tags.push(category);
      tags.push(category.substring(4));
    } else {
      tags.push(category);
    }
  }

  // Add title as tag
  if (title && title !== category && !title.endsWith('Notes')) {
    if (title.startsWith('CITS')) {
      tags.push(title.substring(4));
    } else {
      tags.push(title);
    }
  }

  // Extract hashtags from content
  if (content) {
    const hashtagRegex = /#(\w+)/g;
    let match;
    while ((match = hashtagRegex.exec(content)) !== null) {
      const tag = match[1];
      if (tag && !tags.includes(tag)) {
        tags.push(tag);
      }
    }
  }

  return Array.from(new Set(tags)).filter(tag => !tag.includes(','));
}

/**
 * Converts a string to slug format
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

/**
 * Generates a URL-friendly slug from a title
 * @param title - The title to convert to a slug
 * @param fallback - Optional fallback value if title is empty
 * @returns A URL-friendly slug
 */
export function generateSlug(title: string | undefined | null, fallback: string = ''): string {
  if (!title) {
    return fallback;
  }

  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric chars with hyphens
    .replace(/(^-|-$)/g, ''); // Remove leading/trailing hyphens
}
