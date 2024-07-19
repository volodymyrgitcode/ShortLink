
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using ShortLink.Application.Contracts.Identity;
using ShortLink.Identity.Models;
using System.Security.Claims;

namespace ShortLink.Identity.Services;

public class CurrentUserService: ICurrentUserService
{
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly UserManager<AppUser> _userManager;

    public CurrentUserService(IHttpContextAccessor httpContextAccessor, UserManager<AppUser> userManager)
    {
        _httpContextAccessor = httpContextAccessor;
        _userManager = userManager;
    }

    public Guid GetUserId()
    {
        var userId = _httpContextAccessor.HttpContext?.User?.FindFirstValue("uid");

        if (string.IsNullOrEmpty(userId))
        {
            throw new UnauthorizedAccessException("User is not authenticated.");
        }

        return Guid.Parse(userId);
    }

    public async Task<bool> IsUserAdmin()
    {
        var user = await _userManager.FindByIdAsync(_httpContextAccessor.HttpContext?.User?.FindFirstValue("uid"));

        if (user == null)
        {
            throw new UnauthorizedAccessException("User is not authenticated");
        }

        return await _userManager.IsInRoleAsync(user, "Admin");
    }
}
