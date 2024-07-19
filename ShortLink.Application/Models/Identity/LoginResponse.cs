﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShortLink.Application.Models.Identity;

public class LoginResponse
{
    public string Id { get; set; } = string.Empty;
    public string UserName { get; set; } = string.Empty;
    public string Email {  get; set; } = string.Empty;
    public string Token { get; set; } = string.Empty;
}
