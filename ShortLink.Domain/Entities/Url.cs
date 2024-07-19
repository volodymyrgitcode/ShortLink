namespace ShortLink.Domain.Entities;

public class Url : BaseEntity
{
    public string OriginalUrl { get; set; } = string.Empty;
    public string ShortUrlCode { get; set; } = string.Empty;
    public Guid UserId { get; set; }
}
