using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShortLink.Application.Contracts.Identity;
using ShortLink.Application.Features.Urls.Queries.GetAllUrls;
using ShortLink.Application.Features.User.Commands.LoginUser;
using ShortLink.Application.Features.User.Commands.RegisterUser;
using ShortLink.Application.Models.Identity;

namespace ShortLink.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IMediator _mediator;

        public AuthController(IMediator mediator)
        {
            _mediator = mediator;
        }


        [HttpPost("login")]
        public async Task<ActionResult<LoginResponse>> Login(LoginUserCommand loginUserCommand)
        {
            return Ok(await _mediator.Send(loginUserCommand));
        }

        [HttpPost("register")]
        public async Task<ActionResult<RegisterResponse>> Register(RegisterUserCommand registerUserCommand)
        {
            return Ok(await _mediator.Send(registerUserCommand));
        }

    }
}
