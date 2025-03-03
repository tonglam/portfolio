/**
 * List subpages under MIT Units
 */
require("dotenv").config();

// Get environment variables
const NOTION_API_KEY = process.env.NOTION_API_KEY;

// Initialize the Notion client
const { Client } = require("@notionhq/client");
const notion = new Client({ auth: NOTION_API_KEY });

// MIT Units page ID from our previous listing
const MIT_UNITS_PAGE_ID = "ffd269a6-7154-41bd-9b9e-8b3d176b6aee";

/**
 * Get subpages under MIT Units
 */
async function getMITUnitsSubpages() {
  try {
    console.log(
      `\nFetching subpages under MIT Units (ID: ${MIT_UNITS_PAGE_ID})...`
    );

    const response = await notion.blocks.children.list({
      block_id: MIT_UNITS_PAGE_ID,
      page_size: 100,
    });

    console.log(`\nFound ${response.results.length} blocks under MIT Units.`);

    const subpages = [];

    // Filter for child_page blocks (subpages)
    for (const block of response.results) {
      if (block.type === "child_page") {
        subpages.push({
          id: block.id,
          title: block.child_page.title,
        });
      }
    }

    console.log(`\nMIT Units subpages (${subpages.length}):`);
    console.log("=========================");
    subpages.forEach((subpage, index) => {
      console.log(`${index + 1}. ${subpage.title} (ID: ${subpage.id})`);
    });

    return subpages;
  } catch (error) {
    console.error("Error getting MIT Units subpages:", error.message);
    if (error.code) {
      console.error(`Error code: ${error.code}`);
    }
    return [];
  }
}

// Run the function
getMITUnitsSubpages().catch((error) => {
  console.error("Unhandled error:", error);
});
