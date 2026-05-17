using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VariProduzioneApi.Data;
using VariProduzioneApi.Models;

namespace VariProduzioneApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MacchineController : ControllerBase
    {
        private readonly ProdDbContext _context;
        public MacchineController(ProdDbContext context) => _context = context;

        [HttpGet] public async Task<ActionResult<IEnumerable<Macchina>>> Get() => await _context.Macchine.ToListAsync();
        [HttpGet("{id}")] public async Task<ActionResult<Macchina>> GetById(int id) => await _context.Macchine.FindAsync(id) is Macchina m ? Ok(m) : NotFound();
        [HttpPost] public async Task<ActionResult<Macchina>> Post(Macchina macchina) { _context.Macchine.Add(macchina); await _context.SaveChangesAsync(); return CreatedAtAction(nameof(Get), new { id = macchina.Id }, macchina); }
        [HttpPut("{id}")] public async Task<IActionResult> Put(int id, Macchina macchina) { if (id != macchina.Id) return BadRequest(); _context.Entry(macchina).State = EntityState.Modified; await _context.SaveChangesAsync(); return NoContent(); }
        [HttpDelete("{id}")] public async Task<ActionResult<Macchina>> Delete(int id) { var m = await _context.Macchine.FindAsync(id); if (m == null) return NotFound(); _context.Macchine.Remove(m); await _context.SaveChangesAsync(); return NoContent(); }
    }
}