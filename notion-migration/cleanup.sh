#!/bin/bash

# Notion Technical Notes Migration Tool - Cleanup Script
# This script removes all unnecessary test files from the notion-migration directory

echo "Cleaning up unnecessary test files..."

# Test files to delete
FILES_TO_DELETE=(
  "direct-migration.js"
  "run-full-migration.js"
  "simple-migrate.js"
  "check-db-properties.js"
  "run-migration.js"
  "simple-migration.js"
  "test-env.js"
  "test-image-extraction.js"
  "add-test-entry.js"
  "direct-page-test.js"
  "test-page.js"
  "test-connection.js"
  "test.js"
)

# Keep track of deleted files
DELETED_COUNT=0

# Delete each file if it exists
for file in "${FILES_TO_DELETE[@]}"; do
  if [ -f "$file" ]; then
    echo "Removing: $file"
    rm "$file"
    DELETED_COUNT=$((DELETED_COUNT + 1))
  fi
done

echo "Cleanup complete! Removed $DELETED_COUNT test files."
echo "Retained core files:"
echo "- notion-db-migration.js (main migration script)"
echo "- run.js (simple runner script)"
echo "- README.md (documentation)"
echo "- .env.example (example environment file)"
echo "- package.json and package-lock.json (dependencies)"

echo ""
echo "To run the migration, use: node run.js" 