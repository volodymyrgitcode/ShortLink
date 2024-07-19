using MediatR;
using Microsoft.AspNetCore.Mvc;
using ShortLink.Application.Features.Urls.Queries.GetOriginalUrl;

namespace ShortLink.Api.Controllers;

[Route("")]
[ApiController]
public class RedirectionController : ControllerBase
{
    private readonly IMediator _mediator;

    public RedirectionController(IMediator mediator)
    {
        _mediator = mediator;
    }

    // GET
    [HttpGet("{shortUrl}")]
    public async Task<IActionResult> Get(string shortUrl)
    {
        var originalUrl = await _mediator.Send(new GetOriginalUrlQuery { ShortUrlCode = shortUrl });

        return Redirect(originalUrl);
    }
}
