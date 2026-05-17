using Microsoft.EntityFrameworkCore;
using VariProduzioneApi.Data;
using VariProduzioneApi.DTOs;
using VariProduzioneApi.Models;

namespace VariProduzioneApi.Services;

public class OrdineService : IOrdineService
{
    private readonly ProdDbContext _context;

    public OrdineService(ProdDbContext context)
    {
        _context = context;
    }

    // ========== METODI CRUD STANDARD ==========

    public async Task<IEnumerable<OrdineListItemDto>> GetAllAsync()
    {
        return await _context.Ordini
            .AsNoTracking()
            .Include(o => o.Tasks)
            .Select(o => new OrdineListItemDto(
                o.Id,
                o.Codice,
                o.Cliente,
                o.DataCreazione,
                o.DataConsegna,
                o.Stato,
                o.Progresso,
                o.Tasks.Count
            ))
            .ToListAsync();
    }

    public async Task<OrdineDetailDto?> GetByIdAsync(int id)
    {
        var ordine = await _context.Ordini
            .AsNoTracking()
            .Include(o => o.Tasks)
            .ThenInclude(t => t.Macchina)
            .Include(o => o.Tasks)
            .ThenInclude(t => t.Operatore)
            .FirstOrDefaultAsync(o => o.Id == id);

        if (ordine == null) return null;
        return MapToDetailDto(ordine);
    }

    public async Task<OrdineDetailDto> CreateAsync(CreaOrdineDto dto)
    {
        var ordine = new Ordine
        {
            Codice = dto.Codice,
            Cliente = dto.Cliente,
            Descrizione = dto.Descrizione,
            DataConsegna = dto.DataConsegna
        };
        _context.Ordini.Add(ordine);
        await _context.SaveChangesAsync();
        return await GetByIdAsync(ordine.Id)
            ?? throw new InvalidOperationException("Ordine creato ma non trovato");
    }

    public async Task<OrdineDetailDto?> UpdateAsync(int id, AggiornaOrdineDto dto)
    {
        var ordine = await _context.Ordini.FindAsync(id);
        
        if (ordine == null) return null;
        ordine.Cliente = dto.Cliente;
        ordine.Descrizione = dto.Descrizione;
        ordine.DataConsegna = dto.DataConsegna;
        ordine.Stato = dto.Stato;

        await _context.SaveChangesAsync();
        return await GetByIdAsync(id);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var ordine = await _context.Ordini.FindAsync(id);
        
        if (ordine == null) return false;
        
        _context.Ordini.Remove(ordine);
        
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<OrdineDetailDto?> UpdateProgressoAsync(int id, AggiornaProgressoOrdineDto dto)
    {
        var ordine = await _context.Ordini.FindAsync(id);
        
        if (ordine == null) return null;
        
        ordine.Progresso = Math.Clamp(dto.Progresso, 0, 100);
        
        if (ordine.Progresso == 100)
        {
            ordine.Stato = StatoOrdine.Completato;
        }
        else if (ordine.Progresso > 0)
        {
            ordine.Stato = StatoOrdine.InProduzione;
        }

        await _context.SaveChangesAsync();

        return await GetByIdAsync(id);
    }

    // ========== METODI LEGACY ==========

    public async Task<DashboardDto> GetDashboardAsync()
    {
        var totali = await _context.Ordini.AsNoTracking().CountAsync();        
        var inProduzione = await _context.Ordini.AsNoTracking().CountAsync(o => o.Stato == StatoOrdine.InProduzione);
        var completati = await _context.Ordini.AsNoTracking().CountAsync(o => o.Stato == StatoOrdine.Completato);
        var inRitardo = await _context.Ordini.AsNoTracking().CountAsync(o => o.Stato == StatoOrdine.Ritardato);
        var daLavorare = await _context.Ordini.AsNoTracking().CountAsync(o => o.Stato == StatoOrdine.DaLavorare);

        return new DashboardDto
        {
            TotaleOrdini = totali,
            InProduzione = inProduzione,
            Completati = completati,
            InRitardo = inRitardo,
            DaLavorare = daLavorare
        };
    }

    public async Task<IEnumerable<AlertDto>> GetOrdiniInRitardoAsync()
    {
        return await _context.Ordini
            .AsNoTracking()
            .Where(o => o.Stato == StatoOrdine.Ritardato || 
                       (o.DataScadenza.HasValue && o.DataScadenza < DateTime.Now && o.Stato != StatoOrdine.Completato))
            .Select(o => new AlertDto
            {
                Id = o.Id,
                Messaggio = $"Ordine {o.Codice} in ritardo",
                Tipo = "Ritardo",
                Data = o.DataScadenza ?? DateTime.Now
            })
            .ToListAsync();
    }

    public async Task<GanttDataDto> GetGanttDataAsync()
    {
        var tasks = await _context.Tasks
            .AsNoTracking()
            .Include(t => t.Ordine)
            .Where(t => t.OrdineId.HasValue)
            .ToListAsync();
            
        return new GanttDataDto
        {
            Tasks = tasks.Select(t => new GanttTaskDto
            {
                Id = t.Id,
                Name = t.Titolo,
                Start = t.DataInizio ?? t.DataCreazione,
                End = t.DataFine ?? t.DataCreazione.AddHours(1),
                Progresso = t.ProgressoPercentuale ?? 0
            }).ToList()
        };
    }

    public async Task<OrdineDetailDto> CreateOrdineAsync(CreaOrdineDto dto)
    {
        return await CreateAsync(dto);
    }

    public async Task<OrdineDetailDto?> UpdateProgressoOrdineAsync(int id, AggiornaProgressoOrdineDto dto)
    {
        return await UpdateProgressoAsync(id, dto);
    }

    // ========== HELPER ==========

    private static OrdineDetailDto MapToDetailDto(Ordine o)
    {
        return new OrdineDetailDto(
            o.Id,
            o.Codice,
            o.Cliente,
            o.Descrizione,
            o.DataCreazione,
            o.DataConsegna,
            o.Stato,
            o.Progresso,
            o.Tasks.Select(t => new TaskListItemDto(
                t.Id,
                t.Titolo,
                t.Stato,
                t.Priorita,
                t.DataInizio,
                t.DataFine,
                null,
                t.Macchina?.Nome,
                t.Operatore != null ? $"{t.Operatore.Nome} {t.Operatore.Cognome}" : null
            )).ToList()
        );
    }
}