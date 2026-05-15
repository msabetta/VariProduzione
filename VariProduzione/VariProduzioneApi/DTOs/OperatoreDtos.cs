namespace VariProduzioneApi.DTOs;

// --- Input DTOs ---
/// <summary>
/// DTO per la creazione di un nuovo operatore
/// </summary>
public record CreaOperatoreDto(
    string Nome,
    string Cognome,
    string? Matricola
);
/// <summary>
/// DTO per l'aggiornamento di un operatore
/// </summary>
public record AggiornaOperatoreDto(
    string Nome,
    string Cognome,
    string? Matricola
);
/// <summary>
/// DTO per il cambio di stato di un operatore
/// </summary>
public record CambiaStatoOperatoreDto(bool Attivo);

// --- Output DTOs ---

public record OperatoreListItemDto(
    int Id,
    string Nome,
    string Cognome,
    string? Matricola,
    bool Attivo,
    int TasksAssegnati
);

/// <summary>
/// DTO per i dettagli di un operatore
/// </summary>
public record OperatoreDetailDto(
    int Id,
    string Nome,
    string Cognome,
    string? Matricola,
    bool Attivo,
    List<TaskListItemDto> TasksAssegnati
);