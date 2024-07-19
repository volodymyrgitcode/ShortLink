using AutoMapper;
using MediatR;
using ShortLink.Application.Contracts.Identity;
using ShortLink.Application.Contracts.Persistence;
using ShortLink.Application.Exceptions;
using ShortLink.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace ShortLink.Application.Features.Urls.Commands.CreateUrl;

public class CreateUrlCommandHandler : IRequestHandler<CreateUrlCommand, string> 
{
    private readonly IMapper _mapper;
    private readonly IUrlRepository _urlRepository;
    private readonly ICurrentUserService _currentUserService;

    public CreateUrlCommandHandler(IMapper mapper, IUrlRepository urlRepository, ICurrentUserService currentUserService)
    {
        _mapper = mapper;  
        _urlRepository = urlRepository;
        _currentUserService = currentUserService;
    }
    public async Task<string> Handle(CreateUrlCommand request, CancellationToken cancellationToken)
    {
        var newUrl = new Url
        {
            OriginalUrl = request.OriginalUrl,
            ShortUrlCode = GenerateShortUrl(),
            CreatedAt = DateTime.UtcNow,
            UserId = _currentUserService.GetUserId(),
        };

        await _urlRepository.CreateAsync(newUrl);

        return newUrl.ShortUrlCode;
    }

    private static string GenerateShortUrl()
    {
        return Guid.NewGuid().ToString().Substring(0, 8);
    }
}
