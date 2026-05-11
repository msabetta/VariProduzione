using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using System.Threading.Tasks;
using VariProduzioneApi.Models;
using VariProduzioneApi.Services;

namespace VariProduzioneApi.Endpoints
{
    public static class GestioneEndpoints
    {
        public static void MapGestioneApi(this IEndpointRouteBuilder app)
        {
            var group = app.MapGroup("/api/gestione")
                .WithTags("Gestione")
                .WithOpenApi();

            // Macchine
            group.MapGet("/macchine", async (IMacchinaService service) => 
                Results.Ok(await service.GetAllMacchineAsync()))
                .WithName("GetMacchine");

            group.MapPut("/macchine/{id}/stato", async (IMacchinaService service, int id, [FromBody] StatoMacchina stato) => 
                Results.Ok(await service.UpdateStatoMacchinaAsync(id, stato)))
                .WithName("UpdateStatoMacchina");

            // Operatori
            group.MapGet("/operatori", async (IOperatoreService service) => 
                Results.Ok(await service.GetAllOperatoriAsync()))
                .WithName("GetOperatori");

            group.MapPost("/operatori", async (IOperatoreService service, [FromBody] Operatore operatore) => 
                Results.Created($"/api/gestione/operatori/{operatore.Id}", await service.CreateOperatoreAsync(operatore)))
                .WithName("CreateOperatore");
        }
    }
}
