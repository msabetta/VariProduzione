namespace VariProduzioneApi.DTOs;

// --- Input DTOs ---

public record CreaMacchinaDto(
    string Codice,
    string Nome,
    string? Descrizione
);

public record AggiornaMacchinaDto(
    string Nome,
    string? Descrizione
);

public record CambiaStatoMacchinaDto(Models.StatoMacchina Stato);

public record AssegnaMacchinaDto(int? TaskId);

// --- Output DTOs ---

public record MacchinaListItemDto(
    int Id,
    string Codice,
    string Nome,
    Models.StatoMacchina Stato,
    DateTime? DataUltimaManutenzione,
    int TasksAssegnati
);

public record MacchinaDetailDto(
    int Id,
    string Codice,
    string Nome,
    string? Descrizione,
    Models.StatoMacchina Stato,
    DateTime? DataUltimaManutenzione,
    List<TaskListItemDto> TasksAssegnati
);