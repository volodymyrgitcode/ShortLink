using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShortLink.Identity.Configurations;

public class RolesConfiguration: IEntityTypeConfiguration<IdentityRole>
{
    public void Configure(EntityTypeBuilder<IdentityRole> builder)
    {
        builder.HasData(
            new IdentityRole 
            {
                Id = "9f32c349-b281-4495-b771-801341bc942c",
                Name = "User",
                NormalizedName = "USER",
            },
            new IdentityRole
            {
                Id = "9f32c349-b281-4495-b771-801341bc943c",
                Name = "Admin",
                NormalizedName = "ADMIN",
            }
        );
    }
}
