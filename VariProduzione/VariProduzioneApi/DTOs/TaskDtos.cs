namespace VariProduzioneApi.DTOs;

// --- Input DTOs ---

public record CreaTaskDto(
    string Titolo,
    string? Descrizione,
    Models.PrioritaTask Priorita,
    int? DurataStimataMinuti,
    int? OrdineId,
    int? MacchinaId,
    int? OperatoreId
);

public record AggiornaTaskDto(
    string Titolo,
    string? Descrizione,
    Models.StatoTask Stato,
    Models.PrioritaTask Priorita,
    int? DurataStimataMinuti
);

public record AssegnaTaskDto(
    int? OrdineId,
    int? MacchinaId,
    int? OperatoreId
);

// --- Output DTOs ---

public record TaskListItemDto(
    int Id,
    string Titolo,
    Models.StatoTask Stato,
    Models.PrioritaTask Priorita,
    DateTime? DataInizio,
    DateTime? DataFine,
    string? OrdineCodice,
    string? MacchinaNome,
    string? OperatoreNome
);

public record TaskDetailDto(
    int Id,
    string Titolo,
    string? Descrizione,
    Models.StatoTask Stato,
    Models.PrioritaTask Priorita,
    DateTime DataCreazione,
    DateTime? DataInizio,
    DateTime? DataFine,
    int? DurataStimataMinuti,
    OrdineInfoDto? Ordine,
    MacchinaInfoDto? Macchina,
    OperatoreInfoDto? Operatore
);

public record OrdineInfoDto(int Id, string Codice, string Cliente);
public record MacchinaInfoDto(int Id, string Codice, string Nome);
public record OperatoreInfoDto(int Id, string NomeCompleto);

public class TaskDipendenteDto
{
    public int Id { get; set; }
    public int TaskId { get; set; }
    public int DipendenteId { get; set; }
}