# System Architecture

VariProduzione is a modern web application designed for industrial production management.

## High-Level Architecture

The system is built on a standard 3-tier architecture:

1. **Presentation Layer (Frontend)**: 
   - **Framework**: React 18
   - **Build Tool**: Vite
   - **Responsibilities**: User interface, data visualization (dashboards, Gantt charts), user interactions.

2. **Application Layer (Backend API)**: 
   - **Framework**: .NET 10 Minimal API
   - **Responsibilities**: Business logic, API endpoints, data validation, processing requests from the frontend.

3. **Data Layer (Database)**: 
   - **Database Engine**: SQL Server 2022 (LocalDB for development, configurable via connection strings).
   - **ORM**: Entity Framework Core
   - **Responsibilities**: Persistent data storage.

## Stack Overview

| Layer       | Technology                | Development Port |
|-------------|---------------------------|------------------|
| Frontend    | React 18 + Vite           | 5173             |
| Backend     | .NET 10 Minimal API       | 5000 / 5001      |
| Database    | SQL Server 2022           | 1433             |

## Component Interactions

- The frontend communicates with the backend exclusively via RESTful HTTP API calls.
- The backend communicates with the database using Entity Framework Core to perform CRUD operations on production entities (Orders, Machines, Operators, Tasks).

For a visual representation of the architecture, see [Architecture Diagram](Diagrams/Architecture.md).
