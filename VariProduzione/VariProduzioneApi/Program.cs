using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using VariProduzioneApi.Data;
using VariProduzioneApi.Services;
using VariProduzioneApi.Endpoints;
using Scalar.AspNetCore;
using Swashbuckle.AspNetCore.Swagger;



var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<ProdDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Registrazione servizi
builder.Services.AddScoped<IOrdineService, OrdineService>();
builder.Services.AddScoped<IMacchinaService, MacchinaService>();
builder.Services.AddScoped<IOperatoreService, OperatoreService>();
builder.Services.AddScoped<ITaskService, TaskService>();

builder.Services.AddControllers();
builder.Services.AddOpenApi();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173")  // URL del frontend
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

var app = builder.Build();

app.UseCors("AllowFrontend");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/openapi/v1.json", "VariProduzione API v1");
    });
}

//app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

// Mappatura endpoint
app.MapOrdiniEndpoints();
app.MapMacchineEndpoints();
app.MapTasksEndpoints();
// Rimuovi o commenta se non esistono più:
app.MapProduzioneEndpoints();
app.MapGestioneEndpoints();

// Inizializzazione database
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<ProdDbContext>();
    DbInitializer.Initialize(context);
}

// Root endpoint for health check
app.MapGet("/", () => new { app = "VariProduzione API", version = "1.1.0", status = "Running" });

// --- Database Initialization ---
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

// CORREZIONE: Health check endpoint
app.MapGet("/health", () => Results.Ok(new { status = "Healthy", timestamp = DateTime.UtcNow }));

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
        logger.LogError(ex, "Errore durante l''inizializzazione del DB.");
    }
}

app.MapGet("/scalar",() => Results.Ok(new { message = "API di Produzione - Version 1.1.0"}));


app.Run();
