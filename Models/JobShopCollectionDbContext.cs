using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JobShopCollection.Models
{
    public class JobShopCollectionDbContext : DbContext
    {
        public JobShopCollectionDbContext(DbContextOptions<JobShopCollectionDbContext> options)
            : base(options)
        { }

        public DbSet<JobSet> JobSet { get; set; } = null!;
    }
}
