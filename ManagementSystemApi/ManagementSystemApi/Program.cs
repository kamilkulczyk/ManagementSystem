using ManagementSystemApi.Services;

using Supabase;
using Newtonsoft.Json;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers()
    .AddNewtonsoftJson(options =>
    {
      options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
    });

var supabase = new Supabase.Client(
  builder.Configuration["SupabaseUrl"],
  builder.Configuration["SupabaseKey"],
  new SupabaseOptions
{
  AutoRefreshToken = true,
  AutoConnectRealtime = true
});

builder.Services.AddSingleton(supabase);
builder.Services.AddControllers();

builder.Services.AddScoped<TaskService>();
builder.Services.AddScoped<ColumnService>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
  options.AddPolicy("AllowAll",
      policy =>
      {
        policy.AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader();
      });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowAll");
app.MapControllers();
app.Run();
