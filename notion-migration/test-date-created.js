require("dotenv").config();
const { Client } = require("@notionhq/client");
const fs = require("fs");

// Read variables from .env file
const envContent = fs.readFileSync(".env", "utf8");
const envVars = {};
envContent.split("\n").forEach((line) => {
  if (!line || line.startsWith("#")) return;
  const parts = line.split("=");
  if (parts.length >= 2) {
    const key = parts[0].trim();
    const value = parts.slice(1).join("=").trim();
    envVars[key] = value;
  }
});

// Notion API credentials - directly set DATABASE_ID
const NOTION_API_KEY = envVars.NOTION_API_KEY || process.env.NOTION_API_KEY;
const SOURCE_PAGE_ID = envVars.SOURCE_PAGE_ID || process.env.SOURCE_PAGE_ID;
const DATABASE_ID = "1ab7ef86-a5ad-81ab-a4cb-f8b8f37ec491"; // Hardcoded from earlier command output

console.log("\nEnvironment Variables:");
console.log(`API Key set: ${!!NOTION_API_KEY}`);
console.log(`Source Page ID: ${SOURCE_PAGE_ID}`);
console.log(`Database ID: ${DATABASE_ID}`);

// Initialize the Notion client
const notion = new Client({ auth: NOTION_API_KEY });

async function testDateCreated() {
  try {
    console.log("\nTesting Date Created functionality...");
    console.log(`Source page ID: ${SOURCE_PAGE_ID}`);
    console.log(`Database ID: ${DATABASE_ID}`);

    // Verify we can connect to the Notion API
    console.log("Connecting to Notion API...");
    await notion.users.list({});
    console.log("Successfully connected to Notion API.");

    // Get the database schema to check available properties
    console.log("Retrieving database schema...");
    const database = await notion.databases.retrieve({
      database_id: DATABASE_ID,
    });
    const properties = database.properties;
    console.log("Available properties in database:");
    Object.keys(properties).forEach((prop) => {
      console.log(`- ${prop} (${properties[prop].type})`);
    });

    // Get a test page from the source
    console.log("\nFetching a test page...");
    const response = await notion.blocks.children.list({
      block_id: SOURCE_PAGE_ID,
      page_size: 5,
    });

    // Find the first child page
    const testPage = response.results.find(
      (block) => block.type === "child_page"
    );
    if (!testPage) {
      console.log("No child pages found. Exiting test.");
      return;
    }

    const testPageId = testPage.id;
    const testPageTitle = testPage.child_page.title;
    console.log(`Found test page: ${testPageTitle} (ID: ${testPageId})`);

    // Retrieve the page's metadata to get the creation date
    console.log("Fetching page metadata...");
    const pageMetadata = await notion.pages.retrieve({ page_id: testPageId });
    const createdTime = pageMetadata.created_time;

    console.log(`Original creation date: ${createdTime}`);
    console.log(`Formatted date: ${new Date(createdTime).toLocaleString()}`);

    // Test adding a database entry with the correct creation date
    console.log("\nCreating test database entry...");

    // Prepare properties based on what exists in the database
    const pageProperties = {
      Title: {
        title: [
          {
            text: {
              content: `Test Entry - ${testPageTitle}`,
            },
          },
        ],
      },
    };

    // Add Category if it exists
    if (properties.Category) {
      pageProperties.Category = {
        select: {
          name: "Test",
        },
      };
    }

    // Add Status if it exists
    if (properties.Status) {
      pageProperties.Status = {
        select: {
          name: "Published",
        },
      };
    }

    // Add Excerpt if it exists
    if (properties.Excerpt) {
      pageProperties.Excerpt = {
        rich_text: [
          {
            text: {
              content:
                "This is a test entry to verify Date Created functionality",
            },
          },
        ],
      };
    }

    // Add Tags if it exists
    if (properties.Tags && properties.Tags.type === "multi_select") {
      pageProperties.Tags = {
        multi_select: [{ name: "Test" }],
      };
    }

    // Add Original Page if it exists
    if (
      properties["Original Page"] &&
      properties["Original Page"].type === "url"
    ) {
      pageProperties["Original Page"] = {
        url: `https://www.notion.so/${testPageId.replace(/-/g, "")}`,
      };
    }

    // Add Date Created if it exists
    if (
      properties["Date Created"] &&
      properties["Date Created"].type === "date"
    ) {
      pageProperties["Date Created"] = {
        date: {
          start: createdTime,
        },
      };
    }

    console.log("Properties being set:");
    console.log(JSON.stringify(pageProperties, null, 2));

    // Create a test database entry
    const pageData = {
      parent: {
        database_id: DATABASE_ID,
      },
      properties: pageProperties,
    };

    try {
      const response = await notion.pages.create(pageData);
      console.log(`✓ Successfully created test entry with ID: ${response.id}`);
      console.log(
        "View the entry in your database to verify the Date Created field."
      );
    } catch (error) {
      console.error(`✗ Error creating test entry: ${error.message}`);
      console.error(JSON.stringify(error.body, null, 2));
    }

    console.log("Test completed!");
  } catch (error) {
    console.error("Test failed:", error);
  }
}

// Run the test
testDateCreated();
