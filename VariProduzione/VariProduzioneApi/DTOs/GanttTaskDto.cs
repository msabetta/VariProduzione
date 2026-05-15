using VariProduzioneApi.Models;

namespace VariProduzioneApi.DTOs;

public class GanttTaskDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public DateTime Start { get; set; }
    public DateTime End { get; set; }
    public int Progresso { get; set; }
}