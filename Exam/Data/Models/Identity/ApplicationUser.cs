using Microsoft.AspNetCore.Identity;

namespace Exam.Data.Models.Identity
{
    public class ApplicationUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string SeconedName { get; set; }

    }
}
