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
        

        // GET: api/<UrlController>
        [HttpGet]
        public async Task<List<UrlDto>> Get()
        {
            var Urls = await _mediator.Send(new GetAllUrlsQuery());
            return Urls;
        }

        // GET api/<UrlController>/5
        /*[HttpGet("{id}")]
        public string Get(string id)
        {
            return $"value with id - {id}";
        }*/

        // POST api/<UrlController>
        [HttpPost]
        [Authorize]
        public async Task<ActionResult> Post([FromBody] CreateUrlCommand url)
        {
            var response = await _mediator.Send(url);


           
            return CreatedAtAction(nameof(Get), new { shortUrl = response });
        }

        // PUT api/<UrlController>/5
       /* [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }*/

        // DELETE api/<UrlController>/5
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
