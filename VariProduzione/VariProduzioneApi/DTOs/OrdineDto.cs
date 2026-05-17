namespace VariProduzioneApi.DTOs;

public class OrdineDto
{
    public int Id { get; set; }
    public string Codice { get; set; } = string.Empty;
    public string? Cliente { get; set; }
    public DateTime DataCreazione { get; set; }
    public Models.StatoOrdine Stato { get; set; }
    public decimal? CostoStimato { get; set; }
    public int NumeroTasks { get; set; }
}
