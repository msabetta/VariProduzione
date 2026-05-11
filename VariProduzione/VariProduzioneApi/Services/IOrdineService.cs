using System.Collections.Generic;
using System.Threading.Tasks;
using VariProduzioneApi.Models;
using VariProduzioneApi.DTOs;

namespace VariProduzioneApi.Services
{
    public interface IOrdineService
    {
        Task<DashboardDto> GetDashboardAsync();
        Task<List<Ordine>> GetOrdiniInRitardoAsync();
        Task<List<GanttDataDto>> GetGanttDataAsync();
        Task<Ordine> CreateOrdineAsync(Ordine ordine);
        Task UpdateProgressoOrdineAsync(int idOrdine);
    }
}