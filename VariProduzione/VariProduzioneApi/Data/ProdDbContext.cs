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

        // Configurazione Ordine
        modelBuilder.Entity<Ordine>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Codice).IsRequired().HasMaxLength(50);
            entity.Property(e => e.Cliente).IsRequired().HasMaxLength(200);
            entity.HasIndex(e => e.Codice).IsUnique();
        });

        // Configurazione Macchina
        modelBuilder.Entity<Macchina>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Codice).IsRequired().HasMaxLength(50);
            entity.Property(e => e.Nome).IsRequired().HasMaxLength(200);
            entity.HasIndex(e => e.Codice).IsUnique();
        });

        // Configurazione Operatore
        modelBuilder.Entity<Operatore>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Nome).IsRequired().HasMaxLength(100);
            entity.Property(e => e.Cognome).IsRequired().HasMaxLength(100);
        });

        // Configurazione TaskProduzione
        modelBuilder.Entity<TaskProduzione>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Titolo).IsRequired().HasMaxLength(200);
            
            entity.HasOne(e => e.Ordine)
                  .WithMany(o => o.Tasks)
                  .HasForeignKey(e => e.OrdineId)
                  .OnDelete(DeleteBehavior.SetNull);
                  
            entity.HasOne(e => e.Macchina)
                  .WithMany(m => m.TasksAssegnati)
                  .HasForeignKey(e => e.MacchinaId)
                  .OnDelete(DeleteBehavior.SetNull);
                  
            entity.HasOne(e => e.Operatore)
                  .WithMany(o => o.TasksAssegnati)
                  .HasForeignKey(e => e.OperatoreId)
                  .OnDelete(DeleteBehavior.SetNull);
        });
    }
}