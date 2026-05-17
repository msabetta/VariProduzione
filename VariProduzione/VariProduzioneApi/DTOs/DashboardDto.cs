namespace VariProduzioneApi.DTOs;

public class DashboardDto
{
    public int TotaleOrdini { get; set; }
    public int InCorso { get; set; }
    public int Completati { get; set; }
    public int InRitardo { get; set; }
    public int InProduzione { get; set; }
    public int DaLavorare { get; set; }  // ← AGGIUNGI
    public double Efficienza { get; set; }
    public List<AlertDto> Alert { get; set; } = new();
}
