using VariProduzioneApi.Models;

namespace VariProduzioneApi.DTOs
{
    public class MacchinaStatusDto
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public StatoMacchina Stato { get; set; }
        public double TassoUtilizzo { get; set; }
        public string TaskInEsecuzione { get; set; } = "---";
    }
}
