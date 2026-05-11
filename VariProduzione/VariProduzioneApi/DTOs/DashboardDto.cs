using System.Collections.Generic;

namespace VariProduzioneApi.DTOs
{
    public class DashboardDto
    {
        public int OrdiniTotali { get; set; }
        public int OrdiniInRitardo { get; set; }
        public int TaskInCorsso { get; set; }
        public double Efficienza { get; set; }
        public double CostiAttuali { get; set; }
        public List<AlertDto> Alerts { get; set; } = new();
        public List<MacchinaStatusDto> MacchineStatus { get; set; } = new();
    }
}