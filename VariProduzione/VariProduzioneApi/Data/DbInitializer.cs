using System;
using System.Linq;
using VariProduzioneApi.Data;
using VariProduzioneApi.Models;

namespace VariProduzioneApi.Data
{
    public static class DbInitializer
    {
        public static void Initialize(ProdDbContext context)
        {
            // Assicurati che il database sia creato
            context.Database.EnsureCreated();
            context.Macchine.ExecuteDelete();
            context.Operatori.ExecuteDelete();
            context.Ordini.ExecuteDelete();
            context.Tasks.ExecuteDelete();
            context.SaveChanges();

            // ============ SEED MACCHINE ============
            var macchine = new Macchina[]
            {
                new()
                {
                    Nome = "Tornio CNC-1",
                    TipoMacchina = "Fresatrice",
                    Stato = StatoMacchina.Operativa,
                    UltimaManutenzioneProgrammata = DateTime.Now.AddMonths(1),
                    TassoUtilizzo = 85.5
                },
                new()
                {
                    Nome = "Torchio Idraulico-2",
                    TipoMacchina = "Punzonatrice",
                    Stato = StatoMacchina.Operativa,
                    UltimaManutenzioneProgrammata = DateTime.Now.AddMonths(2),
                    TassoUtilizzo = 92.0
                },
                new()
                {
                    Nome = "Stampante 3D-Industrial",
                    TipoMacchina = "Stampa 3D",
                    Stato = StatoMacchina.Operativa,
                    UltimaManutenzioneProgrammata = DateTime.Now.AddMonths(3),
                    TassoUtilizzo = 45.3
                },
                new()
                {
                    Nome = "Saldatrice Robotizzata-4",
                    TipoMacchina = "Saldatura",
                    Stato = StatoMacchina.Manutenzione,
                    UltimaManutenzioneProgrammata = DateTime.Now.AddDays(-5),
                    TassoUtilizzo = 0
                },
                new()
                {
                    Nome = "Forno Verniciatura-5",
                    TipoMacchina = "Trattamento",
                    Stato = StatoMacchina.Operativa,
                    UltimaManutenzioneProgrammata = DateTime.Now.AddMonths(1),
                    TassoUtilizzo = 78.5
                }
            };

            context.Macchine.AddRange(macchine);
            context.SaveChanges();

            // Se ci sono già dati, esci
            if (context.Ordini.Any())
            {
                return;
            }

            // ============ SEED OPERATORI ============
            var operatori = new Operatore[]
            {
                new()
                {
                    Nome = "Marco",
                    Cognome = "Rossi",
                    Email = "marco.rossi@varese.it",
                    Competenze = new() { "CNC", "CAM", "Fresatura" },
                    DataAssunzione = new DateTime(2020, 3, 15),
                    EfficienzaMedia = 94.5
                },
                new()
                {
                    Nome = "Giulia",
                    Cognome = "Bianchi",
                    Email = "giulia.bianchi@varese.it",
                    Competenze = new() { "Saldatura", "QA", "Controllo qualità" },
                    DataAssunzione = new DateTime(2019, 7, 22),
                    EfficienzaMedia = 96.2
                },
                new()
                {
                    Nome = "Andrea",
                    Cognome = "Verdi",
                    Email = "andrea.verdi@varese.it",
                    Competenze = new() { "Assemblaggio", "Logistica", "Stampa 3D" },
                    DataAssunzione = new DateTime(2021, 1, 10),
                    EfficienzaMedia = 88.7
                }
            };

            context.Operatori.AddRange(operatori);
            context.SaveChanges();

            // ============ SEED ORDINI ============
            var oggi = DateTime.Now;

            var ordini = new Ordine[]
            {
                new()
                {
                    Numero = "ORD-2024-001",
                    Cliente = "Tesar Group",
                    DataRicezione = oggi.AddDays(-10),
                    DataScadenza = oggi.AddDays(-2),
                    Stato = StatoOrdine.Ritardato,
                    ProgressoPercentuale = 85,
                    CostoStimato = 15500.00m,
                    IdResponsabile = operatori[0].Id
                },
                new()
                {
                    Numero = "ORD-2024-002",
                    Cliente = "Pirelli Tires",
                    DataRicezione = oggi.AddDays(-8),
                    DataScadenza = oggi.AddDays(3),
                    Stato = StatoOrdine.InProduzione,
                    ProgressoPercentuale = 60,
                    CostoStimato = 28900.00m,
                    IdResponsabile = operatori[1].Id
                },
                new()
                {
                    Numero = "ORD-2024-003",
                    Cliente = "Alcoa Italy",
                    DataRicezione = oggi.AddDays(-5),
                    DataScadenza = oggi.AddDays(7),
                    Stato = StatoOrdine.InProduzione,
                    ProgressoPercentuale = 35,
                    CostoStimato = 42300.00m,
                    IdResponsabile = operatori[0].Id
                }
            };

            context.Ordini.AddRange(ordini);
            context.SaveChanges();

            // ============ SEED TASKS ============
            var tasks = new TaskProduzione[]
            {
                new()
                {
                    IdOrdine = ordini[0].Id,
                    Nome = "Fresatura componente A",
                    Descrizione = "Fresatura di precisione secondo disegno tecnico",
                    DataInizio = oggi.AddDays(-10),
                    DataFine = oggi.AddDays(-8),
                    Stato = StatoTask.Completato,
                    ProgressoPercentuale = 100,
                    MacchinaAssegnata = macchine[0].Id,
                    OreStimate = 16,
                    OreReali = 18,
                    CostoMateriali = 1200.00m
                }
            };

            context.Tasks.AddRange(tasks);
            context.SaveChanges();
        }
    }
}