const axios = require("axios");
require("dotenv").config();

// Get API key from environment variables
const DASHSCOPE_API_KEY = process.env.DASHSCOPE_API_KEY;

if (!DASHSCOPE_API_KEY || DASHSCOPE_API_KEY === "your_dashscope_api_key_here") {
  console.error("Error: DASHSCOPE_API_KEY is not set in .env file");
  process.exit(1);
}

/**
 * Delay execution
 * @param {number} ms - Milliseconds to delay
 * @returns {Promise<void>}
 */
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
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
    console.log(`Using prompt: ${prompt.substring(0, 200)}...`);

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

    console.log("Full response data:", JSON.stringify(response.data, null, 2));

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
      console.error("Status code:", error.response.status);
      console.error(
        "Headers:",
        JSON.stringify(error.response.headers, null, 2)
      );
    } else if (error.request) {
      console.error("Request was made but no response was received");
      console.error(error.request);
    } else {
      console.error("Error details:", error);
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

      console.log("Status response:", JSON.stringify(response.data, null, 2));

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
 * Generate an image for a given title and summary
 * @param {string} title - The title of the article
 * @param {string} summary - The summary of the article
 * @returns {Promise<string|null>} The URL of the generated image or null if generation failed
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

// Test with a sample entity
async function testWithSampleEntity() {
  const title = "Building Scalable Microservices Architecture";
  const summary =
    "This article explores best practices for designing, implementing, and maintaining microservices architectures that can scale efficiently. It covers service discovery, load balancing, API gateways, and distributed monitoring solutions.";

  console.log("=== Testing DashScope Image Generation ===");
  console.log(`Title: ${title}`);
  console.log(`Summary: ${summary}`);

  try {
    const imageUrl = await generateImage(title, summary);

    if (imageUrl) {
      console.log("=== TEST SUCCESSFUL ===");
      console.log("Generated image URL:", imageUrl);
      console.log("You can view the image at this URL in your browser.");
    } else {
      console.log("=== TEST FAILED ===");
      console.log("Failed to generate image.");
    }
  } catch (error) {
    console.log("=== TEST ERROR ===");
    console.error("An error occurred during testing:", error.message);
  }
}

// Run the test
testWithSampleEntity();
