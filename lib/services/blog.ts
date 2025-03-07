import { logger } from '@/lib/logger';
import type { BlogPost, NotionPost, RichTextItemResponse } from '@/types/api/blog';
import { getNotionImageUrl } from '../utils/image';
import { generateExcerpt } from '../utils/string';
import { extractBlockContent, getNotionBlocks, getNotionDatabase } from './notion';

const DATABASE_ID = process.env.NOTION_DATABASE_ID as string;

/**
 * Gets all published blog posts
 */
export async function getPublishedPosts(): Promise<BlogPost[]> {
  try {
    const posts = await getNotionDatabase(DATABASE_ID, {
      property: 'Published',
      checkbox: {
        equals: true,
      },
    });

    return Promise.all(
      posts.map(async post => {
        const blocks = await getNotionBlocks(post.id);
        const content = await extractBlockContent(blocks);
        return convertNotionToPost(post, content);
      })
    );
  } catch (error) {
    logger.error({ error }, 'Error fetching published posts');
    throw error;
  }
}

/**
 * Gets a single blog post by slug
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const posts = await getPublishedPosts();
    const post = posts.find(p => p.slug === slug);
    return post || null;
  } catch (error) {
    logger.error({ error, slug }, 'Error fetching post by slug');
    throw error;
  }
}

/**
 * Gets all unique categories from published posts
 */
export async function getCategories(): Promise<string[]> {
  try {
    const posts = await getPublishedPosts();
    const categories = Array.from(new Set(posts.map(post => post.category))).filter(Boolean);
    categories.sort();
    return ['All', ...categories];
  } catch (error) {
    logger.error({ error }, 'Error fetching categories');
    throw error;
  }
}

/**
 * Searches posts by query string
 */
export async function searchPosts(query: string): Promise<BlogPost[]> {
  try {
    const posts = await getPublishedPosts();
    const searchTerms = query.toLowerCase().split(' ');

    return posts.filter(post => {
      const searchableText = [post.title, post.summary, post.category, ...post.tags, post.content]
        .join(' ')
        .toLowerCase();

      return searchTerms.every(term => searchableText.includes(term));
    });
  } catch (error) {
    logger.error({ error, query }, 'Error searching posts');
    throw error;
  }
}

/**
 * Converts a Notion post to our BlogPost format
 */
function convertNotionToPost(post: NotionPost, content: string): BlogPost {
  const properties = post.properties;

  // Helper function to safely extract text from rich text
  const getFirstRichText = (richText: RichTextItemResponse | RichTextItemResponse[]): string => {
    const textArray = Array.isArray(richText) ? richText : [richText];
    return textArray[0]?.plain_text || '';
  };

  return {
    id: post.id,
    title: getFirstRichText(properties.Title.title),
    slug: getFirstRichText(properties.Slug.rich_text),
    summary: getFirstRichText(properties.Summary.rich_text),
    category: properties.Category.select?.name ?? 'Uncategorized',
    tags: properties.Tags.multi_select.map(tag => tag.name),
    coverImage: {
      url: getNotionImageUrl(properties) || '',
      alt: getFirstRichText(properties.Title.title),
    },
    published: properties.Published.checkbox,
    featured: properties.Featured.checkbox,
    notionUrl: post.url,
    readingTime: `${getFirstRichText(properties.ReadingTime.rich_text) || '5'} min read`,
    content,
    excerpt: generateExcerpt(content),
    createdAt: post.created_time,
    updatedAt: post.last_edited_time,
  };
}
