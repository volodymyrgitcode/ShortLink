using ShortLink.Application.Models.Identity;

namespace ShortLink.Application.Contracts.Identity;

public interface IAuthService
{
    Task<LoginResponse> Login(LoginRequest request);
    Task<LoginResponse> Register(RegisterRequest request);
}
