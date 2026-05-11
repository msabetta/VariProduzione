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

var builder = WebApplication.CreateBuilder(args);

// --- Servizi Core ---
builder.Services.AddDbContext<ProdDbContext>(opt =>
    opt.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection") 
    ?? "Server=.;Database=VariProduzione;Trusted_Connection=true;TrustServerCertificate=true;"));

builder.Services.AddScoped<IOrdineService, OrdineService>();
builder.Services.AddScoped<IMacchinaService, MacchinaService>();
builder.Services.AddScoped<IOperatoreService, OperatoreService>();

// --- Utility & Infrastructure ---
builder.Services.AddCors(opt =>
{
    opt.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApi();

var app = builder.Build();

// --- Middleware Pipeline ---
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.UseHttpsRedirection();
app.UseCors();

// --- Mapping Endpoints ---
app.MapProduzionApi();
app.MapGestioneApi();

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

app.Run();