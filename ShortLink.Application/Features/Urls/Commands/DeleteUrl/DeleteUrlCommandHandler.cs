using AutoMapper;
using FluentValidation;
using MediatR;
using ShortLink.Application.Contracts.Persistence;
using ShortLink.Application.Exceptions;
using ShortLink.Application.Features.Urls.Commands.CreateUrl;
using ShortLink.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShortLink.Application.Features.Urls.Commands.DeleteUrl;

public class DeleteUrlCommandHandler : IRequestHandler<DeleteUrlCommand, Unit>
{
    private readonly IUrlRepository _urlRepository;

    public DeleteUrlCommandHandler(IUrlRepository urlRepository)
    {
        _urlRepository = urlRepository;
    }
 
    public async Task<Unit> Handle(DeleteUrlCommand request, CancellationToken cancellationToken)
    {
        var existingUrl = await _urlRepository.GetByIdAsync(request.Id);

        if (existingUrl == null)
        {
            throw new NotFoundException(nameof(Url), request.Id);
        }

        await _urlRepository.DeleteAsync(existingUrl);

        return Unit.Value;
    }
}
