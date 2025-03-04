/**
 * Test Connection Script
 *
 * This script tests the connection to the Notion API using the provided credentials.
 * It verifies that the API token is valid and can access the database.
 */

require("dotenv").config();
const { Client } = require("@notionhq/client");

// Get environment variables
const NOTION_API_KEY = process.env.NOTION_API_KEY;
const DATABASE_ID = process.env.NOTION_DATABASE_ID;

// Validate environment variables
if (!NOTION_API_KEY || !DATABASE_ID) {
  console.error("Error: Missing required environment variables.");
  console.error(
    "Please ensure NOTION_API_KEY and NOTION_DATABASE_ID are set in your .env file."
  );
  process.exit(1);
}

// Initialize the Notion client
const notion = new Client({ auth: NOTION_API_KEY });

// Test function
async function testConnection() {
  console.log("Testing Notion API connection...");
  console.log(
    `API Key: ${NOTION_API_KEY.substring(0, 4)}...${NOTION_API_KEY.substring(
      NOTION_API_KEY.length - 4
    )}`
  );
  console.log(`Database ID: ${DATABASE_ID}`);

  try {
    // Test database access
    console.log("\nTesting database access...");
    const databaseResponse = await notion.databases.retrieve({
      database_id: DATABASE_ID,
    });
    console.log("✅ Successfully connected to database!");
    console.log(
      `Database name: ${databaseResponse.title[0]?.plain_text || "Unnamed"}`
    );

    // Test query access
    console.log("\nTesting query access...");
    const queryResponse = await notion.databases.query({
      database_id: DATABASE_ID,
      page_size: 1,
    });

    if (queryResponse.results.length > 0) {
      console.log("✅ Successfully queried database!");
      console.log(`Found ${queryResponse.results.length} entries.`);
      console.log(`First entry ID: ${queryResponse.results[0].id}`);

      // Get the title of the first entry
      const title =
        queryResponse.results[0].properties.Title?.title?.[0]?.plain_text ||
        "Untitled";
      console.log(`First entry title: ${title}`);
    } else {
      console.log("✅ Query successful, but no entries found in the database.");
    }

    console.log(
      "\n✅ All tests passed! Your Notion API setup is working correctly."
    );
  } catch (error) {
    console.error("❌ Error connecting to Notion API:", error.message);
    if (error.code === "unauthorized") {
      console.error("\nThe API token appears to be invalid or has expired.");
      console.error("Please check that:");
      console.error("1. Your Notion integration token is correct");
      console.error(
        "2. Your integration has been granted access to the database"
      );
      console.error("3. The token has not expired or been revoked");
    } else if (error.status === 404) {
      console.error("\nThe database could not be found.");
      console.error("Please check that:");
      console.error("1. The DATABASE_ID is correct");
      console.error(
        "2. Your integration has been granted access to this specific database"
      );
    }
  }
}

// Run test
testConnection().catch(console.error);
