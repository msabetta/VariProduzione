using System.Collections.Generic;
using System.Threading.Tasks;
using VariProduzioneApi.Models;
using VariProduzioneApi.DTOs;

namespace VariProduzioneApi.Services;

public interface IOperatoreService
{
    Task<IEnumerable<DTOs.OperatoreListItemDto>> GetAllAsync();
    Task<DTOs.OperatoreDetailDto?> GetByIdAsync(int id);
    Task<DTOs.OperatoreDetailDto> CreateAsync(DTOs.CreaOperatoreDto dto);
    Task<DTOs.OperatoreDetailDto?> UpdateAsync(int id, DTOs.AggiornaOperatoreDto dto);
    Task<bool> DeleteAsync(int id);
    Task<DTOs.OperatoreDetailDto?> CambiaStatoAsync(int id, DTOs.CambiaStatoOperatoreDto dto);
    
    // Legacy methods
    Task<IEnumerable<DTOs.OperatoreListItemDto>> GetAllOperatoriAsync();
    Task<DTOs.OperatoreDetailDto> CreateOperatoreAsync(DTOs.CreaOperatoreDto dto);
}
