# Database Diagram

Entity-Relationship diagram for the VariProduzione database.

```mermaid
erDiagram
    ORDINE {
        int Id PK
        string Codice
        string Descrizione
        date DataInizio
        date DataFine
        int Progresso
    }
    
    MACCHINA {
        int Id PK
        string Nome
        string Stato
    }
    
    OPERATORE {
        int Id PK
        string Nome
        string Ruolo
    }

    TASK_PRODUZIONE {
        int Id PK
        string Descrizione
        int OrdineId FK
        int MacchinaId FK
        int OperatoreId FK
        string Stato
    }

    ORDINE ||--o{ TASK_PRODUZIONE : "has"
    MACCHINA ||--o{ TASK_PRODUZIONE : "performs"
    OPERATORE ||--o{ TASK_PRODUZIONE : "executes"
```

The database structure revolves around production `Orders` which are broken down into `Tasks`. Each `Task` is assigned to a `Machine` and an `Operator`.
