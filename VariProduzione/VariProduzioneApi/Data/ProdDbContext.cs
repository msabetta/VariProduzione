using Microsoft.EntityFrameworkCore;
using VariProduzioneApi.Models;


namespace VariProduzioneApi.Data;

public class ProdDbContext : DbContext
{
    public ProdDbContext(DbContextOptions<ProdDbContext> options) : base(options) { }

    public DbSet<Ordine> Ordini => Set<Ordine>();
    public DbSet<Macchina> Macchine => Set<Macchina>();
    public DbSet<Operatore> Operatori => Set<Operatore>();
    public DbSet<TaskProduzione> Tasks => Set<TaskProduzione>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Macchina>()
            .Property(m => m.TassoUtilizzo)
            .HasPrecision(5, 2);

        modelBuilder.Entity<Operatore>()
            .Property(o => o.EfficienzaMedia)
            .HasPrecision(5, 2);

        modelBuilder.Entity<Ordine>()
            .Property(o => o.CostoStimato)
            .HasPrecision(18, 2);

        modelBuilder.Entity<TaskProduzione>(entity =>
        {
            entity.Property(t => t.CostoMateriali).HasPrecision(18, 2);
            entity.Property(t => t.OreReali).HasPrecision(8, 2);
            entity.Property(t => t.OreStimate).HasPrecision(8, 2);
        });

        // === ORDINI ===
        modelBuilder.Entity<Ordine>()
            .HasIndex(o => new { o.Stato, o.DataScadenza })
            .HasDatabaseName("IX_Ordine_Stato_DataScadenza");

        // === TASK ===
        modelBuilder.Entity<TaskProduzione>()
            .HasIndex(t => new { t.OrdineId, t.MacchinaId, t.Stato })
            .HasDatabaseName("IX_Task_Ordine_Macchina_Stato");

        // === DataInizio ===
        modelBuilder.Entity<TaskProduzione>()
            .HasIndex(t => t.DataInizio)
            .HasDatabaseName("IX_Task_DataInizio");

        // === MACCHINE ===
        modelBuilder.Entity<Macchina>()
            .HasIndex(m => m.Codice)
            .IsUnique()
            .HasDatabaseName("IX_Macchina_Codice_Unique");

        // === OPERATORI ===
        modelBuilder.Entity<Operatore>()
            .HasIndex(o => o.Attivo)
            .HasDatabaseName("IX_Operatore_Attivo");

        modelBuilder.Entity<Operatore>()
            .HasIndex(o => o.Matricola)
            .IsUnique()
            .HasDatabaseName("IX_Operatore_Matricola_Unique");

    }
}