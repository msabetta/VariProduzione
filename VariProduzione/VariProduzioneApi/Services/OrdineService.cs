using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VariProduzioneApi.Data;
using VariProduzioneApi.DTOs;
using VariProduzioneApi.Models;

namespace VariProduzioneApi.Services
{
    public class OrdineService : IOrdineService
    {
        private readonly ProdDbContext _context;

        public OrdineService(ProdDbContext context) => _context = context;

        public async Task<DashboardDto> GetDashboardAsync()
        {
            var ordini = await _context.Ordini.ToListAsync();
            var tasks = await _context.Tasks.ToListAsync();
            var macchine = await _context.Macchine.ToListAsync();

            var oggi = DateTime.Now;
            var ordiniInRitardo = ordini
                .Where(o => o.Stato != StatoOrdine.Completato && o.DataScadenza < oggi)
                .Count();

            // CORREZIONE: Typo taskInCorsso -> taskInCorso
            var taskInCorso = tasks.Count(t => t.Stato == StatoTask.InCorso);

            var dashboard = new DashboardDto
            {
                OrdiniTotali = ordini.Count,
                OrdiniInRitardo = ordiniInRitardo,
                TaskInCorso = taskInCorso,  // CORREZIONE: Nome proprieta' corretto
                Efficienza = CalcolaEfficienzaGlobale(tasks),
                CostiAttuali = (double)ordini.Sum(o => o.CostoStimato),
                Alerts = GeneraAlerts(ordini, tasks, macchine),
                MacchineStatus = macchine.Select(m => new MacchinaStatusDto
                {
                    Id = m.Id,
                    Nome = m.Nome,
                    Stato = m.Stato,
                    TassoUtilizzo = m.TassoUtilizzo,
                    TaskInEsecuzione = tasks
                        .FirstOrDefault(t => t.MacchinaAssegnata == m.Id && t.Stato == StatoTask.InCorso)
                        ?.Nome ?? "---"
                }).ToList()
            };

            return dashboard;
        }

        public async Task<List<Ordine>> GetOrdiniInRitardoAsync()
        {
            var oggi = DateTime.Now;
            return await _context.Ordini
                .Where(o => o.DataScadenza < oggi && o.Stato != StatoOrdine.Completato)
                .OrderBy(o => o.DataScadenza)
                .ToListAsync();
        }

        public async Task<List<GanttDataDto>> GetGanttDataAsync()
        {
            var tasks = await _context.Tasks.ToListAsync();
            return tasks.Select(t => new GanttDataDto
            {
                Id = t.Id,
                Nome = t.Nome,
                DataInizio = t.DataInizio,
                DataFine = t.DataFine,
                Progresso = t.ProgressoPercentuale,
                TaskDipendenti = t.TaskDipendenti,
                Colore = OttieniColoreTask(t.Stato, t.ProgressoPercentuale)
            }).ToList();
        }

        public async Task<Ordine> CreateOrdineAsync(Ordine ordine)
        {
            _context.Ordini.Add(ordine);
            await _context.SaveChangesAsync();
            return ordine;
        }

        public async Task UpdateProgressoOrdineAsync(int idOrdine)
        {
            var ordine = await _context.Ordini
                .Include(o => o.Tasks)
                .FirstOrDefaultAsync(o => o.Id == idOrdine);

            if (ordine?.Tasks.Any() == true)
            {
                ordine.ProgressoPercentuale = (int)ordine.Tasks.Average(t => t.ProgressoPercentuale);

                // CORREZIONE: Logica smart completa - gestisce anche stato Ritardato
                if (ordine.ProgressoPercentuale == 100)
                    ordine.Stato = StatoOrdine.Completato;
                else if (ordine.DataScadenza < DateTime.Now)
                    ordine.Stato = StatoOrdine.Ritardato;
                else if (ordine.Tasks.Any(t => t.Stato == StatoTask.InCorso))
                    ordine.Stato = StatoOrdine.InProduzione;
                else
                    ordine.Stato = StatoOrdine.Pianificato;

                await _context.SaveChangesAsync();
            }
        }

        // CORREZIONE: Efficienza = ore stimate / ore reali (non % completati)
        private double CalcolaEfficienzaGlobale(List<TaskProduzione> tasks)
        {
            var tasksCompletati = tasks.Where(t => t.Stato == StatoTask.Completato && t.OreReali > 0).ToList();
            if (!tasksCompletati.Any()) return 0;

            var oreStimateTotali = tasksCompletati.Sum(t => t.OreStimate);
            var oreRealiTotali = tasksCompletati.Sum(t => t.OreReali);

            return (oreStimateTotali / (double)oreRealiTotali) * 100;
        }

        private List<AlertDto> GeneraAlerts(List<Ordine> ordini, List<TaskProduzione> tasks, List<Macchina> macchine)
        {
            var alerts = new List<AlertDto>();
            var oggi = DateTime.Now;

            // Alert ordini in ritardo
            foreach (var o in ordini.Where(o => o.DataScadenza < oggi && o.Stato != StatoOrdine.Completato))
            {
                alerts.Add(new AlertDto
                {
                    Severita = 3,
                    Messaggio = $"Ordine {o.Numero} in RITARDO di {(oggi - o.DataScadenza).Days} giorni",
                    TipoAlert = "ritardo"
                });
            }

            // Alert macchine in guasto
            foreach (var m in macchine.Where(m => m.Stato == StatoMacchina.Guasto))
            {
                alerts.Add(new AlertDto
                {
                    Severita = 3,
                    Messaggio = $"Macchina '{m.Nome}' in GUASTO",
                    TipoAlert = "guasto"
                });
            }

            // Alert scadenze imminenti (< 3 giorni)
            foreach (var o in ordini.Where(o => o.DataScadenza <= oggi.AddDays(3) && o.Stato != StatoOrdine.Completato))
            {
                alerts.Add(new AlertDto
                {
                    Severita = 2,
                    Messaggio = $"Scadenza imminente: {o.Numero} ({o.DataScadenza:dd/MM})",
                    TipoAlert = "scadenza"
                });
            }

            return alerts.OrderByDescending(a => a.Severita).ToList();
        }

        private string OttieniColoreTask(StatoTask stato, int progresso)
        {
            return stato switch
            {
                StatoTask.Completato => "#10b981", // Verde
                StatoTask.InCorso => "#3b82f6",    // Blu
                StatoTask.Bloccato => "#ef4444",   // Rosso
                StatoTask.InCoda => "#f59e0b",     // Arancione
                _ => "#9ca3af"                     // Grigio
            };
        }
    }
}