# Deployment Guide

This guide details how to build and deploy the VariProduzione system for production environments.

## Prerequisites for Deployment
- Server with Docker and Docker Compose installed.
- Access to the source code.

## Production Build

### Backend (.NET API)
To create a release build of the .NET backend:
```bash
cd VariProduzione/VariProduzioneApi
dotnet publish -c Release -o ./publish
```
This will compile the application and its dependencies into a folder named `publish`.

### Frontend (React)
To create an optimized production bundle for the frontend:
```bash
cd VariProduzione/vari-produzione-frontend
npm run build
```
The output will be generated in the `dist` folder.

## Docker Compose Deployment

The project provides a `docker-compose.yml` file to simplify multi-container deployments.

1. Navigate to the `Config` directory:
   ```bash
   cd Config
   ```

2. Start the services using Docker Compose:
   ```bash
   docker-compose up -d
   ```

### Services Deployed
- **Database**: Port `3306` (MariaDB is used in the provided docker compose setup for production context, while SQL Server is used locally).
- **Backend API**: Port `5000`
- **Frontend**: Port `3000` (served via Nginx).

Ensure your firewall is configured to allow traffic on the required ports (e.g., port 3000 for web access).
