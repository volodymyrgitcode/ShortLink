using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShortLink.Application.Features.Urls.Commands.CreateUrl;

public class CreateUrlCommand : IRequest<string>
{
    public string OriginalUrl { get; set; } = string.Empty;
}
