/**
 * Test script for Cloudflare API integration
 * Run with: node test-cloudflare.mjs
 */

// Import required modules
import { config } from "dotenv";
config(); // Load environment variables

async function testCloudflareApi() {
  console.log("Testing Cloudflare API integration...");

  try {
    // Get Cloudflare API token from env
    const cfToken = process.env.CLOUDFLARE_API_TOKEN;

    if (!cfToken || cfToken === "your_cloudflare_api_token") {
      console.error(
        "Error: CLOUDFLARE_API_TOKEN is not set or has default value in .env file"
      );
      return;
    }

    // Make request to the zones API
    console.log("Fetching Cloudflare zones...");
    const response = await fetch("http://localhost:3000/api/cloudflare/zones", {
      headers: {
        Authorization: `Bearer ${cfToken}`,
      },
    });

    const data = await response.json();

    if (response.ok) {
      console.log("✅ Success! API connection working correctly");
      console.log(
        `Found ${data.zones?.length || 0} zones in your Cloudflare account`
      );

      if (data.zones && data.zones.length > 0) {
        console.log("\nZone List:");
        data.zones.forEach((zone) => {
          console.log(`- ${zone.name} (ID: ${zone.id})`);
        });
      }
    } else {
      console.error("❌ API request failed:", data.error || "Unknown error");
    }
  } catch (error) {
    console.error("❌ Error testing Cloudflare API:", error.message);

    if (error.message.includes("ECONNREFUSED")) {
      console.log(
        "\nℹ️ Make sure your Next.js development server is running with:"
      );
      console.log("   npm run dev");
    }
  }
}

// Run the test
testCloudflareApi();
