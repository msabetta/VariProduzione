namespace VariProduzioneApi.Services;

public interface ITaskService
{
    Task<IEnumerable<DTOs.TaskListItemDto>> GetAllAsync();
    Task<DTOs.TaskDetailDto?> GetByIdAsync(int id);
    Task<DTOs.TaskDetailDto> CreateAsync(DTOs.CreaTaskDto dto);
    Task<DTOs.TaskDetailDto?> UpdateAsync(int id, DTOs.AggiornaTaskDto dto);
    Task<bool> DeleteAsync(int id);
    Task<DTOs.TaskDetailDto?> AssegnaAsync(int id, DTOs.AssegnaTaskDto dto);
}