using Postgrest.Models;
using Supabase;

using Task = ManagementSystemApi.Models.Task;

namespace ManagementSystemApi.Services
{
  public class TaskService
  {
    private readonly Client _supabase;

    public TaskService(Client supabase)
    {
      _supabase = supabase;
    }

    public async Task<List<Task>> GetAllTasks()
    {
      var response = await _supabase.From<Task>().Get();
      return response.Models;
    }

    public async Task<Task?> GetTaskById(Guid taskId)
    {
      return await _supabase.From<Task>()
          .Filter("id", Postgrest.Constants.Operator.Equals, taskId)
      .Single();
    }

    public async Task<Task> CreateTask(Task task)
    {
      var response = await _supabase.From<Task>().Insert(task);
      return response.Models[0];
    }

    public async Task<Task?> UpdateTaskStatus(Guid taskId, Guid statusId)
    {
      var task = await GetTaskById(taskId);
      if (task == null) return null;

      task.StatusId = statusId;
      var response = await _supabase.From<Task>().Update(task);
      return response.Models[0];
    }

    public async Task<bool> DeleteTask(Guid taskId)
    {
      await _supabase.From<Task>()
        .Filter("id", Postgrest.Constants.Operator.Equals, taskId)
        .Delete();

      return true;
    }
  }
}
