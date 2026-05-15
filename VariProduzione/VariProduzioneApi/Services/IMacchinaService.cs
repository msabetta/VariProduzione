using System.Collections.Generic;
using System.Threading.Tasks;
using VariProduzioneApi.Models;

namespace VariProduzioneApi.Services;

public interface IMacchinaService
{
    Task<IEnumerable<DTOs.MacchinaListItemDto>> GetAllAsync();
    Task<DTOs.MacchinaDetailDto?> GetByIdAsync(int id);
    Task<DTOs.MacchinaDetailDto> CreateAsync(DTOs.CreaMacchinaDto dto);
    Task<DTOs.MacchinaDetailDto?> UpdateAsync(int id, DTOs.AggiornaMacchinaDto dto);
    Task<bool> DeleteAsync(int id);
    Task<DTOs.MacchinaDetailDto?> CambiaStatoAsync(int id, DTOs.CambiaStatoMacchinaDto dto);
    
    // Legacy methods
    Task<IEnumerable<DTOs.MacchinaStatusDto>> GetAllMacchineAsync();
    Task<DTOs.MacchinaStatusDto?> UpdateStatoMacchinaAsync(int id, DTOs.CambiaStatoMacchinaDto dto);
}
