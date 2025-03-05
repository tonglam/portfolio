import { CACHE_SETTINGS, EXTERNAL_URLS } from "@/config/constants";
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
    const { slug } = params;

    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
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

    // Process posts to find the matching slug
    const post = allPosts.find((post) => {
      if (!post.properties || !post.properties.Title) {
        return false;
      }

      const title = extractPlainText(post.properties.Title.title);
      const postSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      return postSlug === slug;
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Extract post data
    const id = post.id;
    const title = extractPlainText(post.properties.Title.title);

    // Extract image URL
    const r2ImageUrl =
      post.properties.R2ImageUrl && post.properties.R2ImageUrl.url
        ? post.properties.R2ImageUrl.url
        : post.properties.Image && post.properties.Image.url
        ? post.properties.Image.url
        : EXTERNAL_URLS.PLACEHOLDERS.BLOG_IMAGE;

    // Extract date
    let date = "Unknown date";
    if (
      post.properties["Date Created"] &&
      post.properties["Date Created"].date &&
      post.properties["Date Created"].date.start
    ) {
      const postDate = new Date(post.properties["Date Created"].date.start);
      date = postDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }

    // Extract minutes read
    const minRead =
      post.properties["Mins Read"] && post.properties["Mins Read"].number
        ? `${post.properties["Mins Read"].number} Min Read`
        : "3 Min Read";

    // Extract summary
    const summary =
      post.properties.Summary && post.properties.Summary.rich_text
        ? extractPlainText(post.properties.Summary.rich_text)
        : post.properties.Excerpt && post.properties.Excerpt.rich_text
        ? extractPlainText(post.properties.Excerpt.rich_text)
        : "No summary available";

    // Extract category
    const category =
      post.properties.Category &&
      post.properties.Category.select &&
      post.properties.Category.select.name
        ? post.properties.Category.select.name
        : "Uncategorized";

    // Extract tags
    const tags =
      post.properties.Tags && post.properties.Tags.multi_select
        ? post.properties.Tags.multi_select.map((tag) => tag.name)
        : [category];

    // Extract content blocks
    const blocks = post.blocks || [];

    // Create a link to the original Notion page
    const originalPageUrl = EXTERNAL_URLS.NOTION.PAGE(id);

    // Return the post data with appropriate cache headers
    return NextResponse.json(
      {
        post: {
          id,
          title,
          r2ImageUrl,
          date,
          minRead,
          summary,
          category,
          tags,
          blocks,
          originalPageUrl,
        },
      },
      {
        headers: {
          "Cache-Control": cacheControl,
        },
      }
    );
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
