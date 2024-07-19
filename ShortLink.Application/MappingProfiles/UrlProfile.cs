using AutoMapper;
using ShortLink.Application.Features.Urls.Queries.GetAllUrls;
using ShortLink.Domain.Entities;

namespace ShortLink.Application.MappingProfiles;

public class UrlProfile : Profile
{
    public UrlProfile()
    {
        CreateMap<UrlDto, Url>().ReverseMap();
    }
}
