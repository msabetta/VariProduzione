using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VariProduzioneApi.Data;
using VariProduzioneApi.Models;

namespace VariProduzioneApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OperatoriController : ControllerBase
    {
        private readonly ProdDbContext _context;
        public OperatoriController(ProdDbContext context) => _context = context;

        [HttpGet] public async Task<ActionResult<IEnumerable<Operatore>>> Get() => await _context.Operatori.ToListAsync();
        [HttpGet("{id}")] public async Task<ActionResult<Operatore>> GetById(int id) => await _context.Operatori.FindAsync(id) is Operatore o ? Ok(o) : NotFound();
        [HttpPost] public async Task<ActionResult<Operatore>> Post(Operatore operatore) { _context.Operatori.Add(operatore); await _context.SaveChangesAsync(); return CreatedAtAction(nameof(Get), new { id = operatore.Id }, operatore); }
        [HttpPut("{id}")] public async Task<IActionResult> Put(int id, Operatore operatore) { if (id != operatore.Id) return BadRequest(); _context.Entry(operatore).State = EntityState.Modified; await _context.SaveChangesAsync(); return NoContent(); }
        [HttpDelete("{id}")] public async Task<ActionResult<Operatore>> Delete(int id) { var o = await _context.Operatori.FindAsync(id); if (o == null) return NotFound(); _context.Operatori.Remove(o); await _context.SaveChangesAsync(); return NoContent(); }
    }
}