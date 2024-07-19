using AutoMapper;
using MediatR;
using ShortLink.Application.Contracts.Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShortLink.Application.Features.Urls.Queries.GetAllUrls;

public class GetAllUrlsQueryHandler : IRequestHandler<GetAllUrlsQuery, List<UrlDto>>
{
    private readonly IMapper _mapper;
    private readonly IUrlRepository _urlRepository;

    public GetAllUrlsQueryHandler(IMapper mapper, IUrlRepository urlRepository)
    {
        _mapper = mapper;
        _urlRepository = urlRepository;
    }
    public async Task<List<UrlDto>> Handle(GetAllUrlsQuery request, CancellationToken cancellationToken)
    {
        var urls = await _urlRepository.GetAllAsync();

        var data = _mapper.Map<List<UrlDto>>(urls);

        return data;
    }
}
