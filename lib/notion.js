import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

// Initialize notion-to-md
const n2m = new NotionToMarkdown({ notionClient: notion });

/**
 * Get all published blog posts from Notion
 */
export async function getPublishedBlogPosts() {
  const databaseId = process.env.NOTION_DATABASE_ID;

  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: "Published",
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          property: "Date",
          direction: "descending",
        },
      ],
    });

    return Promise.all(
      response.results.map(async (page) => {
        return formatBlogPost(page);
      })
    );
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

/**
 * Get a specific blog post by slug
 */
export async function getBlogPostBySlug(slug) {
  const databaseId = process.env.NOTION_DATABASE_ID;

  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: "Slug",
        rich_text: {
          equals: slug,
        },
      },
    });

    if (!response.results.length) {
      throw new Error(`No blog post found with slug: ${slug}`);
    }

    const page = response.results[0];
    const formattedPost = await formatBlogPost(page);

    // Get the content blocks
    const mdBlocks = await n2m.pageToMarkdown(page.id);
    const markdown = n2m.toMarkdownString(mdBlocks);

    return {
      ...formattedPost,
      content: markdown.parent,
    };
  } catch (error) {
    console.error(`Error fetching blog post with slug ${slug}:`, error);
    return null;
  }
}

/**
 * Format a Notion page into a blog post structure
 */
function formatBlogPost(page) {
  // Extract and transform Notion data to match your blog structure
  return {
    id: page.id,
    title: page.properties.Title.title[0]?.plain_text || "Untitled",
    excerpt: page.properties.Excerpt?.rich_text[0]?.plain_text || "",
    date: formatDate(page.properties.Date?.date?.start),
    slug: page.properties.Slug?.rich_text[0]?.plain_text || page.id,
    image: getImageUrl(page.properties.Image),
    readTime: `${page.properties.ReadTime?.number || 3} Min Read`,
    likes: page.properties.Likes?.number || 0,
    comments: page.properties.Comments?.number || 0,
    category: page.properties.Category?.select?.name || "Uncategorized",
    lastUpdated: page.last_edited_time,
  };
}

/**
 * Format a date to a readable string
 */
function formatDate(dateString) {
  if (!dateString) return "No date";

  const date = new Date(dateString);
  const now = new Date();
  const diffInMonths =
    (now.getFullYear() - date.getFullYear()) * 12 +
    now.getMonth() -
    date.getMonth();

  if (diffInMonths < 1) {
    const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    return diffInDays <= 1 ? "1 day ago" : `${diffInDays} days ago`;
  } else if (diffInMonths === 1) {
    return "1 month ago";
  } else if (diffInMonths < 12) {
    return `${diffInMonths} months ago`;
  } else {
    const diffInYears = Math.floor(diffInMonths / 12);
    return diffInYears === 1 ? "1 year ago" : `${diffInYears} years ago`;
  }
}

/**
 * Get the image URL from the Notion image property
 */
function getImageUrl(imageProperty) {
  if (!imageProperty || !imageProperty.files || !imageProperty.files[0]) {
    return "https://images.unsplash.com/photo-1555952517-2e8e729e0b44";
  }

  // Check for external URL
  if (imageProperty.files[0]?.external?.url) {
    return imageProperty.files[0].external.url;
  }

  // Check for Notion hosted file
  if (imageProperty.files[0]?.file?.url) {
    return imageProperty.files[0].file.url;
  }

  // Default image if none exists
  return "https://images.unsplash.com/photo-1555952517-2e8e729e0b44";
}

/**
 * Get all unique blog categories
 */
export async function getBlogCategories() {
  const posts = await getPublishedBlogPosts();
  const categories = ["All", ...new Set(posts.map((post) => post.category))];
  return categories;
}
