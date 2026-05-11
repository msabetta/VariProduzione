#!/bin/bash

# Setup script for VariProduzione project
# This script installs dependencies for both Backend and Frontend

# Text colors
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Starting Setup for VariProduzione ===${NC}"

# 1. Check for dependencies
echo -e "\n${BLUE}[1/4] Checking dependencies...${NC}"

if ! command -v dotnet &> /dev/null
then
    echo -e "${RED}Error: .NET SDK is not installed.${NC}"
    exit 1
fi
echo -e "${GREEN}✔ .NET SDK found: $(dotnet --version)${NC}"

if ! command -v npm &> /dev/null
then
    echo -e "${RED}Error: Node.js/npm is not installed.${NC}"
    exit 1
fi
echo -e "${GREEN}✔ npm found: $(npm -v)${NC}"

# 2. Setup Backend
echo -e "\n${BLUE}[2/4] Setting up Backend (VariProduzioneApi)...${NC}"
cd VariProduzioneApi
dotnet restore
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✔ Backend dependencies restored successfully.${NC}"
else
    echo -e "${RED}✘ Failed to restore Backend dependencies.${NC}"
fi
cd ..

# 3. Setup Frontend
echo -e "\n${BLUE}[3/4] Setting up Frontend (vari-produzione-frontend)...${NC}"
cd vari-produzione-frontend
npm install
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✔ Frontend dependencies installed successfully.${NC}"
else
    echo -e "${RED}✘ Failed to install Frontend dependencies.${NC}"
fi
cd ..

# 4. Database Info
echo -e "\n${BLUE}[4/4] Database Setup Info${NC}"
echo -e "The project uses MySQL/MariaDB (as seen in scripts) or SQL Server (as seen in appsettings.json)."
echo -e "If using Docker, run: ${GREEN}docker-compose up -d${NC}"
echo -e "To seed the database, run: ${GREEN}bash Scripts/seed-data.sh${NC}"

echo -e "\n${GREEN}=== Setup Complete! ===${NC}"
echo -e "To start the Backend: ${BLUE}cd VariProduzioneApi && dotnet run${NC}"
echo -e "To start the Frontend: ${BLUE}cd vari-produzione-frontend && npm start${NC}"
