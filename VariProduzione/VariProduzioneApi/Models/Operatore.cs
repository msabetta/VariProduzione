namespace VariProduzioneApi.Models;

public class Operatore
{
    public int Id { get; set; }
    public string Nome { get; set; } = string.Empty;
    public string Cognome { get; set; } = string.Empty;
    public string? Matricola { get; set; }
    public bool Attivo { get; set; } = true;
    
    // Legacy
    public string? Email { get; set; }
    public string? Competenze { get; set; }
    public DateTime? DataAssunzione { get; set; }
    public decimal? EfficienzaMedia { get; set; }
    
    public ICollection<TaskProduzione> TasksAssegnati { get; set; } = new List<TaskProduzione>();
}