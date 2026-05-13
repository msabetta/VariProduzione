using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using System.Threading.Tasks;
using VariProduzioneApi.Models;
using VariProduzioneApi.Services;

namespace VariProduzioneApi.Endpoints
{
    public static class ProduzioneEndpoints
    {
        public static void MapProduzioneApi(this IEndpointRouteBuilder app)
        {
            var group = app.MapGroup("/api/produzione")
                .WithTags("Produzione")
                .WithOpenApi();

            // Dashboard principale
            group.MapGet("/dashboard", GetDashboard)
                .WithName("GetDashboard")
                .WithDescription("Pannello di controllo principale con KPI, alert e status macchine");

            // Ordini in ritardo
            group.MapGet("/ordini-ritardo", GetOrdiniRitardo)
                .WithName("GetOrdiniRitardo")
                .WithDescription("Lista ordini in ritardo sulla scadenza");

            // Dati Gantt
            group.MapGet("/gantt", GetGanttData)
                .WithName("GetGanttData")
                .WithDescription("Dati per visualizzazione Gantt dinamica");

            // Creare ordine
            group.MapPost("/ordini", CreateOrdine)
                .WithName("CreateOrdine")
                .WithDescription("Crea nuovo ordine di produzione");

            // Update progresso - CORREZIONE: Aggiunto [FromBody]
            group.MapPut("/ordini/{id}/progresso", UpdateProgresso)
                .WithName("UpdateProgresso")
                .WithDescription("Aggiorna progresso ordine");
        }

        private static async Task<IResult> GetDashboard(IOrdineService service)
        {
            var dashboard = await service.GetDashboardAsync();
            return Results.Ok(dashboard);
        }

        private static async Task<IResult> GetOrdiniRitardo(IOrdineService service)
        {
            var ordini = await service.GetOrdiniInRitardoAsync();
            return Results.Ok(ordini);
        }

        private static async Task<IResult> GetGanttData(IOrdineService service)
        {
            var gantt = await service.GetGanttDataAsync();
            return Results.Ok(gantt);
        }

        private static async Task<IResult> CreateOrdine(
            IOrdineService service,
            [FromBody] Ordine ordine)
        {
            var result = await service.CreateOrdineAsync(ordine);
            return Results.Created($"/api/produzione/ordini/{result.Id}", result);
        }

        // CORREZIONE: Aggiunto [FromBody] UpdateProgressoRequest
        private static async Task<IResult> UpdateProgresso(
            IOrdineService service,
            int id,
            [FromBody] UpdateProgressoRequest request)
        {
            await service.UpdateProgressoOrdineAsync(id);
            return Results.Ok(new { messaggio = "Progresso aggiornato", nuovoProgresso = request.ProgressoPercentuale });
        }
    }

    // CORREZIONE: DTO per la richiesta di aggiornamento progresso
    public record UpdateProgressoRequest(int ProgressoPercentuale);
}