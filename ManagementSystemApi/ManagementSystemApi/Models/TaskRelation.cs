using Postgrest.Attributes;
using Postgrest.Models;

namespace ManagementSystemApi.Models
{
  [Table("TaskRelations")]
  public class TaskRelation : BaseModel
  {
    [PrimaryKey("id")]
    public Guid Id { get; set; }

    [Column("TaskId")]
    public Guid TaskId { get; set; }

    [Column("RelatedTaskId")]
    public Guid RelatedTaskId { get; set; }

    [Column("RelationType")]
    public string RelationType { get; set; } // "Parent", "Related"
  }
}