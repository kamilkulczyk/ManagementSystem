using Microsoft.AspNetCore.Mvc;

using ManagementSystemApi.Models;

namespace ManagementSystemApi.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class UserController : ControllerBase
  {
    private readonly Supabase.Client _supabase;

    public UserController(Supabase.Client supabase)
    {
      _supabase = supabase;
    }

    [HttpGet]
    public async Task<IActionResult> GetUsers()
    {
      var response = await _supabase.From<User>().Get();
      return Ok(response.Models);  // Return users from Supabase
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetUserById(Guid id)
    {
      var response = await _supabase
          .From<User>()
          .Filter("id", Postgrest.Constants.Operator.Equals, id)
          .Get();

      if (!response.Models.Any()) return NotFound("User not found");

      return Ok(response.Models.First());
    }

    [HttpPost]
    public async Task<IActionResult> CreateUser([FromBody] User user)
    {
      var response = await _supabase.From<User>().Insert(user);
      return CreatedAtAction(nameof(GetUserById), new { id = user.Id }, user);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateUser(Guid id, [FromBody] User user)
    {
      user.Id = id; // Ensure ID remains the same
      var response = await _supabase.From<User>().Update(user);
      return Ok(response.Models.First());
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(Guid id)
    {
      var user = new User { Id = id };
      await _supabase.From<User>().Delete(user);
      return NoContent();
    }
  }
}
