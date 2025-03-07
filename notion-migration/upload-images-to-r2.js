/**
 * Upload Images to Cloudflare R2
 *
 * This script:
 * 1. Fetches all entries from the Notion database
 * 2. For each entry with an image, downloads it and uploads to Cloudflare R2
 * 3. Updates the entry with the new public R2 URL
 *
 * Usage:
 * - Run for all entries: node upload-images-to-r2.js
 * - Run for specific entry: node upload-images-to-r2.js --entry [entry_id]
 * - Test run (no updates): node upload-images-to-r2.js --dry-run
 *
 * Environment variables (in .env file):
 * - NOTION_API_KEY: Your Notion API key
 * - NOTION_DATABASE_ID: ID of the target database
 * - R2_ACCOUNT_ID: Cloudflare account ID
 * - R2_ACCESS_KEY_ID: R2 access key ID
 * - R2_SECRET_ACCESS_KEY: R2 secret access key
 * - R2_BUCKET_NAME: R2 bucket name
 * - R2_PUBLIC_URL: Public URL prefix for the R2 bucket
 */

require('dotenv').config();
const { Client } = require('@notionhq/client');
const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const axios = require('axios');
const path = require('path');
const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');
const mime = require('mime-types');
const minimist = require('minimist');

// Parse command line arguments
const args = minimist(process.argv.slice(2), {
  boolean: ['dry-run'],
  string: ['entry'],
  alias: {
    d: 'dry-run',
    e: 'entry',
  },
});

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

// Initialize S3 client for R2
const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

// Configuration
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME;
const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL;

// Temporary directory for downloaded images
const TEMP_DIR = path.join(__dirname, 'temp');

/**
 * Ensure temporary directory exists
 */
async function ensureTempDir() {
  try {
    await fs.mkdir(TEMP_DIR, { recursive: true });
  } catch (error) {
    console.error(`Error creating temp directory: ${error.message}`);
    throw error;
  }
}

/**
 * Download an image from a URL
 * @param {string} url - The URL of the image to download
 * @returns {Promise<{buffer: Buffer, contentType: string}>} The image buffer and content type
 */
async function downloadImage(url) {
  try {
    console.log(`Downloading image from ${url}`);
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const contentType = response.headers['content-type'];
    return {
      buffer: Buffer.from(response.data),
      contentType,
    };
  } catch (error) {
    console.error(`Error downloading image: ${error.message}`);
    throw error;
  }
}

/**
 * Upload an image to Cloudflare R2
 * @param {Buffer} buffer - The image buffer
 * @param {string} contentType - The content type of the image
 * @param {string} originalUrl - The original URL of the image
 * @returns {Promise<string>} The public URL of the uploaded image
 */
async function uploadImageToR2(buffer, contentType, originalUrl) {
  try {
    // Generate a unique key for the image
    const fileExtension = mime.extension(contentType) || 'jpg';
    const key = `images/${uuidv4()}.${fileExtension}`;

    console.log(`Uploading image to R2 with key: ${key}`);

    // Upload the image to R2
    await s3.send(
      new PutObjectCommand({
        Bucket: R2_BUCKET_NAME,
        Key: key,
        Body: buffer,
        ContentType: contentType,
        Metadata: {
          originalUrl: originalUrl,
        },
        CacheControl: 'public, max-age=31536000', // Cache for 1 year
      })
    );

    // Get the object URL from R2
    const publicUrl = `${R2_PUBLIC_URL}/${key}`;

    // Verify the object exists by attempting to get its metadata
    try {
      await s3.send(
        new GetObjectCommand({
          Bucket: R2_BUCKET_NAME,
          Key: key,
        })
      );
      console.log(`Successfully verified object exists in R2: ${key}`);
    } catch (error) {
      console.error(`Error verifying uploaded object: ${error.message}`);
      throw new Error(`Failed to verify uploaded object: ${error.message}`);
    }

    return publicUrl;
  } catch (error) {
    console.error(`Error uploading image to R2: ${error.message}`);
    throw error;
  }
}

/**
 * Check if an image URL is already in R2
 * @param {string} url - The URL to check
 * @returns {Promise<boolean>} True if the URL is already in R2
 */
async function isImageUrlFromR2(url) {
  // Check if the URL starts with the R2 public URL prefix
  return url && url.startsWith(R2_PUBLIC_URL);
}

/**
 * Get all database entries
 * @returns {Promise<Array>} The database entries
 */
async function getDatabaseEntries() {
  try {
    console.log(`Fetching entries from database ${NOTION_DATABASE_ID}`);

    // If a specific entry ID is provided, only fetch that entry
    if (args.entry) {
      console.log(`Fetching specific entry: ${args.entry}`);
      const response = await notion.pages.retrieve({
        page_id: args.entry,
      });
      return [response];
    }

    // Otherwise fetch all entries with pagination
    let allEntries = [];
    let hasMore = true;
    let startCursor = undefined;

    while (hasMore) {
      console.log('Fetching batch of entries...');
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
        console.log('More entries available, continuing...');
      }
    }

    console.log(`Found ${allEntries.length} total entries`);
    return allEntries;
  } catch (error) {
    console.error(`Error fetching database entries: ${error.message}`);
    throw error;
  }
}

/**
 * Get the image URL from the Notion image property
 * @param {Object} properties - The properties of the Notion entry
 * @returns {string|null} The image URL or null if not found
 */
function getImageUrl(properties) {
  // Check if Image property exists as a URL type
  if (properties.Image?.type === 'url' && properties.Image?.url) {
    return properties.Image.url;
  }

  // Check if Image exists as files property (original format)
  if (properties.Image?.files && properties.Image.files[0]) {
    // Check for external URL
    if (properties.Image.files[0]?.external?.url) {
      return properties.Image.files[0].external.url;
    }

    // Check for Notion hosted file
    if (properties.Image.files[0]?.file?.url) {
      return properties.Image.files[0].file.url;
    }
  }

  return null;
}

/**
 * Update a Notion database entry with the R2 public URL
 * @param {string} pageId - The ID of the page to update
 * @param {string} publicUrl - The public URL of the image in R2
 * @returns {Promise<Object>} The updated entry
 */
async function updateNotionWithR2Url(pageId, publicUrl) {
  try {
    if (args['dry-run']) {
      console.log(`[DRY RUN] Would update Notion entry ${pageId} with R2 URL: ${publicUrl}`);
      return null;
    }

    console.log(`Updating Notion entry ${pageId} with R2 URL: ${publicUrl}`);

    // Update the entry with the new R2 URL
    const response = await notion.pages.update({
      page_id: pageId,
      properties: {
        R2ImageUrl: {
          type: 'url',
          url: publicUrl,
        },
      },
    });

    return response;
  } catch (error) {
    console.error(`Error updating Notion entry: ${error.message}`);
    throw error;
  }
}

/**
 * Process a single Notion entry
 * @param {Object} entry - The Notion entry to process
 */
async function processEntry(entry) {
  try {
    const imageUrl = getImageUrl(entry.properties);

    if (!imageUrl) {
      console.log(`No image found for entry ${entry.id}`);
      return;
    }

    // First check if the image is already from R2
    if (await isImageUrlFromR2(imageUrl)) {
      console.log(`Entry ${entry.id} already has an image in R2: ${imageUrl}`);

      // Make sure the R2ImageUrl property is set to the R2 URL
      if (!entry.properties.R2ImageUrl?.url || entry.properties.R2ImageUrl.url !== imageUrl) {
        await updateNotionWithR2Url(entry.id, imageUrl);
        console.log(`Updated R2ImageUrl property for entry ${entry.id}`);
      } else {
        console.log(`R2ImageUrl property already set correctly for entry ${entry.id}`);
      }

      return;
    }

    // Skip if already has an R2ImageUrl pointing to R2
    if (
      entry.properties.R2ImageUrl?.url &&
      (await isImageUrlFromR2(entry.properties.R2ImageUrl.url))
    ) {
      console.log(
        `Entry ${entry.id} already has an R2ImageUrl: ${entry.properties.R2ImageUrl.url}`
      );
      return;
    }

    console.log(`Processing entry ${entry.id} with image URL: ${imageUrl}`);

    // Download the image
    const { buffer, contentType } = await downloadImage(imageUrl);

    // Upload to R2
    const publicUrl = await uploadImageToR2(buffer, contentType, imageUrl);

    // Update Notion
    await updateNotionWithR2Url(entry.id, publicUrl);

    console.log(`Successfully processed entry ${entry.id}`);
  } catch (error) {
    console.error(`Error processing entry ${entry.id}: ${error.message}`);
  }
}

/**
 * Main function
 */
async function main() {
  try {
    console.log('Starting image upload to R2...');

    if (args['dry-run']) {
      console.log('Running in DRY RUN mode - no actual updates will be made');
    }

    // Ensure temp directory exists
    await ensureTempDir();

    // Get all entries
    const entries = await getDatabaseEntries();

    // Process each entry
    console.log(`Processing ${entries.length} entries`);
    for (const entry of entries) {
      await processEntry(entry);
    }

    console.log('Process completed successfully');
  } catch (error) {
    console.error(`Error in main process: ${error.message}`);
    process.exit(1);
  } finally {
    // Clean up temporary files
    try {
      await fs.rm(TEMP_DIR, { recursive: true, force: true });
    } catch (error) {
      console.warn(`Warning: Failed to clean up temp directory: ${error.message}`);
    }
  }
}

// Run the main function
main();
