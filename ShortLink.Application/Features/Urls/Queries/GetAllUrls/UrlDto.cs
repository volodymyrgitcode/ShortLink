using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShortLink.Application.Features.Urls.Queries.GetAllUrls;

public class UrlDto
{
    public Guid Id { get; set; }
    public DateTime CreatedAt { get; set; }
    public string OriginalUrl { get; set; } = string.Empty;
    public string ShortUrlCode { get; set; } = string.Empty;
    public Guid UserId { get; set; }
}
