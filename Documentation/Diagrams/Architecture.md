# Architecture Diagram

This diagram provides a high-level overview of the VariProduzione system components and their interactions.

```mermaid
flowchart LR

    FE[Frontend<br/>React + Vite<br/>localhost:5173]

    API[Backend API<br/>.NET 10 Web API<br/>localhost:5000]

    DB[(SQL Server<br/>Database: VariProduzione)]

    FE <--> |HTTP / REST API| API
    API <--> |Entity Framework / SQL| DB
```

- **Frontend**: The React single-page application interacts with the backend over HTTP.
- **API**: The .NET 10 Minimal API serves as the bridge between the UI and the database.
- **Database**: SQL Server stores all production state.
