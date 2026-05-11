using System.Collections.Generic;
using System.Threading.Tasks;
using VariProduzioneApi.Models;

namespace VariProduzioneApi.Services
{
    public interface IMacchinaService
    {
        Task<List<Macchina>> GetAllMacchineAsync();
        Task<Macchina> GetMacchinaByIdAsync(int id);
        Task<Macchina> UpdateStatoMacchinaAsync(int id, StatoMacchina nuovoStato);
        Task<List<Macchina>> GetMacchineInManutenzioneAsync();
    }
}
