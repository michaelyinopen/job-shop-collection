using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace JobShopCollection.Models
{
    public class JobSet
    {
        public int Id { get; set; }

        [Required]
        public string? Title { get; set; }

        public string? Description { get; set; }

        [Required]
        public string? Content { get; set; }

        public string? JobColors { get; set; }

        public bool IsAutoTimeOptions { get; set; }

        public string? TimeOptions { get; set; }

        public byte[]? RowVersion { get; set; }
    }
}
