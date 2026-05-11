using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using VariProduzioneApi.Data;
using VariProduzioneApi.Models;

namespace VariProduzioneApi.Services
{
    public class OperatoreService : IOperatoreService
    {
        private readonly ProdDbContext _context;

        public OperatoreService(ProdDbContext context)
        {
            _context = context;
        }

        public async Task<List<Operatore>> GetAllOperatoriAsync()
        {
            return await _context.Operatori.ToListAsync();
        }

        public async Task<Operatore> GetOperatoreByIdAsync(int id)
        {
            return await _context.Operatori.FindAsync(id);
        }

        public async Task<Operatore> CreateOperatoreAsync(Operatore operatore)
        {
            _context.Operatori.Add(operatore);
            await _context.SaveChangesAsync();
            return operatore;
        }

        public async Task<bool> DeleteOperatoreAsync(int id)
        {
            var operatore = await _context.Operatori.FindAsync(id);
            if (operatore == null) return false;

            _context.Operatori.Remove(operatore);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
