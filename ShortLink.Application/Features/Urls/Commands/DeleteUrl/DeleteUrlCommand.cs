using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShortLink.Application.Features.Urls.Commands.DeleteUrl;

public class DeleteUrlCommand : IRequest<Unit>
{
    public Guid Id { get; set; }
}
