/**
 * Notion Technical Notes Migration Tool
 *
 * This script migrates technical notes from a Notion page to a Notion database.
 * It extracts content, categories, tags, and other metadata from the source page
 * and creates entries in the target database.
 *
 * Features:
 * - Two-phase approach to reduce API calls and handle rate limiting
 * - Respects Notion API rate limit (3 requests per second average)
 * - Identifies top-level categories (Java, Python, JavaScript, etc.)
 * - Processes pages recursively, preserving the category structure
 * - Extracts content, generates excerpts, and identifies tags
 * - Preserves original creation and last edited dates
 * - Extracts images from pages when available
 * - Generates unique slugs for each page
 * - Calculates estimated read time
 *
 * Usage:
 * - Run with default options: node notion-db-migration.js
 * - Run without clearing database: node notion-db-migration.js --no-clear
 * - Run with a limit: node notion-db-migration.js --limit 10
 * - Run with batch size: node notion-db-migration.js --batch-size 5
 * - Run with delay: node notion-db-migration.js --delay 400
 *
 * Environment variables (in .env file):
 * - NOTION_API_KEY: Your Notion API key
 * - SOURCE_PAGE_ID: ID of the source page containing technical notes
 * - NOTION_DATABASE_ID: ID of the target database
 *
 * @version 2.1.0
 */

// Check for required dependencies and load environment variables
require('dotenv').config();

// Get environment variables
const NOTION_API_KEY = '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'; // process.env.NOTION_API_KEY;
const SOURCE_PAGE_ID = 'd5e4e5143d2c4a6fa8ca3ab2f162c22c'; // process.env.SOURCE_PAGE_ID;
const DATABASE_ID = '1ab7ef86-a5ad-81ab-a4cb-f8b8f37ec491'; // process.env.NOTION_DATABASE_ID;

if (!NOTION_API_KEY || !SOURCE_PAGE_ID || !DATABASE_ID) {
  console.error('Error: Required environment variables are missing.');
  console.error(
    'Please ensure NOTION_API_KEY, SOURCE_PAGE_ID, and NOTION_DATABASE_ID are set in your .env file.'
  );
  process.exit(1);
}

// Initialize the Notion client
const { Client } = require('@notionhq/client');
const notion = new Client({ auth: NOTION_API_KEY });

console.log('Using configuration:');
console.log(`- SOURCE_PAGE_ID: ${SOURCE_PAGE_ID}`);
console.log(`- DATABASE_ID: ${DATABASE_ID}`);

/**
 * Utility function to introduce delay
 * @param {number} ms - Milliseconds to delay
 * @returns {Promise<void>}
 */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Call a Notion API function with retry logic for rate limits
 * @param {Function} apiCall - Function to call
 * @param {number} maxRetries - Maximum number of retries
 * @param {number} baseDelay - Base delay in milliseconds
 * @returns {Promise<any>} - Result of the API call
 */
async function callWithRetry(apiCall, maxRetries = 5, baseDelay = 1500) {
  let lastError;
  let retryDelay = baseDelay;

  for (let retryCount = 0; retryCount <= maxRetries; retryCount++) {
    try {
      return await apiCall();
    } catch (error) {
      lastError = error;

      // Check if this is a rate limiting error
      if (error.code === 'rate_limited' || (error.status && error.status === 429)) {
        // If we have a retry-after header, use that value, otherwise use exponential backoff
        const retryAfter = error.headers?.['retry-after'];
        const waitTime = retryAfter
          ? parseInt(retryAfter, 10) * 1000
          : retryDelay * Math.pow(1.5, retryCount);

        console.log(
          `Rate limited. Waiting ${Math.round(
            waitTime / 1000
          )} seconds before retry ${retryCount + 1}/${maxRetries}...`
        );
        await delay(waitTime);

        // Increase base delay for subsequent requests to prevent hitting limits again
        retryDelay = Math.min(retryDelay * 1.5, 10000); // Cap at 10 seconds
      } else {
        // If it's not a rate limit error, rethrow immediately
        throw error;
      }
    }
  }

  // If we've exhausted all retries
  console.error(`Failed after ${maxRetries} retries. Last error:`, lastError);
  throw lastError;
}

/**
 * Checks if a page has meaningful content beyond just structural blocks
 */
async function hasActualContent(pageId) {
  try {
    // Get all blocks from the page
    const response = await callWithRetry(() =>
      notion.blocks.children.list({
        block_id: pageId,
        page_size: 100,
      })
    );

    // Check if there are any content blocks (paragraphs, headings, lists, etc.)
    const contentBlocks = response.results.filter(block => {
      const blockType = block.type;
      // Consider these block types as meaningful content
      return [
        'paragraph',
        'heading_1',
        'heading_2',
        'heading_3',
        'bulleted_list_item',
        'numbered_list_item',
        'to_do',
        'toggle',
        'code',
        'quote',
        'callout',
        'image',
      ].includes(blockType);
    });

    // Check if any of the content blocks have actual text content
    for (const block of contentBlocks) {
      const blockType = block.type;

      // Check if the block has text content
      if (block[blockType] && block[blockType].rich_text && block[blockType].rich_text.length > 0) {
        // Look for actual text content (not just whitespace)
        const textContent = block[blockType].rich_text
          .map(rt => rt.plain_text || '')
          .join('')
          .trim();

        if (textContent.length > 0) {
          return true;
        }
      }

      // Images are considered content even without text
      if (blockType === 'image') {
        return true;
      }
    }

    // No meaningful content found
    return false;
  } catch (error) {
    console.error(`Error checking content for page ${pageId}:`, error);
    return false;
  }
}

/**
 * Extract text from rich text array
 * @param {Array} richTextArray - Array of rich text objects
 * @returns {string} - The extracted text
 */
function extractRichText(richTextArray) {
  if (!richTextArray || richTextArray.length === 0) {
    return '';
  }

  return richTextArray.map(richText => richText.plain_text || '').join('');
}

/**
 * Extract text content from a page
 * @param {string} blockId - The ID of the block to extract content from
 * @param {number} maxDepth - Maximum depth to traverse
 * @param {number} currentDepth - Current depth level
 * @returns {Promise<string>} - The extracted text content
 */
async function extractTextContent(blockId, maxDepth = 3, currentDepth = 0) {
  // Limit recursion depth
  if (currentDepth > maxDepth) return '';

  try {
    const response = await callWithRetry(() =>
      notion.blocks.children.list({
        block_id: blockId,
        page_size: 100,
      })
    );

    if (!response.results || response.results.length === 0) {
      return '';
    }

    let content = '';

    for (const block of response.results) {
      // Skip child_page blocks as they are separate pages
      if (block.type === 'child_page') continue;

      // Extract text based on block type
      switch (block.type) {
        case 'paragraph':
          content += extractRichText(block.paragraph.rich_text) + '\n\n';
          break;
        case 'heading_1':
          content += '# ' + extractRichText(block.heading_1.rich_text) + '\n\n';
          break;
        case 'heading_2':
          content += '## ' + extractRichText(block.heading_2.rich_text) + '\n\n';
          break;
        case 'heading_3':
          content += '### ' + extractRichText(block.heading_3.rich_text) + '\n\n';
          break;
        case 'bulleted_list_item':
          content += '• ' + extractRichText(block.bulleted_list_item.rich_text) + '\n';
          break;
        case 'numbered_list_item':
          content += '1. ' + extractRichText(block.numbered_list_item.rich_text) + '\n';
          break;
        case 'to_do':
          const checkbox = block.to_do.checked ? '[x]' : '[ ]';
          content += checkbox + ' ' + extractRichText(block.to_do.rich_text) + '\n';
          break;
        case 'toggle':
          content += extractRichText(block.toggle.rich_text) + '\n';
          break;
        case 'code':
          content += '```' + (block.code.language || '') + '\n';
          content += extractRichText(block.code.rich_text) + '\n';
          content += '```\n\n';
          break;
        case 'quote':
          content += '> ' + extractRichText(block.quote.rich_text) + '\n\n';
          break;
        case 'callout':
          content += '📌 ' + extractRichText(block.callout.rich_text) + '\n\n';
          break;
        case 'divider':
          content += '---\n\n';
          break;
        case 'image':
          let imageUrl = '';
          if (block.image.type === 'external') {
            imageUrl = block.image.external.url;
          } else if (block.image.type === 'file') {
            imageUrl = block.image.file.url;
          }

          const altText =
            block.image.caption && block.image.caption.length > 0
              ? extractRichText(block.image.caption)
              : 'Image';
          content += `![${altText}](${imageUrl})\n\n`;
          break;
      }

      // Recursively extract content from children if the block has children
      if (block.has_children) {
        const childContent = await extractTextContent(block.id, maxDepth, currentDepth + 1);
        content += childContent;
      }
    }

    return content;
  } catch (error) {
    console.error(`Error extracting text content from block ${blockId}: ${error.message}`);
    return '';
  }
}

/**
 * Extract tags from content, title, and category
 * @param {string} content - The content to extract tags from
 * @param {string} title - The title of the page
 * @param {string} category - The category of the page
 * @returns {string[]} - Array of extracted tags
 */
function extractTags(content, title, category) {
  const tags = [];

  // Always include the category as a tag if it exists and isn't empty
  if (category && category.trim() !== '') {
    // For MIT Units prefixed with CITS, add both versions as tags
    if (category.startsWith('CITS')) {
      tags.push(category); // Add with CITS prefix
      tags.push(category.substring(4)); // Add without CITS prefix
    } else {
      tags.push(category);
    }
  }

  // Add the title as a tag for non-category pages (if it's not already the category)
  if (title && title !== category && !title.endsWith('Notes')) {
    // For MIT Units prefixed with CITS, use without the prefix for the tag
    if (title.startsWith('CITS')) {
      tags.push(title.substring(4)); // Add without CITS prefix
    } else {
      tags.push(title);
    }
  }

  // Extract hashtags from content
  if (content) {
    const hashtagRegex = /#(\w+)/g;
    let match;
    while ((match = hashtagRegex.exec(content)) !== null) {
      const tag = match[1];
      if (tag && !tags.includes(tag)) {
        tags.push(tag);
      }
    }
  }

  // Remove duplicates and filter out tags with commas
  return Array.from(new Set(tags)).filter(tag => !tag.includes(','));
}

/**
 * Generate an excerpt from the content
 * @param {string} content - The content to generate an excerpt from
 * @param {maxLength} maxLength - Maximum length of the excerpt
 * @returns {string} - The generated excerpt
 */
function generateExcerpt(content, maxLength = 160) {
  if (!content) return '...';

  // Clean up content - remove extra spaces, newlines, etc.
  const cleanContent = content.replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim();

  // If content is short enough, use it directly
  if (cleanContent.length <= maxLength) {
    return cleanContent;
  }

  // Look for a good breaking point (sentence or paragraph)
  let excerpt = cleanContent.substring(0, maxLength);

  // Try to find a natural breaking point
  const lastPeriod = excerpt.lastIndexOf('.');
  const lastQuestion = excerpt.lastIndexOf('?');
  const lastExclamation = excerpt.lastIndexOf('!');

  // Find the last sentence ending
  const lastSentenceEnd = Math.max(lastPeriod, lastQuestion, lastExclamation);

  if (lastSentenceEnd > maxLength * 0.5) {
    // If we found a sentence end that's at least halfway through, use it
    excerpt = cleanContent.substring(0, lastSentenceEnd + 1);
  } else {
    // Otherwise try to end at a word boundary
    const lastSpace = excerpt.lastIndexOf(' ');
    if (lastSpace > 0) {
      excerpt = excerpt.substring(0, lastSpace);
    }
    excerpt += '...';
  }

  // Remove any lingering image markers
  excerpt = excerpt.replace(/!Image/g, '').trim();

  return excerpt;
}

/**
 * Extract the first image URL from a page
 * @param {string} pageId - The ID of the page
 * @returns {Promise<string|null>} - The URL of the first image or null if none found
 */
async function extractFirstImage(pageId) {
  try {
    // First, check if the page has a cover image
    const pageResponse = await callWithRetry(() => notion.pages.retrieve({ page_id: pageId }));

    if (pageResponse.cover) {
      if (pageResponse.cover.type === 'external') {
        return pageResponse.cover.external.url;
      } else if (pageResponse.cover.type === 'file') {
        return pageResponse.cover.file.url;
      }
    }

    // If no cover image, look for the first image in the content
    const blocks = await callWithRetry(() =>
      notion.blocks.children.list({
        block_id: pageId,
        page_size: 100,
      })
    );

    for (const block of blocks.results) {
      if (block.type === 'image') {
        if (block.image.type === 'external') {
          return block.image.external.url;
        } else if (block.image.type === 'file') {
          return block.image.file.url;
        }
      }
    }

    // No image found
    return null;
  } catch (error) {
    console.error(`Error extracting image from ${pageId}:`, error.message);
    return null;
  }
}

/**
 * Query all entries in the Notion database
 * @param {NotionClient} client - The Notion client
 * @param {string} databaseId - The database ID
 * @returns {Promise<Array>} - Array of database entries
 */
async function queryAllDatabaseEntries(client, databaseId) {
  let allEntries = [];
  let hasMore = true;
  let startCursor = undefined;

  while (hasMore) {
    try {
      const response = await callWithRetry(() =>
        client.databases.query({
          database_id: databaseId,
          start_cursor: startCursor,
          page_size: 100, // Maximum allowed by Notion API
        })
      );

      allEntries = allEntries.concat(response.results);

      hasMore = response.has_more;
      startCursor = response.next_cursor;
    } catch (error) {
      console.error('Error querying database:', error.message);
      hasMore = false;
    }
  }

  return allEntries;
}

/**
 * PHASE 1: Collect all data from source Notion pages
 * This function efficiently gathers all pages and metadata in a single traversal
 * to minimize API calls.
 */
async function collectAllData(options = {}) {
  const { delayMs = 400 } = options; // Default to 400ms (safe for 3 req/sec limit)
  console.log(
    `[${new Date().toISOString()}] PHASE 1: Collecting all data from source Notion pages (delay: ${delayMs}ms)...`
  );
  console.log(`Rate limit: 3 requests per second average (Notion API limit)`);

  // Data structure to hold all collected information
  const collectedData = {
    validCategories: new Set(),
    allPages: [],
    metadataCache: new Map(), // Cache page metadata to avoid duplicate API calls
  };

  try {
    // Step 1: Get top-level categories
    console.log(
      `[${new Date().toISOString().split('T')[1].split('.')[0]}] Fetching top-level categories...`
    );
    const response = await callWithRetry(() =>
      notion.blocks.children.list({
        block_id: SOURCE_PAGE_ID,
        page_size: 100,
      })
    );

    const topLevelPages = response.results
      .filter(block => block.type === 'child_page')
      .map(block => ({
        id: block.id,
        title: block.child_page.title,
      }));

    console.log(`Found ${topLevelPages.length} top-level categories.`);

    // Add Technical Notes categories to valid categories set
    topLevelPages.forEach(page => {
      if (page.title !== 'MIT Units') {
        collectedData.validCategories.add(page.title);
      }
    });

    // Find MIT Units page ID for special handling
    const mitUnitsPage = topLevelPages.find(page => page.title === 'MIT Units');

    // Process MIT Units first to gather all valid categories
    if (mitUnitsPage) {
      console.log('Processing MIT Units to gather valid category names...');
      await delay(delayMs); // Add delay to avoid rate limiting

      const mitUnitsResponse = await callWithRetry(() =>
        notion.blocks.children.list({
          block_id: mitUnitsPage.id,
          page_size: 100,
        })
      );

      const mitUnitsSubpages = mitUnitsResponse.results
        .filter(block => block.type === 'child_page')
        .map(block => ({
          id: block.id,
          title: block.child_page.title,
          prefixedTitle: `CITS${block.child_page.title}`,
        }));

      // Add MIT Units subpages to valid categories with CITS prefix
      mitUnitsSubpages.forEach(page => {
        collectedData.validCategories.add(page.prefixedTitle);
      });

      console.log(`Added ${mitUnitsSubpages.length} MIT Units categories with CITS prefix.`);
    }

    console.log(`Valid categories (${collectedData.validCategories.size}):`);
    console.log([...collectedData.validCategories].join(', '));

    // Step 2: Recursively collect all pages and their data
    console.log('\nCollecting all pages recursively...');

    // Process each top-level category
    let categoryCounter = 0;
    for (const category of topLevelPages) {
      categoryCounter++;
      console.log(
        `\n[${
          new Date().toISOString().split('T')[1].split('.')[0]
        }] Processing top-level category: ${
          category.title
        } (${categoryCounter}/${topLevelPages.length})`
      );

      // Special handling for MIT Units
      if (category.title === 'MIT Units') {
        // Get MIT Units subpages
        const mitUnitsResponse = await callWithRetry(() =>
          notion.blocks.children.list({
            block_id: category.id,
            page_size: 100,
          })
        );

        // Process each MIT Units subpage
        for (const block of mitUnitsResponse.results) {
          if (block.type === 'child_page') {
            const subpageTitle = block.child_page.title;
            const prefixedTitle = `CITS${subpageTitle}`;

            console.log(`  Processing MIT Units subpage: ${subpageTitle} (${prefixedTitle})`);

            // Add this page to our collection
            collectedData.allPages.push({
              id: block.id,
              title: subpageTitle,
              prefixedTitle,
              category: prefixedTitle,
              parent: 'MIT Units',
              depth: 1,
              isTopLevel: false,
              isMITUnit: true,
            });

            // Process subpages recursively
            await collectSubpages(
              block.id,
              prefixedTitle,
              prefixedTitle,
              2, // Depth 2 for children of MIT Unit subpages
              false, // Not top level
              true, // Is MIT Unit
              collectedData,
              delayMs
            );
          }

          await delay(delayMs); // Add delay between processing siblings
        }
      } else {
        // For regular top-level categories
        // Add this top-level category as a page itself (if it has content)
        collectedData.allPages.push({
          id: category.id,
          title: category.title,
          category: category.title,
          parent: '',
          depth: 0,
          isTopLevel: true,
          isMITUnit: false,
        });

        // Process its subpages recursively
        await collectSubpages(
          category.id,
          category.title,
          category.title,
          1, // Depth 1 for children of top-level categories
          false, // Not top level
          false, // Not MIT Unit
          collectedData,
          delayMs
        );
      }
    }

    console.log(`\nCollection complete. Found ${collectedData.allPages.length} total pages.`);
    return collectedData;
  } catch (error) {
    console.error('Error collecting data:', error);
    throw error;
  }
}

/**
 * Helper function to recursively collect subpages
 * @param {string} parentId - The ID of the parent page
 * @param {string} parentTitle - The title of the parent page
 * @param {string} category - The category name for these subpages
 * @param {number} depth - The current depth in the hierarchy
 * @param {boolean} isTopLevel - Whether this is a top-level page
 * @param {boolean} isMITUnit - Whether this is part of MIT Units
 * @param {Object} collectedData - The data collection object
 * @param {number} delayMs - Delay between API calls in milliseconds
 */
async function collectSubpages(
  parentId,
  parentTitle,
  category,
  depth,
  isTopLevel,
  isMITUnit,
  collectedData,
  delayMs
) {
  try {
    console.log(
      `  [${
        new Date().toISOString().split('T')[1].split('.')[0]
      }] Collecting subpages for: ${parentTitle} (depth: ${depth})`
    );

    // Add delay to avoid rate limiting
    await delay(delayMs);
    console.log(`    Requesting children for: ${parentTitle}...`);

    // Get child blocks for this parent
    const response = await callWithRetry(() =>
      notion.blocks.children.list({
        block_id: parentId,
        page_size: 100,
      })
    );

    const childPages = response.results.filter(block => block.type === 'child_page');
    console.log(`    Found ${childPages.length} child pages for: ${parentTitle}`);

    // Process child pages
    let childCounter = 0;
    for (const block of response.results) {
      if (block.type === 'child_page') {
        childCounter++;
        const childTitle = block.child_page.title;
        const childId = block.id;

        console.log(`    [${childCounter}/${childPages.length}] Processing child: ${childTitle}`);

        // Add this page to our collection
        collectedData.allPages.push({
          id: childId,
          title: childTitle,
          category: category, // Inherit parent's category
          parent: parentTitle,
          depth,
          isTopLevel,
          isMITUnit,
        });

        // Process its subpages recursively
        await collectSubpages(
          childId,
          childTitle,
          category, // Keep the same category
          depth + 1,
          false, // Not top level
          isMITUnit,
          collectedData,
          delayMs
        );
      }

      // Add delay between processing siblings
      if (block.type === 'child_page') {
        console.log(`    Waiting ${delayMs}ms before processing next sibling...`);
        await delay(delayMs);
      }
    }

    console.log(`  Completed processing all children of: ${parentTitle}`);
  } catch (error) {
    console.error(`Error collecting subpages for ${parentTitle}:`, error);
    // Continue with other pages rather than failing the entire process
  }
}

/**
 * PHASE 2: Process collected data and create database entries
 * This function processes the data locally and creates database entries in batches
 * to minimize API calls and handle rate limiting.
 */
async function processAndCreateEntries(collectedData, options = {}) {
  const {
    batchSize = 5,
    delayBetweenBatches = 3000, // Increased to 3000ms
    limit = Infinity,
    clearDatabase = true,
  } = options;

  console.log('PHASE 2: Processing collected data and creating database entries...');
  console.log(`Batch size: ${batchSize}, Delay between batches: ${delayBetweenBatches}ms`);
  console.log(`Rate limit: 3 requests per second average (Notion API limit)`);

  try {
    // Clear existing database if requested
    if (clearDatabase) {
      console.log('Clearing existing database entries...');
      const existingEntries = await queryAllDatabaseEntries(notion, DATABASE_ID);
      console.log(`Found ${existingEntries.length} existing entries to clear.`);

      // Archive entries in batches to avoid rate limiting
      for (let i = 0; i < existingEntries.length; i += batchSize) {
        const batch = existingEntries.slice(i, i + batchSize);
        console.log(
          `Clearing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(
            existingEntries.length / batchSize
          )}`
        );

        const promises = batch.map(entry =>
          callWithRetry(() =>
            notion.pages.update({
              page_id: entry.id,
              archived: true,
            })
          )
        );

        await Promise.all(promises);
        console.log(`Batch cleared. Waiting before next batch...`);
        await delay(delayBetweenBatches);
      }
    }

    // Filter pages to include only those with valid categories
    console.log('Filtering pages to include only those with valid categories...');
    const validPages = collectedData.allPages.filter(page =>
      collectedData.validCategories.has(page.category)
    );

    console.log(`Filtered to ${validPages.length} pages with valid categories.`);
    console.log(
      `Skipped ${collectedData.allPages.length - validPages.length} pages with invalid categories.`
    );

    // Apply the limit if specified
    const pagesToProcess = validPages.slice(0, limit);
    console.log(
      `Will process ${pagesToProcess.length} pages (limit: ${limit !== Infinity ? limit : 'none'})`
    );

    // Process pages in batches
    console.log(
      `Processing in batches of ${batchSize} with ${delayBetweenBatches}ms delay between batches...`
    );

    let totalProcessed = 0;
    let totalSuccess = 0;
    let totalFailures = 0;

    for (let i = 0; i < pagesToProcess.length; i += batchSize) {
      const batch = pagesToProcess.slice(i, i + batchSize);
      console.log(
        `\nProcessing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(
          pagesToProcess.length / batchSize
        )}`
      );

      // Process each page in the batch (in parallel)
      const results = await Promise.allSettled(
        batch.map(page => processPageAndCreateEntry(page, collectedData))
      );

      // Count successes and failures
      results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          console.log(`  ✓ Successfully processed: ${batch[index].title}`);
          totalSuccess++;
        } else {
          console.error(`  ✗ Failed to process: ${batch[index].title}`);
          console.error(`    Error: ${result.reason}`);
          totalFailures++;
        }
        totalProcessed++;
      });

      // Add delay between batches
      if (i + batchSize < pagesToProcess.length) {
        console.log(`Batch complete. Waiting ${delayBetweenBatches}ms before next batch...`);
        await delay(delayBetweenBatches);
      }
    }

    // Log final statistics
    console.log('\nMigration complete!');
    console.log(`Total pages processed: ${totalProcessed}`);
    console.log(`Successfully migrated: ${totalSuccess}`);
    console.log(`Failed migrations: ${totalFailures}`);
  } catch (error) {
    console.error('Error processing data and creating entries:', error);
    throw error;
  }
}

/**
 * Process a single page and create a database entry
 * @param {Object} page - The page information
 * @param {Object} _collectedData - Collected data (unused)
 * @returns {Promise<Object>} - The created database entry
 */
async function processPageAndCreateEntry(page, _collectedData) {
  try {
    console.log(`Processing page: ${page.title} (category: ${page.category})`);

    // Check if the page has content
    const hasContent = await hasActualContent(page.id);

    // Skip pages without content
    if (!hasContent && !page.isTopLevel) {
      console.log(`  Skipping ${page.title} - no content`);
      return null;
    }

    // Get page metadata
    const pageMetadata = await callWithRetry(() => notion.pages.retrieve({ page_id: page.id }));
    const createdTime = pageMetadata.created_time || new Date().toISOString();

    // Extract content and images
    const content = await extractTextContent(page.id);
    const coverImageUrl = await extractFirstImage(page.id);

    // Generate display title (add "Notes" suffix for top-level categories except MIT Units)
    const displayTitle = page.isTopLevel && !page.isMITUnit ? `${page.title} Notes` : page.title;

    // Generate excerpt
    let excerpt = '';
    if (content) {
      excerpt = generateExcerpt(content, 150);
    } else if (page.isTopLevel) {
      excerpt = `Notes and resources about ${page.title.toLowerCase()}.`;
    }

    // Extract tags
    const tags = extractTags(content, page.title, page.category);

    // Prepare database entry properties
    const properties = {
      Title: {
        title: [
          {
            text: {
              content: displayTitle,
            },
          },
        ],
      },
      Category: {
        select: {
          name: page.category || 'Uncategorized',
        },
      },
      Status: {
        select: {
          name: 'Published',
        },
      },
      Excerpt: {
        rich_text: [
          {
            text: {
              content: excerpt.slice(0, 2000), // Limit to 2000 chars for Notion API
            },
          },
        ],
      },
      Tags: {
        multi_select: tags.map(tag => ({ name: tag })),
      },
      'Original Page': {
        url: `https://www.notion.so/${page.id.replace(/-/g, '')}`,
      },
      'Date Created': {
        date: {
          start: createdTime,
        },
      },
    };

    // Add Published property if needed
    properties.Published = {
      checkbox: true,
    };

    // Prepare the page data
    const pageData = {
      parent: {
        database_id: DATABASE_ID,
      },
      properties,
    };

    // If we have a cover image, add it to the page data
    if (coverImageUrl) {
      pageData.cover = {
        type: 'external',
        external: {
          url: coverImageUrl,
        },
      };
    }

    // Create the database entry
    const response = await callWithRetry(() => notion.pages.create(pageData));
    console.log(`  ✓ Created database entry for: ${displayTitle}`);

    return response;
  } catch (error) {
    console.error(`  ✗ Error processing page ${page.title}:`, error.message);
    throw error;
  }
}

/**
 * Main function to run the migration with the two-phase approach
 */
async function runImprovedMigration(options = {}) {
  console.log('Starting Notion Technical Notes migration (Two-Phase Approach)...');
  console.log(`Source page ID: ${SOURCE_PAGE_ID}`);
  console.log(`Target database ID: ${DATABASE_ID}`);
  console.log('Rate limit: 3 requests per second average (Notion API limit)');

  try {
    // Phase 1: Collect all data efficiently
    const collectedData = await collectAllData({
      delayMs: options.delayMs || 400, // Default to 400ms (safe for 3 req/sec limit)
    });

    // Phase 2: Process data and create entries in batches
    await processAndCreateEntries(collectedData, {
      batchSize: options.batchSize || 5,
      delayBetweenBatches: options.delayBetweenBatches || 3000, // Increased to 3000ms
      limit: options.limit || Infinity,
      clearDatabase: options.clearDatabase !== false,
    });

    console.log('Migration successfully completed!');
    return true;
  } catch (error) {
    console.error('Migration failed:', error);
    return false;
  }
}

// Run the migration if this file is executed directly
if (require.main === module) {
  // Parse command line arguments
  const args = process.argv.slice(2);
  const options = {
    clearDatabase: !args.includes('--no-clear'),
  };

  // Add support for --limit flag
  const limitArg = args.find(arg => arg.startsWith('--limit=') || arg === '--limit');
  if (limitArg) {
    if (limitArg === '--limit' && args.length > args.indexOf(limitArg) + 1) {
      options.limit = parseInt(args[args.indexOf(limitArg) + 1], 10) || Infinity;
    } else if (limitArg.startsWith('--limit=')) {
      options.limit = parseInt(limitArg.split('=')[1], 10) || Infinity;
    }
  }

  // Add support for --batch-size flag
  const batchSizeArg = args.find(arg => arg.startsWith('--batch-size=') || arg === '--batch-size');
  if (batchSizeArg) {
    if (batchSizeArg === '--batch-size' && args.length > args.indexOf(batchSizeArg) + 1) {
      options.batchSize = parseInt(args[args.indexOf(batchSizeArg) + 1], 10) || 5;
    } else if (batchSizeArg.startsWith('--batch-size=')) {
      options.batchSize = parseInt(batchSizeArg.split('=')[1], 10) || 5;
    }
  }

  // Add support for --delay flag
  const delayArg = args.find(arg => arg.startsWith('--delay=') || arg === '--delay');
  if (delayArg) {
    if (delayArg === '--delay' && args.length > args.indexOf(delayArg) + 1) {
      options.delayMs = parseInt(args[args.indexOf(delayArg) + 1], 10) || 400;
    } else if (delayArg.startsWith('--delay=')) {
      options.delayMs = parseInt(delayArg.split('=')[1], 10) || 400;
    }
  }

  // Add support for --delay-between-batches flag
  const delayBetweenBatchesArg = args.find(
    arg => arg.startsWith('--delay-between-batches=') || arg === '--delay-between-batches'
  );
  if (delayBetweenBatchesArg) {
    if (
      delayBetweenBatchesArg === '--delay-between-batches' &&
      args.length > args.indexOf(delayBetweenBatchesArg) + 1
    ) {
      options.delayBetweenBatches =
        parseInt(args[args.indexOf(delayBetweenBatchesArg) + 1], 10) || 3000;
    } else if (delayBetweenBatchesArg.startsWith('--delay-between-batches=')) {
      options.delayBetweenBatches = parseInt(delayBetweenBatchesArg.split('=')[1], 10) || 3000;
    }
  }

  console.log('Notion Technical Notes Migration Tool (Two-Phase Approach)');
  console.log('=====================================================');
  console.log('Options:');
  console.log(`- Clear database: ${options.clearDatabase}`);
  console.log(`- Limit: ${options.limit !== undefined ? options.limit : 'No limit'}`);
  console.log(`- Batch size: ${options.batchSize || 5}`);
  console.log(`- Delay between requests: ${options.delayMs || 400}ms`);
  console.log(`- Delay between batches: ${options.delayBetweenBatches || 3000}ms`);
  console.log('- Rate limit: 3 requests per second average (Notion API limit)');

  runImprovedMigration(options)
    .then(success => {
      if (success) {
        console.log('Migration completed successfully!');
        process.exit(0);
      } else {
        console.error('Migration failed.');
        process.exit(1);
      }
    })
    .catch(error => {
      console.error('Migration failed with an unhandled error:', error);
      process.exit(1);
    });
}

// Export functions for testing
module.exports = {
  runImprovedMigration,
  collectAllData,
  processAndCreateEntries,
  extractTextContent,
  extractTags,
  generateExcerpt,
  extractFirstImage,
  hasActualContent,
  callWithRetry,
  delay,
};
