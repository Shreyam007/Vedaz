#!/bin/bash

# Color codes
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}=======================================${NC}"
echo -e "${BLUE}    Vedaz Local Setup Script           ${NC}"
echo -e "${BLUE}=======================================${NC}"

# Check for Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}Node.js is not installed. Please install Node.js from https://nodejs.org/${NC}"
    exit 1
fi

# Check for MongoDB (mongod)
if ! command -v mongod &> /dev/null; then
    echo -e "${RED}MongoDB is not installed or not in PATH. Please install MongoDB from https://www.mongodb.com/try/download/community${NC}"
    echo -e "Make sure MongoDB service is running before continuing."
fi

echo -e "\n${GREEN}[1/4] Setting up backend...${NC}"
cd server
npm install
cp .env.example .env
echo "Seeding database..."
npm run seed
cd ..

echo -e "\n${GREEN}[2/4] Setting up frontend...${NC}"
cd client
npm install
cp .env.example .env
cd ..

echo -e "\n${GREEN}[3/4] Installing concurrently for running both apps...${NC}"
npm init -y > /dev/null 2>&1
npm install concurrently --save-dev > /dev/null 2>&1

echo -e "\n${GREEN}[4/4] Starting the application...${NC}"
echo -e "${BLUE}Backend will be running on http://localhost:5000${NC}"
echo -e "${BLUE}Frontend will be running on http://localhost:5173${NC}"
echo -e "${BLUE}Press Ctrl+C to stop both servers.${NC}\n"

npx concurrently "cd server && npm run dev" "cd client && npm run dev" --names "BACKEND,FRONTEND" -c "bgBlue.bold,bgGreen.bold"
