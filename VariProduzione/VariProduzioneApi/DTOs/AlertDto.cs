namespace VariProduzioneApi.DTOs
{
    public class AlertDto
    {
        public int Severita { get; set; } // 1=info, 2=warning, 3=critical
        public string Messaggio { get; set; }
        public string TipoAlert { get; set; } // "ritardo", "guasto", "scadenza", ecc
    }
}