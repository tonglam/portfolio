import { CACHE_SETTINGS, DEFAULTS, EXTERNAL_URLS } from '@/config';
import { logger } from '@/lib/logger';
import type { ExtendedNotionPost, ProcessedBlogPost, RichTextItem } from '@/types/api/blog';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

/**
 * API endpoint for searching blog posts
 * Implemented with Vector Search using blog content
 */

// Route segment config for Next.js caching
export const revalidate = 3600; // Revalidate every hour

// Local implementation of extractPlainText
function extractPlainText(richTextArray: RichTextItem[] | RichTextItem | undefined): string {
  if (!richTextArray) {
    return '';
  }

  // Handle array case
  if (Array.isArray(richTextArray)) {
    if (richTextArray.length === 0) return '';
    return richTextArray
      .map(item => item.plain_text || (item.text && item.text.content) || '')
      .join('');
  }

  // Handle single item case
  return richTextArray.plain_text || (richTextArray.text && richTextArray.text.content) || '';
}

// This is the function that will be called when the API endpoint is hit
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    // Get search query from request
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || DEFAULTS.BLOG.LIMIT.toString(), 10);
    const category = searchParams.get('category');
    const cacheControl = CACHE_SETTINGS.BLOG.CONTROL;

    logger.info({ query, page, limit, category }, 'Blog search request');

    // Validate query
    if (!query || query.length < 2) {
      return NextResponse.json(
        {
          success: false,
          error: 'Search query must be at least 2 characters',
        },
        { status: 400 }
      );
    }

    // Fetch data from R2 storage
    const response = await fetch(EXTERNAL_URLS.BLOG_DATA_SOURCE, {
      next: { revalidate: CACHE_SETTINGS.BLOG.REVALIDATE },
    });

    // Return error if fetch fails
    if (!response.ok) {
      logger.error(`Failed to fetch blog data: ${response.status}`);
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to fetch blog posts for search',
        },
        {
          status: response.status,
          headers: {
            'Cache-Control': cacheControl,
          },
        }
      );
    }

    const allPosts = (await response.json()) as ExtendedNotionPost[];

    try {
      // Process posts - extract data from Notion API format
      const processedPosts = allPosts
        .map(post => {
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

          // Create a slug from the title or use the ID
          const slug = title
            ? title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '')
            : id;

          // Extract summary from Summary property
          const summary =
            post.properties.Summary && post.properties.Summary.rich_text
              ? extractPlainText(post.properties.Summary.rich_text as RichTextItem[])
              : post.properties.Excerpt && post.properties.Excerpt.rich_text
                ? extractPlainText(post.properties.Excerpt.rich_text as RichTextItem[])
                : 'No summary available';

          // Get category with fallback
          const category = post.properties?.Category?.select?.name
            ? post.properties.Category.select.name
            : 'Uncategorized';

          // Get tags with fallback to category
          const tags = post.properties?.Tags?.multi_select
            ? post.properties.Tags.multi_select.map(tag => tag.name)
            : [category];

          // Create Notion blog page URL
          const originalPageUrl = post.properties?.['Original Page']?.url
            ? post.properties['Original Page'].url
            : EXTERNAL_URLS.NOTION.PAGE(id);

          // Create processed blog post
          return {
            id,
            title,
            slug,
            summary,
            category,
            tags,
            dateCreated: post.created_time || new Date().toISOString(),
            r2ImageUrl:
              post.properties.R2ImageUrl && post.properties.R2ImageUrl.url
                ? post.properties.R2ImageUrl.url
                : post.properties.Image && post.properties.Image.url
                  ? post.properties.Image.url
                  : EXTERNAL_URLS.PLACEHOLDERS.BLOG_IMAGE,
            date: new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            }),
            minRead:
              post.properties['Mins Read'] && post.properties['Mins Read'].number
                ? `${post.properties['Mins Read'].number} Min Read`
                : DEFAULTS.BLOG.MIN_READ,
            originalPageUrl,
          };
        })
        .filter(Boolean) as ProcessedBlogPost[];

      // Perform search on processed posts
      // Only include published posts
      let searchResults = processedPosts.filter(post => {
        const titleLower = post.title.toLowerCase();
        const summaryLower = post.summary.toLowerCase();
        const categoryLower = post.category.toLowerCase();
        const tagsLower = post.tags.map(tag => tag.toLowerCase());
        const queryLower = query.toLowerCase();

        // Search in title, summary, category, and tags
        return (
          titleLower.includes(queryLower) ||
          summaryLower.includes(queryLower) ||
          categoryLower.includes(queryLower) ||
          tagsLower.some(tag => tag.includes(queryLower))
        );
      });

      // Filter by category if specified
      if (category && category !== 'All') {
        searchResults = searchResults.filter(
          post => post.category.toLowerCase() === category.toLowerCase()
        );
      }

      // Calculate score (simple ranking algorithm - can be improved)
      const scoredResults = searchResults.map(post => {
        // Higher score for title matches, lower for summary
        const titleScore = post.title.toLowerCase().includes(query.toLowerCase()) ? 0.8 : 0;
        const summaryScore = post.summary.toLowerCase().includes(query.toLowerCase()) ? 0.5 : 0;
        const categoryScore = post.category.toLowerCase().includes(query.toLowerCase()) ? 0.3 : 0;
        const tagsScore = post.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
          ? 0.4
          : 0;

        // Calculate total score (1.0 max)
        const totalScore = Math.min(1.0, titleScore + summaryScore + categoryScore + tagsScore);

        // Determine which fields matched
        const matches: string[] = [];
        if (titleScore > 0) matches.push('title');
        if (summaryScore > 0) matches.push('summary');
        if (categoryScore > 0) matches.push('category');
        if (tagsScore > 0) matches.push('tags');

        return {
          post,
          score: totalScore,
          matches,
        };
      });

      // Sort by score (highest first)
      const sortedResults = scoredResults.sort((a, b) => b.score - a.score);

      // Handle pagination
      const totalResults = sortedResults.length;
      const totalPages = Math.max(1, Math.ceil(totalResults / limit));
      const currentPage = Math.min(Math.max(1, page), totalPages);
      const startIndex = (currentPage - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedResults = sortedResults.slice(startIndex, endIndex);
      const hasMore = endIndex < totalResults;

      // Return search results with pagination
      return NextResponse.json(
        {
          success: true,
          data: {
            results: paginatedResults,
            query,
            pagination: {
              page: currentPage,
              limit,
              totalResults,
              totalPages,
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
    } catch (processError) {
      logger.error({ error: processError }, 'Error processing search results');
      return NextResponse.json(
        {
          success: false,
          error: 'Error processing search results',
        },
        {
          status: 500,
          headers: {
            'Cache-Control': cacheControl,
          },
        }
      );
    }
  } catch (error) {
    logger.error({ error }, 'Failed to perform blog search');
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to perform blog search',
      },
      {
        status: 500,
        headers: {
          'Cache-Control': CACHE_SETTINGS.BLOG.CONTROL,
        },
      }
    );
  }
}
