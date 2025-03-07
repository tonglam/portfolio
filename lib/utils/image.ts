import type { NotionPropertyValue } from '@/types/api/notion';
import type {
  FilesPropertyItemObjectResponse,
  UrlPropertyItemObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';

/**
 * Gets the image URL from Notion properties
 */
export function getNotionImageUrl(properties: Record<string, NotionPropertyValue>): string | null {
  if (!properties.Image) {
    return null;
  }

  const imageProperty = properties.Image as
    | FilesPropertyItemObjectResponse
    | UrlPropertyItemObjectResponse;

  // Check URL type
  if (imageProperty.type === 'url' && imageProperty.url) {
    return imageProperty.url;
  }

  // Check files type
  if (imageProperty.type === 'files' && imageProperty.files.length > 0) {
    const file = imageProperty.files[0];
    if ('external' in file && file.external?.url) {
      return file.external.url;
    }
    if ('file' in file && file.file?.url) {
      return file.file.url;
    }
  }

  return null;
}

/**
 * Checks if a URL is an image URL
 */
export function isImageUrl(url: string): boolean {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
  const lowercaseUrl = url.toLowerCase();
  return imageExtensions.some(ext => lowercaseUrl.endsWith(ext));
}

/**
 * Generates a placeholder image URL with specified dimensions
 */
export function getPlaceholderImage(width: number, height: number): string {
  return `https://res.cloudinary.com/demo/image/upload/w_${width},h_${height},c_fill,q_auto,f_auto/sample`;
}

/**
 * Extracts image dimensions from a URL if available
 */
export function getImageDimensions(url: string): { width?: number; height?: number } {
  const match = url.match(/(\d+)x(\d+)/);
  if (match) {
    return {
      width: parseInt(match[1], 10),
      height: parseInt(match[2], 10),
    };
  }
  return {};
}

/**
 * Generates an optimized image URL for the given dimensions
 */
export function getOptimizedImageUrl(
  url: string,
  width?: number,
  height?: number,
  quality = 75
): string {
  if (!url) return '';

  // If URL is already optimized, return as is
  if (url.includes('?w=') || url.includes('&w=')) {
    return url;
  }

  const params = new URLSearchParams();
  if (width) params.append('w', width.toString());
  if (height) params.append('h', height.toString());
  params.append('q', quality.toString());
  params.append('auto', 'format');

  return `${url}${url.includes('?') ? '&' : '?'}${params.toString()}`;
}
