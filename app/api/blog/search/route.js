import { CACHE_SETTINGS, DEFAULTS, EXTERNAL_URLS } from "@/config/constants";
import { NextResponse } from "next/server";

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

// Helper function to extract plain text from Notion rich text array
function extractPlainText(richTextArray) {
  if (
    !richTextArray ||
    !Array.isArray(richTextArray) ||
    richTextArray.length === 0
  ) {
    return "";
  }

  return richTextArray
    .map((item) => item.plain_text || (item.text && item.text.content) || "")
    .join("");
}

export async function GET(request) {
  try {
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");
    const category = searchParams.get("category");
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || DEFAULTS.BLOG.LIMIT;

    if (!query) {
      return NextResponse.json(
        { error: "Search query is required" },
        { status: 400 }
      );
    }

    // Cache control
    const cacheControl = CACHE_SETTINGS.BLOG.CONTROL;

    // Fetch data from R2 storage
    const response = await fetch(EXTERNAL_URLS.BLOG_DATA_SOURCE, {
      next: { revalidate: CACHE_SETTINGS.BLOG.REVALIDATE },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch blog data: ${response.status}`);
    }

    const allPosts = await response.json();

    // Debug: Log the search query and data length
    console.log(`Search query: "${query}", Total posts: ${allPosts.length}`);

    // Process posts - extract data from Notion API format
    const processedPosts = allPosts
      .map((post) => {
        if (!post.properties) {
          return null;
        }

        // Extract the post ID (for slug)
        const id = post.id || "";

        // Extract title from title property
        const title =
          post.properties.Title && post.properties.Title.title
            ? extractPlainText(post.properties.Title.title)
            : "Untitled Post";

        // Extract image URL from R2ImageUrl property
        const r2ImageUrl =
          post.properties.R2ImageUrl && post.properties.R2ImageUrl.url
            ? post.properties.R2ImageUrl.url
            : post.properties.Image && post.properties.Image.url
            ? post.properties.Image.url
            : EXTERNAL_URLS.PLACEHOLDERS.BLOG_IMAGE;

        // Extract date from Date Created property (format as MMM DD, YYYY)
        let date = "Unknown date";
        if (
          post.properties["Date Created"] &&
          post.properties["Date Created"].date &&
          post.properties["Date Created"].date.start
        ) {
          const postDate = new Date(post.properties["Date Created"].date.start);
          // Format the date as MMM DD, YYYY (e.g., "Jun 15, 2023")
          date = postDate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          });
        }

        // Extract minutes read from Mins Read property
        const minRead =
          post.properties["Mins Read"] && post.properties["Mins Read"].number
            ? `${post.properties["Mins Read"].number} Min Read`
            : DEFAULTS.BLOG.MIN_READ;

        // Extract summary from Summary property
        const summary =
          post.properties.Summary && post.properties.Summary.rich_text
            ? extractPlainText(post.properties.Summary.rich_text)
            : post.properties.Excerpt && post.properties.Excerpt.rich_text
            ? extractPlainText(post.properties.Excerpt.rich_text)
            : "No summary available";

        // Extract excerpt directly (might be same as summary in some cases)
        const excerpt =
          post.properties.Excerpt && post.properties.Excerpt.rich_text
            ? extractPlainText(post.properties.Excerpt.rich_text)
            : "";

        // Extract category from Category property
        const category =
          post.properties.Category &&
          post.properties.Category.select &&
          post.properties.Category.select.name
            ? post.properties.Category.select.name
            : "Uncategorized";

        // Extract tags from Tags property
        const tags =
          post.properties.Tags && post.properties.Tags.multi_select
            ? post.properties.Tags.multi_select.map((tag) => tag.name)
            : [category];

        // Create a link to the original Notion page
        const originalPageUrl = EXTERNAL_URLS.NOTION.PAGE(id);

        // Create a slug from the title or use the ID
        const postSlug = title
          ? title
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/(^-|-$)/g, "")
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
      .filter(Boolean); // Remove null entries

    // Search posts by query (case insensitive)
    const queryLower = query.toLowerCase();
    const searchResults = processedPosts.filter((post) => {
      const titleMatch = post.title.toLowerCase().includes(queryLower);
      const summaryMatch = post.summary.toLowerCase().includes(queryLower);
      const excerptMatch = post.excerpt.toLowerCase().includes(queryLower);
      const categoryMatch = post.category.toLowerCase().includes(queryLower);

      // Check for matches in tags
      const tagsMatch = post.tags.some((tag) =>
        tag.toLowerCase().includes(queryLower)
      );

      return (
        titleMatch || summaryMatch || excerptMatch || categoryMatch || tagsMatch
      );
    });

    // Debug: Log search results length
    console.log(
      `Found ${searchResults.length} posts matching query "${query}"`
    );

    // Filter by category if provided
    const filteredPosts =
      category && category !== "All"
        ? searchResults.filter((post) => post.category === category)
        : searchResults;

    // Paginate the results
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedPosts = filteredPosts.slice(startIndex, endIndex);
    const totalPages = Math.ceil(filteredPosts.length / limit);

    // Return the response with appropriate cache headers
    return NextResponse.json(
      {
        posts: paginatedPosts,
        totalPages,
        totalPosts: filteredPosts.length,
        currentPage: page,
      },
      {
        headers: {
          "Cache-Control": cacheControl,
        },
      }
    );
  } catch (error) {
    console.error("Error searching blog posts:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
