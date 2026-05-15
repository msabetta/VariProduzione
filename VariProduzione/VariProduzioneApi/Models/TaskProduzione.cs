namespace VariProduzioneApi.Models;

public class TaskProduzione
{
    public int Id { get; set; }
    public string Titolo { get; set; } = string.Empty;
    public string? Descrizione { get; set; }
    public StatoTask Stato { get; set; } = StatoTask.DaFare;
    public PrioritaTask Priorita { get; set; } = PrioritaTask.Media;
    public DateTime DataCreazione { get; set; } = DateTime.Now;
    public DateTime? DataInizio { get; set; }
    public DateTime? DataFine { get; set; }
    public int? DurataStimataMinuti { get; set; }
    
    // Legacy
    public int? IdOrdine { get; set; }
    public string? Nome { get; set; }
    public int? ProgressoPercentuale { get; set; }
    public string? MacchinaAssegnata { get; set; }
    public decimal? OreStimate { get; set; }
    public decimal? OreReali { get; set; }
    public decimal? CostoMateriali { get; set; }
    
    public int? OrdineId { get; set; }
    public Ordine? Ordine { get; set; }
    public int? MacchinaId { get; set; }
    public Macchina? Macchina { get; set; }
    public int? OperatoreId { get; set; }
    public Operatore? Operatore { get; set; }
}