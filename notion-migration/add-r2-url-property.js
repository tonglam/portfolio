/**
 * Add R2ImageUrl Property to Notion Database
 *
 * This script adds a new URL property called 'R2ImageUrl' to the Notion database
 * to store the public Cloudflare R2 URL for each image.
 *
 * Usage:
 * - node add-r2-url-property.js
 */

require('dotenv').config();
const { Client } = require('@notionhq/client');

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

// Database ID from environment variables
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

/**
 * Add the R2ImageUrl property to the database
 */
async function addR2ImageUrlProperty() {
  try {
    console.log(`Adding R2ImageUrl property to database ${NOTION_DATABASE_ID}...`);

    // First, retrieve the current database schema
    const database = await notion.databases.retrieve({
      database_id: NOTION_DATABASE_ID,
    });

    // Check if the property already exists
    if (database.properties.R2ImageUrl) {
      console.log('R2ImageUrl property already exists in the database.');
      return database;
    }

    // Update the database to add the new property
    const updatedDatabase = await notion.databases.update({
      database_id: NOTION_DATABASE_ID,
      properties: {
        R2ImageUrl: {
          type: 'url',
          name: 'R2ImageUrl',
          url: {},
        },
      },
    });

    console.log('R2ImageUrl property added successfully!');
    return updatedDatabase;
  } catch (error) {
    console.error(`Error adding R2ImageUrl property: ${error.message}`);
    throw error;
  }
}

/**
 * Main function
 */
async function main() {
  try {
    console.log('Starting database property update...');
    await addR2ImageUrlProperty();
    console.log('Database property update completed successfully!');
  } catch (error) {
    console.error(`Error in main process: ${error.message}`);
    process.exit(1);
  }
}

// Run the main function
main();
