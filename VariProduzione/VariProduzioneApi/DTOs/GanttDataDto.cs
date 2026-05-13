using VariProduzioneApi.Models;

namespace VariProduzioneApi.DTOs
{
    public class GanttDataDto
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public DateTime DataInizio { get; set; }
        public DateTime DataFine { get; set; }
        public int Progresso { get; set; }
        public List<TaskProduzione> TaskDipendenti { get; set; } = new();  // CORREZIONE: Tipo corretto
        public string Colore { get; set; } = string.Empty;
    }
}
