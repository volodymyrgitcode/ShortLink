using MediatR;
using ShortLink.Application.Contracts.Persistence;
using ShortLink.Application.Exceptions;
using ShortLink.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShortLink.Application.Features.Urls.Queries.GetOriginalUrl
{
    public class GetOriginalUrlQueryHandler : IRequestHandler<GetOriginalUrlQuery, string>
    {
        private readonly IUrlRepository _urlRepository;

        public GetOriginalUrlQueryHandler(IUrlRepository urlRepository)
        {
            _urlRepository = urlRepository;
        }
        public async Task<string> Handle(GetOriginalUrlQuery request, CancellationToken cancellationToken)
        {
            var url = await _urlRepository.GetOriginalUrlByShortUrlCodeAsync(request.ShortUrlCode);

            if (url == null)
            {
                throw new NotFoundException(nameof(Url.ShortUrlCode), request.ShortUrlCode);
            }

            return url.OriginalUrl;
        }
    }
}
