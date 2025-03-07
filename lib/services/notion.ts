import { logger } from '@/lib/logger';
import type { NotionBlock, NotionPost } from '@/types/api/blog';
import type { NotionProperties } from '@/types/api/notion';
import { Client } from '@notionhq/client';
import type {
  BlockObjectResponse,
  PageObjectResponse,
  QueryDatabaseParameters,
  RichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints';

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

function isPageObjectResponse(response: unknown): response is PageObjectResponse {
  return typeof response === 'object' && response !== null && 'properties' in response;
}

function convertPageToNotionPost(page: PageObjectResponse): NotionPost {
  if (!isPageObjectResponse(page)) {
    throw new Error('Invalid page object');
  }

  const { id, url, created_time, last_edited_time, properties } = page;

  return {
    id,
    url,
    created_time,
    last_edited_time,
    properties: properties as unknown as NotionProperties,
  };
}

/**
 * Fetches a page from Notion
 */
export async function getNotionPage(pageId: string): Promise<NotionPost> {
  try {
    const response = await notion.pages.retrieve({ page_id: pageId });
    if (!isPageObjectResponse(response)) {
      throw new Error('Invalid response from Notion API');
    }
    return convertPageToNotionPost(response);
  } catch (error) {
    logger.error({ error, pageId }, 'Error fetching Notion page');
    throw error;
  }
}

/**
 * Fetches all blocks for a page
 */
export async function getNotionBlocks(blockId: string): Promise<NotionBlock[]> {
  try {
    const blocks: NotionBlock[] = [];
    let cursor: string | undefined;

    while (true) {
      const { results, next_cursor } = await notion.blocks.children.list({
        block_id: blockId,
        start_cursor: cursor,
      });

      if (Array.isArray(results)) {
        blocks.push(...(results as BlockObjectResponse[] as NotionBlock[]));
      }

      if (!next_cursor) {
        break;
      }

      cursor = next_cursor;
    }

    return blocks;
  } catch (error) {
    logger.error({ error, blockId }, 'Error fetching Notion blocks');
    throw error;
  }
}

/**
 * Fetches database entries
 */
export async function getNotionDatabase(
  databaseId: string,
  filter?: QueryDatabaseParameters['filter']
): Promise<NotionPost[]> {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter,
    });

    if (!response.results || !Array.isArray(response.results)) {
      throw new Error('Invalid response from Notion API');
    }

    return response.results.filter(isPageObjectResponse).map(convertPageToNotionPost);
  } catch (error) {
    logger.error({ error, databaseId }, 'Error fetching Notion database');
    throw error;
  }
}

/**
 * Extracts text content from blocks
 */
export async function extractBlockContent(blocks: NotionBlock[], maxDepth = 3): Promise<string> {
  let content = '';

  for (const block of blocks) {
    if (!block || typeof block !== 'object' || !('type' in block)) {
      continue;
    }

    const extractRichText = (richText: RichTextItemResponse[] | undefined): string => {
      if (!richText || !Array.isArray(richText)) return '';
      return richText.map(text => text.plain_text || '').join('');
    };

    // Type guards for different block types
    const isParagraphBlock = (
      b: NotionBlock
    ): b is NotionBlock & { paragraph: { rich_text: RichTextItemResponse[] } } =>
      b.type === 'paragraph' && typeof b.paragraph === 'object' && b.paragraph !== null;

    const isHeading1Block = (
      b: NotionBlock
    ): b is NotionBlock & { heading_1: { rich_text: RichTextItemResponse[] } } =>
      b.type === 'heading_1' && typeof b.heading_1 === 'object' && b.heading_1 !== null;

    const isHeading2Block = (
      b: NotionBlock
    ): b is NotionBlock & { heading_2: { rich_text: RichTextItemResponse[] } } =>
      b.type === 'heading_2' && typeof b.heading_2 === 'object' && b.heading_2 !== null;

    const isHeading3Block = (
      b: NotionBlock
    ): b is NotionBlock & { heading_3: { rich_text: RichTextItemResponse[] } } =>
      b.type === 'heading_3' && typeof b.heading_3 === 'object' && b.heading_3 !== null;

    switch (block.type) {
      case 'paragraph':
        if (isParagraphBlock(block) && block.paragraph.rich_text) {
          content += extractRichText(block.paragraph.rich_text) + '\n\n';
        }
        break;
      case 'heading_1':
        if (isHeading1Block(block) && block.heading_1.rich_text) {
          content += '# ' + extractRichText(block.heading_1.rich_text) + '\n\n';
        }
        break;
      case 'heading_2':
        if (isHeading2Block(block) && block.heading_2.rich_text) {
          content += '## ' + extractRichText(block.heading_2.rich_text) + '\n\n';
        }
        break;
      case 'heading_3':
        if (isHeading3Block(block) && block.heading_3.rich_text) {
          content += '### ' + extractRichText(block.heading_3.rich_text) + '\n\n';
        }
        break;
    }

    if (block.has_children && maxDepth > 0 && typeof block.id === 'string') {
      const childBlocks = await getNotionBlocks(block.id);
      content += await extractBlockContent(childBlocks, maxDepth - 1);
    }
  }

  logger.debug({ blocks }, 'Processing Notion blocks');
  return content;
}

interface RetryOptions {
  maxRetries?: number;
  baseDelay?: number;
}

interface RetryError extends Error {
  code?: string;
  status?: number;
  headers?: Record<string, string>;
}

/**
 * Handles API rate limiting with exponential backoff
 */
export async function callWithRetry<T>(
  apiCall: () => Promise<T>,
  { maxRetries = 5, baseDelay = 1000 }: RetryOptions = {}
): Promise<T> {
  let lastError: RetryError | undefined;
  let retryDelay = baseDelay;

  for (let retryCount = 0; retryCount <= maxRetries; retryCount++) {
    try {
      return await apiCall();
    } catch (error) {
      lastError = error as RetryError;

      if (lastError.code === 'rate_limited' || (lastError.status && lastError.status === 429)) {
        const retryAfter = lastError.headers?.['retry-after'];
        const waitTime = retryAfter
          ? parseInt(retryAfter, 10) * 1000
          : retryDelay * Math.pow(1.5, retryCount);

        logger.warn(
          {
            retryCount: retryCount + 1,
            maxRetries,
            waitTimeSeconds: Math.round(waitTime / 1000),
          },
          'Rate limited, waiting before retry'
        );

        await new Promise(resolve => setTimeout(resolve, waitTime));
        retryDelay = Math.min(retryDelay * 1.5, 10000);
      } else {
        throw lastError;
      }
    }
  }

  throw lastError;
}
