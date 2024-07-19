using Microsoft.AspNetCore.Mvc;
using ShortLink.Api.Models;
using ShortLink.Application.Exceptions;
using System.Net;
using FluentValidation;

namespace ShortLink.Api.Middleware;

public class ExceptionMiddleware
{
    private readonly RequestDelegate _next;

    public ExceptionMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext httpContext)
    {
        try
        {
            await _next(httpContext);
        }
        catch (Exception ex)
        {
            await HandleExceptionAsync(httpContext, ex);
        }
    }

    private async Task HandleExceptionAsync(HttpContext httpContext, Exception ex)
    {
        HttpStatusCode statusCode;
        ExceptionDetails details;

        (statusCode, details) = ex switch
        {
            ValidationException validationException => CreateExceptionDetails(
                validationException,
                HttpStatusCode.BadRequest,
                validationException.Errors.Select(e => new { e.PropertyName, e.ErrorMessage })),
            NotFoundException notFoundException => CreateExceptionDetails(
                notFoundException,
                HttpStatusCode.NotFound),
            BadRequestException badRequestException => CreateExceptionDetails(
                badRequestException,
                HttpStatusCode.BadRequest),
            _ => CreateExceptionDetails(
                ex,
                HttpStatusCode.InternalServerError)
        };

        httpContext.Response.ContentType = "application/json";
        httpContext.Response.StatusCode = (int)statusCode;
        await httpContext.Response.WriteAsJsonAsync(new { error = details });

        static (HttpStatusCode, ExceptionDetails) CreateExceptionDetails(
            Exception exception,
            HttpStatusCode statusCode,
            IEnumerable<object>? errors = null)
        {
            return (statusCode, new ExceptionDetails(
                Type: exception.GetType().Name,
                Title: exception.Message,
                Status: (int)statusCode,
                Detail: exception.InnerException?.Message ?? exception.StackTrace ?? string.Empty,
                Errors: errors
            ));
        }
    }
    internal record ExceptionDetails(
        string Type,
        string Title,
        int Status,
        string Detail,
        IEnumerable<object>? Errors
    );
}