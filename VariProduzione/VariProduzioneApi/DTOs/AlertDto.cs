namespace VariProduzioneApi.DTOs
{
    public class AlertDto
    {
        public int Severita { get; set; }
        public int Id { get; set; }
        public string Tipo { get; set; } = string.Empty;
        public DateTime Data { get; set; }
        public string Messaggio { get; set; } = string.Empty;
    }
}
