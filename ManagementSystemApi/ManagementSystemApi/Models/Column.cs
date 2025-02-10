using Postgrest.Attributes;
using Postgrest.Models;

namespace ManagementSystemApi.Models
{
  [Table("Columns")]
  public class Column : BaseModel
  {
    [PrimaryKey("id")]
    public Guid Id { get; set; }

    [Column("Name")]
    public string Name { get; set; }

    [Column("Order")]
    public int Order { get; set; }

    [Column("StatusId")]
    public Guid StatusId { get; set; }
  }
}