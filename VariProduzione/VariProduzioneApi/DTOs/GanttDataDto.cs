using VariProduzioneApi.Models;

namespace VariProduzioneApi.DTOs;

public class GanttDataDto
{
    public List<GanttTaskDto> Tasks { get; set; } = new();
}
