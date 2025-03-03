# Changelog

All notable changes to the Notion Technical Notes Migration Tool will be documented in this file.

## Version 1.3.0 (2023-03-03)

### Added

- Enhanced image extraction with support for cover images and inline images
- Improved tag extraction with better technology keyword detection
- Added more detailed logging during migration process
- Created test-image-extraction.js for testing image extraction functionality

### Changed

- Refactored notion-db-migration.js for better code organization and readability
- Enhanced error handling with more specific error messages
- Updated README.md with more comprehensive documentation
- Improved .env.example with better comments and examples

### Fixed

- Fixed issues with content extraction from complex page structures
- Resolved problems with date preservation in database entries
- Fixed slug generation to ensure uniqueness and readability

## Version 1.2.0

### Changed

- Updated database structure to match portfolio requirements:
  - Changed `Title` to `Name`
  - Added `Slug` field for URL-friendly identifiers
  - Added `Image` field for featured images
  - Added `ReadTime` field to show estimated reading time
  - Replaced `Date Created` with `Date` for publication date
  - Removed `Status` field
- Improved slug generation from titles
- Added read time calculation based on content length

## Version 1.1.0

### Changed

- Simplified tag extraction to use top-level categories instead of complex NLP
- Made the script idempotent to only update changed pages
- Added database auto-creation if it doesn't exist
- Updated README to reflect all changes

## Version 1.0.0 (2023-05-23)

### Added

- Initial release of the Notion Technical Notes Migration Tool
- Comprehensive migration script that extracts content from Notion pages
- Support for identifying top-level categories
- Recursive traversal of category pages
- Content extraction with support for various block types
- Image extraction from pages
- Tag extraction based on content analysis
- Excerpt generation for database entries
- Slug generation for each page
- Read time calculation
- Preservation of original creation and last edited dates
- Database clearing functionality with --no-clear option
- Test scripts for API connection, database structure, and test entries
- Comprehensive README with setup and usage instructions
- Environment variable configuration via .env file

### Changed

- Consolidated multiple migration scripts into a single, well-structured file
- Improved error handling and logging
- Enhanced content extraction with better formatting
- More robust tag extraction algorithm

### Fixed

- Issues with environment variable loading
- Image extraction reliability
- Content detection in pages with minimal content

## Version 1.0.0 (2023-05-23)

### Added

- Created `notion-db-migration.js` as the main migration script
- Added comprehensive README.md with detailed documentation
- Created run.sh shell script for easier command execution
- Added better error handling and validation in all scripts
- Added CHANGELOG.md to track changes

### Changed

- Refactored all scripts to use environment variables from .env file
- Improved test-connection.js with more detailed testing steps
- Enhanced check-database.js with better property display
- Updated add-test-entry.js with timestamped entries and better error messages
- Updated package.json with proper scripts and metadata

### Removed

- Removed hardcoded API keys and database IDs from all scripts
- Deleted obsolete and duplicate script files:
  - direct-page-test.js
  - test-page.js
  - test.js
  - improved-migration.js
  - complete-migration.js
  - final-migration.js
  - index.js

### Security

- Ensured all sensitive information is loaded from .env
- Added .env.example with clear documentation
- Improved validation of environment variables before script execution
