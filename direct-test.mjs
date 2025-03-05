/**
 * Direct test script for Cloudflare API
 * Run with: node direct-test.mjs
 */

import Cloudflare from "cloudflare";
import { config } from "dotenv";

// Load environment variables
config();

async function testCloudflareApiDirectly() {
  console.log("Testing Cloudflare API directly...");

  try {
    // Get Cloudflare API token from env
    const cfToken = process.env.CLOUDFLARE_API_TOKEN;

    if (!cfToken || cfToken === "your_cloudflare_api_token") {
      console.error(
        "Error: CLOUDFLARE_API_TOKEN is not set or has default value in .env file"
      );
      return;
    }

    console.log("Creating Cloudflare client...");

    // Create Cloudflare client directly with token
    const client = new Cloudflare({
      token: cfToken,
    });

    console.log("Fetching Cloudflare zones directly...");
    try {
      const response = await client.zones.list();
      console.log("✅ Success! Direct API connection working correctly");
      console.log(
        `Found ${response.result?.length || 0} zones in your Cloudflare account`
      );

      if (response.result && response.result.length > 0) {
        console.log("\nZone List:");
        response.result.forEach((zone) => {
          console.log(`- ${zone.name} (ID: ${zone.id})`);
        });
      }
    } catch (error) {
      console.error("❌ Error fetching zones:", error);
      if (error.response) {
        console.error("Error status:", error.response.status);
        console.error("Error details:", error.response.body);
      }
    }
  } catch (error) {
    console.error("❌ Error in direct test:", error);
  }
}

// Run the test
testCloudflareApiDirectly();
