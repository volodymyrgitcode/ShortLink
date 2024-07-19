using MediatR;
using ShortLink.Application.Models.Identity;

namespace ShortLink.Application.Features.User.Commands.RegisterUser;

public class RegisterUserCommand : IRequest<RegisterResponse>
{
    public string Email { get; set; } = string.Empty;

    public string UserName { get; set; } = string.Empty;

    public string Password { get; set; } = string.Empty;
}
