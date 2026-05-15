namespace VariProduzioneApi.Models;

public class Macchina
{
    public int Id { get; set; }
    public string Codice { get; set; } = string.Empty;
    public string Nome { get; set; } = string.Empty;
    public string? Descrizione { get; set; }
    public StatoMacchina Stato { get; set; } = StatoMacchina.Disponibile;
    public DateTime? DataUltimaManutenzione { get; set; }
    
    // Legacy
    public string? TipoMacchina { get; set; }
    public DateTime? UltimaManutenzioneProgrammata { get; set; }
    public decimal? TassoUtilizzo { get; set; }
    
    public ICollection<TaskProduzione> TasksAssegnati { get; set; } = new List<TaskProduzione>();
}