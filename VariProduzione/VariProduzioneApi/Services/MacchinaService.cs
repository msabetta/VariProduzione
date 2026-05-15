using Microsoft.EntityFrameworkCore;
using VariProduzioneApi.Data;
using VariProduzioneApi.DTOs;
using VariProduzioneApi.Models;

namespace VariProduzioneApi.Services;

public class MacchinaService : IMacchinaService
{
    private readonly ProdDbContext _context;

    public MacchinaService(ProdDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<MacchinaListItemDto>> GetAllAsync()
    {
        return await _context.Macchine
            .AsNoTracking()
            .Include(m => m.TasksAssegnati)
            .Select(m => new MacchinaListItemDto(
                m.Id,
                m.Codice,
                m.Nome,
                m.Stato,
                m.DataUltimaManutenzione,
                m.TasksAssegnati.Count(t => t.Stato != StatoTask.Completato)
            ))
            .ToListAsync();
    }

    public async Task<MacchinaDetailDto?> GetByIdAsync(int id)
    {
        var macchina = await _context.Macchine
            .AsNoTracking()
            .Include(m => m.TasksAssegnati)
            .ThenInclude(t => t.Ordine)
            .Include(m => m.TasksAssegnati)
            .ThenInclude(t => t.Operatore)
            .FirstOrDefaultAsync(m => m.Id == id);

        if (macchina == null) return null;

        return MapToDetailDto(macchina);
    }

    public async Task<MacchinaDetailDto> CreateAsync(CreaMacchinaDto dto)
    {
        var macchina = new Macchina
        {
            Codice = dto.Codice,
            Nome = dto.Nome,
            Descrizione = dto.Descrizione
        };

        _context.Macchine.Add(macchina);
        await _context.SaveChangesAsync();

        return await GetByIdAsync(macchina.Id)
            ?? throw new InvalidOperationException("Macchina creata ma non trovata");
    }

    public async Task<MacchinaDetailDto?> UpdateAsync(int id, AggiornaMacchinaDto dto)
    {
        var macchina = await _context.Macchine.FindAsync(id);
        if (macchina == null) return null;

        macchina.Nome = dto.Nome;
        macchina.Descrizione = dto.Descrizione;

        await _context.SaveChangesAsync();
        return await GetByIdAsync(id);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var macchina = await _context.Macchine.FindAsync(id);
        if (macchina == null) return false;

        _context.Macchine.Remove(macchina);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<MacchinaDetailDto?> CambiaStatoAsync(int id, CambiaStatoMacchinaDto dto)
    {
        var macchina = await _context.Macchine.FindAsync(id);
        if (macchina == null) return null;

        macchina.Stato = dto.Stato;

        if (dto.Stato == StatoMacchina.Manutenzione)
            macchina.DataUltimaManutenzione = DateTime.Now;

        await _context.SaveChangesAsync();
        return await GetByIdAsync(id);
    }

    private static MacchinaDetailDto MapToDetailDto(Macchina m)
    {
        return new MacchinaDetailDto(
            m.Id,
            m.Codice,
            m.Nome,
            m.Descrizione,
            m.Stato,
            m.DataUltimaManutenzione,
            m.TasksAssegnati.Select(t => new TaskListItemDto(
                t.Id,
                t.Titolo,
                t.Stato,
                t.Priorita,
                t.DataInizio,
                t.DataFine,
                t.Ordine?.Codice,
                null,
                t.Operatore != null ? $"{t.Operatore.Nome} {t.Operatore.Cognome}" : null
            )).ToList()
        );
    }

    public async Task<IEnumerable<MacchinaStatusDto>> GetAllMacchineAsync()
    {
        var macchine = await _context.Macchine
            .AsNoTracking()
            .Include(m => m.TasksAssegnati)
            .ToListAsync();

        return macchine.Select(m => new MacchinaStatusDto
        {
            Id = m.Id,
            Codice = m.Codice,
            Nome = m.Nome,
            Stato = m.Stato,
            TaskAttive = m.TasksAssegnati.Count(t => t.Stato != StatoTask.Completato)
        });
    }

    public async Task<MacchinaStatusDto?> UpdateStatoMacchinaAsync(int id, CambiaStatoMacchinaDto dto)
    {
        var result = await CambiaStatoAsync(id, dto);
        if (result == null) return null;
        
        // Recupera il conteggio task attive dal db
        var taskAttive = await _context.Tasks
            .CountAsync(t => t.MacchinaId == id && t.Stato != StatoTask.Completato);

        return new MacchinaStatusDto
        {
            Id = result.Id,
            Codice = result.Codice,
            Nome = result.Nome,
            Stato = result.Stato,
            TaskAttive = taskAttive
        };
    }
}