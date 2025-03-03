# Notion Technical Notes Migration Tool

This tool migrates your Notion Technical Notes into a structured database format suitable for integration with your portfolio website.

## Overview

The migration tool:

1. Identifies top-level categories (like Java, Python, JavaScript, etc.)
2. Recursively processes all pages and their child pages
3. Extracts content, including text, headers, lists, code blocks, and more
4. Generates excerpts, slugs and calculates reading time
5. Preserves original creation and editing dates
6. Creates database entries with proper categorization
7. Intelligently updates only changed content on subsequent runs

## Key Features

- **Idempotent Operation**: Run the script multiple times without duplicating data. Only new or modified pages will be processed.
- **Simple Category-Based Tagging**: Uses the existing top-level categories as tags, without overcomplicating things.
- **Database Auto-Creation**: Creates the required database structure if it doesn't exist.
- **Progress Tracking**: Detailed logging of what's being added, updated, or skipped.
- **Date Preservation**: Maintains the original creation dates from your Notion pages.

## Prerequisites

- Node.js (v14 or higher)
- A Notion integration with access to your Technical Notes page
- A Notion database with the required properties (or the script will create one)

## Setup

1. Clone or download this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Configure your environment variables by copying `.env.example` to `.env` and filling in your values:
   ```
   cp .env.example .env
   ```
4. Edit the `.env` file with your Notion API key and source page ID
5. Run the setup script to check your connection:
   ```
   ./run.sh
   ```
   or directly:
   ```
   npm test
   ```

## Environment Variables

- `NOTION_API_KEY`: Your Notion integration token (starts with `secret_` or `ntn_`)
- `SOURCE_PAGE_ID`: ID of your Technical Notes page
- `NOTION_DATABASE_ID`: ID of the target database to populate (optional, will be created if not specified)
- `TARGET_DATABASE_NAME`: Name for the database if it needs to be created (optional)

## Database Structure

The script creates or uses a database with the following properties:

- `Name` (title): The title of the note
- `Excerpt` (rich_text): A short excerpt from the content
- `Date` (date): Publication date of the note
- `Category` (select): The top-level category (Java, Python, etc.)
- `Published` (checkbox): Whether the note is published
- `Slug` (rich_text): URL-friendly identifier generated from the title
- `Image` (url): Featured image URL for the note
- `ReadTime` (number): Estimated reading time in minutes
- `Original Page` (url): Link to the original Notion page (for tracking)
- `Last Edited` (date): When the note was last edited
- `Tags` (multi_select): Automatically generated tags based on content

## Usage

### Using the Run Script

The easiest way to use the tool is with the provided shell script:

```
./run.sh
```

This will present a menu with options to:

1. Test your Notion API connection
2. Check your database structure and contents
3. Add a test entry to the database
4. Run the migration (with database clear)
5. Run the migration (without clearing the database)

### Using npm Scripts

You can also use npm scripts defined in package.json:

```
npm run migrate            # Run migration with default settings
npm run migrate:keep       # Run without clearing existing entries
npm run migrate:clear      # Run and clear existing entries first
npm test                   # Test the API connection
```

### Command Line Options

When running directly:

```
node notion-db-migration.js [options]
```

Options:

- `--clear`: Clear existing database entries before migration (default)
- `--no-clear`: Keep existing database entries during migration

## How Atomic Updates Work

The script is designed to be idempotent, meaning you can run it multiple times without causing duplicate data:

1. First run: Creates the database (if needed) and adds all qualifying pages
2. Subsequent runs:
   - Retrieves all existing entries
   - Compares last edited dates of original Notion pages with database entries
   - Only updates entries where the original page has changed
   - Adds new pages that weren't previously added
   - Skips unchanged pages to save time and API calls

This makes it safe to run the script periodically to keep your database in sync with your Notion notes.

## Integration with Portfolio

After migration, you can integrate the database with your portfolio by:

1. Adding the database ID to your portfolio's `.env` file
2. Using the Notion API to fetch and display database entries

Example code for fetching database entries:

```javascript
import { Client } from "@notionhq/client";

// Initialize the Notion client
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

// Function to fetch blog posts from the Notion database
export async function getNotionBlogPosts() {
  const databaseId = process.env.NOTION_DATABASE_ID;

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
        property: "Last Edited",
        direction: "descending",
      },
    ],
  });

  return response.results.map((page) => {
    return {
      id: page.id,
      title: page.properties.Title.title[0]?.plain_text || "Untitled",
      excerpt: page.properties.Excerpt.rich_text[0]?.plain_text || "",
      category: page.properties.Category.select?.name || "Uncategorized",
      date: page.properties["Date Created"].date?.start,
      lastEdited: page.properties["Last Edited"].date?.start,
      tags: page.properties.Tags.multi_select.map((tag) => tag.name),
      url: page.properties["Original Page"].url || "",
      slug: page.id, // You could use a custom slug property instead
    };
  });
}
```

## Troubleshooting

### API Token Issues

If you encounter "API token is invalid" errors:

1. Ensure your token is correctly copied to the `.env` file
2. Verify the integration has permission to access your pages
3. Share your page with the integration in Notion

### Database Access Issues

If the script can't access the database:

1. Verify the database ID in your `.env` file
2. Ensure the integration has access to the database
3. If the database ID isn't specified, the script will attempt to create a new one

### Update Issues

If pages aren't being updated properly:

1. Check that the original page URLs in the database are correct
2. Verify that the last edited dates are being properly saved and compared
3. Try running with the `--clear` option to rebuild the database from scratch

## File Structure

- `notion-db-migration.js`: Main migration script with all functionality
- `test-connection.js`: Script to test your Notion API connection
- `check-database.js`: Script to view your database structure and contents
- `add-test-entry.js`: Script to add a test entry to your database
- `run.sh`: Shell script with interactive menu for all functions
- `.env`: Environment variables for your configuration
- `.env.example`: Example environment variables file
- `package.json`: Project dependencies
- `CHANGELOG.md`: History of changes to the codebase

## License

MIT

## Author

This tool was created for portfolio integration of Notion technical notes.
