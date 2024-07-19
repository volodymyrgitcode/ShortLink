using Microsoft.EntityFrameworkCore;
using ShortLink.Application.Contracts.Persistence;
using ShortLink.Domain.Entities;
using ShortLink.Persistence.DatabaseContext;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShortLink.Persistence.Repositories;

public class UrlRepository : GenericRepository<Url>, IUrlRepository
{
    public UrlRepository(ApplicationDbContext context) : base(context)
    {
    }

    public async Task<Url> GetOriginalUrlByShortUrlCodeAsync(string shortUrl)
    {
        var url = await _context.Urls.SingleOrDefaultAsync(u => u.ShortUrlCode == shortUrl);

        return url;
    }

    public async Task<bool> IsOriginalUrlShortenedAsync(string originalUrl)
    {
        return await _context.Urls.AnyAsync(u => u.OriginalUrl == originalUrl);
    }
}
