using Xunit;
using Microsoft.AspNetCore.Mvc.Testing;
using VariProduzioneApi.Models;
using System.Net.Http.Json;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using System.Linq;

namespace VariProduzioneApi.Tests.Endpoints
{
    // Nota: Program deve essere public in VariProduzioneApi/Program.cs 
    // oppure usare un attributo InternalsVisibleTo
    public class OrdiniEndpointsTests : IClassFixture<WebApplicationFactory<Program>>
    {
        private readonly HttpClient _client;

        public OrdiniEndpointsTests(WebApplicationFactory<Program> factory)
        {
            _client = factory.CreateClient();
        }

        [Fact]
        public async Task Get_Dashboard_ReturnsSuccess()
        {
            // Arrange
            var response = await _client.GetAsync("/api/produzione/dashboard");
            var response2 = await _client.GetAsync("/api/produzione/ordini-ritardo");
            var response3 = await _client.GetAsync("/api/produzione/alert");
            

            // Assert
            response.EnsureSuccessStatusCode();
            response2.EnsureSuccessStatusCode();
            response3.EnsureSuccessStatusCode();

            //read from context (sqlite)
            using var context = new AppDbContext();
            var dashboard = await response.Content.ReadFromJsonAsync<object>();
            var ordiniRitardo = await context.Ordini.Where(o => o.Stato == StatoOrdine.Ritardato).ToListAsync();
            var alerts = await context.Alerts.ToListAsync();
            
            //Assert
            Assert.NotNull(dashboard);
            Assert.NotNull(ordiniRitardo);
            Assert.NotNull(alerts);
        }

        [Fact]
        public async Task Get_OrdiniRitardo_ReturnsSuccess()
        {
            // Act
            var response = await _client.GetAsync("/api/produzione/ordini-ritardo");
            var response2 = await _client.GetAsync("/api/produzione/alert");

            // Assert
            response.EnsureSuccessStatusCode();
            response2.EnsureSuccessStatusCode();
            var ordini = await response.Content.ReadFromJsonAsync<List<Ordine>>();
            var alerts = await response2.Content.ReadFromJsonAsync<List<Alert>>();
            Assert.NotNull(ordini);
            Assert.NotNull(alerts);
        }

        [Fact]
        public async Task Get_Alert_ReturnsSuccess()
        {
            // Act
            var response = await _client.GetAsync("/api/produzione/alert");

            // Assert
            response.EnsureSuccessStatusCode();
            var alerts = await response.Content.ReadFromJsonAsync<List<Alert>>();
            Assert.NotNull(alerts);
        }
    }
}