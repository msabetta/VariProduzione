using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace VariProduzioneApi.Models
{
    public class Ordine
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(20)]
        public string Numero { get; set; } = string.Empty;

        [MaxLength(100)]
        public string Cliente { get; set; } = string.Empty;

        public DateTime DataRicezione { get; set; } = DateTime.Now;

        public DateTime DataScadenza { get; set; } = DateTime.Now;

        public StatoOrdine Stato { get; set; } = StatoOrdine.Pianificato;

        public int ProgressoPercentuale { get; set; } = 0;

        public List<TaskProduzione> Tasks { get; set; } = new();

        // CORREZIONE: Rimosso IdResponsabile duplicato, uso solo navigation property
        public int? ResponsabileId { get; set; }
        public Operatore Responsabile { get; set; } = null!;

        public decimal CostoStimato { get; set; } = 0.0m;
    }
}
