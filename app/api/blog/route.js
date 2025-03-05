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
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 6;

    // Cache control - R2 data updates at 5am daily
    const cacheControl = "public, max-age=3600, stale-while-revalidate=86400"; // 1 hour fresh, 24 hours stale

    // Fetch data from R2 storage
    const response = await fetch(
      "https://pub-d8dffa084afd41feb7c476a46103017d.r2.dev/blog-data.json",
      {
        next: { revalidate: 3600 }, // Revalidate every hour
      }
    );

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
            : "https://via.placeholder.com/1470x800";

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
        const minsRead =
          post.properties["Mins Read"] && post.properties["Mins Read"].number
            ? `${post.properties["Mins Read"].number} Min Read`
            : "3 Min Read";

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
            : [];

        // Extract Original Page URL if available
        const originalPageUrl =
          post.properties["Original Page"] &&
          post.properties["Original Page"].url
            ? post.properties["Original Page"].url
            : `https://www.notion.so/${post.id.replace(/-/g, "")}`;

        // Create a slug from the title or use the ID
        const slug = title
          ? title
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/(^-|-$)/g, "")
          : id;

        return {
          r2ImageUrl,
          title,
          date,
          minRead: minsRead,
          summary,
          excerpt,
          category,
          tags,
          slug,
          id,
          originalPageUrl,
        };
      })
      .filter(Boolean); // Remove null entries

    // Filter by category if provided
    const filteredPosts =
      category && category !== "All"
        ? processedPosts.filter((post) => post.category === category)
        : processedPosts;

    // Paginate the results
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedPosts = filteredPosts.slice(startIndex, endIndex);
    const totalPages = Math.ceil(filteredPosts.length / limit);

    // Debug log
    console.log(
      `Category filter: ${category}, Total: ${filteredPosts.length}, Paginated: ${paginatedPosts.length}`
    );

    // Return the response with appropriate cache headers
    return NextResponse.json(
      {
        posts: paginatedPosts,
        totalPages,
        totalPosts: filteredPosts.length,
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
