using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace VariProduzioneApi.Models
{
    public class Operatore
    {
        [Key]
        [Required]
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Nome { get; set; } = string.Empty;

        [Required]
        [MaxLength(50)]
        public string Cognome { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        public List<string> Competenze { get; set; } = new();

        public DateTime DataAssunzione { get; set; }

        public double EfficienzaMedia { get; set; } = 0.0;

        public List<TaskProduzione> TaskAssegnati { get; set; } = new();
    }
}