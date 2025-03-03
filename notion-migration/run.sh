#!/bin/bash
# Notion Technical Notes Migration Tool Runner
# This script helps run various commands for the Notion migration tool

# Set text colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Display header
echo -e "${BLUE}Notion Technical Notes Migration Tool${NC}"
echo -e "${BLUE}===================================${NC}\n"

# Check if .env file exists
if [ ! -f .env ]; then
  echo -e "${YELLOW}Warning: No .env file found. Creating from example...${NC}"
  cp .env.example .env
  echo -e "${YELLOW}Please edit the .env file with your Notion API key and other settings.${NC}\n"
  exit 1
fi

# Display menu
echo -e "Please select an option:"
echo -e "${GREEN}1${NC} - Test Notion API connection"
echo -e "${GREEN}2${NC} - Check database structure and contents"
echo -e "${GREEN}3${NC} - Add a test entry to the database"
echo -e "${GREEN}4${NC} - Run migration (with database clear)"
echo -e "${GREEN}5${NC} - Run migration (without clearing database)"
echo -e "${RED}0${NC} - Exit"
echo ""

# Get user input
read -p "Enter your choice (0-5): " choice

case $choice in
  1)
    echo -e "\n${BLUE}Testing Notion API connection...${NC}"
    node test-connection.js
    ;;
  2)
    echo -e "\n${BLUE}Checking database structure and contents...${NC}"
    node check-database.js
    ;;
  3)
    echo -e "\n${BLUE}Adding a test entry to the database...${NC}"
    node add-test-entry.js
    ;;
  4)
    echo -e "\n${BLUE}Running migration with database clear...${NC}"
    node notion-db-migration.js --clear
    ;;
  5)
    echo -e "\n${BLUE}Running migration without clearing database...${NC}"
    node notion-db-migration.js --no-clear
    ;;
  0)
    echo -e "\n${BLUE}Exiting. Goodbye!${NC}"
    exit 0
    ;;
  *)
    echo -e "\n${RED}Invalid choice. Please try again.${NC}"
    exit 1
    ;;
esac

echo -e "\n${GREEN}Done!${NC}" 