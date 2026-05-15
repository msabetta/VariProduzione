using Microsoft.EntityFrameworkCore;

namespace VariProduzioneApi.Endpoints;

public static class MacchineEndpoints
{
    public static IEndpointRouteBuilder MapMacchineEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/macchine")
            .WithTags("Macchine")
            .WithOpenApi();

        // GET /api/macchine
        group.MapGet("/", async (Services.IMacchinaService service) =>
        {
            var macchine = await service.GetAllAsync();
            return Results.Ok(macchine);
        })
        .WithName("GetMacchine")
        .Produces<IEnumerable<DTOs.MacchinaListItemDto>>(StatusCodes.Status200OK);

        // GET /api/macchine/{id}
        group.MapGet("/{id:int}", async (int id, Services.IMacchinaService service) =>
        {
            var macchina = await service.GetByIdAsync(id);
            return macchina is not null ? Results.Ok(macchina) : Results.NotFound();
        })
        .WithName("GetMacchinaById")
        .Produces<DTOs.MacchinaDetailDto>(StatusCodes.Status200OK)
        .Produces(StatusCodes.Status404NotFound);

        // POST /api/macchine
        group.MapPost("/", async (DTOs.CreaMacchinaDto dto, Services.IMacchinaService service) =>
        {
            try
            {
                var macchina = await service.CreateAsync(dto);
                return Results.Created($"/api/macchine/{macchina.Id}", macchina);
            }
            catch (DbUpdateException ex) when (ex.InnerException?.Message.Contains("UNIQUE") == true)
            {
                return Results.Problem("Codice macchina già esistente", statusCode: StatusCodes.Status409Conflict);
            }
        })
        .WithName("CreateMacchina")
        .Produces<DTOs.MacchinaDetailDto>(StatusCodes.Status201Created)
        .ProducesProblem(StatusCodes.Status409Conflict);

        // PUT /api/macchine/{id}
        group.MapPut("/{id:int}", async (int id, DTOs.AggiornaMacchinaDto dto, Services.IMacchinaService service) =>
        {
            var macchina = await service.UpdateAsync(id, dto);
            return macchina is not null ? Results.Ok(macchina) : Results.NotFound();
        })
        .WithName("UpdateMacchina")
        .Produces<DTOs.MacchinaDetailDto>(StatusCodes.Status200OK)
        .Produces(StatusCodes.Status404NotFound);

        // DELETE /api/macchine/{id}
        group.MapDelete("/{id:int}", async (int id, Services.IMacchinaService service) =>
        {
            var deleted = await service.DeleteAsync(id);
            return deleted ? Results.NoContent() : Results.NotFound();
        })
        .WithName("DeleteMacchina")
        .Produces(StatusCodes.Status204NoContent)
        .Produces(StatusCodes.Status404NotFound);

        // PATCH /api/macchine/{id}/stato
        group.MapPatch("/{id:int}/stato", async (int id, DTOs.CambiaStatoMacchinaDto dto, Services.IMacchinaService service) =>
        {
            var macchina = await service.CambiaStatoAsync(id, dto);
            return macchina is not null ? Results.Ok(macchina) : Results.NotFound();
        })
        .WithName("CambiaStatoMacchina")
        .Produces<DTOs.MacchinaDetailDto>(StatusCodes.Status200OK)
        .Produces(StatusCodes.Status404NotFound);

        return app;
    }
}