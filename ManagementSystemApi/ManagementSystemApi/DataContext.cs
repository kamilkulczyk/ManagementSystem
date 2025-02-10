using ManagementSystemApi.Models;

using Microsoft.EntityFrameworkCore;
using Task = ManagementSystemApi.Models.Task;

namespace ManagementSystemApi
{
  public class DataContext : DbContext
  {
    public DataContext(DbContextOptions<DataContext> options) : base(options) { }

    public DbSet<User> Users { get; set; }
    public DbSet<Task> Tasks { get; set; }
    public DbSet<Column> Columns { get; set; }
  }
}