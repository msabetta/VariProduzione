using Xunit;
using VariProduzioneApi.Data;
using VariProduzioneApi.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace VariProduzioneApi.Tests.Data
{
    public class DbInitializerTests
    {
        [Fact]
        public void Initialize_ShouldSeedDatabase_WithAllData() {
            // Arrange
            var options = new DbContextOptionsBuilder<ProdDbContext>()
                .UseInMemoryDatabase(databaseName: "SeedTestDb")
                .Options;

            using (var context = new ProdDbContext(options))
            {
                // Act
                DbInitializer.Initialize(context);

                // Assert
                Assert.Equal(3, context.Ordini.Count());
                Assert.Equal(1, context.Tasks.Count());
                Assert.Equal(5, context.Macchine.Count());

                //ordine
                var ordine1 = context.Ordini.First(o => o.Numero == "ORD-2024-001");
                Assert.Equal(StatoOrdine.Ritardato, ordine1.Stato);

                //macchina
                var macchina1 = context.Macchine.First(m => m.Nome.Contains("Tornio CNC-1"));
                Assert.Equal(StatoMacchina.Operativa, macchina1.Stato);

                //task
                var task1 = context.Tasks.First(t => t.Nome == "Task 1");
                Assert.Equal(StatoTask.NonInizziato, task1.Stato);
            }
        }
    }
}