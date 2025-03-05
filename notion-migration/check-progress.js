/**
 * Check Image Migration Progress
 *
 * This script checks the current progress of image migration to R2
 */

require("dotenv").config();
const { Client } = require("@notionhq/client");

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

// Get environment variables
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;
const R2_PUBLIC_URL =
  process.env.CLOUDFLARE_R2_PUBLIC_URL || process.env.R2_PUBLIC_URL;

/**
 * Extracts the image URL from a Notion entry's properties
 */
function getImageUrl(properties) {
  // Check if Image property exists as a URL type
  if (properties.Image?.type === "url" && properties.Image?.url) {
    return properties.Image.url;
  }

  // Check if Image exists as files property (original format)
  if (properties.Image?.files && properties.Image.files.length > 0) {
    const file = properties.Image.files[0];
    if (file.type === "external" && file.external && file.external.url) {
      return file.external.url;
    } else if (file.type === "file" && file.file && file.file.url) {
      return file.file.url;
    }
  }

  return null;
}

/**
 * Check if a URL is from R2
 */
function isImageUrlFromR2(url) {
  // Check if the URL starts with the R2 public URL prefix
  return (
    url &&
    (url.includes("r2.cloudflarestorage.com") || url.includes(R2_PUBLIC_URL))
  );
}

/**
 * Check progress of image migration
 */
async function checkProgress() {
  try {
    console.log(
      `Checking migration progress for database ${NOTION_DATABASE_ID}`
    );
    console.log(`R2 public URL: ${R2_PUBLIC_URL}`);

    let allEntries = [];
    let startCursor = undefined;
    let hasMore = true;

    // Retrieve all entries with pagination
    while (hasMore) {
      console.log("Fetching batch of entries...");
      const response = await notion.databases.query({
        database_id: NOTION_DATABASE_ID,
        start_cursor: startCursor,
        page_size: 100,
      });

      allEntries = allEntries.concat(response.results);
      console.log(
        `Retrieved ${response.results.length} entries, total so far: ${allEntries.length}`
      );

      hasMore = response.has_more;
      startCursor = response.next_cursor;

      if (hasMore) {
        console.log("More entries available, continuing...");
      }
    }

    console.log(`\nTotal entries in database: ${allEntries.length}`);

    // Categorize entries
    let entriesWithImage = 0;
    let entriesWithR2 = 0;
    let entriesWithBoth = 0;
    let entriesWithImageNoR2 = 0;
    let entriesWithR2NoImage = 0;
    let entriesWithNeither = 0;

    for (const entry of allEntries) {
      const properties = entry.properties;

      // Check for Image property
      const imageUrl = getImageUrl(properties);
      const hasImage = imageUrl !== null;

      // Check for R2ImageUrl property
      const hasR2 =
        properties.R2ImageUrl &&
        properties.R2ImageUrl.type === "url" &&
        properties.R2ImageUrl.url;

      // Check if R2ImageUrl is pointing to R2
      const hasValidR2 = hasR2 && isImageUrlFromR2(properties.R2ImageUrl.url);

      if (hasImage) entriesWithImage++;
      if (hasValidR2) entriesWithR2++;

      if (hasImage && hasValidR2) {
        entriesWithBoth++;
      } else if (hasImage && !hasValidR2) {
        entriesWithImageNoR2++;
      } else if (!hasImage && hasValidR2) {
        entriesWithR2NoImage++;
      } else {
        entriesWithNeither++;
      }
    }

    // Print statistics
    console.log("\n=== MIGRATION PROGRESS ===");
    console.log(
      `Entries with Image: ${entriesWithImage} (${(
        (entriesWithImage / allEntries.length) *
        100
      ).toFixed(2)}%)`
    );
    console.log(
      `Entries with R2ImageUrl: ${entriesWithR2} (${(
        (entriesWithR2 / allEntries.length) *
        100
      ).toFixed(2)}%)`
    );
    console.log(`\nDetailed breakdown:`);
    console.log(
      `Entries with both Image and R2ImageUrl: ${entriesWithBoth} (${(
        (entriesWithBoth / allEntries.length) *
        100
      ).toFixed(2)}%)`
    );
    console.log(
      `Entries with Image but no R2ImageUrl: ${entriesWithImageNoR2} (${(
        (entriesWithImageNoR2 / allEntries.length) *
        100
      ).toFixed(2)}%)`
    );
    console.log(
      `Entries with R2ImageUrl but no Image: ${entriesWithR2NoImage} (${(
        (entriesWithR2NoImage / allEntries.length) *
        100
      ).toFixed(2)}%)`
    );
    console.log(
      `Entries with neither property: ${entriesWithNeither} (${(
        (entriesWithNeither / allEntries.length) *
        100
      ).toFixed(2)}%)`
    );

    // Provide next steps
    console.log("\n=== NEXT STEPS ===");
    if (entriesWithImageNoR2 > 0) {
      console.log(
        `Run 'node upload-images-to-r2.js' to process the remaining ${entriesWithImageNoR2} entries with Image but no R2ImageUrl.`
      );
    } else {
      console.log(
        "All entries with Image have been processed. Migration is complete!"
      );
    }
  } catch (error) {
    console.error(`Error checking progress: ${error.message}`);
    if (error.stack) {
      console.error(error.stack);
    }
  }
}

// Run the check
checkProgress().catch((error) => {
  console.error(`Unhandled error: ${error.message}`);
  process.exit(1);
});
