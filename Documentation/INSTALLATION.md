# Installation Guide

Follow these steps to set up the VariProduzione system on your local development machine.

## Prerequisites

Ensure you have the following installed on your system:
- [.NET SDK 10.0](https://dotnet.microsoft.com/download)
- [Node.js 18+](https://nodejs.org/) and npm 9+
- [SQL Server Express or LocalDB](https://www.microsoft.com/sql-server/sql-server-downloads)

## Step-by-Step Installation

### 1. Clone the Repository
First, clone the source code from GitHub:
```bash
git clone https://github.com/msabetta/VariProduzione.git
cd VariProduzione
```

### 2. Backend Setup
Navigate to the API folder and restore dependencies:
```bash
cd VariProduzione/VariProduzioneApi
dotnet restore
dotnet build
```

### 3. Frontend Setup
Navigate to the React frontend folder and install npm packages:
```bash
cd ../vari-produzione-frontend
npm install
```

### 4. Database Setup
Create the LocalDB instance:
```bash
sqllocaldb c VariProduzioneDB
sqllocaldb s VariProduzioneDB
```
The application will automatically use this instance based on the `appsettings.json` configuration.

## Running the Application

1. **Start the API:**
   ```bash
   cd VariProduzione/VariProduzioneApi
   dotnet run
   ```
   The API will be available at `http://localhost:5000`.

2. **Start the Frontend:**
   ```bash
   cd VariProduzione/vari-produzione-frontend
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173`.
