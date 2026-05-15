using VariProduzioneApi.Models;

namespace VariProduzioneApi.DTOs
{
    public class MacchinaStatusDto
    {
        public int Id { get; set; }
        public string Codice { get; set; } = null!;
        public string Nome { get; set; } = null!;
        public StatoMacchina Stato { get; set; }         // usa l'enum del model
        public int TaskAttive { get; set; } = 0;       // numero di task, non collection
    }
}
