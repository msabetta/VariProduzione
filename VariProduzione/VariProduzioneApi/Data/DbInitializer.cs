using System;
using System.Linq;
using VariProduzioneApi.Data;
using VariProduzioneApi.Models;

namespace VariProduzioneApi.Data;

public static class DbInitializer
{
    public static void Initialize(ProdDbContext context)
    {
        context.Database.EnsureCreated();

        if (context.Macchine.Any()) return;

        var macchine = new Macchina[]
        {
            new Macchina { Codice = "M001", Nome = "Tornio CNC", Descrizione = "Tornio CNC 5 assi", Stato = StatoMacchina.Operativa, TipoMacchina = "Tornio", DataUltimaManutenzione = DateTime.Now.AddMonths(-1), UltimaManutenzioneProgrammata = DateTime.Now.AddMonths(2), TassoUtilizzo = 0.85m },
            new Macchina { Codice = "M002", Nome = "Fresatrice", Descrizione = "Fresatrice verticale", Stato = StatoMacchina.Operativa, TipoMacchina = "Fresatrice", DataUltimaManutenzione = DateTime.Now.AddMonths(-2), UltimaManutenzioneProgrammata = DateTime.Now.AddMonths(1), TassoUtilizzo = 0.75m },
            new Macchina { Codice = "M003", Nome = "Pressa 100T", Descrizione = "Pressa idraulica 100 ton", Stato = StatoMacchina.Operativa, TipoMacchina = "Pressa", DataUltimaManutenzione = DateTime.Now.AddDays(-15), UltimaManutenzioneProgrammata = DateTime.Now.AddMonths(3), TassoUtilizzo = 0.60m },
            new Macchina { Codice = "M004", Nome = "Laser Cut", Descrizione = "Taglio laser fibra", Stato = StatoMacchina.Manutenzione, TipoMacchina = "Laser", DataUltimaManutenzione = DateTime.Now, UltimaManutenzioneProgrammata = DateTime.Now.AddDays(7), TassoUtilizzo = 0m },
            new Macchina { Codice = "M005", Nome = "Robot Saldatura", Descrizione = "Robot saldatura MIG/MAG", Stato = StatoMacchina.Operativa, TipoMacchina = "Robot", DataUltimaManutenzione = DateTime.Now.AddMonths(-3), UltimaManutenzioneProgrammata = DateTime.Now.AddMonths(3), TassoUtilizzo = 0.90m }
        };
        foreach (var m in macchine) context.Macchine.Add(m);
        context.SaveChanges();

        var operatori = new Operatore[]
        {
            new Operatore { Nome = "Mario", Cognome = "Rossi", Matricola = "OP001", Attivo = true, Email = "mario.rossi@varese.it", Competenze = "Tornitura, Fresatura", DataAssunzione = DateTime.Now.AddYears(-5), EfficienzaMedia = 0.92m },
            new Operatore { Nome = "Luigi", Cognome = "Bianchi", Matricola = "OP002", Attivo = true, Email = "luigi.bianchi@varese.it", Competenze = "Saldatura, Assemblaggio", DataAssunzione = DateTime.Now.AddYears(-3), EfficienzaMedia = 0.88m },
            new Operatore { Nome = "Anna", Cognome = "Verdi", Matricola = "OP003", Attivo = true, Email = "anna.verdi@varese.it", Competenze = "Controllo qualità", DataAssunzione = DateTime.Now.AddYears(-2), EfficienzaMedia = 0.95m }
        };
        foreach (var o in operatori) context.Operatori.Add(o);
        context.SaveChanges();

        var ordini = new Ordine[]
        {
            new Ordine { Codice = "ORD-2025-001", Cliente = "Cliente A", Descrizione = "Parti meccaniche batch 1", DataCreazione = DateTime.Now.AddDays(-10), DataConsegna = DateTime.Now.AddDays(5), Stato = StatoOrdine.InProduzione, Progresso = 45, Numero = "ORD-2025-001", DataRicezione = DateTime.Now.AddDays(-10), DataScadenza = DateTime.Now.AddDays(5), ProgressoPercentuale = 45, CostoStimato = 15000, Responsabile = "Mario Rossi" },
            new Ordine { Codice = "ORD-2025-002", Cliente = "Cliente B", Descrizione = "Componenti elettronici", DataCreazione = DateTime.Now.AddDays(-5), DataConsegna = DateTime.Now.AddDays(10), Stato = StatoOrdine.Confermato, Progresso = 10, Numero = "ORD-2025-002", DataRicezione = DateTime.Now.AddDays(-5), DataScadenza = DateTime.Now.AddDays(10), ProgressoPercentuale = 10, CostoStimato = 8000, Responsabile = "Luigi Bianchi" },
            new Ordine { Codice = "ORD-2025-003", Cliente = "Cliente C", Descrizione = "Strutture saldate", DataCreazione = DateTime.Now.AddDays(-20), DataConsegna = DateTime.Now.AddDays(-2), Stato = StatoOrdine.Ritardato, Progresso = 80, Numero = "ORD-2025-003", DataRicezione = DateTime.Now.AddDays(-20), DataScadenza = DateTime.Now.AddDays(-2), ProgressoPercentuale = 80, CostoStimato = 22000, Responsabile = "Anna Verdi" }
        };
        foreach (var o in ordini) context.Ordini.Add(o);
        context.SaveChanges();

        var tasks = new TaskProduzione[]
        {
            new TaskProduzione { Titolo = "Tornitura albero", Descrizione = "Tornitura albero motore", Stato = StatoTask.InCorso, Priorita = PrioritaTask.Alta, DataCreazione = DateTime.Now.AddDays(-5), DataInizio = DateTime.Now.AddDays(-5), OrdineId = 1, MacchinaId = 1, OperatoreId = 1, IdOrdine = 1, Nome = "Tornitura albero", ProgressoPercentuale = 60, MacchinaAssegnata = "M001", OreStimate = 8, OreReali = 5, CostoMateriali = 200 },
            new TaskProduzione { Titolo = "Fresatura supporto", Descrizione = "Fresatura supporto laterale", Stato = StatoTask.DaFare, Priorita = PrioritaTask.Media, DataCreazione = DateTime.Now.AddDays(-3), OrdineId = 1, MacchinaId = 2, OperatoreId = 2, IdOrdine = 1, Nome = "Fresatura supporto", ProgressoPercentuale = 0, MacchinaAssegnata = "M002", OreStimate = 6, OreReali = 0, CostoMateriali = 150 },
            new TaskProduzione { Titolo = "Saldatura telaio", Descrizione = "Saldatura telaio principale", Stato = StatoTask.InCorso, Priorita = PrioritaTask.Critica, DataCreazione = DateTime.Now.AddDays(-10), DataInizio = DateTime.Now.AddDays(-8), OrdineId = 3, MacchinaId = 5, OperatoreId = 2, IdOrdine = 3, Nome = "Saldatura telaio", ProgressoPercentuale = 75, MacchinaAssegnata = "M005", OreStimate = 12, OreReali = 9, CostoMateriali = 500 }
        };
        foreach (var t in tasks) context.Tasks.Add(t);
        context.SaveChanges();
    }
}