using AutoMapper;
using MediatR;
using ShortLink.Application.Contracts.Identity;
using ShortLink.Application.Features.User.Commands.RegisterUser;
using ShortLink.Application.Models.Identity;


namespace ShortLink.Application.Features.User.Commands.LoginUser;

public class LoginUserCommandHandler : IRequestHandler<LoginUserCommand, LoginResponse> 
{
    private readonly IMapper _mapper;
    private readonly IAuthService _authService;

    public LoginUserCommandHandler(IMapper mapper, IAuthService authService)
    {
        _mapper = mapper;
        _authService = authService;
    }
    public async Task<LoginResponse> Handle(LoginUserCommand request, CancellationToken cancellationToken)
    {
       return await _authService.Login(_mapper.Map<LoginRequest>(request));
    }
}
