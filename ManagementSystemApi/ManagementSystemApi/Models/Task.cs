using Postgrest.Attributes;
using Postgrest.Models;

namespace ManagementSystemApi.Models
{
  [Table("Tasks")]
  public class Task : BaseModel
  {
    [PrimaryKey("id")]
    public Guid Id { get; set; }

    [Column("CreationTime")]
    public DateTime CreationTime { get; set; }

    [Column("Title")]
    public string Title { get; set; }

    [Column("Description")]
    public string Description { get; set; }

    [Column("StatusId")]
    public Guid StatusId { get; set; }

    [Column("AssignedUser")]
    public Guid? AssignedUser { get; set; }
  }
}