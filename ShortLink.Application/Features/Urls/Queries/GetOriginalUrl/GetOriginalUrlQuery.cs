using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShortLink.Application.Features.Urls.Queries.GetOriginalUrl;

public record GetOriginalUrlQuery : IRequest<string>
{
    public string ShortUrlCode { get; set; } = string.Empty;
}
