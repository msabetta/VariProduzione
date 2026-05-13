namespace VariProduzioneApi.DTOs
{
    public class DashboardDto
    {
        public int OrdiniTotali { get; set; }
        public int OrdiniInRitardo { get; set; }
        public int TaskInCorso { get; set; }  // CORREZIONE: Aggiunta proprietà mancante
        public double Efficienza { get; set; }
        public double CostiAttuali { get; set; }
        public List<AlertDto> Alerts { get; set; } = new();
        public List<MacchinaStatusDto> MacchineStatus { get; set; } = new();
    }
}
