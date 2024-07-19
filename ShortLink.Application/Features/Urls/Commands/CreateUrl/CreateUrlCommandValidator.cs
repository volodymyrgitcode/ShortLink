using FluentValidation;
using ShortLink.Application.Contracts.Persistence;
using ShortLink.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShortLink.Application.Features.Urls.Commands.CreateUrl;

public class CreateUrlCommandValidator : AbstractValidator<CreateUrlCommand>
{
    private readonly IUrlRepository _urlRepository;

    public CreateUrlCommandValidator(IUrlRepository urlRepository)
    {
        RuleFor(p => p.OriginalUrl)
            .NotEmpty().WithMessage("{PropertyName} cannot be empty")
            .NotNull().WithMessage("{PropertyName} cannot be null");

        RuleFor(p => p.OriginalUrl)
            .Must(IsValidUri).WithMessage("The URL must be valid");

        RuleFor(p => p.OriginalUrl)
            .MustAsync(OriginalUrlUnique).WithMessage("The URL has already been shortened");

        _urlRepository = urlRepository;
    }

    private bool IsValidUri(string originalUrl)
    {
        return Uri.TryCreate(originalUrl, UriKind.Absolute, out _);
    }

    private async Task<bool> OriginalUrlUnique(string originalUrl, CancellationToken token)
    {
        return !await _urlRepository.IsOriginalUrlShortenedAsync(originalUrl);
    }
}
