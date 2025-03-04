/**
 * Notion Database Image Generator
 *
 * This script generates images for entries in a Notion database using DashScope API.
 * It uses the article summary to create relevant, visually appealing images.
 * A JSON mapping file is maintained to track the relationship between Notion entries and generated images.
 *
 * Usage:
 * - Test with a single entry: node generate-images.js --test
 * - Run for a single entry: node generate-images.js --single-entry [entryId]
 * - Run for all entries: node generate-images.js
 * - Run with batch size: node generate-images.js --batch-size 5
 * - Run with delay: node generate-images.js --delay 3000
 * - Show mapping statistics: node generate-images.js --stats
 * - Reset pending entries: node generate-images.js --reset-pending
 * - Clean mapping file: node generate-images.js --clean-mapping
 *
 * Environment variables (in .env file):
 * - NOTION_API_KEY: Your Notion API key
 * - NOTION_DATABASE_ID: ID of the target database
 * - DASHSCOPE_API_KEY: Your DashScope API key
 *
 * Mapping File:
 * The script creates a JSON file (image-mapping.json) that tracks:
 * - Which entries have had images generated
 * - The status of each generation attempt (success, failed, pending, etc.)
 * - The URL of the generated image
 * - Timestamps for when images were generated
 *
 * @version 1.1.0
 */

// Import required dependencies
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
const { Client } = require("@notionhq/client");
const axios = require("axios");
const fs = require("fs");
const { promisify } = require("util");

// JSON mapping file to track generated images
const MAPPING_FILE_PATH = path.join(__dirname, "image-mapping.json");
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

// Get command line arguments
const args = process.argv.slice(2);
const isTestMode = args.includes("--test");
const isSingleEntry = args.includes("--single-entry");
const singleEntryId = isSingleEntry
  ? args[args.indexOf("--single-entry") + 1]
  : null;
const batchSize = args.includes("--batch-size")
  ? parseInt(args[args.indexOf("--batch-size") + 1], 10)
  : 5;
const delayBetweenBatches = args.includes("--delay")
  ? parseInt(args[args.indexOf("--delay") + 1], 10)
  : 3000;
const showStats = args.includes("--stats");
const resetPending = args.includes("--reset-pending");
const cleanMapping = args.includes("--clean-mapping");

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
const DASHSCOPE_API_KEY =
  envConfig.DASHSCOPE_API_KEY || process.env.DASHSCOPE_API_KEY;

// Log what we're using
console.log("Using configuration:");
console.log(
  `NOTION_API_KEY: ${
    NOTION_API_KEY
      ? NOTION_API_KEY.substring(0, 4) +
        "..." +
        NOTION_API_KEY.substring(NOTION_API_KEY.length - 4)
      : "Missing"
  }`
);
console.log(`DATABASE_ID: ${DATABASE_ID || "Missing"}`);
console.log(
  `DASHSCOPE_API_KEY: ${DASHSCOPE_API_KEY ? "Found (not shown)" : "Missing"}`
);

// Check for required environment variables
if (!NOTION_API_KEY || !DATABASE_ID || !DASHSCOPE_API_KEY) {
  console.error("Error: Required environment variables are missing.");
  console.error(
    "Please ensure NOTION_API_KEY, NOTION_DATABASE_ID, and DASHSCOPE_API_KEY are set in your .env file."
  );
  process.exit(1);
}

// Initialize the Notion client
const notion = new Client({ auth: NOTION_API_KEY });

/**
 * Delay execution for the specified number of milliseconds
 * @param {number} ms - Milliseconds to delay
 * @returns {Promise<void>}
 */
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
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
      console.error(
        `Error (attempt ${attempt + 1}/${maxRetries}):`,
        error.message
      );

      // Check if the error is a rate limit error
      if (error.status === 429) {
        console.log("Rate limit exceeded. Waiting longer before retry...");
        await delay(baseDelay * Math.pow(2, attempt) + Math.random() * 1000);
      } else {
        // For other errors, use a smaller backoff
        await delay(
          (baseDelay / 2) * Math.pow(1.5, attempt) + Math.random() * 500
        );
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
  if (!richTextArray || richTextArray.length === 0) return "";
  return richTextArray
    .map((rt) => rt.plain_text || rt.text?.content || "")
    .join("");
}

/**
 * Create an image generation task using DashScope API
 * @param {string} title - The title of the article
 * @param {string} summary - The summary of the article
 * @returns {Promise<string>} The task ID for the image generation
 */
async function createImageGenerationTask(title, summary) {
  try {
    // Clean and enhance the summary to create a better prompt
    const cleanTitle = title.replace(/['"]/g, "").trim();

    // Create a structured prompt based on the advanced formula
    // 提示词 = 主体描述 + 场景描述 + 风格定义 + 镜头语言 + 光线设置 + 氛围词 + 细节修饰 + 技术参数

    // Main subject description
    const subjectDescription = `a professional technical illustration representing the concept of "${cleanTitle}" WITHOUT ANY TEXT OR LABELS`;

    // Scene description
    const sceneDescription = `in a clean, minimalist digital environment with subtle tech-related background elements`;

    // Style definition
    const styleDefinition = `modern digital art style with clean lines and a professional look, suitable for technical articles`;

    // Camera language
    const cameraLanguage = `frontal perspective with balanced composition, moderate depth of field focusing on the central concept`;

    // Lighting setup
    const lightingSetup = `soft, even lighting with subtle highlights to emphasize important elements, cool blue accent lighting`;

    // Atmosphere words
    const atmosphereWords = `informative, innovative, precise, and engaging atmosphere`;

    // Detail modifiers
    const detailModifiers = `with subtle grid patterns, simplified icons or symbols related to ${summary}, using a cohesive color palette of blues, teals, and neutral tones`;

    // Technical parameters
    const technicalParameters = `high-resolution, sharp details, professional vector-like quality`;

    // Combine all components into a comprehensive prompt
    const prompt = `${subjectDescription} ${sceneDescription}. 
    Style: ${styleDefinition}. 
    Composition: ${cameraLanguage}. 
    Lighting: ${lightingSetup}. 
    Atmosphere: ${atmosphereWords}. 
    Details: ${detailModifiers}. 
    Quality: ${technicalParameters}.
    
    The illustration should visually communicate the key concepts from this article summary: ${summary}
    
    IMPORTANT: DO NOT INCLUDE ANY TEXT, WORDS, LABELS, OR CHARACTERS IN THE IMAGE. The illustration should be entirely visual without any textual elements.`;

    // Enhanced negative prompt to avoid unwanted elements
    const negative_prompt =
      "text, words, writing, watermark, signature, blurry, low quality, ugly, distorted, photorealistic, photograph, human faces, hands, cluttered, chaotic layout, overly complex, childish, cartoon-like, unprofessional, Chinese characters, Chinese text, Asian characters, characters, text overlay, letters, numbers, any text, Asian text";

    console.log(`Creating image generation task for: ${cleanTitle}`);

    const response = await axios.post(
      "https://dashscope.aliyuncs.com/api/v1/services/aigc/text2image/image-synthesis",
      {
        model: "wanx2.1-t2i-plus",
        input: {
          prompt: prompt,
          negative_prompt: negative_prompt,
        },
        parameters: {
          size: "1024*1024",
          n: 1,
        },
      },
      {
        headers: {
          "X-DashScope-Async": "enable",
          Authorization: `Bearer ${DASHSCOPE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Extract task_id from the correct location in the response
    if (response.data && response.data.output && response.data.output.task_id) {
      const taskId = response.data.output.task_id;
      console.log(`Task created successfully with ID: ${taskId}`);
      return taskId;
    } else {
      throw new Error("No task ID returned from API");
    }
  } catch (error) {
    console.error("Error creating image generation task:", error.message);
    if (error.response) {
      console.error(
        "API Error Response:",
        JSON.stringify(error.response.data, null, 2)
      );
    }
    throw error;
  }
}

/**
 * Check image generation task status and retrieve result
 * @param {string} taskId - The ID of the image generation task
 * @param {number} maxAttempts - Maximum number of attempts to check status
 * @param {number} checkInterval - Interval between status checks in milliseconds
 * @returns {Promise<string|null>} The URL of the generated image or null if generation failed
 */
async function getImageGenerationResult(
  taskId,
  maxAttempts = 15,
  checkInterval = 5000
) {
  try {
    console.log(`Checking status for task: ${taskId}`);
    let attempts = 0;

    while (attempts < maxAttempts) {
      attempts++;
      console.log(`Attempt ${attempts}/${maxAttempts}...`);

      const response = await axios.get(
        `https://dashscope.aliyuncs.com/api/v1/tasks/${taskId}`,
        {
          headers: {
            Authorization: `Bearer ${DASHSCOPE_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Extract status from the correct location in the response
      if (!response.data || !response.data.output) {
        console.error("Unexpected response format:", response.data);
        return null;
      }

      const status = response.data.output.task_status;
      console.log(`Current status: ${status}`);

      if (status === "SUCCEEDED") {
        console.log("Task completed successfully!");
        // Extract the image URL from the result
        if (
          response.data.output.results &&
          response.data.output.results.length > 0
        ) {
          const imageUrl = response.data.output.results[0].url;
          console.log(`Generated image URL: ${imageUrl}`);
          return imageUrl;
        } else {
          console.error("No image URL in successful response");
          return null;
        }
      } else if (status === "FAILED") {
        console.error("Task failed:", response.data.output.error);
        return null;
      }

      console.log(
        `Waiting ${checkInterval / 1000} seconds before next check...`
      );
      await delay(checkInterval);
    }

    console.error(`Max attempts (${maxAttempts}) reached without completion`);
    return null;
  } catch (error) {
    console.error("Error checking task status:", error.message);
    if (error.response) {
      console.error(
        "API Error Response:",
        JSON.stringify(error.response.data, null, 2)
      );
    }
    return null;
  }
}

/**
 * Generate an image for an article using DashScope API
 * @param {string} title - The title of the article
 * @param {string} summary - The summary of the article
 * @returns {Promise<string|null>} URL of the generated image or null if generation failed
 */
async function generateImage(title, summary) {
  try {
    // Step 1: Create an image generation task
    const taskId = await createImageGenerationTask(title, summary);

    // Step 2: Check task status and get the result
    const imageUrl = await getImageGenerationResult(taskId);

    return imageUrl;
  } catch (error) {
    console.error("Error generating image:", error.message);
    return null;
  }
}

/**
 * Update a Notion database entry with the generated image
 * @param {Object} entry - The database entry to update
 * @returns {Promise<Object>} The updated entry
 */
async function updateEntryWithGeneratedImage(entry) {
  try {
    console.log(`Processing entry: ${entry.id}`);

    // Extract existing properties
    const properties = entry.properties;
    const title = properties.Title?.title?.[0]?.text?.content || "Untitled";
    const summary = properties.Summary?.rich_text
      ? extractRichText(properties.Summary.rich_text)
      : "";

    console.log(`- Title: ${title}`);

    // Check if entry already has an image
    const existingImageUrl = properties.Image?.url || null;
    if (existingImageUrl) {
      console.log("- Image already exists, skipping");
      // Update mapping to reflect existing image
      await updateImageMapping(entry.id, title, existingImageUrl, "success");
      return entry;
    }

    // Check if we already have an image in our mapping
    const mapping = await loadImageMapping();
    const existingMapping = mapping.entries.find(
      (e) => e.id === entry.id && e.status === "success" && e.imageUrl
    );

    if (existingMapping && existingMapping.imageUrl) {
      console.log(
        `- Found existing image in mapping: ${existingMapping.imageUrl}`
      );
      // Update Notion with the image URL from our mapping
      await notion.pages.update({
        page_id: entry.id,
        properties: {
          Image: {
            url: existingMapping.imageUrl,
          },
        },
      });
      console.log("- Updated Notion entry with existing image URL");
      return entry;
    }

    // Generate image only if we have a summary
    if (!summary) {
      console.log("- No summary available for image generation");
      await updateImageMapping(entry.id, title, null, "skipped");
      return entry;
    }

    // Update mapping to show we're working on this entry
    await updateImageMapping(entry.id, title, null, "pending");

    // Generate image using DashScope API
    console.log("- Generating image...");
    const imageUrl = await callWithRetry(() => generateImage(title, summary));

    if (!imageUrl) {
      console.log("- Failed to generate image");
      await updateImageMapping(entry.id, title, null, "failed");
      return entry;
    }

    // Update Notion entry with the generated image URL
    await notion.pages.update({
      page_id: entry.id,
      properties: {
        Image: {
          url: imageUrl,
        },
      },
    });

    // Update our mapping with the successful image generation
    await updateImageMapping(entry.id, title, imageUrl, "success");

    console.log(`- Image generated and added to Notion: ${imageUrl}`);
    return entry;
  } catch (error) {
    console.error(`Error updating entry with image: ${error.message}`);

    // Record the failure in our mapping
    if (entry && entry.id) {
      const title =
        entry.properties?.Title?.title?.[0]?.text?.content || "Untitled";
      await updateImageMapping(entry.id, title, null, "error");
    }

    return entry;
  }
}

/**
 * Run a test with the provided summary
 */
async function runTest() {
  console.log("Running test with sample data...");

  const testId = "test-entry-id";
  const testTitle = "AWS Key Management Service (KMS)";
  const testSummary =
    "AWS Key Management Service (KMS) centralizes encryption key creation, storage, and management, enabling secure data protection across AWS services. It uses hardware security modules (HSMs) for key storage, supports FIPS 140-2 compliance, and integrates with services like S3 and EBS for automated encryption. KMS provides granular access controls, audit trails via AWS CloudTrail, and simplifies regulatory compliance while eliminating infrastructure management overhead.";

  console.log("Test data:");
  console.log(`- Title: ${testTitle}`);
  console.log(`- Summary: ${testSummary}`);

  try {
    // Update mapping to show we're working on this test entry
    await updateImageMapping(testId, testTitle, null, "pending");

    console.log("Generating image...");
    const imageUrl = await generateImage(testTitle, testSummary);

    if (imageUrl) {
      // Update mapping with successful generation
      await updateImageMapping(testId, testTitle, imageUrl, "success");

      console.log("✓ Test successful!");
      console.log(`Generated image URL: ${imageUrl}`);

      // Display mapping statistics
      await displayMappingStatistics();
    } else {
      // Update mapping with failed generation
      await updateImageMapping(testId, testTitle, null, "failed");

      console.log("× Test failed - could not generate image");
    }
  } catch (error) {
    // Update mapping with error
    await updateImageMapping(testId, testTitle, null, "error");

    console.error("× Test failed:", error.message);
  }
}

/**
 * Displays statistics from the image mapping file
 * @returns {Promise<void>}
 */
async function displayMappingStatistics() {
  const mapping = await loadImageMapping();

  if (!mapping.entries || mapping.entries.length === 0) {
    console.log("No image mapping data available yet.");
    return;
  }

  const total = mapping.entries.length;
  const success = mapping.entries.filter((e) => e.status === "success").length;
  const failed = mapping.entries.filter(
    (e) => e.status === "failed" || e.status === "error"
  ).length;
  const pending = mapping.entries.filter((e) => e.status === "pending").length;
  const skipped = mapping.entries.filter((e) => e.status === "skipped").length;

  console.log("\n=== Image Generation Statistics ===");
  console.log(`Total entries: ${total}`);
  console.log(
    `Successfully generated: ${success} (${Math.round(
      (success / total) * 100
    )}%)`
  );
  console.log(`Failed: ${failed} (${Math.round((failed / total) * 100)}%)`);
  console.log(
    `Pending/Interrupted: ${pending} (${Math.round((pending / total) * 100)}%)`
  );
  console.log(
    `Skipped (no summary): ${skipped} (${Math.round((skipped / total) * 100)}%)`
  );
  console.log("================================\n");
}

/**
 * Main function to update database entries with images
 */
async function updateDatabaseEntriesWithImages() {
  try {
    console.log("Starting Notion database image update...");

    // Handle test mode
    if (isTestMode) {
      await runTest();
      return;
    }

    // Get entries from database
    let entries;
    if (isSingleEntry && singleEntryId) {
      console.log(`Getting single entry with ID: ${singleEntryId}`);
      entries = [await notion.pages.retrieve({ page_id: singleEntryId })];
    } else {
      entries = await queryAllDatabaseEntries();
    }

    // Display current mapping statistics
    await displayMappingStatistics();

    // Load existing mapping to prioritize pending entries
    const mapping = await loadImageMapping();

    // Prioritize entries that were in 'pending' state (interrupted during previous run)
    const pendingEntryIds = mapping.entries
      .filter((e) => e.status === "pending")
      .map((e) => e.id);

    if (pendingEntryIds.length > 0) {
      console.log(
        `Found ${pendingEntryIds.length} pending entries from previous run. Processing these first...`
      );
    }

    // Rearrange entries to process pending ones first
    entries.sort((a, b) => {
      const aIsPending = pendingEntryIds.includes(a.id);
      const bIsPending = pendingEntryIds.includes(b.id);

      if (aIsPending && !bIsPending) return -1;
      if (!aIsPending && bIsPending) return 1;
      return 0;
    });

    // Process entries
    let processed = 0;
    for (let entry of entries) {
      await updateEntryWithGeneratedImage(entry);
      processed++;

      // Show progress
      if (processed % 5 === 0 || processed === entries.length) {
        console.log(`Processed ${processed}/${entries.length} entries`);
        await displayMappingStatistics();
      }
    }

    console.log("All entries processed successfully!");
    await displayMappingStatistics();
  } catch (error) {
    console.error(`Error updating database entries: ${error.message}`);
  }
}

/**
 * Loads the image mapping JSON file if it exists, or creates a new mapping object
 * @returns {Promise<Object>} The mapping object containing entry-to-image relationships
 */
async function loadImageMapping() {
  try {
    if (fs.existsSync(MAPPING_FILE_PATH)) {
      const data = await readFileAsync(MAPPING_FILE_PATH, "utf8");
      return JSON.parse(data);
    }
    // Create new mapping if file doesn't exist
    return { entries: [] };
  } catch (error) {
    console.error(`Error loading image mapping file: ${error.message}`);
    // Return empty mapping in case of error
    return { entries: [] };
  }
}

/**
 * Saves the image mapping to the JSON file
 * @param {Object} mapping - The mapping object to save
 * @returns {Promise<void>}
 */
async function saveImageMapping(mapping) {
  try {
    await writeFileAsync(
      MAPPING_FILE_PATH,
      JSON.stringify(mapping, null, 2),
      "utf8"
    );
    console.log(`Image mapping saved to ${MAPPING_FILE_PATH}`);
  } catch (error) {
    console.error(`Error saving image mapping file: ${error.message}`);
  }
}

/**
 * Updates the mapping with a new or updated entry
 * @param {string} entryId - The Notion entry ID
 * @param {string} title - The entry title
 * @param {string|null} imageUrl - The generated image URL, or null if generation failed
 * @param {string} status - The status of image generation (success, failed, pending)
 * @returns {Promise<Object>} The updated mapping object
 */
async function updateImageMapping(entryId, title, imageUrl, status) {
  const mapping = await loadImageMapping();

  // Check if entry already exists in the mapping
  const existingEntryIndex = mapping.entries.findIndex(
    (entry) => entry.id === entryId
  );

  const updatedEntry = {
    id: entryId,
    title,
    imageUrl,
    generatedAt: imageUrl ? new Date().toISOString() : null,
    status,
  };

  if (existingEntryIndex >= 0) {
    // Update existing entry
    mapping.entries[existingEntryIndex] = updatedEntry;
  } else {
    // Add new entry
    mapping.entries.push(updatedEntry);
  }

  // Save updated mapping
  await saveImageMapping(mapping);

  return mapping;
}

/**
 * Resets entries with 'pending' status to make them eligible for processing again
 * @returns {Promise<void>}
 */
async function resetPendingEntries() {
  const mapping = await loadImageMapping();
  let resetCount = 0;

  for (let i = 0; i < mapping.entries.length; i++) {
    if (mapping.entries[i].status === "pending") {
      mapping.entries[i].status = "reset";
      resetCount++;
    }
  }

  if (resetCount > 0) {
    await saveImageMapping(mapping);
    console.log(`Reset ${resetCount} pending entries to be processed again.`);
  } else {
    console.log("No pending entries found to reset.");
  }
}

/**
 * Cleans the mapping file by removing duplicate entries and ensuring consistency
 * @returns {Promise<void>}
 */
async function cleanMappingFile() {
  const mapping = await loadImageMapping();
  const entriesCount = mapping.entries.length;

  // Keep only the most recent entry for each ID
  const uniqueEntries = {};
  for (const entry of mapping.entries) {
    const existingEntry = uniqueEntries[entry.id];

    if (
      !existingEntry ||
      (entry.generatedAt &&
        (!existingEntry.generatedAt ||
          new Date(entry.generatedAt) > new Date(existingEntry.generatedAt)))
    ) {
      uniqueEntries[entry.id] = entry;
    }
  }

  // Convert back to array
  mapping.entries = Object.values(uniqueEntries);

  // Save the cleaned mapping
  await saveImageMapping(mapping);
  console.log(
    `Cleaned mapping file: Removed ${
      entriesCount - mapping.entries.length
    } duplicate entries.`
  );
}

/**
 * Main function to handle all script operations
 */
async function main() {
  try {
    console.log("Using configuration:");
    console.log(
      `NOTION_API_KEY: ${NOTION_API_KEY ? "ntn_...x1zZ" : "Not found"}`
    );
    console.log(`DATABASE_ID: ${DATABASE_ID}`);
    console.log(
      `DASHSCOPE_API_KEY: ${
        DASHSCOPE_API_KEY ? "Found (not shown)" : "Not found"
      }`
    );

    // Handle special command line options
    if (showStats) {
      await displayMappingStatistics();
      return;
    }

    if (resetPending) {
      await resetPendingEntries();
      return;
    }

    if (cleanMapping) {
      await cleanMappingFile();
      return;
    }

    // Proceed with normal operation (image generation)
    await updateDatabaseEntriesWithImages();
  } catch (error) {
    console.error(`Error in main function: ${error.message}`);
    process.exit(1);
  }
}

// Run the main function
main();
