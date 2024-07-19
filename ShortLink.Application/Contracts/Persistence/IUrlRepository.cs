using ShortLink.Domain.Entities;

namespace ShortLink.Application.Contracts.Persistence;

public interface IUrlRepository : IGenericRepository<Url>
{
    Task<Url> GetOriginalUrlByShortUrlCodeAsync(string shortUrl);

    Task<bool> IsOriginalUrlShortenedAsync(string originalUrl);
}