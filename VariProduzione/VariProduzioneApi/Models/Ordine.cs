using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace VariProduzioneApi.Models
{
    public class Ordine
    {
        public int Id { get; set; }

        [Required] 
        [MaxLength(20)]
        public string Numero { get; set; } = string.Empty();
        
        [MaxLength(100)]
        public string Cliente { get; set; } = string.Empty();
        
        public DateTime DataRicezione { get; set; } = DateTime.Now;
        
        public DateTime DataScadenza { get; set; } = DateTime.Now;
        
        public StatoOrdine Stato { get; set; } = StatoOrdine.Pianificato;
        
        public int ProgressoPercentuale { get; set; } = 0;
        
        public List<TaskProduzione> Tasks { get; set; } = new();

        public int? IdResponsabile { get; set; }
        public Operatore Responsabile { get; set; }

        public decimal CostoStimato { get; set; } = 0.0m;
    }
}