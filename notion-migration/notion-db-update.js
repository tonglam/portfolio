/**
 * Notion Database Update Tool
 *
 * This script updates existing entries in a Notion database with:
 * - AI-generated summaries using DeepSeek API
 * - Estimated reading time using DeepSeek API
 *
 * Usage:
 * - Run with default options: node notion-db-update.js
 * - Run for a single entry (for testing): node notion-db-update.js --single-entry [entryId]
 * - Run with batch size: node notion-db-update.js --batch-size 5
 * - Run with delay: node notion-db-update.js --delay 400
 *
 * Environment variables (in .env file):
 * - NOTION_API_KEY: Your Notion API key
 * - NOTION_DATABASE_ID: ID of the target database
 * - DEEPSEEK_API_KEY: Your DeepSeek API key
 *
 * @version 1.0.0
 */

// Import required dependencies
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const { Client } = require('@notionhq/client');
const fs = require('fs');
const { OpenAI } = require('openai'); // Add OpenAI client for DeepSeek API

// Get command line arguments
const args = process.argv.slice(2);
const isSingleEntry = args.includes('--single-entry');
const singleEntryId = isSingleEntry ? args[args.indexOf('--single-entry') + 1] : null;
const batchSize = args.includes('--batch-size')
  ? parseInt(args[args.indexOf('--batch-size') + 1], 10)
  : 5;
const delayBetweenBatches = args.includes('--delay')
  ? parseInt(args[args.indexOf('--delay') + 1], 10)
  : 1000;

// Read environment variables directly from the file to avoid conflicts with parent .env
let envConfig = {};
if (fs.existsSync(path.resolve(__dirname, '.env'))) {
  const envFile = fs.readFileSync(path.resolve(__dirname, '.env'), 'utf8');
  envFile.split('\n').forEach(line => {
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
const DATABASE_ID = envConfig.NOTION_DATABASE_ID || process.env.NOTION_DATABASE_ID;
const DEEPSEEK_API_KEY = envConfig.DEEPSEEK_API_KEY || process.env.DEEPSEEK_API_KEY;

// Log what we're using
console.log('Using configuration:');
console.log(
  `NOTION_API_KEY: ${
    NOTION_API_KEY
      ? NOTION_API_KEY.substring(0, 4) + '...' + NOTION_API_KEY.substring(NOTION_API_KEY.length - 4)
      : 'Missing'
  }`
);
console.log(`DATABASE_ID: ${DATABASE_ID || 'Missing'}`);
console.log(`DEEPSEEK_API_KEY: ${DEEPSEEK_API_KEY ? 'Found (not shown)' : 'Missing'}`);

// Check for required environment variables
if (!NOTION_API_KEY || !DATABASE_ID || !DEEPSEEK_API_KEY) {
  console.error('Error: Required environment variables are missing.');
  console.error(
    'Please ensure NOTION_API_KEY, NOTION_DATABASE_ID, and DEEPSEEK_API_KEY are set in your .env file.'
  );
  process.exit(1);
}

// Initialize the Notion client
const notion = new Client({ auth: NOTION_API_KEY });

// Initialize DeepSeek client using OpenAI SDK
const deepseekClient = new OpenAI({
  apiKey: DEEPSEEK_API_KEY,
  baseURL: 'https://api.deepseek.com',
});

/**
 * Delay execution for the specified number of milliseconds
 * @param {number} ms - Milliseconds to delay
 * @returns {Promise<void>}
 */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Call an API function with retry logic
 * @param {Function} apiCall - The API function to call
 * @param {number} maxRetries - Maximum number of retries
 * @param {number} baseDelay - Base delay in milliseconds
 * @returns {Promise<any>} - The API response
 */
async function callWithRetry(apiCall, maxRetries = 5, baseDelay = 1500) {
  let lastError;
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await apiCall();
    } catch (error) {
      lastError = error;

      // Log the error
      console.error(`Error (attempt ${attempt + 1}/${maxRetries}):`, error.message);

      // Check if the error is a rate limit error
      if (error.status === 429) {
        console.log('Rate limit exceeded. Waiting longer before retry...');
        await delay(baseDelay * Math.pow(2, attempt) + Math.random() * 1000);
      } else {
        // For other errors, use a smaller backoff
        await delay((baseDelay / 2) * Math.pow(1.5, attempt) + Math.random() * 500);
      }
    }
  }

  throw lastError;
}

/**
 * Query all entries from the Notion database
 * @returns {Promise<Array>} Array of database entries
 */
async function queryAllDatabaseEntries() {
  let allEntries = [];
  let hasMore = true;
  let cursor = undefined;

  while (hasMore) {
    const response = await callWithRetry(() =>
      notion.databases.query({
        database_id: DATABASE_ID,
        start_cursor: cursor,
        page_size: 100,
      })
    );

    allEntries = [...allEntries, ...response.results];
    hasMore = response.has_more;
    cursor = response.next_cursor;
  }

  return allEntries;
}

/**
 * Extract plain text content from rich text property
 * @param {Array} richTextArray - Array of rich text objects
 * @returns {string} Plain text content
 */
function extractRichText(richTextArray) {
  if (!richTextArray || richTextArray.length === 0) return '';
  return richTextArray.map(rt => rt.plain_text || rt.text?.content || '').join('');
}

/**
 * Generate a summary using DeepSeek API with OpenAI client
 * @param {string} content - The content to summarize
 * @returns {Promise<string>} The generated summary
 */
async function generateSummaryWithDeepSeek(content) {
  try {
    const response = await deepseekClient.chat.completions.create({
      model: 'deepseek-reasoner',
      messages: [
        {
          role: 'user',
          content: `You are an expert summarizer. Your task is to create concise, informative summaries that capture the key points of technical articles. Please provide a concise summary (maximum 3 sentences) of the following technical article. Highlight the key technologies, concepts, and takeaways. Do NOT include "Summary:" or any other prefix in your response, just provide the summary directly:\n\n${content}`,
        },
      ],
      temperature: 0.2,
    });

    // Log only the content from the message
    console.log('DeepSeek Summary: ', response.choices[0].message.content.trim());

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error generating summary with DeepSeek:', error.message);
    return 'Summary generation failed. Please try again later.';
  }
}

/**
 * Estimate reading time using DeepSeek API with OpenAI client
 * @param {string} content - The content to analyze
 * @returns {Promise<number>} The estimated reading time in minutes
 */
async function estimateReadingTimeWithDeepSeek(content) {
  try {
    // Extract information about images, PDFs or other materials mentioned in the content
    const imageMatches = content.match(/\.(jpg|jpeg|png|gif|svg|webp)/gi) || [];
    const pdfMatches = content.match(/\.pdf/gi) || [];

    // Count how many images and PDFs are referenced
    const imageCount = imageMatches.length;
    const pdfCount = pdfMatches.length;

    // Add this information to the prompt
    const materialInfo = `The content contains approximately ${imageCount} images and ${pdfCount} PDF references. When estimating reading time, please account for the additional time needed to view images (approximately 10-15 seconds per image) and skim referenced PDFs (approximately 1-2 minutes per PDF).`;

    const response = await deepseekClient.chat.completions.create({
      model: 'deepseek-reasoner',
      messages: [
        {
          role: 'user',
          content: `You are an expert at estimating reading time for technical articles. Provide accurate estimates in minutes based on content length, complexity, and all materials included.

${materialInfo}

Please estimate how many minutes it would take an average reader to read the following technical article including time to view all materials. Return ONLY a number (no text, just the integer number of minutes):\n\n${content}`,
        },
      ],
      temperature: 0.1,
    });

    // Log only the content from the message
    console.log('DeepSeek Reading Time: ', response.choices[0].message.content.trim());

    const result = response.choices[0].message.content.trim();
    const minutes = parseInt(result, 10);

    // Multiply the estimate by 3 to better reflect actual human reading speed
    const adjustedMinutes = isNaN(minutes) ? 5 : minutes * 3;
    console.log(`Adjusted Reading Time (3x): ${adjustedMinutes} minutes`);

    return adjustedMinutes; // Return the adjusted reading time
  } catch (error) {
    console.error('Error estimating reading time with DeepSeek:', error.message);
    return 15; // Default to 15 minutes on error (3x the original 5 minute default)
  }
}

/**
 * Update a Notion database entry with AI-generated content
 * @param {Object} entry - The database entry to update
 * @returns {Promise<Object>} The updated entry
 */
async function updateEntryWithAIContent(entry) {
  try {
    console.log(`Processing entry: ${entry.id}`);

    // Extract existing properties
    const properties = entry.properties;
    const title = properties.Title?.title?.[0]?.text?.content || 'Untitled';
    const contentProperty = properties.Content || properties.Excerpt;
    const content = contentProperty?.rich_text ? extractRichText(contentProperty.rich_text) : '';

    console.log(`- Title: ${title}`);

    // Generate a summary using DeepSeek
    console.log('- Generating summary...');
    let summary = '';
    if (content) {
      summary = await callWithRetry(() => generateSummaryWithDeepSeek(content));
    } else {
      summary = 'No content available for this entry.';
    }

    // Estimate reading time using DeepSeek
    console.log('- Estimating reading time...');
    let readingTime = 1;
    if (content) {
      readingTime = await callWithRetry(() => estimateReadingTimeWithDeepSeek(content));
    }

    // Update the entry in Notion
    const updateData = {
      properties: {
        Summary: {
          rich_text: [
            {
              text: {
                content: summary.substring(0, 2000), // Notion has a max length
              },
            },
          ],
        },
        'Mins Read': {
          number: readingTime,
        },
      },
    };

    await notion.pages.update({
      page_id: entry.id,
      ...updateData,
    });

    console.log(`✓ Successfully updated entry: ${title}`);
    return entry;
  } catch (error) {
    console.error(`✗ Failed to update entry: ${error.message}`);
    throw error;
  }
}

/**
 * Main function to update database entries
 */
async function updateDatabaseEntries() {
  try {
    console.log('Starting Notion database update...');

    // Get entries from database
    let entries;
    if (isSingleEntry && singleEntryId) {
      console.log(`Getting single entry with ID: ${singleEntryId}`);
      try {
        const page = await callWithRetry(() => notion.pages.retrieve({ page_id: singleEntryId }));
        entries = [page];
      } catch (error) {
        console.error(`Error retrieving single entry: ${error.message}`);
        process.exit(1);
      }
    } else {
      console.log('Querying all database entries...');
      entries = await queryAllDatabaseEntries();
      console.log(`Found ${entries.length} entries in the database.`);
    }

    // Process entries in batches
    let totalProcessed = 0;
    let totalSuccess = 0;
    let totalFailures = 0;

    for (let i = 0; i < entries.length; i += batchSize) {
      const batch = entries.slice(i, i + batchSize);
      const batchNumber = Math.floor(i / batchSize) + 1;
      const totalBatches = Math.ceil(entries.length / batchSize);
      const percentComplete = Math.floor((i / entries.length) * 100);

      console.log(
        `\nProcessing batch ${batchNumber}/${totalBatches} (${percentComplete}% complete)`
      );

      // Process each entry in the batch
      const results = await Promise.allSettled(batch.map(entry => updateEntryWithAIContent(entry)));

      // Count successes and failures
      results.forEach(result => {
        if (result.status === 'fulfilled' && result.value) {
          totalSuccess++;
        } else {
          totalFailures++;
        }
        totalProcessed++;
      });

      // Log progress after each batch
      console.log(`Progress: ${totalProcessed}/${entries.length} entries processed`);
      console.log(`Success: ${totalSuccess}, Failures: ${totalFailures}`);

      // Add delay between batches
      if (i + batchSize < entries.length) {
        console.log(`Batch complete. Waiting ${delayBetweenBatches}ms before next batch...`);
        await delay(delayBetweenBatches);
      }
    }

    // Log final statistics
    console.log('\nUpdate complete!');
    console.log(`Total entries processed: ${totalProcessed}`);
    console.log(`Successfully updated: ${totalSuccess}`);
    console.log(`Failed updates: ${totalFailures}`);
  } catch (error) {
    console.error('Error updating database entries:', error);
  }
}

// Run the update
updateDatabaseEntries().catch(console.error);
