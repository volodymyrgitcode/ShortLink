using Microsoft.AspNetCore.Mvc;

namespace ShortLink.Api.Models;

public class ExceptionProblemDetails : ProblemDetails
{
    public IDictionary<string, string[]> Errors { get; set; } = new Dictionary<string, string[]>();
}
