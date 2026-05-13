using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;  // CORREZIONE: Aggiunto using mancante

namespace VariProduzioneApi.Models
{
    public class Macchina
    {
        [Key]
        [Required]
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Nome { get; set; } = string.Empty;  // CORREZIONE: string.Empty non e' un metodo

        [Required]
        [MaxLength(50)]
        public string TipoMacchina { get; set; } = string.Empty;  // CORREZIONE: string.Empty non e' un metodo

        public StatoMacchina Stato { get; set; } = StatoMacchina.Disponibile;

        public DateTime UltimaManutenzioneProgrammata { get; set; } = DateTime.Now;

        public List<TaskProduzione> TaskAssegnati { get; set; } = new();
        public double TassoUtilizzo { get; set; } = 0.0;
    }
}