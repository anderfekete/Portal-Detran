using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DetranCors.Data
{
    public class DataBaseContext : IdentityDbContext
    {
        public DataBaseContext(DbContextOptions<DataBaseContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<tbl_condutor> tbl_condutor { get; set; }
        public DbSet<tbl_veiculo> tbl_veiculo { get; set; }

    }
}
