import { NextResponse } from "next/server";

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

export async function GET(request, { params }) {
  try {
    const slug = params.slug;

    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

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
        const minRead =
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

        // Extract category from Category property
        const category =
          post.properties.Category &&
          post.properties.Category.select &&
          post.properties.Category.select.name
            ? post.properties.Category.select.name
            : "Uncategorized";

        // Extract content from Content property if it exists
        const content =
          post.properties.Content && post.properties.Content.rich_text
            ? extractPlainText(post.properties.Content.rich_text)
            : post.properties.Excerpt && post.properties.Excerpt.rich_text
            ? extractPlainText(post.properties.Excerpt.rich_text)
            : null;

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
          category,
          slug: postSlug,
          content,
          id,
        };
      })
      .filter(Boolean); // Remove null entries

    // Find the post with the matching slug
    const foundPost = processedPosts.find(
      (post) => post.slug === slug || post.id === slug
    );

    if (!foundPost) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    // Return the post with appropriate cache headers
    return NextResponse.json(foundPost, {
      headers: {
        "Cache-Control": cacheControl,
      },
    });
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
