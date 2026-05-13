# API Reference

This document outlines the API endpoints available in the VariProduzione system. The API is built using .NET 10 Minimal APIs and follows REST principles.

## Base URL
- Development: `http://localhost:5000` / `https://localhost:5001`

## Produzione

### Get Dashboard Data
- **URL**: `/api/produzione/dashboard`
- **Method**: `GET`
- **Description**: Retrieves comprehensive KPI data for the main dashboard.

### Get Delayed Orders
- **URL**: `/api/produzione/ordini-ritardo`
- **Method**: `GET`
- **Description**: Returns a list of orders that are currently behind schedule.

### Get Gantt Chart Data
- **URL**: `/api/produzione/gantt`
- **Method**: `GET`
- **Description**: Retrieves structured data required to render the production Gantt chart.

### Create New Order
- **URL**: `/api/produzione/ordini`
- **Method**: `POST`
- **Description**: Creates a new production order.

### Update Order Progress
- **URL**: `/api/produzione/ordini/{id}/progresso`
- **Method**: `PUT`
- **Description**: Updates the current progress of a specific order.

## Gestione

### Get Machines
- **URL**: `/api/gestione/macchine`
- **Method**: `GET`
- **Description**: Returns a list of all machines and their current status.

### Get Operators
- **URL**: `/api/gestione/operatori`
- **Method**: `GET`
- **Description**: Returns a list of all operators.

## Sistema

### Application Info
- **URL**: `/`
- **Method**: `GET`
- **Description**: Basic application information.

### Health Check
- **URL**: `/health`
- **Method**: `GET`
- **Description**: Health check endpoint to verify API status.
