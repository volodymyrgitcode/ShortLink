namespace ShortLink.Application.Contracts.Identity;

public interface ICurrentUserService
{
    Guid GetUserId();

    Task<bool> IsUserAdmin();
}
