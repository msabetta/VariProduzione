using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using VariProduzioneApi.DTOs;
using VariProduzioneApi.Services;

namespace VariProduzioneApi.Endpoints;

public static class ProduzioneEndpoints
{
    public static IEndpointRouteBuilder MapProduzioneEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/produzione")
            .WithTags("Produzione")
            .WithOpenApi();

        // GET /api/produzione/dashboard
        group.MapGet("/dashboard", async (IOrdineService service) =>
        {
            var dashboard = await service.GetDashboardAsync();
            return Results.Ok(dashboard);
        })
        .WithName("GetDashboard")
        .Produces<DashboardDto>(StatusCodes.Status200OK);

        // GET /api/produzione/ordini-ritardo
        group.MapGet("/ordini-ritardo", async (IOrdineService service) =>
        {
            var ordini = await service.GetOrdiniInRitardoAsync();
            return Results.Ok(ordini);
        })
        .WithName("GetOrdiniRitardo")
        .Produces<IEnumerable<AlertDto>>(StatusCodes.Status200OK);

        // GET /api/produzione/gantt
        group.MapGet("/gantt", async (IOrdineService service) =>
        {
            var gantt = await service.GetGanttDataAsync();
            return Results.Ok(gantt);
        })
        .WithName("GetGanttData")
        .Produces<GanttDataDto>(StatusCodes.Status200OK);

        // POST /api/produzione/ordini (legacy)
        group.MapPost("/ordini", async (CreaOrdineDto dto, IOrdineService service) =>
        {
            var ordine = await service.CreateOrdineAsync(dto);
            return Results.Created($"/api/ordini/{ordine.Id}", ordine);
        })
        .WithName("CreateOrdineLegacy")
        .Produces<OrdineDetailDto>(StatusCodes.Status201Created);

        // PUT /api/produzione/ordini/{id}/progresso (legacy)
        group.MapPut("/ordini/{id}/progresso", async (int id, AggiornaProgressoOrdineDto dto, IOrdineService service) =>
        {
            var ordine = await service.UpdateProgressoOrdineAsync(id, dto);
            return ordine is not null ? Results.Ok(ordine) : Results.NotFound();
        })
        .WithName("UpdateProgressoLegacy")
        .Produces<OrdineDetailDto>(StatusCodes.Status200OK)
        .Produces(StatusCodes.Status404NotFound);

        return app;
    }
}