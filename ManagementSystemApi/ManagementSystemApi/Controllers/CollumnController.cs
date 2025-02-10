using ManagementSystemApi.Models;
using ManagementSystemApi.Services;

using Microsoft.AspNetCore.Mvc;

namespace ManagementSystemApi.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class ColumnController : ControllerBase
  {
    private readonly ColumnService _columnService;

    public ColumnController(ColumnService columnService)
    {
      _columnService = columnService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Column>>> GetColumns()
    {
      return Ok(await _columnService.GetAllColumns());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Column>> GetColumn(Guid id)
    {
      var column = await _columnService.GetColumnById(id);
      if (column == null) return NotFound($"Column with ID {id} not found.");
      return Ok(column);
    }

    [HttpPost]
    public async Task<ActionResult<Column>> CreateColumn([FromBody] Column column)
    {
      var newColumn = await _columnService.CreateColumn(column);
      return CreatedAtAction(nameof(GetColumn), new { id = newColumn.Id }, newColumn);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteColumn(Guid id)
    {
      bool deleted = await _columnService.DeleteColumn(id);
      if (!deleted) return NotFound();
      return NoContent();
    }
  }
}
