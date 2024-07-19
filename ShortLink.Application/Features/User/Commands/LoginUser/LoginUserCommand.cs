using MediatR;
using ShortLink.Application.Models.Identity;

namespace ShortLink.Application.Features.User.Commands.LoginUser;

public class LoginUserCommand : IRequest<LoginResponse>
{
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}
