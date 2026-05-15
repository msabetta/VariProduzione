namespace VariProduzioneApi.Models;

public class Ordine
{
    public int Id { get; set; }
    public string Codice { get; set; } = string.Empty;
    public string Cliente { get; set; } = string.Empty;
    public string? Descrizione { get; set; }
    public DateTime DataCreazione { get; set; } = DateTime.Now;
    public DateTime? DataConsegna { get; set; }
    public StatoOrdine Stato { get; set; } = StatoOrdine.Bozza;
    public int Progresso { get; set; } = 0;
    
    // Legacy
    public string? Numero { get; set; }
    public DateTime? DataRicezione { get; set; }
    public DateTime? DataScadenza { get; set; }
    public int? ProgressoPercentuale { get; set; }
    public decimal? CostoStimato { get; set; }
    public string? Responsabile { get; set; }
    
    public ICollection<TaskProduzione> Tasks { get; set; } = new List<TaskProduzione>();
}