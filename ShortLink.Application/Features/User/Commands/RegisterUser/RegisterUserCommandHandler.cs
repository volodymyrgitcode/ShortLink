using AutoMapper;
using MediatR;
using ShortLink.Application.Contracts.Identity;
using ShortLink.Application.Models.Identity;


namespace ShortLink.Application.Features.User.Commands.RegisterUser;

public class RegisterUserCommandHandler : IRequestHandler<RegisterUserCommand, LoginResponse> 
{
    private readonly IMapper _mapper;
    private readonly IAuthService _authService;

    public RegisterUserCommandHandler(IMapper mapper, IAuthService authService)
    {
        _mapper = mapper;
        _authService = authService;
    }
    public async Task<LoginResponse> Handle(RegisterUserCommand request, CancellationToken cancellationToken)
    {
       return await _authService.Register(_mapper.Map<RegisterRequest>(request));
    }

}
