using DetranCors.Model;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DetranCors.Data
{
    public class DataBaseContext : IdentityDbContext
    {
        public DataBaseContext(DbContextOptions<DataBaseContext> options) : base(options)
        {
            //Database.EnsureCreated();
        }

        public DbSet<Condutor> Condutor { get; set; }
        public DbSet<Veiculo> Veiculo { get; set; }
        public DbSet<Venda> Venda { get; set; }

    }

    public static class DbInitializer
    {
        public static void Initialize(DataBaseContext context)
        {
            context.Database.EnsureCreated();
        }
    }
}
