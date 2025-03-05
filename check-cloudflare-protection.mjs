#!/usr/bin/env node

/**
 * Check Cloudflare Protection for API
 * This script checks if your API is being protected by Cloudflare by examining response headers
 *
 * Run with: node check-cloudflare-protection.mjs <your-api-url>
 */

import { config } from "dotenv";
config(); // Load environment variables

// Get command line arguments
const [, , url = ""] = process.argv;

async function checkCloudflareProtection() {
  // If no URL provided, use the base URL
  const targetUrl = url || "https://yourdomain.com/api/cloudflare/test";

  console.log(`Checking Cloudflare protection for: ${targetUrl}`);
  console.log("Examining response headers to detect Cloudflare...\n");

  try {
    // Make a request to the URL
    const response = await fetch(targetUrl);

    // Get all headers
    const headers = Object.fromEntries([...response.headers.entries()]);

    // Check for Cloudflare-specific headers
    const cfRay = headers["cf-ray"];
    const cfCache = headers["cf-cache-status"];
    const cfCountry = headers["cf-ipcountry"];
    const serverHeader = headers["server"];

    console.log("Response Headers:");
    Object.entries(headers).forEach(([key, value]) => {
      console.log(`  ${key}: ${value}`);
    });

    console.log("\nCloudflare Protection Analysis:");

    if (cfRay) {
      console.log(
        "✅ CF-RAY header detected: Your API is protected by Cloudflare"
      );
      console.log(`   CF-RAY: ${cfRay}`);

      if (cfCache) {
        console.log(`   CF-Cache-Status: ${cfCache}`);
      }

      if (cfCountry) {
        console.log(`   Request origin country: ${cfCountry}`);
      }

      if (serverHeader && serverHeader.includes("cloudflare")) {
        console.log(`   Server: ${serverHeader}`);
      }
    } else {
      console.log(
        "❌ No Cloudflare headers detected. Your API may not be protected by Cloudflare."
      );
      console.log(
        "   If you've set up Cloudflare, check your DNS settings to ensure traffic is routed through Cloudflare."
      );
    }

    // Check for security headers
    console.log("\nSecurity Headers Analysis:");
    const securityHeaders = {
      "strict-transport-security": "HTTP Strict Transport Security (HSTS)",
      "x-content-type-options": "X-Content-Type-Options",
      "x-frame-options": "X-Frame-Options",
      "x-xss-protection": "X-XSS-Protection",
      "content-security-policy": "Content Security Policy",
    };

    let missingHeaders = 0;
    Object.entries(securityHeaders).forEach(([header, description]) => {
      if (headers[header]) {
        console.log(`✅ ${description}: ${headers[header]}`);
      } else {
        console.log(`❌ ${description}: Missing`);
        missingHeaders++;
      }
    });

    if (missingHeaders > 0) {
      console.log(
        "\nSuggestion: Enable additional security headers in your Cloudflare dashboard under SSL/TLS > Edge Certificates > Security Headers"
      );
    }
  } catch (error) {
    console.error("Error checking Cloudflare protection:", error.message);
    process.exit(1);
  }
}

// Run the check
checkCloudflareProtection().catch((error) => {
  console.error("Unhandled error:", error);
  process.exit(1);
});
