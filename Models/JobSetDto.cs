using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JobShopCollection.Models
{
    public class JobSetHeaderDto
    {
        public int Id { get; set; }

        public string? Title { get; set; }

        public string? Description { get; set; }
    }

    public class JobSetDto
    {
        public int Id { get; set; }

        public string? Title { get; set; }

        public string? Description { get; set; }

        public string? Content { get; set; }

        public string? JobColors { get; set; }

        public bool IsAutoTimeOptions { get; set; }

        public string? TimeOptions { get; set; }

        [JsonIgnore]
        public byte[]? RowVersion { get; set; }
    }

    public class NewJobSetDto
    {
        public string? Title { get; set; }

        public string? Description { get; set; }

        public string? Content { get; set; }

        public string? JobColors { get; set; }

        public bool IsAutoTimeOptions { get; set; }

        public string? TimeOptions { get; set; }
    }

    public class UpdateJobSetDto
    {
        public int Id { get; set; }

        public string? Title { get; set; }

        public string? Description { get; set; }

        public string? Content { get; set; }

        public string? JobColors { get; set; }

        public bool IsAutoTimeOptions { get; set; }

        public string? TimeOptions { get; set; }
    }
}
