using Microsoft.AspNetCore.Mvc;

using ManagementSystemApi.Models;

namespace ManagementSystemApi.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class StatusController : ControllerBase
  {
    private readonly Supabase.Client _supabase;

    public StatusController(Supabase.Client supabase)
    {
      _supabase = supabase;
    }

    [HttpGet]
    public async Task<IActionResult> GetStatuses()
    {
      var response = await _supabase.From<Status>().Get();
      return Ok(response.Models);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetStatusById(Guid id)
    {
      var response = await _supabase
          .From<Status>()
          .Filter("id", Postgrest.Constants.Operator.Equals, id)
          .Get();

      if (!response.Models.Any()) return NotFound("Status not found");

      return Ok(response.Models.First());
    }

    [HttpPost]
    public async Task<IActionResult> CreateStatus([FromBody] User user)
    {
      var response = await _supabase.From<User>().Insert(user);
      return CreatedAtAction(nameof(GetStatusById), new { id = user.Id }, user);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateStatus(Guid id, [FromBody] Status status)
    {
      status.Id = id;
      var response = await _supabase.From<Status>().Update(status);
      return Ok(response.Models.First());
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteStatus(Guid id)
    {
      var status = new Status { Id = id };
      await _supabase.From<Status>().Delete(status);
      return NoContent();
    }
  }
}
