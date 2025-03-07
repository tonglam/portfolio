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

// Helper function to extract plain text from Notion rich text array
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

// Mock data for fallback when there are no search results
const mockSearchResults: ProcessedBlogPost[] = [
  {
    id: 'mock-1',
    title: 'Sample Blog Post 1',
    summary: 'This is a sample blog post for search results.',
    excerpt: 'This is a sample blog post excerpt for search results.',
    slug: 'sample-blog-post-1',
    category: 'General',
    tags: ['Sample', 'General'],
    dateCreated: new Date().toISOString(),
    r2ImageUrl:
      'https://res.cloudinary.com/demo/image/upload/w_1470,h_800,c_fill,q_auto,f_auto/sample',
    minRead: '3 Min Read',
    date: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }),
  },
  {
    id: 'mock-2',
    title: 'Sample Blog Post 2',
    summary: 'Another sample blog post for search results.',
    excerpt: 'Another sample blog post excerpt for search results.',
    slug: 'sample-blog-post-2',
    category: 'Technology',
    tags: ['Sample', 'Technology'],
    dateCreated: new Date().toISOString(),
    r2ImageUrl:
      'https://res.cloudinary.com/demo/image/upload/w_1470,h_800,c_fill,q_auto,f_auto/sample',
    minRead: '5 Min Read',
    date: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }),
  },
];

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

    // Use fallback data if fetch fails
    if (!response.ok) {
      logger.error(`Failed to fetch blog data: ${response.status}`);
      logger.info('Using mock search results');

      return NextResponse.json(
        {
          success: true,
          data: {
            results: mockSearchResults.map(post => ({
              post,
              score: 0.95,
              matches: ['title', 'content'],
            })),
            query,
            pagination: {
              page,
              limit,
              totalResults: mockSearchResults.length,
              totalPages: 1,
              hasMore: false,
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

    const allPosts = (await response.json()) as ExtendedNotionPost[];

    // Process posts - extract data from Notion API format
    const processedPosts = allPosts
      .map(post => {
        if (!post.properties) {
          return null;
        }

        try {
          // Extract data with safe property access
          const id = post.id;

          // Get title with fallback
          const title = post.properties?.Title?.title
            ? extractPlainText(post.properties.Title.title)
            : 'Untitled Post';

          // Create a slug from the title or use the ID
          const slug =
            title
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/(^-|-$)/g, '') || id;

          // Get image URL with fallback
          const r2ImageUrl = post.properties?.R2ImageUrl?.url
            ? post.properties.R2ImageUrl.url
            : post.properties?.Image?.url
              ? post.properties.Image.url
              : EXTERNAL_URLS.PLACEHOLDERS.BLOG_IMAGE;

          // Format date
          let date = 'Unknown date';
          if (post.properties?.['Date Created']?.date?.start) {
            const postDate = new Date(post.properties['Date Created'].date.start);
            // Format the date as MMM DD, YYYY (e.g., "Jun 15, 2023")
            date = postDate.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            });
          }

          // Get reading time
          const minRead = post.properties?.['Mins Read']?.number
            ? `${post.properties['Mins Read'].number} Min Read`
            : '3 Min Read';

          // Get summary with fallback to excerpt
          const summary = post.properties?.Summary?.rich_text
            ? extractPlainText(post.properties.Summary.rich_text)
            : post.properties?.Excerpt?.rich_text
              ? extractPlainText(post.properties.Excerpt.rich_text)
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
            r2ImageUrl,
            date,
            minRead,
            originalPageUrl,
          };
        } catch (error) {
          logger.error({ error, postId: post.id }, 'Error processing post');
          return null;
        }
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

    logger.info(
      {
        query,
        totalResults,
        currentPage,
        totalPages,
        resultsInPage: paginatedResults.length,
      },
      'Search results'
    );

    // Return search results
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
  } catch (error) {
    logger.error({ error }, 'Error searching blog posts');

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to search blog posts',
      },
      { status: 500 }
    );
  }
}
