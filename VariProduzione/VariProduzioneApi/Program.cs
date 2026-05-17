using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using System.Text.Json;
using VariProduzioneApi.Data;
using VariProduzioneApi.Services;
using VariProduzioneApi.Endpoints;

var builder = WebApplication.CreateBuilder(args);

// Connection string debug
Console.WriteLine("Connection string usata:");
Console.WriteLine(builder.Configuration.GetConnectionString("DefaultConnection"));

// Database
builder.Services.AddDbContext<ProdDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Servizi
builder.Services.AddScoped<IOrdineService, OrdineService>();
builder.Services.AddScoped<IMacchinaService, MacchinaService>();
builder.Services.AddScoped<IOperatoreService, OperatoreService>();
builder.Services.AddScoped<ITaskService, TaskService>();

// Controllers
builder.Services.AddControllers();

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173", "http://localhost:4200", "http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// JSON
builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.Converters.Add(new JsonStringEnumConverter());
    options.SerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
    options.SerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
});

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Middleware
app.UseCors("AllowFrontend");

// Swagger UI - SEMPRE ATTIVO
app.UseSwagger();
app.UseSwaggerUI(options =>
{
    options.SwaggerEndpoint("/swagger/v1/swagger.json", "VariProduzione API v1");
    options.RoutePrefix = "swagger";
});

app.UseAuthorization();
app.MapControllers();

// Minimal API endpoints
app.MapOrdiniEndpoints();
app.MapMacchineEndpoints();
app.MapTasksEndpoints();

// Root
app.MapGet("/", () => Results.Ok(new
{
    app = "VariProduzione API",
    version = "1.1.0",
    status = "Running",
    swagger = "http://localhost:5000/swagger"
}));

app.MapGet("/health", () => Results.Ok(new { status = "Healthy", timestamp = DateTime.UtcNow }));

// Inizializzazione database (UNA SOLA VOLTA)
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<ProdDbContext>();
        DbInitializer.Initialize(context);
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "Errore durante l'inizializzazione del DB.");
    }
}

app.Run();