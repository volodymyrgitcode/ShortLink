using FluentValidation;
using ShortLink.Application.Contracts.Identity;
using ShortLink.Application.Contracts.Persistence;


namespace ShortLink.Application.Features.Urls.Commands.DeleteUrl;

public class DeleteUrlCommandValidator : AbstractValidator<DeleteUrlCommand>
{
    private readonly IUrlRepository _urlRepository;
    private readonly ICurrentUserService _currentUserService;

    public DeleteUrlCommandValidator(IUrlRepository urlRepository, ICurrentUserService currentUserService)
    {
        RuleFor(p => p.Id.ToString())
            .Matches("^[{]?[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}[}]?$")
            .NotEmpty().WithMessage("{PropertyName} cannot be empty")
            .NotNull().WithMessage("{PropertyName} cannot be null")
            .MustAsync(UrlExists).WithMessage("URL does not exist.")
            .MustAsync(UserCanDeleteUrl).WithMessage("User is not authorized to delete this URL.");

        _urlRepository = urlRepository;
        _currentUserService = currentUserService;
    }

    private async Task<bool> UrlExists(string id, CancellationToken cancellationToken)
    {
        var url = await _urlRepository.GetByIdAsync(Guid.Parse(id));
        return url != null;
    }

    private async Task<bool> UserCanDeleteUrl(string id, CancellationToken cancellationToken)
    {
        var url = await _urlRepository.GetByIdAsync(Guid.Parse(id));
        var userId = _currentUserService.GetUserId();

        return userId == url.UserId || await _currentUserService.IsUserAdmin();
    }
}
