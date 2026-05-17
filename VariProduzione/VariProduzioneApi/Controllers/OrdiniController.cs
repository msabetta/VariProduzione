using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VariProduzioneApi.Data;
using VariProduzioneApi.Models;

namespace VariProduzioneApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrdiniController : ControllerBase
    {
        private readonly ProdDbContext _context;
        public OrdiniController(ProdDbContext context) => _context = context;

        [HttpGet] public async Task<ActionResult<IEnumerable<Ordine>>> Get(){
            return await _context.Ordini
                .Select(o => new Ordine
                {
                    Id = o.Id,
                    Codice = o.Codice,
                    Cliente = o.Cliente,
                    DataCreazione = o.DataCreazione,
                    Stato = o.Stato,
                    CostoStimato = o.CostoStimato
                })
                .ToListAsync();
        }
        
        [HttpGet("{id}")] public async Task<ActionResult<Ordine>> Get(int id){
            var ordine = await _context.Ordini
                .Include(o => o.Tasks)
                .ThenInclude(t => t.Macchina)
                .Include(o => o.Tasks)
                .ThenInclude(t => t.Operatore)
                .FirstOrDefaultAsync(o => o.Id == id);

            return ordine == null ? NotFound() : Ok(ordine);
        }

        [HttpPost] public async Task<ActionResult<Ordine>> Post(Ordine ordine) 
        { 
            _context.Ordini.Add(ordine);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { id = ordine.Id }, ordine);
        }
        [HttpPut("{id}")] public async Task<IActionResult> Put(int id, Ordine ordine) { 
            if (id != ordine.Id) return BadRequest(); 
            _context.Entry(ordine).State = EntityState.Modified; 
            await _context.SaveChangesAsync(); 
            return NoContent(); 
        }
        [HttpDelete("{id}")] public async Task<IActionResult> Delete(int id) { 
            var ordine = await _context.Ordini.FindAsync(id);
            if (ordine == null) return NotFound();
            _context.Ordini.Remove(ordine);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}