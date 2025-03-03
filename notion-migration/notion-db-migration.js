/**
 * Notion Technical Notes Migration Tool
 *
 * This script migrates technical notes from a Notion page to a Notion database.
 * It extracts content, categories, tags, and other metadata from the source page
 * and creates entries in the target database.
 *
 * Features:
 * - Identifies top-level categories (Java, Python, JavaScript, etc.)
 * - Processes pages recursively, preserving the category structure
 * - Extracts content, generates excerpts, and identifies tags
 * - Preserves original creation and last edited dates
 * - Extracts images from pages when available
 * - Generates unique slugs for each page
 * - Calculates estimated read time
 *
 * Usage:
 * - Run with default options: node notion-db-migration.js
 * - Run without clearing database: node notion-db-migration.js --no-clear
 *
 * Environment variables (in .env file):
 * - NOTION_API_KEY: Your Notion API key
 * - SOURCE_PAGE_ID: ID of the source page containing technical notes
 * - NOTION_DATABASE_ID: ID of the target database
 *
 * @version 1.0.0
 */

// Check for required dependencies and load environment variables
require("dotenv").config();

// Get environment variables
const NOTION_API_KEY = "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"; // process.env.NOTION_API_KEY;
const SOURCE_PAGE_ID = "d5e4e5143d2c4a6fa8ca3ab2f162c22c"; // process.env.SOURCE_PAGE_ID;
const DATABASE_ID = "1ab7ef86-a5ad-81ab-a4cb-f8b8f37ec491"; // process.env.NOTION_DATABASE_ID;

if (!NOTION_API_KEY || !SOURCE_PAGE_ID || !DATABASE_ID) {
  console.error("Error: Required environment variables are missing.");
  console.error(
    "Please ensure NOTION_API_KEY, SOURCE_PAGE_ID, and NOTION_DATABASE_ID are set in your .env file."
  );
  process.exit(1);
}

// Initialize the Notion client
const { Client } = require("@notionhq/client");
const notion = new Client({ auth: NOTION_API_KEY });

console.log("Using configuration:");
console.log(`- SOURCE_PAGE_ID: ${SOURCE_PAGE_ID}`);
console.log(`- DATABASE_ID: ${DATABASE_ID}`);

// Track all valid categories for validation
const validCategoriesSet = new Set();

/**
 * Checks if a page has meaningful content beyond just structural blocks
 */
async function hasActualContent(pageId) {
  try {
    // Get all blocks from the page
    const response = await notion.blocks.children.list({
      block_id: pageId,
      page_size: 100,
    });

    // Check if there are any content blocks (paragraphs, headings, lists, etc.)
    const contentBlocks = response.results.filter((block) => {
      const blockType = block.type;
      // Consider these block types as meaningful content
      return [
        "paragraph",
        "heading_1",
        "heading_2",
        "heading_3",
        "bulleted_list_item",
        "numbered_list_item",
        "to_do",
        "toggle",
        "code",
        "quote",
        "callout",
        "image",
      ].includes(blockType);
    });

    // Check if any of the content blocks have actual text content
    for (const block of contentBlocks) {
      const blockType = block.type;

      // Check if the block has text content
      if (
        block[blockType] &&
        block[blockType].rich_text &&
        block[blockType].rich_text.length > 0
      ) {
        // Look for actual text content (not just whitespace)
        const textContent = block[blockType].rich_text
          .map((rt) => rt.plain_text || "")
          .join("")
          .trim();

        if (textContent.length > 0) {
          return true;
        }
      }

      // Images are considered content even without text
      if (blockType === "image") {
        return true;
      }
    }

    // No meaningful content found
    return false;
  } catch (error) {
    console.error(`Error checking content for page ${pageId}:`, error);
    return false;
  }
}

/**
 * Gets all top-level categories under the source page
 * @returns {Promise<Array>} - Array of category objects with id and title
 */
async function getTopLevelCategories() {
  try {
    const response = await notion.blocks.children.list({
      block_id: SOURCE_PAGE_ID,
      page_size: 100,
    });

    const categories = [];

    for (const block of response.results) {
      if (block.type === "child_page") {
        categories.push({
          id: block.id,
          title: block.child_page.title,
        });
        console.log(`Found top-level category: ${block.child_page.title}`);
      }
    }

    return categories;
  } catch (error) {
    console.error("Error getting top-level categories:", error);
    return [];
  }
}

/**
 * Extract text content from a page
 * @param {string} blockId - The ID of the block to extract content from
 * @param {number} maxDepth - Maximum depth to traverse
 * @param {number} currentDepth - Current depth level
 * @returns {Promise<string>} - The extracted text content
 */
async function extractTextContent(blockId, maxDepth = 3, currentDepth = 0) {
  // Limit recursion depth
  if (currentDepth > maxDepth) return "";

  try {
    const response = await notion.blocks.children.list({
      block_id: blockId,
      page_size: 100,
    });

    if (!response.results || response.results.length === 0) {
      return "";
    }

    let content = "";

    for (const block of response.results) {
      // Skip child_page blocks as they are separate pages
      if (block.type === "child_page") continue;

      // Extract text based on block type
      switch (block.type) {
        case "paragraph":
          content += extractRichText(block.paragraph.rich_text) + "\n\n";
          break;
        case "heading_1":
          content += "# " + extractRichText(block.heading_1.rich_text) + "\n\n";
          break;
        case "heading_2":
          content +=
            "## " + extractRichText(block.heading_2.rich_text) + "\n\n";
          break;
        case "heading_3":
          content +=
            "### " + extractRichText(block.heading_3.rich_text) + "\n\n";
          break;
        case "bulleted_list_item":
          content +=
            "• " + extractRichText(block.bulleted_list_item.rich_text) + "\n";
          break;
        case "numbered_list_item":
          content +=
            "1. " + extractRichText(block.numbered_list_item.rich_text) + "\n";
          break;
        case "to_do":
          const checkbox = block.to_do.checked ? "[x]" : "[ ]";
          content +=
            checkbox + " " + extractRichText(block.to_do.rich_text) + "\n";
          break;
        case "toggle":
          content += extractRichText(block.toggle.rich_text) + "\n";
          break;
        case "code":
          content += "```" + (block.code.language || "") + "\n";
          content += extractRichText(block.code.rich_text) + "\n";
          content += "```\n\n";
          break;
        case "quote":
          content += "> " + extractRichText(block.quote.rich_text) + "\n\n";
          break;
        case "callout":
          content += "📌 " + extractRichText(block.callout.rich_text) + "\n\n";
          break;
        case "divider":
          content += "---\n\n";
          break;
        case "image":
          let imageUrl = "";
          if (block.image.type === "external") {
            imageUrl = block.image.external.url;
          } else if (block.image.type === "file") {
            imageUrl = block.image.file.url;
          }

          const altText =
            block.image.caption && block.image.caption.length > 0
              ? extractRichText(block.image.caption)
              : "Image";
          content += `![${altText}](${imageUrl})\n\n`;
          break;
      }

      // Recursively extract content from children if the block has children
      if (block.has_children) {
        const childContent = await extractTextContent(
          block.id,
          maxDepth,
          currentDepth + 1
        );
        content += childContent;
      }
    }

    return content;
  } catch (error) {
    console.error(
      `Error extracting text content from block ${blockId}: ${error.message}`
    );
    return "";
  }
}

/**
 * Extract text from rich text array
 * @param {Array} richTextArray - Array of rich text objects
 * @returns {string} - The extracted text
 */
function extractRichText(richTextArray) {
  if (!richTextArray || richTextArray.length === 0) {
    return "";
  }

  return richTextArray.map((richText) => richText.plain_text || "").join("");
}

/**
 * Extract tags from content, title, and category
 * @param {string} content - The content to extract tags from
 * @param {string} title - The title of the page
 * @param {string} category - The category of the page
 * @returns {string[]} - Array of extracted tags
 */
function extractTags(content, title, category) {
  const tags = [];

  // Always include the category as a tag if it exists and isn't empty
  if (category && category.trim() !== "") {
    // For MIT Units prefixed with CITS, add both versions as tags
    if (category.startsWith("CITS")) {
      tags.push(category); // Add with CITS prefix
      tags.push(category.substring(4)); // Add without CITS prefix
    } else {
      tags.push(category);
    }
  }

  // Add the title as a tag for non-category pages (if it's not already the category)
  if (title && title !== category && !title.endsWith("Notes")) {
    // For MIT Units prefixed with CITS, use without the prefix for the tag
    if (title.startsWith("CITS")) {
      tags.push(title.substring(4)); // Add without CITS prefix
    } else {
      tags.push(title);
    }
  }

  // Extract hashtags from content
  if (content) {
    const hashtagRegex = /#(\w+)/g;
    let match;
    while ((match = hashtagRegex.exec(content)) !== null) {
      const tag = match[1];
      if (tag && !tags.includes(tag)) {
        tags.push(tag);
      }
    }
  }

  // Remove duplicates and filter out tags with commas
  return Array.from(new Set(tags)).filter((tag) => !tag.includes(","));
}

/**
 * Generate an excerpt from the content
 * @param {string} content - The content to generate an excerpt from
 * @param {maxLength} maxLength - Maximum length of the excerpt
 * @returns {string} - The generated excerpt
 */
function generateExcerpt(content, maxLength = 160) {
  if (!content) return "...";

  // Clean up content - remove extra spaces, newlines, etc.
  const cleanContent = content.replace(/\n+/g, " ").replace(/\s+/g, " ").trim();

  // If content is short enough, use it directly
  if (cleanContent.length <= maxLength) {
    return cleanContent;
  }

  // Look for a good breaking point (sentence or paragraph)
  let excerpt = cleanContent.substring(0, maxLength);

  // Try to find a natural breaking point
  const lastPeriod = excerpt.lastIndexOf(".");
  const lastQuestion = excerpt.lastIndexOf("?");
  const lastExclamation = excerpt.lastIndexOf("!");

  // Find the last sentence ending
  const lastSentenceEnd = Math.max(lastPeriod, lastQuestion, lastExclamation);

  if (lastSentenceEnd > maxLength * 0.5) {
    // If we found a sentence end that's at least halfway through, use it
    excerpt = cleanContent.substring(0, lastSentenceEnd + 1);
  } else {
    // Otherwise try to end at a word boundary
    const lastSpace = excerpt.lastIndexOf(" ");
    if (lastSpace > 0) {
      excerpt = excerpt.substring(0, lastSpace);
    }
    excerpt += "...";
  }

  // Remove any lingering image markers
  excerpt = excerpt.replace(/!Image/g, "").trim();

  return excerpt;
}

/**
 * Generate an AI-enhanced summary of content if available
 * Note: This function requires integration with an external AI service
 * in production. For now, it falls back to the standard excerpt generation.
 *
 * @param {string} content - The content to summarize
 * @param {string} title - The title of the page
 * @param {maxLength} maxLength - Maximum length of the summary
 * @returns {string} - The generated summary
 */
function generateAISummary(content, title, maxLength = 160) {
  // This is where you would integrate with DeepSeek, Gemini, or another AI service
  // For now, we'll use our improved excerpt generation

  // If implementing AI summarization, you would:
  // 1. Send the content to the AI API
  // 2. Request a concise summary
  // 3. Process and return the result

  // TODO: Replace with actual AI API call when integrating with an AI service

  return generateExcerpt(content, maxLength);
}

/**
 * Traverse a category and collect all pages
 * @param {Object} category - The category to traverse
 * @param {string} parentCategory - The parent category title
 * @param {number} depth - Current depth in the hierarchy
 * @returns {Promise<Object>} - Object containing pages and statistics
 */
async function traverseCategory(category, parentCategory = "", depth = 0) {
  const isTopLevel = depth === 0;
  const pages = [];

  try {
    // Check if this is a top-level category under Technical Notes or a MIT Unit
    const isTechnicalNoteCategory = isTopLevel && parentCategory === "";
    const isMITUnit = parentCategory === "MIT Units";

    // Log what we're processing
    if (isTopLevel) {
      console.log(`\nProcessing top-level category: ${category.title}`);
    } else {
      console.log(
        `  Processing subcategory: ${category.title} (parent: ${parentCategory}, depth: ${depth})`
      );
    }

    // Get the blocks for this category
    const response = await notion.blocks.children.list({
      block_id: category.id,
      page_size: 100,
    });

    // Check if this category has children
    const hasChildren = response.results.some(
      (block) => block.type === "child_page"
    );

    // Check if this category has actual content
    const hasContent = await hasActualContent(category.id);

    // Determine the category name for this page
    let categoryName;
    if (isTechnicalNoteCategory) {
      // Top-level Technical Notes categories - use their own name as category
      categoryName = category.title;
    } else if (isMITUnit) {
      // MIT Units - add CITS prefix to the category name
      categoryName = `CITS${category.title}`;
    } else if (parentCategory) {
      // For subcategories, use the parent category
      categoryName = parentCategory;
    } else {
      // Default case - uncategorized
      categoryName = "Uncategorized";
    }

    // Check if the category is in our valid categories set
    const isValidCategory = validCategoriesSet.has(categoryName);

    // Determine if this page should be migrated
    let shouldMigrate = false;

    // For Technical Notes and MIT Units categories themselves, we want to include them only if they have content
    if ((isTechnicalNoteCategory || isMITUnit) && hasContent) {
      shouldMigrate = true;
    }
    // For subcategories and content pages, include them if they have content AND a valid category
    else if (depth > 0 && hasContent && isValidCategory) {
      shouldMigrate = true;
    }

    // If the current page should be migrated, add it to our list
    if (shouldMigrate) {
      // Add CITS prefix to MIT Unit category titles
      const displayTitle = isMITUnit ? `CITS${category.title}` : category.title;

      pages.push({
        id: category.id,
        title: displayTitle,
        category: categoryName,
        depth: depth,
        isTopLevel: isTopLevel,
        hasChildren: hasChildren,
        hasContent: hasContent,
      });

      if (!isValidCategory) {
        console.log(
          `  → WARNING: Adding page with invalid category: ${displayTitle} (category: ${categoryName})`
        );
      } else {
        console.log(
          `  → Adding to migration: ${displayTitle} (category: ${categoryName})`
        );
      }
    } else {
      if (!isValidCategory && depth > 0) {
        console.log(
          `  → Skipping: ${category.title} (invalid category: ${categoryName})`
        );
      } else {
        console.log(
          `  → Skipping: ${category.title} (doesn't meet migration criteria)`
        );
      }
    }

    // Recursively process child pages
    if (hasChildren) {
      for (const block of response.results) {
        if (block.type === "child_page") {
          const childPageTitle = block.child_page.title;

          // Process the child page
          const childPages = await traverseCategory(
            { id: block.id, title: childPageTitle },
            categoryName, // Pass the current category as the parent
            depth + 1 // Increment the depth
          );

          // Add the child pages to our list
          pages.push(...childPages);
        }
      }
    }

    return pages;
  } catch (error) {
    console.error(`Error processing category ${category.title}:`, error);
    return [];
  }
}

/**
 * Get all pages from all categories
 * @param {Array} categories - Array of top-level categories
 * @returns {Promise<Array>} - Array of all pages to migrate
 */
async function getAllPages(categories) {
  console.log("Collecting all pages from categories...");

  // Process all categories and collect pages
  const allPagesResults = await Promise.all(
    categories.map((category) => traverseCategory(category))
  );

  // Combine all pages from all categories
  let allPages = [];
  let totalProcessed = 0;
  let totalWithContent = 0;

  allPagesResults.forEach((result) => {
    allPages = allPages.concat(result);
    totalProcessed += result.length;
    totalWithContent += result.filter((page) => page.hasContent).length;
  });

  // Log summary statistics
  console.log("\nCollection Summary:");
  console.log(`Total pages processed: ${totalProcessed}`);
  console.log(`Pages with content: ${totalWithContent}`);
  console.log(`Pages to be migrated: ${allPages.length}`);

  return allPages;
}

/**
 * Check if an entry needs to be updated
 * @param {string} pageId - The ID of the page
 * @param {string} lastEditedTime - The last edited time of the page
 * @param {Array} existingEntries - Array of existing database entries
 * @returns {string|null} - The ID of the existing entry if it needs update, null otherwise
 */
function needsUpdate(pageId, lastEditedTime, existingEntries) {
  // Find the existing entry for this page
  const existingEntry = existingEntries.find((entry) => {
    const originalPageUrl = entry.properties["Original Page"]?.url;
    if (!originalPageUrl) return false;

    // Extract the page ID from the URL
    const urlPageId = originalPageUrl.split("/").pop();
    return urlPageId === pageId.replace(/-/g, "");
  });

  if (!existingEntry) return null; // No existing entry

  // Get the last edited time of the existing entry
  const entryLastEdited =
    existingEntry.properties["Last Edited"]?.date?.start ||
    existingEntry.last_edited_time;

  // If the page was edited after the entry, it needs update
  if (new Date(lastEditedTime) > new Date(entryLastEdited)) {
    return existingEntry.id;
  }

  return null; // No update needed
}

/**
 * Process a page and add it to the database
 * @param {NotionClient} client - The Notion client
 * @param {string} databaseId - The database ID
 * @param {Object} pageInfo - Information about the page
 * @returns {Promise<void>}
 */
async function processPage(client, databaseId, pageInfo) {
  const { id, title, category, depth, isTopLevel, hasContent } = pageInfo;

  try {
    console.log(`\nProcessing page: ${title}`);
    console.log(`  Category: ${category}`);
    console.log(`  Depth: ${depth}`);
    console.log(`  Is Top Level: ${isTopLevel}`);
    console.log(`  Has Content: ${hasContent}`);

    // Retrieve page metadata to get creation date
    const pageMetadata = await client.pages.retrieve({ page_id: id });
    const createdTime = pageMetadata.created_time || new Date().toISOString();

    // Extract page content and cover images
    const content = await extractTextContent(id);
    const coverImageUrl = await extractFirstImage(id);

    // Generate display title
    // For top-level categories, append "Notes" - e.g., "Python Notes"
    const displayTitle = isTopLevel
      ? title.startsWith("CITS")
        ? title
        : `${title} Notes`
      : title;

    // Generate excerpt
    let excerpt = "";
    if (content) {
      // Use AI-enhanced summary for pages with content
      excerpt = await generateAISummary(content, 150);
    } else if (isTopLevel) {
      // For top-level categories without content, create a simple description
      excerpt = `Notes and resources about ${
        title.startsWith("CITS") ? title : title.toLowerCase()
      }.`;
    }

    // Extract tags
    const tags = extractTags(content, title, category);

    console.log(`  Title: ${displayTitle}`);
    console.log(`  Created Time: ${createdTime}`);
    console.log(
      `  Excerpt: ${excerpt.substring(0, 50)}${
        excerpt.length > 50 ? "..." : ""
      }`
    );
    console.log(`  Tags: ${tags.join(", ")}`);
    console.log(`  Type: ${isTopLevel ? "Category" : "Article"}`);
    console.log(`  Depth: ${depth}`);

    // Prepare database entry properties - Use the actual property names from your Notion database
    const properties = {
      Title: {
        title: [
          {
            text: {
              content: displayTitle,
            },
          },
        ],
      },
      Category: {
        select: {
          name: category || "Uncategorized",
        },
      },
      Status: {
        select: {
          name: "Published",
        },
      },
      Type: {
        select: {
          name: isTopLevel ? "Category" : "Article",
        },
      },
      Excerpt: {
        rich_text: [
          {
            text: {
              content: excerpt.slice(0, 2000), // Limit to 2000 chars for Notion API
            },
          },
        ],
      },
      Tags: {
        multi_select: tags.map((tag) => ({ name: tag })),
      },
      "Original Page": {
        url: `https://www.notion.so/${id.replace(/-/g, "")}`,
      },
      "Date Created": {
        date: {
          start: createdTime,
        },
      },
    };

    // Prepare the page data
    const pageData = {
      parent: {
        database_id: databaseId,
      },
      properties,
    };

    // If we have a cover image, add it to the page data
    if (coverImageUrl) {
      pageData.cover = {
        type: "external",
        external: {
          url: coverImageUrl,
        },
      };
    }

    // Create the database entry
    try {
      const response = await client.pages.create(pageData);

      console.log(`  ✓ Added to database: ${title}`);
      return response;
    } catch (error) {
      console.error(`  ✗ Error creating database entry: ${error.message}`);
      console.error(JSON.stringify(error.body, null, 2));
      return null;
    }
  } catch (error) {
    console.error(`  ✗ Error processing page ${title}:`, error.message);
    return null;
  }
}

/**
 * Extract the first image URL from a page
 * @param {string} pageId - The ID of the page
 * @returns {Promise<string|null>} - The URL of the first image or null if none found
 */
async function extractFirstImage(pageId) {
  try {
    // First, check if the page has a cover image
    const pageResponse = await notion.pages.retrieve({ page_id: pageId });

    if (pageResponse.cover) {
      if (pageResponse.cover.type === "external") {
        return pageResponse.cover.external.url;
      } else if (pageResponse.cover.type === "file") {
        return pageResponse.cover.file.url;
      }
    }

    // If no cover image, look for the first image in the content
    const blocks = await notion.blocks.children.list({
      block_id: pageId,
      page_size: 100,
    });

    for (const block of blocks.results) {
      if (block.type === "image") {
        if (block.image.type === "external") {
          return block.image.external.url;
        } else if (block.image.type === "file") {
          return block.image.file.url;
        }
      }
    }

    // No image found
    return null;
  } catch (error) {
    console.error(`Error extracting image from ${pageId}:`, error.message);
    return null;
  }
}

/**
 * Generate a URL-friendly slug from a title
 * @param {string} title - The title to generate a slug from
 * @param {string} pageId - The page ID to ensure uniqueness
 * @returns {string} - The generated slug
 */
function generateSlug(title, pageId) {
  if (!title) return pageId.replace(/-/g, "");

  // Convert to lowercase and replace spaces with hyphens
  let slug = title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove non-word chars
    .replace(/[\s_-]+/g, "-") // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens

  // Add the last 8 chars of the page ID for uniqueness
  const uniqueId = pageId.replace(/-/g, "").slice(-8);
  return `${slug}-${uniqueId}`;
}

/**
 * Clear all entries from the database
 * @returns {Promise<void>}
 */
async function clearDatabase() {
  try {
    console.log("Clearing existing database entries...");

    // Get existing entries
    const existingEntries = await getExistingEntries();

    if (existingEntries.length === 0) {
      console.log("No existing entries found in the database.");
      return;
    }

    console.log(`Found ${existingEntries.length} existing entries to remove.`);

    // Archive (delete) each entry
    for (const entry of existingEntries) {
      const title =
        entry.properties.Title?.title?.[0]?.text?.content || "Untitled";
      console.log(`Removing entry: ${title}`);

      try {
        await notion.pages.update({
          page_id: entry.id,
          archived: true,
        });
      } catch (error) {
        console.error(`Error removing entry ${entry.id}:`, error.message);
      }
    }

    console.log("Database cleared successfully.");
  } catch (error) {
    console.error("Error clearing database:", error.message);
  }
}

/**
 * Get all existing entries from the database
 * @returns {Promise<Array>} - Array of existing entries
 */
async function getExistingEntries() {
  try {
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      page_size: 100,
    });

    return response.results || [];
  } catch (error) {
    console.error(`Error getting existing entries: ${error.message}`);
    return [];
  }
}

/**
 * Migrate all pages to the Notion database
 * @param {NotionClient} client - The Notion client
 * @param {string} databaseId - The database ID
 * @param {Object[]} allPages - Array of all pages to migrate
 */
async function migrateAllPages(client, databaseId, allPages) {
  try {
    console.log("Starting migration process...");

    // Clear existing database entries
    console.log("Clearing existing database entries...");
    const existingEntries = await queryAllDatabaseEntries(client, databaseId);
    console.log(`Found ${existingEntries.length} existing entries.`);

    if (existingEntries.length > 0) {
      console.log("Deleting existing entries...");
      for (const entry of existingEntries) {
        try {
          await client.pages.update({
            page_id: entry.id,
            archived: true,
          });
          console.log(
            `  Archived entry: ${
              entry.properties.Title?.title[0]?.plain_text || entry.id
            }`
          );
        } catch (error) {
          console.error(`  Error archiving entry ${entry.id}:`, error.message);
        }
      }
      console.log(`Deleted ${existingEntries.length} existing entries.`);
    }

    // Log the types of pages we're migrating
    console.log("\nPreparing to migrate pages...");
    console.log(`Total pages to migrate: ${allPages.length}`);

    // Log migration progress
    const total = allPages.length;
    let success = 0;
    let errors = 0;

    // Process all pages
    for (let i = 0; i < allPages.length; i++) {
      const page = allPages[i];
      try {
        // Log progress every 10 pages
        if (i % 10 === 0 || i === allPages.length - 1) {
          console.log(`Progress: ${i}/${total} pages processed`);
        }

        await processPage(client, databaseId, page);
        success++;
      } catch (error) {
        console.error(`Error processing page "${page.title}":`, error.message);
        errors++;
      }
    }

    // Summary of migration
    console.log("\nMigration completed!");
    console.log(`Total pages: ${total}`);
    console.log(`Successfully migrated: ${success}`);
    console.log(`Errors: ${errors}`);
  } catch (error) {
    console.error("Migration failed:", error);
  }
}

/**
 * Main function to run the migration
 * @param {Object} options - Migration options
 * @param {boolean} options.clearDatabase - Whether to clear the database before migration
 * @returns {Promise<void>}
 */
async function runMigration(options = { clearDatabase: true }) {
  console.log("Starting Notion Technical Notes migration...");
  console.log("Configuration:");
  console.log(`- SOURCE_PAGE_ID: ${SOURCE_PAGE_ID}`);
  console.log(`- DATABASE_ID: ${DATABASE_ID}`);

  try {
    // Validate configuration
    if (!NOTION_API_KEY) {
      throw new Error("NOTION_API_KEY is not set in environment variables");
    }

    if (!SOURCE_PAGE_ID) {
      throw new Error("SOURCE_PAGE_ID is not set in environment variables");
    }

    if (!DATABASE_ID) {
      throw new Error("DATABASE_ID is not set in environment variables");
    }

    // Clear the database if requested
    if (options.clearDatabase) {
      await clearDatabase();
    }

    // Start the migration
    console.log("Starting migration of articles...");

    // Verify the source page exists
    try {
      await notion.pages.retrieve({
        page_id: SOURCE_PAGE_ID,
      });
    } catch (error) {
      throw new Error(`Source page not found: ${error.message}`);
    }

    // Verify the database exists
    try {
      await notion.databases.retrieve({
        database_id: DATABASE_ID,
      });
    } catch (error) {
      throw new Error(`Database not found: ${error.message}`);
    }

    // Migrate all pages
    await migrateAllPages(
      notion,
      DATABASE_ID,
      await getAllPages(await getTopLevelCategories())
    );
  } catch (error) {
    console.error("Migration failed:", error.message);
    process.exit(1);
  }
}

// Run the migration if this file is executed directly
if (require.main === module) {
  // Parse command line arguments
  const args = process.argv.slice(2);
  const options = {
    clearDatabase: !args.includes("--no-clear"),
  };

  console.log("Notion Technical Notes Migration Tool");
  console.log("====================================");

  if (!options.clearDatabase) {
    console.log("Running in append mode (--no-clear flag detected)");
  }

  runMigration(options)
    .then(() => {
      console.log("Migration completed successfully!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Migration failed:", error.message);
      process.exit(1);
    });
}

// Export functions for testing
module.exports = {
  runMigration,
  clearDatabase,
  getTopLevelCategories,
  processPage,
  extractTextContent,
  extractTags,
  generateExcerpt,
  extractFirstImage,
  hasActualContent,
};

/**
 * Query all entries in the Notion database
 * @param {NotionClient} client - The Notion client
 * @param {string} databaseId - The database ID
 * @returns {Promise<Array>} - Array of database entries
 */
async function queryAllDatabaseEntries(client, databaseId) {
  let allEntries = [];
  let hasMore = true;
  let startCursor = undefined;

  while (hasMore) {
    try {
      const response = await client.databases.query({
        database_id: databaseId,
        start_cursor: startCursor,
        page_size: 100, // Maximum allowed by Notion API
      });

      allEntries = allEntries.concat(response.results);

      hasMore = response.has_more;
      startCursor = response.next_cursor;
    } catch (error) {
      console.error("Error querying database:", error.message);
      hasMore = false;
    }
  }

  return allEntries;
}

async function main() {
  console.log("Starting Notion database migration...");
  console.log(`Source page ID: ${SOURCE_PAGE_ID}`);
  console.log(`Target database ID: ${DATABASE_ID}`);

  // Track statistics
  let totalPages = 0;
  let totalProcessed = 0;
  let skippedInvalidCategory = 0;

  try {
    // Initialize the Notion client
    const notion = new Client({ auth: NOTION_API_KEY });

    // Verify we can connect to the Notion API
    const listUsersResponse = await notion.users.list({});
    console.log("Successfully connected to Notion API.");

    // Step 1: Get top-level categories
    console.log("\nFetching top-level categories...");
    const response = await notion.blocks.children.list({
      block_id: SOURCE_PAGE_ID,
      page_size: 100,
    });

    const topLevelPages = response.results
      .filter((block) => block.type === "child_page")
      .map((block) => ({
        id: block.id,
        title: block.child_page.title,
      }));

    console.log(`Found ${topLevelPages.length} top-level categories.`);

    // Add Technical Notes categories to valid categories set
    topLevelPages.forEach((page) => {
      if (page.title !== "MIT Units") {
        validCategoriesSet.add(page.title);
      }
    });

    // Identify MIT Units page ID for special handling
    const mitUnitsPage = topLevelPages.find(
      (page) => page.title === "MIT Units"
    );
    const mitUnitsId = mitUnitsPage ? mitUnitsPage.id : null;

    if (mitUnitsId) {
      console.log(`Found MIT Units page with ID: ${mitUnitsId}`);

      // Get subpages of MIT Units to add as valid categories with CITS prefix
      const mitUnitsResponse = await notion.blocks.children.list({
        block_id: mitUnitsId,
        page_size: 100,
      });

      const mitUnitsSubpages = mitUnitsResponse.results
        .filter((block) => block.type === "child_page")
        .map((block) => ({
          id: block.id,
          title: `CITS${block.child_page.title}`,
        }));

      // Add MIT Units subpages to valid categories
      mitUnitsSubpages.forEach((page) => {
        validCategoriesSet.add(page.title);
      });

      console.log(`Valid categories (${validCategoriesSet.size}):`);
      console.log([...validCategoriesSet].join(", "));
    } else {
      console.log(
        "MIT Units page not found. Proceeding without MIT Units categories."
      );
    }

    // Step 2: Traverse each top-level category and gather all pages to migrate
    console.log("\nTraversing categories to gather pages for migration...");
    const pagesToMigrate = [];

    for (const page of topLevelPages) {
      console.log(`\nTraversing category: ${page.title}`);

      // Special handling for MIT Units - we want to find its subpages
      if (page.id === mitUnitsId) {
        console.log(
          "This is the MIT Units category - adding its subpages with CITS prefix"
        );

        // Get the subpages under MIT Units
        const mitSubpagesResponse = await notion.blocks.children.list({
          block_id: page.id,
          page_size: 100,
        });

        const mitSubpages = mitSubpagesResponse.results
          .filter((block) => block.type === "child_page")
          .map((block) => ({
            id: block.id,
            title: block.child_page.title,
          }));

        console.log(`Found ${mitSubpages.length} subpages under MIT Units.`);

        // Add these subpages to our list to traverse
        for (const subpage of mitSubpages) {
          const results = await traverseCategory(
            subpage,
            "MIT Units", // Set the parent category to "MIT Units"
            1 // These are at depth 1
          );
          pagesToMigrate.push(...results);
        }
      } else {
        // Standard traversal for other top-level categories
        const results = await traverseCategory(page);
        pagesToMigrate.push(...results);
      }
    }

    console.log(`\nGathered ${pagesToMigrate.length} pages to migrate.`);

    // Step 3: Filter out pages with invalid categories
    const validPagesToMigrate = pagesToMigrate.filter((page) => {
      if (validCategoriesSet.has(page.category)) {
        return true;
      } else {
        console.log(
          `Skipping page with invalid category: ${page.title} (category: ${page.category})`
        );
        skippedInvalidCategory++;
        return false;
      }
    });

    console.log(
      `\nFiltered to ${validPagesToMigrate.length} pages with valid categories.`
    );
    console.log(
      `Skipped ${skippedInvalidCategory} pages with invalid categories.`
    );

    // Step 4: Process and migrate each valid page
    console.log("\nMigrating pages to the database...");

    for (const pageInfo of validPagesToMigrate) {
      await processPage(notion, DATABASE_ID, pageInfo);
      totalProcessed++;
    }

    console.log("\nMigration complete!");
    console.log(`Total pages processed: ${totalProcessed}`);
    console.log(
      `Pages skipped due to invalid category: ${skippedInvalidCategory}`
    );
  } catch (error) {
    console.error("Migration failed:", error);
  }
}

// Call the main function to start the migration
main().catch((error) => {
  console.error("Migration failed:", error);
  process.exit(1);
});
