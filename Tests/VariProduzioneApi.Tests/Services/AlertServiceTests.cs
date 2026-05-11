using VariProduzioneApi.Models;
using Xunit;

namespace VariProduzioneApi.Tests.Services
{
    public class AlertServiceTests
    {
        [Fact]
        public void GetCriticalAlerts_ReturnsCriticalAlerts()
        {
            // Arrange
            var alerts = new List<Alert>
            {
                new Alert
                {
                    Tipo = AlertTipo.OverdueOrder,
                    Severity = AlertSeverity.Critical,
                    Message = "Overdue order alert",
                    DateRaised = DateTime.Today
                },
                new Alert
                {
                    Tipo = AlertTipo.HighCostOrder,
                    Severity = AlertSeverity.Medium,
                    Message = "High cost order alert",
                    DateRaised = DateTime.Today
                }
                new Alert
                {
                    Tipo = AlertTipo.LowStock,
                    Severity = AlertSeverity.Low,
                    Message = "Low stock alert",
                    DateRaised = DateTime.Today
                }
                new Alert
                {
                    Tipo = AlertTipo.LowStock,
                    Severity = AlertSeverity.Low,
                    Message = "Low stock alert",
                    DateRaised = DateTime.Today
                }
                new Alert
                {
                    Tipo = AlertTipo.LowStock,
                    Severity = AlertSeverity.Low,
                    Message = "Low stock alert",
                    DateRaised = DateTime.Today
                }
                new Alert
                {
                    Tipo = AlertTipo.LowStock,
                    Severity = AlertSeverity.Low,
                    Message = "Low stock alert",
                    DateRaised = DateTime.Today
                }
            };

            // Act
            var result = alerts.Where(a => a.Severity == AlertSeverity.Critical).ToList();
            var result2 = alerts.Where(a => a.Severity == AlertSeverity.Medium).ToList();
            var result3 = alerts.Where(a => a.Severity == AlertSeverity.Low).ToList();
            // Assert
            Assert.Single(result);
            Assert.Single(result2);
            Assert.Single(result3);
            Assert.Equal(AlertTipo.OverdueOrder, result[0].Tipo);
            Assert.Equal(AlertSeverity.Critical, result[0].Severity);
            Assert.Equal("Overdue order alert", result[0].Message);
            Assert.Equal(DateTime.Today, result[0].DateRaised);
        }
    }
}
