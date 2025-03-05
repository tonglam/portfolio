/**
 * Add Properties Script
 *
 * This script adds the required properties to a Notion database:
 * - Summary (rich text)
 * - Mins Read (number)
 * - Image (url)
 */

const path = require("path");
const fs = require("fs");
const { Client } = require("@notionhq/client");

// Read environment variables directly from the file to avoid conflicts with parent .env
let envConfig = {};
if (fs.existsSync(path.resolve(__dirname, ".env"))) {
  const envFile = fs.readFileSync(path.resolve(__dirname, ".env"), "utf8");
  envFile.split("\n").forEach((line) => {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim();
      envConfig[key] = value;
    }
  });
}

// Get environment variables, preferring our direct parsing over process.env
const NOTION_API_KEY = envConfig.NOTION_API_KEY || process.env.NOTION_API_KEY;
const DATABASE_ID =
  envConfig.NOTION_DATABASE_ID || process.env.NOTION_DATABASE_ID;

// Initialize the Notion client
const notion = new Client({ auth: NOTION_API_KEY });

/**
 * Delay execution for a specified number of milliseconds
 * @param {number} ms - Milliseconds to delay
 * @returns {Promise<void>}
 */
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Call an API function with retry logic
 * @param {Function} apiCall - Function to call
 * @param {number} maxRetries - Maximum number of retries
 * @param {number} baseDelay - Base delay in milliseconds
 * @returns {Promise<any>} API response
 */
async function callWithRetry(apiCall, maxRetries = 5, baseDelay = 1500) {
  let lastError;
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await apiCall();
    } catch (error) {
      lastError = error;
      console.error(
        `Error (attempt ${attempt + 1}/${maxRetries}):`,
        error.message
      );
      await delay(baseDelay * Math.pow(1.5, attempt) + Math.random() * 500);
    }
  }
  throw lastError;
}

/**
 * Add properties to the database
 */
async function addPropertiesToDatabase() {
  console.log(`Adding properties to database ${DATABASE_ID}...`);

  try {
    // First get the current database schema
    const database = await callWithRetry(() =>
      notion.databases.retrieve({ database_id: DATABASE_ID })
    );

    console.log(
      `Retrieved database: ${database.title[0]?.plain_text || "Unnamed"}`
    );

    // Check which properties already exist
    const existingProps = Object.keys(database.properties);
    console.log("Existing properties:", existingProps.join(", "));

    // Properties to add
    const newProperties = {};

    // Add Summary property if it doesn't exist
    if (!existingProps.includes("Summary")) {
      newProperties["Summary"] = {
        rich_text: {},
      };
    }

    // Add Mins Read property if it doesn't exist
    if (!existingProps.includes("Mins Read")) {
      newProperties["Mins Read"] = {
        number: {
          format: "number",
        },
      };
    }

    // Add Image property if it doesn't exist
    if (!existingProps.includes("Image")) {
      newProperties["Image"] = {
        url: {},
      };
    }

    // Check if we have any properties to add
    const propsToAdd = Object.keys(newProperties);
    if (propsToAdd.length === 0) {
      console.log("All required properties already exist!");
      return;
    }

    console.log(`Adding properties: ${propsToAdd.join(", ")}`);

    // Update the database
    const updatedDb = await callWithRetry(() =>
      notion.databases.update({
        database_id: DATABASE_ID,
        properties: newProperties,
      })
    );

    console.log("✅ Successfully added properties to the database!");

    // Verify the new properties
    const allProps = Object.keys(updatedDb.properties);
    console.log("Updated properties:", allProps.join(", "));
  } catch (error) {
    console.error("❌ Failed to add properties:", error.message);
    process.exit(1);
  }
}

// Run the function
addPropertiesToDatabase().catch(console.error);
