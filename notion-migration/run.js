/**
 * Notion Technical Notes Migration Runner
 *
 * This script runs the notion-db-migration.js script with optional arguments
 */

const { runMigration } = require("./notion-db-migration");

// Parse command line arguments
const args = process.argv.slice(2);
const options = {
  clearDatabase: !args.includes("--no-clear"),
};

console.log("Notion Technical Notes Migration Tool");
console.log("====================================");

if (!options.clearDatabase) {
  console.log("Running in append mode (--no-clear flag detected)");
}

// Run the migration
runMigration(options)
  .then(() => {
    console.log("Migration completed successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Migration failed:", error.message);
    process.exit(1);
  });
