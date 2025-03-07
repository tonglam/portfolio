/**
 * Type definitions for Notion API responses and data structures
 */

export interface NotionText {
  plain_text: string;
  href?: string | null;
}

export interface NotionDate {
  date: {
    start: string;
    end?: string | null;
    time_zone?: string | null;
  };
}

export interface NotionUrlProperty {
  type: 'url';
  url: string;
}

export interface RichTextItem {
  plain_text?: string;
  text?: {
    content: string;
    link?: {
      url: string;
    } | null;
  };
  annotations?: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: string;
  };
  href?: string | null;
}

export interface NotionPropertyValue {
  title?: NotionText[] | RichTextItem[];
  rich_text?: NotionText[] | RichTextItem[];
  select?: {
    name: string;
    color?: string;
  };
  multi_select?: Array<{
    name: string;
    color?: string;
  }>;
  date?: {
    start: string;
    end?: string | null;
    time_zone?: string | null;
  };
  number?: number;
  url?: string;
  checkbox?: boolean;
  type?: string;
}

export interface NotionProperties {
  [key: string]: NotionPropertyValue;
}

export interface NotionPost {
  id: string;
  created_time?: string;
  last_edited_time?: string;
  properties: NotionProperties;
  url?: string;
}

export interface NotionBlock {
  type: string;
  [key: string]: unknown;
}

export interface ExtendedNotionPost extends NotionPost {
  blocks?: NotionBlock[];
  properties: NotionPost['properties'] & {
    R2ImageUrl?: NotionUrlProperty;
    Image?: NotionUrlProperty;
    'Original Page'?: NotionUrlProperty;
    'Mins Read'?: { number: number };
    'Date Created'?: NotionDate;
  };
}

/**
 * Helper function to safely extract plain text from Notion rich text
 */
export function extractPlainText(
  richText: RichTextItem[] | RichTextItem | NotionText[] | NotionText | undefined
): string {
  if (!richText) {
    return '';
  }

  // Handle array case
  if (Array.isArray(richText)) {
    if (richText.length === 0) return '';
    return richText.map(item => item.plain_text || '').join('');
  }

  // Handle single item case
  return richText.plain_text || '';
}
