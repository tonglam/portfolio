# Notion Technical Notes Migration Toolkit

A comprehensive toolkit for migrating, enhancing, and managing Notion databases with AI-generated content, images, and structured metadata.

## Overview

This toolkit provides a set of tools to transform your Notion Technical Notes into a structured database format suitable for integration with portfolio websites, complete with AI-generated content and professional illustrations.

The tools in this toolkit include:

1. **Database Migration Tool**: Migrates technical notes into a structured database
2. **Database Update Tool**: Enhances database entries with summaries and metadata
3. **Image Generation Tool**: Creates professional illustrations for entries using DashScope AI
4. **Image Migration Tool**: Migrates images from Notion to Cloudflare R2 for web display

## Key Features

### Migration Features

- **Idempotent Operation**: Run scripts multiple times without duplicating data
- **Category-Based Tagging**: Uses existing top-level categories as tags
- **Database Auto-Creation**: Creates required database structure if it doesn't exist
- **Progress Tracking**: Detailed logging of what's being processed
- **Date Preservation**: Maintains original creation dates from your Notion pages

### Content Enhancement Features

- **AI-Generated Summaries**: Adds concise summaries to database entries
- **Reading Time Calculation**: Estimates reading time based on content length
- **Automated Metadata**: Extracts and structures metadata from page content

### Image Generation Features

- **Professional Illustrations**: Generates high-quality images for each entry
- **Structured Prompting**: Uses advanced prompting techniques for consistent results
- **Progress Tracking**: JSON mapping file tracks image generation status
- **Resumable Operations**: Can pick up where it left off if interrupted
- **Batch Processing**: Process entries in controlled batches

### Image Migration Features

- **Cloudflare R2 Integration**: Moves images from Notion to R2 for better web display
- **URL Property Management**: Adds and updates R2 image URLs in your Notion database
- **Idempotent Processing**: Safely rerun the migration without duplicating uploads
- **Selective Processing**: Ability to process specific entries or the entire database
- **Content-Type Preservation**: Maintains original image formats
- **Smart Skipping Logic**: Automatically skips entries that already have R2 URLs and images that were already uploaded to R2
- **Efficient Resource Usage**: Prevents unnecessary downloads and uploads by checking existing properties

## Prerequisites

- Node.js (v14 or higher)
- A Notion integration with access to your pages
- API keys for AI services (if using enhanced features)
- Cloudflare R2 account (if using image migration features)

## Setup

1. Clone or download this repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure your environment variables by copying `.env.example` to `.env`:

   ```bash
   cp .env.example .env
   ```

4. Edit the `.env` file with your API keys and database information:

   ```env
   # Notion API
   NOTION_API_KEY=your_notion_api_key
   NOTION_DATABASE_ID=your_database_id
   SOURCE_PAGE_ID=your_source_page_id

   # AI API Keys (for content enhancement)
   DEEPSEEK_API_KEY=your_deepseek_api_key
   GEMINI_API_KEY=your_gemini_api_key

   # DashScope API (for image generation)
   DASHSCOPE_API_KEY=your_dashscope_api_key

   # Cloudflare R2 Configuration (for image migration)
   R2_ACCOUNT_ID=your_r2_account_id
   R2_ACCESS_KEY_ID=your_r2_access_key_id
   R2_SECRET_ACCESS_KEY=your_r2_secret_access_key
   R2_BUCKET_NAME=your_bucket_name
   R2_PUBLIC_URL=your_r2_public_url_prefix
   ```

5. Test your connection:

   ```bash
   node test-connection.js
   ```

## Database Structure

The toolkit works with a database containing the following properties:

- `Title` (title): Title of the note
- `Excerpt` (rich_text): Short excerpt from the content
- `Date` (date): Publication date
- `Category` (select): Top-level category (Java, Python, etc.)
- `Published` (checkbox): Publication status
- `Slug` (rich_text): URL-friendly identifier
- `Image` (url): Featured image URL for the note
- `R2ImageUrl` (url): R2 storage URL for the image (added during migration)
- `ReadTime` (number): Estimated reading time in minutes
- `Original Page` (url): Link to the original Notion page
- `Last Edited` (date): When the note was last edited
- `Tags` (multi_select): Automatically generated tags based on content
- `Summary` (rich_text): AI-generated summary of the content

## Usage

### Database Migration

To migrate your technical notes into a structured database:

```bash
# Run migration with default settings
node notion-db-migration.js

# Run without clearing existing entries
node notion-db-migration.js --no-clear

# Run and clear existing entries first
node notion-db-migration.js --clear
```

### Database Updates

To update and enhance existing database entries:

```bash
# Process all entries
node notion-db-update.js

# Process a specific entry
node notion-db-update.js --entry <entry-id>
```

### Image Generation

To generate professional illustrations for your database entries:

```bash
# Run for all entries
node generate-images.js

# Test mode (generates a single image without updating the database)
node generate-images.js --test

# Process a single entry
node generate-images.js --single-entry <entry-id>

# Set batch size for processing
node generate-images.js --batch-size 10

# Set delay between batches (in milliseconds)
node generate-images.js --delay 5000

# Display image generation statistics
node generate-images.js --stats

# Reset entries that were interrupted during processing
node generate-images.js --reset-pending

# Clean up the mapping file by removing duplicates
node generate-images.js --clean-mapping
```

### Image Migration to Cloudflare R2

This process migrates images from Notion's URLs to publicly accessible Cloudflare R2 URLs, which is necessary because Notion's image URLs are designed for file download rather than web display.

#### Step 1: Add the R2ImageUrl Property

Run the following script to add the new `R2ImageUrl` property to your Notion database:

```bash
node add-r2-url-property.js
```

This will add a URL-type property called `R2ImageUrl` to your database. The script is safe to run multiple times as it checks if the property already exists before attempting to add it.

#### Step 2: Upload Images to R2

Run the following script to upload all images to R2 and update the Notion database:

```bash
node upload-images-to-r2.js
```

This script implements smart skipping logic to ensure efficiency:

- It skips entries where the image URL already points to an R2 bucket
- It skips entries that already have a valid R2ImageUrl property
- It ensures R2ImageUrl is properly set for all entries that need it

##### Options

- `--dry-run`: Test the process without making any changes
- `--entry <entry_id>`: Process only a specific entry
- `--delay <ms>`: Add a delay between processing entries (in milliseconds)

Example:

```bash
# Test run - no actual changes
node upload-images-to-r2.js --dry-run

# Process a specific entry
node upload-images-to-r2.js --entry 123456789

# Add a 2-second delay between entries
node upload-images-to-r2.js --delay 2000
```

#### Step 3: Verify the Migration

After running the script, verify that all entries have been migrated properly:

```bash
node verify-all-images.js
```

This script will:

- Check all entries in the database
- Identify entries with missing R2ImageUrl properties
- Provide a comprehensive report showing:
  - Total number of entries in the database
  - Entries with both Image and R2ImageUrl properties
  - Entries with Image but no R2ImageUrl
  - Entries with R2ImageUrl but no Image
  - Entries with neither Image nor R2ImageUrl

#### Step 4: Migrate Remaining Images (if needed)

If the verification script identifies entries without R2ImageUrl, run the remaining migration script:

```bash
node migrate-remaining-images.js
```

This script has intelligent processing logic that:

- Only processes entries that have an original Image URL but no R2ImageUrl
- Skips entries that already have an R2ImageUrl, even if it was added after verification
- Skips entries where the image was previously uploaded to R2
- Processes entries in batches to avoid overwhelming APIs

##### Options

- `--batch-size <number>`: Process entries in batches (default: 10)
- `--delay <ms>`: Add a delay between entries (default: 1000ms)
- `--limit <number>`: Only process a specific number of entries (useful for testing)

Example:

```bash
# Process in smaller batches with a longer delay
node migrate-remaining-images.js --batch-size 5 --delay 2000

# Test with only 10 entries
node migrate-remaining-images.js --limit 10
```

#### Step 5: Final Verification

Run the verification script again to ensure all entries now have R2ImageUrl:

```bash
node verify-all-images.js
```

This should report that all entries have both Image and R2ImageUrl properties.

## Advanced Features

### Image Generation Process

The image generation tool uses a structured prompt formula for consistent, high-quality results:

1. **Subject Description**: The main concept to visualize
2. **Scene Description**: The environment and context
3. **Style Definition**: The artistic style for the illustration
4. **Camera Language**: Perspective and composition details
5. **Lighting Setup**: How the scene is illuminated
6. **Atmosphere Words**: The mood and feeling of the image
7. **Detail Modifiers**: Specific elements to include
8. **Technical Parameters**: Quality and rendering specifications

### JSON Mapping for Image Generation

The image generation tool creates a JSON mapping file (`image-mapping.json`) that tracks:

- Which entries have had images generated
- The status of each generation attempt (success, failed, pending, etc.)
- The URL of each generated image
- Timestamps for when images were generated

This mapping provides:

1. **Status Tracking**:

   - `success`: Image generated and added to Notion
   - `pending`: Image generation in progress
   - `failed`: Image generation failed
   - `skipped`: Entry has insufficient information
   - `error`: Error occurred during processing

2. **Resumable Operations**: If the script is interrupted, it automatically prioritizes entries that were in a "pending" state when restarted.

3. **Statistics**: Use the `--stats` option to view detailed statistics about the image generation process:

   ```plaintext
   === Image Generation Statistics ===
   Total entries: 120
   Successfully generated: 98 (82%)
   Failed: 5 (4%)
   Pending/Interrupted: 2 (2%)
   Skipped (no summary): 15 (13%)
   ================================
   ```

4. **Maintenance**: Use the `--clean-mapping` option to remove duplicate entries and ensure the mapping file is consistent.

### Image Storage Structure on R2

Images are stored in the R2 bucket with the following structure:

```
images/{uuid}.{extension}
```

Where:

- `{uuid}` is a randomly generated UUID to ensure uniqueness
- `{extension}` is determined from the image's content type

### R2 Image Metadata

Each image uploaded to R2 contains metadata that includes:

- Original URL (for reference)
- Content-Type (to ensure proper display)
- Cache-Control headers (set to cache for 1 year)

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

### Image Migration Issues

If some images weren't migrated:

1. Run the verification script to identify entries with missing R2ImageUrl:

   ```bash
   node verify-all-images.js
   ```

2. If there are entries missing R2ImageUrl, use the remainder migration script:

   ```bash
   node migrate-remaining-images.js
   ```

3. Run the verification script again to confirm all entries now have R2ImageUrl

### Image Generation Issues

If images aren't being generated properly:

1. Check that your DashScope API key is valid
2. Verify that entries have sufficient content for generating prompts
3. If generation was interrupted, use `--reset-pending` to retry pending entries
4. Check the mapping file for entries with "failed" or "error" status

### Image Upload Issues

If images fail to upload to R2, check:

- Your R2 credentials are correct in the `.env` file
- The R2 bucket exists and is accessible
- You have proper permissions to write to the bucket

### Notion API Issues

If Notion updates fail, check:

- Your Notion API key is valid
- The database ID is correct
- The integration has permission to modify the database

## Integration with Your Portfolio

After processing your Notion database, you can integrate it with your portfolio by:

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
      date: page.properties["Date"].date?.start,
      lastEdited: page.properties["Last Edited"].date?.start,
      tags: page.properties.Tags.multi_select.map((tag) => tag.name),
      url: page.properties["Original Page"].url || "",
      slug: page.properties.Slug.rich_text[0]?.plain_text || page.id,
      image:
        page.properties.R2ImageUrl.url || page.properties.Image.url || null,
    };
  });
}
```

## File Structure

- `notion-db-migration.js`: Main migration script
- `notion-db-update.js`: Script for enhancing database entries
- `generate-images.js`: Script for generating images for entries
- `add-r2-url-property.js`: Adds the R2ImageUrl property to Notion database
- `upload-images-to-r2.js`: Main script for the image migration process
- `verify-all-images.js`: Verifies all database entries have both Image and R2ImageUrl properties
- `migrate-remaining-images.js`: Migrates images for entries that have original Image but no R2ImageUrl
- `show-sample-entries.js`: Displays sample entries from the database for verification
- `test-dashscope.js`: Script for testing DashScope image generation
- `test-connection.js`: Script to test your Notion API connection
- `add-properties.js`: Script to add new properties to the database
- `.env`: Environment variables for your configuration
- `.env.example`: Example environment variables file

## License

MIT

## Author

This toolkit was created for portfolio integration of Notion technical notes.
