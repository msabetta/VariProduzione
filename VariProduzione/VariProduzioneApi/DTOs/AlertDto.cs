namespace VariProduzioneApi.DTOs
{
    public class AlertDto
    {
        public int Severita { get; set; }
        public string Messaggio { get; set; } = string.Empty;
        public string TipoAlert { get; set; } = string.Empty;
    }
}
