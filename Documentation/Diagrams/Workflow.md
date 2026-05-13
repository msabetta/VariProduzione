# Production Workflow

This diagram outlines the lifecycle of a production order within the VariProduzione system.

```mermaid
stateDiagram-v2
    [*] --> InAttesa : Ordine Creato
    
    InAttesa --> InProduzione : Assegnato a Macchina
    InProduzione --> Sospeso : Problema Tecnico / Pausa
    Sospeso --> InProduzione : Problema Risolto
    
    InProduzione --> Completato : Tutti i task finiti
    
    Completato --> [*]
```

1. **InAttesa (Pending)**: The order is created but not yet assigned to any machine.
2. **InProduzione (In Production)**: The order's tasks are actively being worked on by assigned operators and machines.
3. **Sospeso (Suspended)**: Work has halted due to machine maintenance or other issues.
4. **Completato (Completed)**: The order is finished and ready for delivery.
