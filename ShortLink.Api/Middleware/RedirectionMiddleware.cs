using MediatR;
using ShortLink.Application.Features.Urls.Queries.GetOriginalUrl;

namespace ShortLink.Api.Middleware;

public class RedirectionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly IMediator _mediator;

    public RedirectionMiddleware(RequestDelegate next, IMediator mediator)
    {
        _next = next;
        _mediator = mediator;
    }

    public async Task InvokeAsync(HttpContext httpContext)
    {
        var path = httpContext.Request.Path.Value.TrimStart('/');

        if (string.IsNullOrEmpty(path)) {
            await _next(httpContext);
        }
        
        var originalUrl = await _mediator.Send(new GetOriginalUrlQuery { ShortUrlCode = path });

        httpContext.Response.Redirect(originalUrl);
    }
}
