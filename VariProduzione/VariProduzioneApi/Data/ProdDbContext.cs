using Microsoft.EntityFrameworkCore;
using VariProduzioneApi.Models;

namespace VariProduzioneApi.Data
{
    public class ProdDbContext : DbContext
    {
        public DbSet<Ordine> Ordini { get; set; }
        public DbSet<TaskProduzione> Tasks { get; set; }
        public DbSet<Macchina> Macchine { get; set; }
        public DbSet<Operatore> Operatori { get; set; }

        public ProdDbContext(DbContextOptions<ProdDbContext> options) : base(options) { }

        // CORREZIONE: Aggiunto OnConfiguring per supportare dotnet ef migrations
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server=.;Database=VariProduzione;Trusted_Connection=true;TrustServerCertificate=true;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configurazione relazioni
            modelBuilder.Entity<Ordine>()
                .HasMany(o => o.Tasks)
                .WithOne(t => t.Ordine)
                .HasForeignKey(t => t.IdOrdine)
                .OnDelete(DeleteBehavior.Cascade);

            // Indici per performance
            modelBuilder.Entity<Ordine>().HasIndex(o => o.DataScadenza);
            modelBuilder.Entity<Ordine>().HasIndex(o => o.Stato);
            modelBuilder.Entity<TaskProduzione>().HasIndex(t => t.DataFine);

            // CORREZIONE: Aggiunti indici compositi
            modelBuilder.Entity<TaskProduzione>().HasIndex(t => new { t.IdOrdine, t.Stato });
            modelBuilder.Entity<Macchina>().HasIndex(m => m.Stato);
        }
    }
}