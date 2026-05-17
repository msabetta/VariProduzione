using Microsoft.EntityFrameworkCore;
using VariProduzioneApi.Data;
using VariProduzioneApi.DTOs;
using VariProduzioneApi.Models;

namespace VariProduzioneApi.Services;

public class TaskService : ITaskService
{
    private readonly ProdDbContext _context;

    public TaskService(ProdDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<TaskListItemDto>> GetAllAsync()
    {
        return await _context.TaskProduzione
            .AsNoTracking()
            .Include(t => t.Ordine)
            .Include(t => t.Macchina)
            .Include(t => t.Operatore)
            .Select(t => new TaskListItemDto(
                t.Id,
                t.Titolo,
                t.Stato,
                t.Priorita,
                t.DataInizio,
                t.DataFine,
                t.Ordine != null ? t.Ordine.Codice : null,
                t.Macchina != null ? t.Macchina.Nome : null,
                t.Operatore != null ? $"{t.Operatore.Nome} {t.Operatore.Cognome}" : null
            ))
            .ToListAsync();
    }

    public async Task<TaskDetailDto?> GetByIdAsync(int id)
    {
        var task = await _context.TaskProduzione
            .AsNoTracking()
            .Include(t => t.Ordine)
            .Include(t => t.Macchina)
            .Include(t => t.Operatore)
            .FirstOrDefaultAsync(t => t.Id == id);

        if (task == null) return null;

        return MapToDetailDto(task);
    }

    public async Task<TaskDetailDto> CreateAsync(CreaTaskDto dto)
    {
        var task = new TaskProduzione
        {
            Titolo = dto.Titolo,
            Descrizione = dto.Descrizione,
            Priorita = dto.Priorita,
            DurataStimataMinuti = dto.DurataStimataMinuti,
            OrdineId = dto.OrdineId,
            MacchinaId = dto.MacchinaId,
            OperatoreId = dto.OperatoreId
        };

        _context.TaskProduzione.Add(task);
        await _context.SaveChangesAsync();

        // Ricarica con relazioni
        return await GetByIdAsync(task.Id) 
            ?? throw new InvalidOperationException("Task creato ma non trovato");
    }

    public async Task<TaskDetailDto?> UpdateAsync(int id, AggiornaTaskDto dto)
    {
        var task = await _context.TaskProduzione.FindAsync(id);
        if (task == null) return null;

        task.Titolo = dto.Titolo;
        task.Descrizione = dto.Descrizione;
        task.Stato = dto.Stato;
        task.Priorita = dto.Priorita;
        task.DurataStimataMinuti = dto.DurataStimataMinuti;

        // Gestione date in base allo stato
        if (dto.Stato == StatoTask.InCorso && task.DataInizio == null)
            task.DataInizio = DateTime.Now;
        if (dto.Stato == StatoTask.Completato && task.DataFine == null)
            task.DataFine = DateTime.Now;

        await _context.SaveChangesAsync();
        return await GetByIdAsync(id);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var task = await _context.TaskProduzione.FindAsync(id);
        if (task == null) return false;

        _context.TaskProduzione.Remove(task);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<TaskDetailDto?> AssegnaAsync(int id, AssegnaTaskDto dto)
    {
        var task = await _context.TaskProduzione.FindAsync(id);
        if (task == null) return null;

        task.OrdineId = dto.OrdineId;
        task.MacchinaId = dto.MacchinaId;
        task.OperatoreId = dto.OperatoreId;

        await _context.SaveChangesAsync();
        return await GetByIdAsync(id);
    }

    private static TaskDetailDto MapToDetailDto(TaskProduzione t)
    {
        return new TaskDetailDto(
            t.Id,
            t.Titolo,
            t.Descrizione,
            t.Stato,
            t.Priorita,
            t.DataCreazione,
            t.DataInizio,
            t.DataFine,
            t.DurataStimataMinuti,
            t.Ordine != null ? new OrdineInfoDto(t.Ordine.Id, t.Ordine.Codice, t.Ordine.Cliente) : null,
            t.Macchina != null ? new MacchinaInfoDto(t.Macchina.Id, t.Macchina.Codice, t.Macchina.Nome) : null,
            t.Operatore != null ? new OperatoreInfoDto(t.Operatore.Id, $"{t.Operatore.Nome} {t.Operatore.Cognome}") : null
        );
    }
}