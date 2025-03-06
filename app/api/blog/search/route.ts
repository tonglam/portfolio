import { CACHE_SETTINGS, DEFAULTS, EXTERNAL_URLS } from '@/config';
import { logger } from '@/lib/logger';
import type { ProcessedBlogPost } from '@/types/api/blog';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

/**
 * Enhanced blog search API endpoint
 *
 * This endpoint provides search functionality across multiple fields in the blog posts:
 * - Title (Title.title.plain_text)
 * - Summary (Summary.rich_text.plain_text)
 * - Excerpt (Excerpt.rich_text.plain_text)
 * - Category (Category.select.name)
 * - Tags (Tags.multi_select.name)
 *
 * The search is case-insensitive and returns paginated results.
 */

// Types for Notion API data structure
interface RichTextItem {
  plain_text?: string;
  text?: {
    content: string;
  };
}

interface NotionText {
  plain_text: string;
}

interface NotionPropertyValue {
  title?: NotionText[];
  rich_text?: NotionText[];
  select?: {
    name: string;
  };
  multi_select?: Array<{
    name: string;
  }>;
  date?: {
    start: string;
  };
  number?: number;
  url?: string;
}

interface NotionProperties {
  [key: string]: NotionPropertyValue;
}

interface NotionPost {
  id: string;
  properties: NotionProperties;
}

// Route segment config for Next.js caching
export const revalidate = 3600; // Revalidate every hour

// Helper function to extract plain text from Notion rich text array
function extractPlainText(richTextArray: RichTextItem[]): string {
  if (!richTextArray || !Array.isArray(richTextArray) || richTextArray.length === 0) {
    return '';
  }

  return richTextArray
    .map(item => item.plain_text || (item.text && item.text.content) || '')
    .join('');
}

// Mock data for fallback
const fallbackPosts = [
  {
    id: 'mock-1',
    title: 'Getting Started with Next.js',
    summary: 'Learn how to build modern web applications with Next.js',
    excerpt: 'Next.js is a powerful framework for building React applications...',
    slug: 'getting-started-with-nextjs',
    category: 'Development',
    tags: ['Next.js', 'React', 'JavaScript'],
    r2ImageUrl:
      'https://res.cloudinary.com/demo/image/upload/w_1470,h_800,c_fill,q_auto,f_auto/sample',
    date: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }),
    minRead: '5 Min Read',
    originalPageUrl: '',
  },
  {
    id: 'mock-2',
    title: 'Advanced TypeScript Techniques',
    summary: 'Mastering TypeScript for better code quality',
    excerpt: 'TypeScript offers many advanced features that can improve your codebase...',
    slug: 'advanced-typescript-techniques',
    category: 'Development',
    tags: ['TypeScript', 'JavaScript', 'Programming'],
    r2ImageUrl:
      'https://res.cloudinary.com/demo/image/upload/w_1470,h_800,c_fill,q_auto,f_auto/programming',
    date: new Date(Date.now() - 86400000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }),
    minRead: '7 Min Read',
    originalPageUrl: '',
  },
  {
    id: 'mock-3',
    title: 'The Future of AI in Software Development',
    summary: 'How AI is changing the landscape of programming',
    excerpt: 'Artificial Intelligence is revolutionizing how we build software...',
    slug: 'future-of-ai-in-software-development',
    category: 'Technology',
    tags: ['AI', 'Machine Learning', 'Future Tech'],
    r2ImageUrl:
      'https://res.cloudinary.com/demo/image/upload/w_1470,h_800,c_fill,q_auto,f_auto/ai-development',
    date: new Date(Date.now() - 172800000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }),
    minRead: '10 Min Read',
    originalPageUrl: '',
  },
];

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const category = searchParams.get('category');
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || DEFAULTS.BLOG.LIMIT.toString(), 10);
    const cacheControl = CACHE_SETTINGS.BLOG.CONTROL;

    if (!query.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: 'Search query is required',
        },
        { status: 400 }
      );
    }

    logger.info({ searchQuery: query }, 'Searching blog posts from data source');

    // Fetch data from R2 storage
    const response = await fetch(EXTERNAL_URLS.BLOG_DATA_SOURCE, {
      next: { revalidate: CACHE_SETTINGS.BLOG.REVALIDATE },
    });

    // Use fallback data if fetch fails
    if (!response.ok) {
      logger.error(`Failed to fetch blog data: ${response.status}`);
      logger.info('Using fallback post data for search');

      // Search the fallback posts
      return handleSearchResults(fallbackPosts, query, category, page, limit, cacheControl);
    }

    const rawData: unknown = await response.json();
    const allPosts = Array.isArray(rawData) ? rawData : [];

    try {
      // Debug: Log the search query and data length
      logger.info(`Search query: "${query}", Total posts: ${allPosts.length}`);

      // Process posts - extract data from Notion API format
      const processedPosts = allPosts
        .map((post: NotionPost) => {
          if (!post.properties) {
            return null;
          }

          // Extract the post ID (for slug)
          const id = post.id || '';

          // Extract title from title property
          const title =
            post.properties.Title && post.properties.Title.title
              ? extractPlainText(post.properties.Title.title as RichTextItem[])
              : 'Untitled Post';

          // Extract image URL from R2ImageUrl property
          const r2ImageUrl =
            post.properties.R2ImageUrl && post.properties.R2ImageUrl.url
              ? post.properties.R2ImageUrl.url
              : post.properties.Image && post.properties.Image.url
                ? post.properties.Image.url
                : EXTERNAL_URLS.PLACEHOLDERS.BLOG_IMAGE;

          // Extract date from Date Created property (format as MMM DD, YYYY)
          let date = 'Unknown date';
          if (
            post.properties['Date Created'] &&
            post.properties['Date Created'].date &&
            post.properties['Date Created'].date.start
          ) {
            const postDate = new Date(post.properties['Date Created'].date.start);
            // Format the date as MMM DD, YYYY (e.g., "Jun 15, 2023")
            date = postDate.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            });
          }

          // Extract minutes read from Mins Read property
          const minRead =
            post.properties['Mins Read'] && post.properties['Mins Read'].number
              ? `${post.properties['Mins Read'].number} Min Read`
              : DEFAULTS.BLOG.MIN_READ;

          // Extract summary from Summary property
          const summary =
            post.properties.Summary && post.properties.Summary.rich_text
              ? extractPlainText(post.properties.Summary.rich_text as RichTextItem[])
              : post.properties.Excerpt && post.properties.Excerpt.rich_text
                ? extractPlainText(post.properties.Excerpt.rich_text as RichTextItem[])
                : 'No summary available';

          // Extract excerpt directly (might be same as summary in some cases)
          const excerpt =
            post.properties.Excerpt && post.properties.Excerpt.rich_text
              ? extractPlainText(post.properties.Excerpt.rich_text as RichTextItem[])
              : '';

          // Extract category from Category property
          const category =
            post.properties.Category &&
            post.properties.Category.select &&
            post.properties.Category.select.name
              ? post.properties.Category.select.name
              : 'Uncategorized';

          // Extract tags from Tags property
          const tags =
            post.properties.Tags && post.properties.Tags.multi_select
              ? post.properties.Tags.multi_select.map(tag => tag.name)
              : [category];

          // Create a link to the original Notion page
          const originalPageUrl = EXTERNAL_URLS.NOTION.PAGE(id);

          // Create a slug from the title or use the ID
          const postSlug = title
            ? title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '')
            : id;

          return {
            r2ImageUrl,
            title,
            date,
            minRead,
            summary,
            excerpt,
            category,
            tags,
            slug: postSlug,
            id,
            originalPageUrl,
          };
        })
        .filter(Boolean) as Array<Partial<ProcessedBlogPost>>; // Type assertion for non-null values

      // If we have no posts after processing, use fallback
      if (processedPosts.length === 0) {
        logger.warn('No valid posts found in data source, using fallback data for search');
        return handleSearchResults(fallbackPosts, query, category, page, limit, cacheControl);
      }

      return handleSearchResults(processedPosts, query, category, page, limit, cacheControl);
    } catch (processError) {
      logger.error({ error: processError }, 'Error processing posts for search');
      return handleSearchResults(fallbackPosts, query, category, page, limit, cacheControl);
    }
  } catch (error) {
    logger.error({ error }, 'Failed to search blog posts');

    // Return fallback search results
    return handleSearchResults(
      fallbackPosts,
      '',
      null,
      1,
      DEFAULTS.BLOG.LIMIT,
      CACHE_SETTINGS.BLOG.CONTROL
    );
  }
}

// This function performs the actual search and handles pagination
function handleSearchResults(
  posts: Array<Partial<ProcessedBlogPost>>,
  query: string,
  category: string | null,
  page: number,
  limit: number,
  cacheControl: string
): NextResponse {
  const queryLower = query.toLowerCase();

  // Search posts by query (case insensitive)
  const searchResults = posts.filter(post => {
    // Filter by category if provided
    if (category && category !== 'All' && post.category !== category) {
      return false;
    }

    if (!query.trim()) return true;

    const titleMatch = post.title?.toLowerCase().includes(queryLower) ?? false;
    const summaryMatch = post.summary?.toLowerCase().includes(queryLower) ?? false;
    const excerptMatch = post.excerpt && post.excerpt.toLowerCase().includes(queryLower);
    const categoryMatch = post.category?.toLowerCase().includes(queryLower) ?? false;

    // Check for matches in tags
    const tagsMatch =
      post.tags && post.tags.some((tag: string) => tag.toLowerCase().includes(queryLower));

    return titleMatch || summaryMatch || excerptMatch || categoryMatch || tagsMatch;
  });

  // Calculate relevance score for each result
  const results = searchResults.map(post => {
    let score = 0;

    // Title match has highest weight (0.5)
    if (post.title?.toLowerCase().includes(queryLower)) score += 0.5;

    // Summary match has medium weight (0.3)
    if (post.summary?.toLowerCase().includes(queryLower)) score += 0.3;

    // Excerpt match has medium weight (0.2)
    if (post.excerpt && post.excerpt.toLowerCase().includes(queryLower)) score += 0.2;

    // Category match has low weight (0.1)
    if (post.category?.toLowerCase().includes(queryLower)) score += 0.1;

    // Tags match has low weight (0.1 each)
    if (post.tags) {
      post.tags.forEach((tag: string) => {
        if (tag.toLowerCase().includes(queryLower)) score += 0.1;
      });
    }

    return { post, score: score > 0 ? score : 0.01 }; // Ensure some minimal score
  });

  // Debug: Log search results length
  logger.info(`Found ${results.length} posts matching query "${query}"`);

  // Filter by category if provided
  const filteredResults =
    category && category !== 'All'
      ? results.filter(result => result.post.category === category)
      : results;

  // Sort by relevance score
  filteredResults.sort((a, b) => b.score - a.score);

  // Paginate the results
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedResults = filteredResults.slice(startIndex, endIndex);
  const totalResults = filteredResults.length;
  const totalPages = Math.ceil(totalResults / limit);
  const hasMore = endIndex < totalResults;

  // Return the response with our consistent format and appropriate cache headers
  return NextResponse.json(
    {
      success: true,
      data: {
        results: paginatedResults,
        query,
        pagination: {
          page,
          limit,
          totalResults,
          totalPages,
          currentPage: page,
          hasMore,
        },
      },
    },
    {
      headers: {
        'Cache-Control': cacheControl,
      },
    }
  );
}
