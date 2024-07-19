using AutoMapper;
using ShortLink.Application.Features.User.Commands.LoginUser;
using ShortLink.Application.Features.User.Commands.RegisterUser;
using ShortLink.Application.Models.Identity;

namespace ShortLink.Application.MappingProfiles;

public class AuthProfile : Profile
{
    public AuthProfile()
    {
        CreateMap<RegisterRequest, RegisterUserCommand>().ReverseMap();
        CreateMap<LoginRequest, LoginUserCommand>().ReverseMap();
    }
}
