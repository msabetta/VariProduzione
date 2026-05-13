# Troubleshooting

This document provides solutions for common issues encountered during the development and deployment of VariProduzione.

## Backend Issues

### Database Connection Error
**Error**: "A network-related or instance-specific error occurred while establishing a connection to SQL Server."

**Cause**: The application cannot reach the SQL Server instance.

**Solution**:
Verify that the SQL Server LocalDB instance is running:
```bash
sqllocaldb i                    # List instances
sqllocaldb s VariProduzioneDB   # Start the instance
```

### SSL Certificate Warning
**Error**: "The ASP.NET Core developer certificate is not trusted."

**Solution**:
Trust the development certificate by running the following command:
```bash
dotnet dev-certs https --trust
```

### Missing .NET SDK
**Error**: "No compatible .NET SDK was found."

**Solution**:
Verify `global.json` and install the .NET 10 SDK:
```bash
dotnet --list-sdks
# Download missing SDKs from https://dotnet.microsoft.com/download
```

## Frontend Issues

### Environment Variable Error
**Error**: "process is not defined" in React/Vite.

**Cause**: Vite uses `import.meta.env` for environment variables, whereas Webpack uses `process.env`.

**Solution**:
This is usually addressed in `src/services/api.js`. Ensure you are not referencing `process.env` anywhere in your Vite application.
