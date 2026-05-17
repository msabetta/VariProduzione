using Microsoft.EntityFrameworkCore;
using VariProduzioneApi.Data;
using VariProduzioneApi.DTOs;
using VariProduzioneApi.Models;

namespace VariProduzioneApi.Services;

public class OperatoreService : IOperatoreService
{
    private readonly ProdDbContext _context;

    public OperatoreService(ProdDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<OperatoreListItemDto>> GetAllAsync()
    {
        return await _context.Operatori
            .AsNoTracking()
            .Include(o => o.TasksAssegnati)
            .Select(o => new OperatoreListItemDto(
                o.Id,
                o.Nome,
                o.Cognome,
                o.Matricola,
                o.Attivo,
                o.TasksAssegnati.Count(t => t.Stato != StatoTask.Completato)
            ))
            .ToListAsync();
    }

    public async Task<OperatoreDetailDto?> GetByIdAsync(int id)
    {
        var operatore = await _context.Operatori
            .AsNoTracking()
            .Include(o => o.TasksAssegnati)
            .ThenInclude(t => t.Macchina)
            .Include(o => o.TasksAssegnati)
            .ThenInclude(t => t.Ordine)
            .FirstOrDefaultAsync(o => o.Id == id);

        if (operatore == null) return null;

        return MapToDetailDto(operatore);
    }

    public async Task<OperatoreDetailDto> CreateAsync(CreaOperatoreDto dto)
    {
        var operatore = new Operatore
        {
            Nome = dto.Nome,
            Cognome = dto.Cognome,
            Matricola = dto.Matricola
        };

        _context.Operatori.Add(operatore);
        await _context.SaveChangesAsync();

        return await GetByIdAsync(operatore.Id)
            ?? throw new InvalidOperationException("Operatore creato ma non trovato");
    }

    public async Task<OperatoreDetailDto?> UpdateAsync(int id, AggiornaOperatoreDto dto)
    {
        var operatore = await _context.Operatori.FindAsync(id);
        if (operatore == null) return null;

        operatore.Nome = dto.Nome;
        operatore.Cognome = dto.Cognome;
        operatore.Matricola = dto.Matricola;

        await _context.SaveChangesAsync();
        return await GetByIdAsync(id);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var operatore = await _context.Operatori.FindAsync(id);
        
        if (operatore == null) return false;

        _context.Operatori.Remove(operatore);
        
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<OperatoreDetailDto?> CambiaStatoAsync(int id, CambiaStatoOperatoreDto dto)
    {
        var operatore = await _context.Operatori.FindAsync(id);
        if (operatore == null) return null;

        operatore.Attivo = dto.Attivo;

        await _context.SaveChangesAsync();
        return await GetByIdAsync(id);
    }

    private static OperatoreDetailDto MapToDetailDto(Operatore o)
    {
        return new OperatoreDetailDto(
            o.Id,
            o.Nome,
            o.Cognome,
            o.Matricola,
            o.Attivo,
            o.TasksAssegnati.Select(t => new TaskListItemDto(
                t.Id,
                t.Titolo,
                t.Stato,
                t.Priorita,
                t.DataInizio,
                t.DataFine,
                t.Ordine?.Codice,
                t.Macchina?.Nome,
                null
            )).ToList()
        );
    }
    
    public async Task<IEnumerable<OperatoreListItemDto>> GetAllOperatoriAsync()
    {
        return await GetAllAsync();
    }

    public async Task<OperatoreDetailDto> CreateOperatoreAsync(CreaOperatoreDto dto)
    {
        return await CreateAsync(dto);
    }
}