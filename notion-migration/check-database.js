/**
 * Check Notion Database
 * This script verifies that the Notion database exists and displays its contents
 */
require("dotenv").config();
const { Client } = require("@notionhq/client");

// Load configuration from environment variables
const config = {
  NOTION_API_KEY: process.env.NOTION_API_KEY,
  DATABASE_ID: process.env.NOTION_DATABASE_ID || process.env.DATABASE_ID,
};

// Validate required configuration
if (!config.NOTION_API_KEY) {
  console.error("Error: NOTION_API_KEY is missing from .env file");
  console.error("Please set the NOTION_API_KEY in your .env file");
  process.exit(1);
}

if (!config.DATABASE_ID) {
  console.error(
    "Error: NOTION_DATABASE_ID or DATABASE_ID is missing from .env file"
  );
  console.error("Please set the NOTION_DATABASE_ID in your .env file");
  process.exit(1);
}

console.log("Using configuration:");
console.log("- DATABASE_ID:", config.DATABASE_ID);

// Initialize Notion client
const notion = new Client({
  auth: config.NOTION_API_KEY,
});

async function checkDatabase() {
  try {
    console.log("Checking if database exists...");
    const database = await notion.databases.retrieve({
      database_id: config.DATABASE_ID,
    });

    console.log("Database found!");
    console.log(
      "Title:",
      database.title[0]?.plain_text ||
        database.title[0]?.text?.content ||
        "Untitled"
    );
    console.log("URL:", database.url);

    // Display database properties
    console.log("\nDatabase properties:");
    const expectedProperties = [
      "Name",
      "Excerpt",
      "Date",
      "Category",
      "Published",
      "Slug",
      "Image",
      "ReadTime",
      "Original Page",
      "Last Edited",
      "Tags",
    ];

    // Check if all expected properties exist
    const missingProperties = expectedProperties.filter(
      (prop) => !database.properties[prop]
    );

    if (missingProperties.length > 0) {
      console.log(
        "⚠️ Missing expected properties:",
        missingProperties.join(", ")
      );
    }

    // Display all properties
    Object.entries(database.properties).forEach(([key, property]) => {
      console.log(`- ${key} (${property.type})`);
    });

    // Check database content
    console.log("\nChecking database content...");
    const response = await notion.databases.query({
      database_id: config.DATABASE_ID,
      page_size: 10, // Limit to 10 results for testing
    });

    console.log(`Found ${response.results.length} entries in the database`);

    // Print basic info about each entry
    response.results.forEach((page, index) => {
      const title =
        page.properties.Name?.title[0]?.plain_text ||
        page.properties.Title?.title[0]?.plain_text ||
        "Untitled";
      const category =
        page.properties.Category?.select?.name || "Uncategorized";
      const lastEdited = new Date(page.last_edited_time).toLocaleString();
      console.log(
        `Entry ${
          index + 1
        }: ${title} (Category: ${category}, Last edited: ${lastEdited})`
      );
    });
  } catch (error) {
    console.error("Error retrieving database:", error.message);

    if (error.code === "object_not_found") {
      console.log(
        "\nThe database with ID",
        config.DATABASE_ID,
        "does not exist or you don't have access to it."
      );
      console.log("Please verify:");
      console.log("1. The database ID is correct in your .env file");
      console.log("2. The database was successfully created");
      console.log("3. Your integration has permission to access this database");
    }
  }
}

// Run the check
checkDatabase()
  .then(() => {
    console.log("\nDatabase check completed successfully");
  })
  .catch((error) => {
    console.error("\nDatabase check failed:", error);
    process.exit(1);
  });
