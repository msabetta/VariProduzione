using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VariProduzioneApi.Data;
using VariProduzioneApi.Models;

namespace VariProduzioneApi.Services
{
    public class MacchinaService : IMacchinaService
    {
        private readonly ProdDbContext _context;

        public MacchinaService(ProdDbContext context)
        {
            _context = context;
        }

        public async Task<List<Macchina>> GetAllMacchineAsync()
        {
            return await _context.Macchine
                .Include(m => m.TaskAssegnati)
                .ToListAsync();
        }

        public async Task<Macchina> GetMacchinaByIdAsync(int id)
        {
            return await _context.Macchine
                .Include(m => m.TaskAssegnati)
                .FirstOrDefaultAsync(m => m.Id == id);
        }

        public async Task<Macchina> UpdateStatoMacchinaAsync(int id, StatoMacchina nuovoStato)
        {
            var macchina = await _context.Macchine.FindAsync(id);
            if (macchina != null)
            {
                macchina.Stato = nuovoStato;
                await _context.SaveChangesAsync();
            }
            return macchina;
        }

        public async Task<List<Macchina>> GetMacchineInManutenzioneAsync()
        {
            return await _context.Macchine
                .Where(m => m.Stato == StatoMacchina.Manutenzione || m.Stato == StatoMacchina.Guasto)
                .ToListAsync();
        }
    }
}
