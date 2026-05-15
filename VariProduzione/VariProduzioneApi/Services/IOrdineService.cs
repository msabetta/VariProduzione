using VariProduzioneApi.DTOs;

namespace VariProduzioneApi.Services;

public interface IOrdineService
{
    // CRUD standard
    Task<IEnumerable<OrdineListItemDto>> GetAllAsync();
    Task<OrdineDetailDto?> GetByIdAsync(int id);
    Task<OrdineDetailDto> CreateAsync(CreaOrdineDto dto);
    Task<OrdineDetailDto?> UpdateAsync(int id, AggiornaOrdineDto dto);
    Task<bool> DeleteAsync(int id);
    Task<OrdineDetailDto?> UpdateProgressoAsync(int id, AggiornaProgressoOrdineDto dto);

    // Legacy per endpoint Produzione
    Task<DashboardDto> GetDashboardAsync();
    Task<IEnumerable<AlertDto>> GetOrdiniInRitardoAsync();
    Task<GanttDataDto> GetGanttDataAsync();
    Task<OrdineDetailDto> CreateOrdineAsync(CreaOrdineDto dto);
    Task<OrdineDetailDto?> UpdateProgressoOrdineAsync(int id, AggiornaProgressoOrdineDto dto);
}