using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace VariProduzioneApi.Models
{
    public class TaskProduzione
    {
        [Key]
        [Required] 
        public int Id { get; set; } = 0;
        
        [Required] 
        public int IdOrdine { get; set; } = 0;

        [Required] 
        [MaxLength(50)] 
        public string Nome { get; set; } = string.Empty();
        
        [MaxLength(200)] 
        public string Descrizione { get; set; } = string.Empty();
        
        public DateTime DataInizio { get; set; } = DateTime.Now;
        
        public DateTime DataFine { get; set; } = DateTime.Now;
        public StatoTask Stato { get; set; } = StatoTask.NonInizziato;
        public int ProgressoPercentuale { get; set; } = 0;
        public int? MacchinaAssegnata { get; set; } = 0;
        public List<int> TaskDipendenti { get; set; } = new();
        public int OreStimate { get; set; } = 0;
        public int OreReali { get; set; } = 0;
        public decimal CostoMateriali { get; set; } = 0m;

        // Navigation properties
        public Ordine Ordine { get; set; } = null;
    }
}
