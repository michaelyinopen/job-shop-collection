using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JobShopCollection.Models
{
    public static class EtagHelper
    {
        public static string? GetETag(byte[]? rowVersion) => rowVersion is null ? null : Convert.ToBase64String(rowVersion);
    }

    public static class EtagExtensions
    {
        public static string? GetETag(this JobSet jobSet) => EtagHelper.GetETag(jobSet.RowVersion);
    }
}
