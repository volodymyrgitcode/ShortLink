using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShortLink.Application.Features.Urls.Commands.CreateUrl;
using ShortLink.Application.Features.Urls.Commands.DeleteUrl;
using ShortLink.Application.Features.Urls.Queries.GetAllUrls;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ShortLink.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UrlController : ControllerBase
    {
        private readonly IMediator _mediator;

        public UrlController(IMediator mediator)
        {
            _mediator = mediator;
        }
        
        [HttpGet]
        public async Task<List<UrlDto>> Get()
        {
            var Urls = await _mediator.Send(new GetAllUrlsQuery());
            return Urls;
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult> Post([FromBody] CreateUrlCommand url)
        {
            var response = await _mediator.Send(url);
           
            return CreatedAtAction(nameof(Get), new { shortUrlCode = response });
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult> Delete(Guid id)
        {
            var command = new DeleteUrlCommand { Id = id };
            await _mediator.Send(command);
            return NoContent();
        }
    }
}
