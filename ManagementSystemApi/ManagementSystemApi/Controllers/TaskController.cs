using ManagementSystemApi.Services;

using Microsoft.AspNetCore.Mvc;

using Task = ManagementSystemApi.Models.Task;

namespace ManagementSystemApi.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class TaskController : ControllerBase
  {
    private readonly TaskService _taskService;

    public TaskController(TaskService taskService)
    {
      _taskService = taskService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Task>>> GetTasks()
    {
      return Ok(await _taskService.GetAllTasks());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Task>> GetTask(Guid id)
    {
      var task = await _taskService.GetTaskById(id);
      if (task == null) return NotFound($"Task with ID {id} not found.");
      return Ok(task);
    }

    [HttpPost]
    public async Task<ActionResult<Task>> CreateTask([FromBody] Task task)
    {
      var newTask = await _taskService.CreateTask(task);
      return CreatedAtAction(nameof(GetTask), new { id = newTask.Id }, newTask);
    }

    [HttpPut("{id}/status/{statusId}")]
    public async Task<IActionResult> UpdateTaskStatus(Guid id, Guid statusId)
    {
      var updatedTask = await _taskService.UpdateTaskStatus(id, statusId);
      if (updatedTask == null) return NotFound($"Task with ID {id} not found.");
      return Ok(updatedTask);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTask(Guid id)
    {
      bool deleted = await _taskService.DeleteTask(id);
      if (!deleted) return NotFound();
      return NoContent();
    }
  }
}
