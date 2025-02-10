using Postgrest.Attributes;
using Postgrest.Models;

namespace ManagementSystemApi.Models
{
  [Table("Statuses")]
  public class Status : BaseModel
  {
    [PrimaryKey("id")]
    public Guid Id { get; set; }

    [Column("name")]
    public string Name { get; set; }
  }
}
