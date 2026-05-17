using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VariProduzioneApi.Data;
using VariProduzioneApi.Models;

namespace VariProduzioneApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly ProdDbContext _context;
        public TasksController(ProdDbContext context) => _context = context;

        [HttpGet] public async Task<ActionResult<IEnumerable<TaskProduzione>>> Get() => await _context.TaskProduzione.Include(t => t.Macchina).Include(t => t.Operatore).ToListAsync();
        [HttpGet("{id}")] public async Task<ActionResult<TaskProduzione>> GetById(int id) => await _context.TaskProduzione.Include(t => t.Macchina).Include(t => t.Operatore).FirstOrDefaultAsync(t => t.Id == id) is TaskProduzione t ? Ok(t) : NotFound();
        [HttpPost] public async Task<ActionResult<TaskProduzione>> Post(TaskProduzione task) { _context.TaskProduzione.Add(task); await _context.SaveChangesAsync(); return CreatedAtAction(nameof(Get), new { id = task.Id }, task); }
        [HttpPut("{id}")] public async Task<IActionResult> Put(int id, TaskProduzione task) { if (id != task.Id) return BadRequest(); _context.Entry(task).State = EntityState.Modified; await _context.SaveChangesAsync(); return NoContent(); }
        [HttpDelete("{id}")] public async Task<ActionResult<TaskProduzione>> Delete(int id) { var t = await _context.TaskProduzione.FindAsync(id); if (t == null) return NotFound(); _context.TaskProduzione.Remove(t); await _context.SaveChangesAsync(); return NoContent(); }
    }
}