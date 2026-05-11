using System.Collections.Generic;
using System.Threading.Tasks;
using VariProduzioneApi.Models;

namespace VariProduzioneApi.Services
{
    public interface IOperatoreService
    {
        Task<List<Operatore>> GetAllOperatoriAsync();
        Task<Operatore> GetOperatoreByIdAsync(int id);
        Task<Operatore> CreateOperatoreAsync(Operatore operatore);
        Task<bool> DeleteOperatoreAsync(int id);
    }
}
