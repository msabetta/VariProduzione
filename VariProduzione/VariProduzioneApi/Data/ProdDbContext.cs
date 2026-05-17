using Microsoft.EntityFrameworkCore;
using VariProduzioneApi.Models;


namespace VariProduzioneApi.Data;

public class ProdDbContext : DbContext
{
    public ProdDbContext(DbContextOptions<ProdDbContext> options) : base(options) { }

    public DbSet<Ordine> Ordini => Set<Ordine>();
    public DbSet<Macchina> Macchine => Set<Macchina>();
    public DbSet<Operatore> Operatori => Set<Operatore>();
    public DbSet<TaskProduzione> TaskProduzione => Set<TaskProduzione>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Macchina
        modelBuilder.Entity<Macchina>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Nome).HasMaxLength(100).IsRequired();
            entity.Property(e => e.TipoMacchina).HasMaxLength(50);
            entity.Property(e => e.TassoUtilizzo).HasPrecision(5, 2);
            entity.Property(e => e.Stato).HasMaxLength(20);
        });

        // Operatore
        modelBuilder.Entity<Operatore>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Nome).HasMaxLength(100).IsRequired();
            entity.Property(e => e.Cognome).HasMaxLength(100).IsRequired();
            entity.Property(e => e.Matricola).HasMaxLength(20).IsRequired();
            entity.HasIndex(e => e.Matricola).IsUnique();
            entity.Property(e => e.EfficienzaMedia).HasPrecision(5, 2);
        });

        // Ordine
        modelBuilder.Entity<Ordine>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Codice).HasMaxLength(50).IsRequired();
            entity.HasIndex(e => e.Codice).IsUnique();
            entity.Property(e => e.Cliente).HasMaxLength(100);
            entity.Property(e => e.CostoStimato).HasPrecision(18, 2);
            entity.Property(e => e.Stato).HasMaxLength(20);
        });

        // TaskProduzione
        modelBuilder.Entity<TaskProduzione>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Nome).HasMaxLength(100).IsRequired();
            entity.Property(e => e.Descrizione).HasMaxLength(500);
            entity.Property(e => e.CostoMateriali).HasPrecision(18, 2);
            entity.Property(e => e.OreStimate).HasPrecision(8, 2);
            entity.Property(e => e.OreReali).HasPrecision(8, 2);
            entity.Property(e => e.Stato).HasMaxLength(20);

            // Relazioni
            entity.HasOne(t => t.Ordine)
                  .WithMany(o => o.Tasks)
                  .HasForeignKey(t => t.OrdineId)
                  .OnDelete(DeleteBehavior.SetNull);

            entity.HasOne(t => t.Macchina)
                  .WithMany()
                  .HasForeignKey(t => t.MacchinaId)
                  .OnDelete(DeleteBehavior.SetNull);

            entity.HasOne(t => t.Operatore)
                  .WithMany()
                  .HasForeignKey(t => t.OperatoreId)
                  .OnDelete(DeleteBehavior.SetNull);
        });
    }
}