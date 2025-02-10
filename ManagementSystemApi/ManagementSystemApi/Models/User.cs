using Postgrest.Attributes;
using Postgrest.Models;
using System.Text.Json.Serialization;

namespace ManagementSystemApi.Models
{
  [Table("Users")]
  public class User : BaseModel
  {
    [PrimaryKey("id")]
    [JsonIgnore]
    public Guid Id { get; set; }

    [Column("Name")]
    public string Name { get; set; }

    [Column("Email")]
    public string Email { get; set; }
  }
}