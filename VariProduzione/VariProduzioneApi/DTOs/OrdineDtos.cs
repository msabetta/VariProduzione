namespace VariProduzioneApi.DTOs;

// --- Input DTOs ---

public record CreaOrdineDto(
    string Codice,
    string Cliente,
    string? Descrizione,
    DateTime? DataConsegna
);

public record AggiornaOrdineDto(
    string Cliente,
    string? Descrizione,
    DateTime? DataConsegna,
    Models.StatoOrdine Stato
);

public record AggiornaProgressoOrdineDto(int Progresso);

// --- Output DTOs ---

public record OrdineListItemDto(
    int Id,
    string Codice,
    string Cliente,
    DateTime DataCreazione,
    DateTime? DataConsegna,
    Models.StatoOrdine Stato,
    int Progresso,
    int NumeroTasks
);

public record OrdineDetailDto(
    int Id,
    string Codice,
    string Cliente,
    string? Descrizione,
    DateTime DataCreazione,
    DateTime? DataConsegna,
    Models.StatoOrdine Stato,
    int Progresso,
    List<TaskListItemDto> Tasks
);