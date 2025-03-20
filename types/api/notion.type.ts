/**
 * Type definitions for Notion API responses and data structures
 * These types represent the structure of data returned by the Notion API
 */

/**
 * Basic text content with optional href
 */
export interface NotionText {
  plain_text: string;
  href?: string | null;
}

/**
 * Date property with start, optional end, and timezone
 */
export interface NotionDate {
  date: {
    start: string;
    end?: string | null;
    time_zone?: string | null;
  };
}

/**
 * URL property type from Notion
 */
export interface NotionUrlProperty {
  type: 'url';
  url: string;
}

/**
 * Rich text item with formatting and link capabilities
 */
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

/**
 * Property value types supported by Notion
 */
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

/**
 * Collection of property values for a Notion page/block
 */
export interface NotionProperties {
  [key: string]: NotionPropertyValue;
}

/**
 * Base Notion post/page structure
 */
export interface NotionPost {
  id: string;
  created_time?: string;
  last_edited_time?: string;
  properties: NotionProperties;
  url?: string;
}

/**
 * Generic Notion block structure
 * The type field determines the block's content structure
 */
export interface NotionBlock {
  type: string;
  [key: string]: unknown;
}

/**
 * Extended Notion post with additional custom properties
 * Used for blog posts with specific metadata
 */
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
 * @param richText - Rich text item(s) from Notion API
 * @returns Plain text string with all formatting removed
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
