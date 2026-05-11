using VariProduzioneApi.Models;
using Xunit;

namespace VariProduzioneApi.Tests.Services
{
    public class OrdineServiceTests
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

        [Fact]
        public void GetMediumAlerts_ReturnsMediumAlerts()
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
                },
                new Alert
                {
                    Tipo = AlertTipo.LowStock,
                    Severity = AlertSeverity.Low,
                    Message = "Low stock alert",
                    DateRaised = DateTime.Today
                }
            };

            // Act
            var result = alerts.Where(a => a.Severity == AlertSeverity.Medium).ToList();
            var result2 = alerts.Where(a => a.Severity == AlertSeverity.Critical).ToList();
            var result3 = alerts.Where(a => a.Severity == AlertSeverity.Low).ToList();


            // Assert
            Assert.Single(result);
            Assert.Single(result2);
            Assert.Single(result3);
            Assert.Equal(AlertTipo.HighCostOrder, result[0].Tipo);
            Assert.Equal(AlertSeverity.Medium, result[0].Severity);
            Assert.Equal("High cost order alert", result[0].Message);
            Assert.Equal(DateTime.Today, result[0].DateRaised);
            Assert.Equal(AlertTipo.LowStock, result3[0].Tipo);
            Assert.Equal(AlertSeverity.Low, result3[0].Severity);
            Assert.Equal("Low stock alert", result3[0].Message);
            Assert.Equal(DateTime.Today, result3[0].DateRaised);
        }

        [Fact]
        public void GetLowAlerts_ReturnsLowAlerts()
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
                },
                new Alert
                {
                    Tipo = AlertTipo.LowStock,
                    Severity = AlertSeverity.Low,
                    Message = "Low stock alert",
                    DateRaised = DateTime.Today
                },
                new Alert
                {
                    Tipo = AlertTipo.LateOrder,
                    Severity = AlertSeverity.Low,
                    Message = "Late order alert",
                    DateRaised = DateTime.Today
                }
            };

            // Act
            var result = alerts.Where(a => a.Severity == AlertSeverity.Low).ToList();
            var result2 = alerts.Where(a => a.Severity == AlertSeverity.Medium).ToList();
            var result3 = alerts.Where(a => a.Severity == AlertSeverity.Critical).ToList();

            // Assert
            Assert.Equal(2, result.Count);
            Assert.Single(result2);
            Assert.Single(result3);
            Assert.Equal(AlertTipo.OverdueOrder, result3[0].Tipo);
            Assert.Equal(AlertSeverity.Critical, result3[0].Severity);
            Assert.Equal("Overdue order alert", result3[0].Message);
            Assert.Equal(DateTime.Today, result[0].DateRaised);
        }
    }
}