using System;
using System.Collections.Generic;

namespace VariProduzioneApi.DTOs
{
    public class GanttDataDto
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public DateTime DataInizio { get; set; }
        public DateTime DataFine { get; set; }
        public int Progresso { get; set; }
        public List<int> TaskDipendenti { get; set; }
        public string Colore { get; set; } // Colore per visualizzazione
    }
}