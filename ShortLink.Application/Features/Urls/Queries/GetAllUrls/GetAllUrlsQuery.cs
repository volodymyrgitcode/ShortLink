using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShortLink.Application.Features.Urls.Queries.GetAllUrls;

public record GetAllUrlsQuery : IRequest<List<UrlDto>>
{
}
