namespace VariProduzioneApi.Models;

public class TaskDipendenti
{
    public int Id { get; set; }
    public int TaskId { get; set; }
    public int TaskPredecessoreId { get; set; }
    public TaskProduzione? Task { get; set; } 
    public Dipendente? Dipendente { get; set; }
}