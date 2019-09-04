using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JobShopCollection.Models
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<JobSet, JobSetHeaderDto>();
            CreateMap<JobSet, JobSetDto>();
            CreateMap<JobSet, NewJobSetDto>();
            CreateMap<UpdateJobSetDto, JobSet>();
        }
    }
}
