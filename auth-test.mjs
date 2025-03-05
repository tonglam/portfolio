#!/usr/bin/env node

/**
 * Authentication Test for Cloudflare API Integration
 * This script tests the authentication mechanism implemented in middleware.js
 *
 * Run with: node auth-test.mjs
 */

import { config } from "dotenv";
config(); // Load environment variables

async function testAuthentication() {
  console.log("Testing API Authentication Mechanism...\n");

  // Get Cloudflare API token from env
  const cfToken = process.env.CLOUDFLARE_API_TOKEN;

  if (!cfToken || cfToken === "your_cloudflare_api_token") {
    console.error(
      "Error: CLOUDFLARE_API_TOKEN is not set or has default value in .env file"
    );
    return;
  }

  console.log(
    `Using token from .env file: ${cfToken.substring(
      0,
      4
    )}...${cfToken.substring(cfToken.length - 4)}`
  );
  console.log(`Token length: ${cfToken.length}\n`);

  // Test 1: Valid Token in Authorization Header
  console.log("🔍 Test 1: Using valid token in Authorization header");
  await testApiAccess(
    "http://localhost:3000/api/cloudflare/zones",
    {
      headers: {
        Authorization: `Bearer ${cfToken}`,
      },
    },
    "Valid token test"
  );

  // Test 2: Invalid Token in Authorization Header
  console.log("\n🔍 Test 2: Using invalid token in Authorization header");
  await testApiAccess(
    "http://localhost:3000/api/cloudflare/zones",
    {
      headers: {
        Authorization: `Bearer invalid_token`,
      },
    },
    "Invalid token test"
  );

  // Test 3: Valid Token as Query Parameter
  console.log("\n🔍 Test 3: Using valid token as query parameter");
  await testApiAccess(
    `http://localhost:3000/api/cloudflare/zones?api_key=${cfToken}`,
    {},
    "Query parameter test"
  );

  // Test 4: No Token Provided
  console.log("\n🔍 Test 4: No authorization token provided");
  await testApiAccess(
    "http://localhost:3000/api/cloudflare/zones",
    {},
    "No token test"
  );

  // Test 5: Test Route (should be accessible without authentication)
  console.log("\n🔍 Test 5: Accessing test route without authentication");
  await testApiAccess(
    "http://localhost:3000/api/cloudflare/test",
    {},
    "Test route access"
  );

  // Test 6: Test Route with valid authentication
  console.log("\n🔍 Test 6: Accessing test route with valid authentication");
  await testApiAccess(
    "http://localhost:3000/api/cloudflare/test",
    {
      headers: {
        Authorization: `Bearer ${cfToken}`,
      },
    },
    "Test route with auth"
  );
}

async function testApiAccess(url, options, testName) {
  try {
    console.log(`Making request to: ${url}`);
    console.log(`Request options: ${JSON.stringify(options, null, 2)}`);

    const response = await fetch(url, options);
    console.log(`Response status: ${response.status} ${response.statusText}`);

    const data = await response.json();

    if (response.ok) {
      console.log("✅ Success: Authentication passed");
      console.log("Response data:", JSON.stringify(data, null, 2));
    } else {
      console.log("❌ Request failed:", data.error || "Unknown error");
      console.log("Response data:", JSON.stringify(data, null, 2));
    }
  } catch (error) {
    console.error(`❌ Error in ${testName}:`, error.message);

    if (error.message.includes("ECONNREFUSED")) {
      console.log(
        "\nℹ️ Make sure your Next.js development server is running with:"
      );
      console.log("   npm run dev");
    }
  }
}

// Run the tests
testAuthentication().catch((error) => {
  console.error("Unhandled error:", error);
  process.exit(1);
});
