using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using VariProduzioneApi.DTOs;
using VariProduzioneApi.Services;

namespace VariProduzioneApi.Endpoints;

public static class GestioneEndpoints
{
    public static IEndpointRouteBuilder MapGestioneEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/gestione")
            .WithTags("Gestione");

        // ========== MACCHINE ==========

        // GET /api/gestione/macchine
        // group.MapGet("/macchine", async (IMacchinaService service) =>
        // {
        //     var macchine = await service.GetAllMacchineAsync();
        //     return Results.Ok(macchine);
        // })
        // .WithName("GetMacchine")
        // .Produces<IEnumerable<MacchinaStatusDto>>(StatusCodes.Status200OK);

        // PUT /api/gestione/macchine/{id}/stato
        group.MapPut("/macchine/{id}/stato", async (int id, [FromBody] CambiaStatoMacchinaDto dto, IMacchinaService service) =>
        {
            var macchina = await service.UpdateStatoMacchinaAsync(id, dto);
            return macchina is not null ? Results.Ok(macchina) : Results.NotFound();
        })
        .WithName("UpdateStatoMacchina")
        .Produces<MacchinaStatusDto>(StatusCodes.Status200OK)
        .Produces(StatusCodes.Status404NotFound);

        // ========== OPERATORI ==========

        // GET /api/gestione/operatori
        group.MapGet("/operatori", async (IOperatoreService service) =>
        {
            var operatori = await service.GetAllOperatoriAsync();
            return Results.Ok(operatori);
        })
        .WithName("GetOperatori")
        .Produces<IEnumerable<OperatoreListItemDto>>(StatusCodes.Status200OK);

        // POST /api/gestione/operatori
        group.MapPost("/operatori", async ([FromBody] CreaOperatoreDto dto, IOperatoreService service) =>
        {
            var operatore = await service.CreateOperatoreAsync(dto);
            return Results.Created($"/api/gestione/operatori/{operatore.Id}", operatore);
        })
        .WithName("CreateOperatore")
        .Produces<OperatoreDetailDto>(StatusCodes.Status201Created);

        return app;
    }
}