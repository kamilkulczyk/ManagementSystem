using ManagementSystemApi.Models;
using Supabase;

namespace ManagementSystemApi.Services
{
  public class ColumnService
  {
    private readonly Client _supabase;

    public ColumnService(Client supabase)
    {
      _supabase = supabase;
    }

    public async Task<List<Column>> GetAllColumns()
    {
      var response = await _supabase.From<Column>().Get();
      return response.Models;
    }

    public async Task<Column?> GetColumnById(Guid columnId)
    {
      return await _supabase.From<Column>()
        .Filter("id", Postgrest.Constants.Operator.Equals, columnId)
        .Single();
    }

    public async Task<Column> CreateColumn(Column column)
    {
      var response = await _supabase.From<Column>().Insert(column);
      return response.Models[0];
    }

    public async Task<bool> DeleteColumn(Guid columnId)
    {
      await _supabase.From<Column>()
          .Filter("id", Postgrest.Constants.Operator.Equals, columnId)
          .Delete();

      return true;
    }
  }
}
