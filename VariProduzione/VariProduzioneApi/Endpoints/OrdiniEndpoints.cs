using Microsoft.EntityFrameworkCore;

namespace VariProduzioneApi.Endpoints;

public static class OrdiniEndpoints
{
    public static IEndpointRouteBuilder MapOrdiniEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/ordini")
            .WithTags("Ordini")
            .WithOpenApi();

        // GET /api/ordini
        group.MapGet("/", async (Services.IOrdineService service) =>
        {
            var ordini = await service.GetAllAsync();
            return Results.Ok(ordini);
        })
        .WithName("GetOrdini")
        .Produces<IEnumerable<DTOs.OrdineListItemDto>>(StatusCodes.Status200OK);

        // GET /api/ordini/{id}
        group.MapGet("/{id:int}", async (int id, Services.IOrdineService service) =>
        {
            var ordine = await service.GetByIdAsync(id);
            return ordine is not null ? Results.Ok(ordine) : Results.NotFound();
        })
        .WithName("GetOrdineById")
        .Produces<DTOs.OrdineDetailDto>(StatusCodes.Status200OK)
        .Produces(StatusCodes.Status404NotFound);

        // POST /api/ordini
        group.MapPost("/", async (DTOs.CreaOrdineDto dto, Services.IOrdineService service) =>
        {
            try
            {
                var ordine = await service.CreateAsync(dto);
                return Results.Created($"/api/ordini/{ordine.Id}", ordine);
            }
            catch (DbUpdateException ex) when (ex.InnerException?.Message.Contains("UNIQUE") == true)
            {
                return Results.Problem("Codice ordine già esistente", statusCode: StatusCodes.Status409Conflict);
            }
        })
        .WithName("CreateOrdine")
        .Produces<DTOs.OrdineDetailDto>(StatusCodes.Status201Created)
        .ProducesProblem(StatusCodes.Status409Conflict);

        // PUT /api/ordini/{id}
        group.MapPut("/{id:int}", async (int id, DTOs.AggiornaOrdineDto dto, Services.IOrdineService service) =>
        {
            var ordine = await service.UpdateAsync(id, dto);
            return ordine is not null ? Results.Ok(ordine) : Results.NotFound();
        })
        .WithName("UpdateOrdine")
        .Produces<DTOs.OrdineDetailDto>(StatusCodes.Status200OK)
        .Produces(StatusCodes.Status404NotFound);

        // DELETE /api/ordini/{id}
        group.MapDelete("/{id:int}", async (int id, Services.IOrdineService service) =>
        {
            var deleted = await service.DeleteAsync(id);
            return deleted ? Results.NoContent() : Results.NotFound();
        })
        .WithName("DeleteOrdine")
        .Produces(StatusCodes.Status204NoContent)
        .Produces(StatusCodes.Status404NotFound);

        // PUT /api/ordini/{id}/progresso
        group.MapPut("/{id:int}/progresso", async (int id, DTOs.AggiornaProgressoOrdineDto dto, Services.IOrdineService service) =>
        {
            var ordine = await service.UpdateProgressoAsync(id, dto);
            return ordine is not null ? Results.Ok(ordine) : Results.NotFound();
        })
        .WithName("UpdateOrdineProgresso")
        .Produces<DTOs.OrdineDetailDto>(StatusCodes.Status200OK)
        .Produces(StatusCodes.Status404NotFound);

        return app;
    }
}