import type { NotionPropertyValue } from '@/types/api/notion.type';
import type {
  FilesPropertyItemObjectResponse,
  RichTextPropertyItemObjectResponse,
  TitlePropertyItemObjectResponse,
  UrlPropertyItemObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';

/**
 * Type guard for rich text item
 */
export function isRichTextItem(item: unknown): item is { plain_text: string } {
  return (
    item !== null &&
    typeof item === 'object' &&
    'plain_text' in item &&
    typeof (item as { plain_text: string }).plain_text === 'string'
  );
}

/**
 * Helper function to extract text from title property
 */
export function extractTitleText(
  title: TitlePropertyItemObjectResponse | NotionPropertyValue | undefined
): string {
  if (!title) return '';

  // Handle official Notion API type
  if (
    title &&
    typeof title === 'object' &&
    'type' in title &&
    title.type === 'title' &&
    'title' in title &&
    Array.isArray(title.title)
  ) {
    return title.title
      .filter(isRichTextItem)
      .map(item => item.plain_text)
      .join('');
  }

  // Handle array type (NotionPropertyValue sometimes has title as an array)
  if (Array.isArray(title)) {
    return title
      .filter(isRichTextItem)
      .map(item => item.plain_text)
      .join('');
  }

  // Handle custom title property
  if (title && typeof title === 'object' && 'title' in title && Array.isArray(title.title)) {
    return title.title
      .filter(isRichTextItem)
      .map(item => item.plain_text)
      .join('');
  }

  return '';
}

/**
 * Helper function to extract text from rich text property
 */
export function extractRichText(
  richText: RichTextPropertyItemObjectResponse | NotionPropertyValue | undefined
): string {
  if (!richText) return '';

  // Handle official Notion API type
  if (
    richText &&
    typeof richText === 'object' &&
    'type' in richText &&
    richText.type === 'rich_text' &&
    'rich_text' in richText &&
    Array.isArray(richText.rich_text)
  ) {
    return richText.rich_text
      .filter(isRichTextItem)
      .map(item => item.plain_text)
      .join('');
  }

  // Handle array type
  if (Array.isArray(richText)) {
    return richText
      .filter(isRichTextItem)
      .map(item => item.plain_text)
      .join('');
  }

  return '';
}

/**
 * Helper function to extract file URL from Notion file property
 */
export function extractFileUrl(
  file:
    | FilesPropertyItemObjectResponse
    | UrlPropertyItemObjectResponse
    | NotionPropertyValue
    | undefined
): string {
  if (!file) return '';

  if (file && typeof file === 'object' && 'type' in file && file.type === 'url' && 'url' in file) {
    return file.url || '';
  }

  if (
    file &&
    typeof file === 'object' &&
    'type' in file &&
    file.type === 'files' &&
    'files' in file &&
    Array.isArray(file.files) &&
    file.files.length > 0
  ) {
    const firstFile = file.files[0];
    if (firstFile.type === 'external' && 'external' in firstFile) {
      return firstFile.external.url || '';
    }
    if (firstFile.type === 'file' && 'file' in firstFile) {
      return firstFile.file.url || '';
    }
  }

  if (file && typeof file === 'object' && 'url' in file && typeof file.url === 'string') {
    return file.url;
  }

  return '';
}
