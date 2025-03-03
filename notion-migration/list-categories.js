/**
 * List all top-level categories from the source page
 */
require("dotenv").config();

// Get environment variables and output them
const NOTION_API_KEY = process.env.NOTION_API_KEY;
const SOURCE_PAGE_ID = process.env.SOURCE_PAGE_ID;
const DATABASE_ID = process.env.NOTION_DATABASE_ID;

console.log("Environment variables:");
console.log(
  `- NOTION_API_KEY: ${
    NOTION_API_KEY
      ? "Set (starts with " + NOTION_API_KEY.substring(0, 8) + "...)"
      : "Not set"
  }`
);
console.log(`- SOURCE_PAGE_ID: ${SOURCE_PAGE_ID || "Not set"}`);
console.log(`- DATABASE_ID: ${DATABASE_ID || "Not set"}`);

// Initialize the Notion client
const { Client } = require("@notionhq/client");
const notion = new Client({ auth: NOTION_API_KEY });

/**
 * Get top-level categories from the source page
 */
async function getTopLevelCategories() {
  try {
    console.log(
      `\nFetching top-level categories from page ID: ${SOURCE_PAGE_ID}...`
    );

    const response = await notion.blocks.children.list({
      block_id: SOURCE_PAGE_ID,
      page_size: 100,
    });

    console.log(
      `\nFound ${response.results.length} blocks in the source page.`
    );

    const categories = [];

    // Filter for child_page blocks (subpages)
    for (const block of response.results) {
      if (block.type === "child_page") {
        categories.push({
          id: block.id,
          title: block.child_page.title,
        });
      }
    }

    console.log(`\nTop-level categories (${categories.length}):`);
    console.log("=========================");
    categories.forEach((category, index) => {
      console.log(`${index + 1}. ${category.title} (ID: ${category.id})`);
    });

    return categories;
  } catch (error) {
    console.error("Error getting top-level categories:", error.message);
    if (error.code) {
      console.error(`Error code: ${error.code}`);
    }
    return [];
  }
}

// Run the function
getTopLevelCategories().catch((error) => {
  console.error("Unhandled error:", error);
});
