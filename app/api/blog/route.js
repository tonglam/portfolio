import { CACHE_SETTINGS, DEFAULTS, EXTERNAL_URLS } from "@/config/constants";
import { NextResponse } from "next/server";

/**
 * Blog API endpoint
 *
 * This endpoint provides paginated blog posts with filtering by category.
 * It extracts and returns the following fields from the Notion database:
 * - Title (Title.title.plain_text)
 * - Summary (Summary.rich_text.plain_text)
 * - Excerpt (Excerpt.rich_text.plain_text)
 * - Category (Category.select.name)
 * - Tags (Tags.multi_select.name)
 * - Date Created, R2 Image URL, Original Page URL, and other metadata
 *
 * This data structure supports the enhanced search functionality.
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

// This is the function that will be called when the API endpoint is hit
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || DEFAULTS.BLOG.LIMIT;

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

    // Debug: Log the structure
    if (allPosts.length > 0) {
      console.log("Number of posts:", allPosts.length);
      console.log(
        "First post properties keys:",
        Object.keys(allPosts[0].properties || {})
      );
    }

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

        // Extract excerpt from Excerpt property
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
            : [category]; // Default to category as a tag if no tags

        // Create a slug from the title or use the ID
        const postSlug = title
          ? title
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/(^-|-$)/g, "")
          : id;

        // Create a link to the original Notion page
        const originalPageUrl = EXTERNAL_URLS.NOTION.PAGE(id);

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

    // Filter by category if specified
    const filteredPosts = category
      ? processedPosts.filter((post) => post.category === category)
      : processedPosts;

    // Calculate pagination
    const totalPosts = filteredPosts.length;
    const totalPages = Math.ceil(totalPosts / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

    // Debug log
    console.log(
      `Category filter: ${category}, Total: ${filteredPosts.length}, Paginated: ${paginatedPosts.length}`
    );

    // Return the posts with appropriate cache headers
    return NextResponse.json(
      {
        posts: paginatedPosts,
        totalPages,
        totalPosts,
        currentPage: page,
      },
      {
        headers: {
          "Cache-Control": cacheControl,
        },
      }
    );
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
