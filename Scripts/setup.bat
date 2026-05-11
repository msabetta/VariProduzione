@echo off
SETLOCAL EnableDelayedExpansion

:: Setup script for VariProduzione project (Windows)

echo ===========================================
echo === Starting Setup for VariProduzione ===
echo ===========================================

:: 1. Check for dependencies
echo.
echo [1/4] Checking dependencies...

dotnet --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] .NET SDK is not installed.
    exit /b 1
)
echo [OK] .NET SDK found.

npm -v >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js/npm is not installed.
    exit /b 1
)
echo [OK] npm found.

:: 2. Setup Backend
echo.
echo [2/4] Setting up Backend (VariProduzioneApi)...
cd VariProduzioneApi
call dotnet restore
if %errorlevel% equ 0 (
    echo [OK] Backend dependencies restored successfully.
) else (
    echo [ERROR] Failed to restore Backend dependencies.
)
cd ..

:: 3. Setup Frontend
echo.
echo [3/4] Setting up Frontend (vari-produzione-frontend)...
cd vari-produzione-frontend
call npm install
if %errorlevel% equ 0 (
    echo [OK] Frontend dependencies installed successfully.
) else (
    echo [ERROR] Failed to install Frontend dependencies.
)
cd ..

:: 4. Database Info
echo.
echo [4/4] Database Setup Info
echo The project uses MySQL/MariaDB or SQL Server.
echo If using Docker, run: docker-compose up -d
echo To seed the database, run: Scripts\seed-data.sh (use WSL or Git Bash) or run SQL files manually.

echo.
echo ===========================================
echo === Setup Complete! ===
echo ===========================================
echo To start the Backend: cd VariProduzioneApi ^& dotnet run
echo To start the Frontend: cd vari-produzione-frontend ^& npm start
pause
