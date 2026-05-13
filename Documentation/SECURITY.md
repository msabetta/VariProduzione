# Security Guidelines

Security is a primary consideration in VariProduzione. This document outlines the security practices and configurations used in the system.

## API Security

The .NET 10 API exposes several endpoints to manage production data.
- Ensure that the application runs over HTTPS in production environments.
- In the current default configuration, endpoints do not require authentication, making it suitable for isolated internal networks. If exposing the application externally, it is crucial to implement authentication (e.g., JWT) and authorization mechanisms.

## Database Security

- Database connection strings are stored in `appsettings.json`.
- **WARNING**: Do not commit sensitive connection strings containing production credentials to version control. Use environment variables or secret managers for production deployments.
- The `TrustServerCertificate=true` flag is used for local development convenience but should be evaluated and likely set to `false` in production.

## Deployment Security

When deploying using Docker:
- Ensure the network configuration limits access to the database container to only the API container.
- Do not expose port 3306 or 1433 to the public internet. Only the web application port (e.g., 3000) should be exposed via a reverse proxy (like Nginx) that handles SSL termination.
