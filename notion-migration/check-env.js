/**
 * Debug script to check environment variables
 */
require("dotenv").config();

console.log("Environment Variables:");
console.log("=====================");
console.log(
  `NOTION_API_KEY: ${
    process.env.NOTION_API_KEY
      ? "Set (starts with " +
        process.env.NOTION_API_KEY.substring(0, 5) +
        "...)"
      : "Not set"
  }`
);
console.log(`SOURCE_PAGE_ID: ${process.env.SOURCE_PAGE_ID || "Not set"}`);
console.log(
  `NOTION_DATABASE_ID: ${process.env.NOTION_DATABASE_ID || "Not set"}`
);
console.log(
  `TARGET_DATABASE_NAME: ${process.env.TARGET_DATABASE_NAME || "Not set"}`
);

// Check if the variables are defined but empty
if (process.env.NOTION_API_KEY === "")
  console.log("Warning: NOTION_API_KEY is defined but empty");
if (process.env.SOURCE_PAGE_ID === "")
  console.log("Warning: SOURCE_PAGE_ID is defined but empty");
if (process.env.NOTION_DATABASE_ID === "")
  console.log("Warning: NOTION_DATABASE_ID is defined but empty");

// Print all environment variables for debugging
console.log("\nAll Environment Variables:");
console.log("========================");
Object.keys(process.env).forEach((key) => {
  if (
    key.includes("NOTION") ||
    key.includes("SOURCE") ||
    key.includes("DATABASE")
  ) {
    console.log(`${key}: ${key.includes("API") ? "***" : process.env[key]}`);
  }
});

// Print shell environment variables
console.log("\nShell Environment Variables:");
console.log("=========================");
console.log(
  `NOTION_API_KEY: ${process.env.NOTION_API_KEY ? "Set" : "Not set"}`
);
console.log(`NOTION_DATABASE_ID: ${process.env.NOTION_DATABASE_ID}`);

// Check if there are any environment variables set in the shell
const { execSync } = require("child_process");
try {
  const envVars = execSync('env | grep -E "NOTION|SOURCE|DATABASE"').toString();
  console.log("\nEnvironment variables from shell:");
  console.log(envVars);
} catch (error) {
  console.log("\nNo matching environment variables found in shell");
}
