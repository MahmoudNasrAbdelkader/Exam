using Exam.Data.Models;
using Exam.Data.Models.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Exam.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext()
        {
        }
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }
        public virtual DbSet<UserAnswer> UserAnswers { get; set; }
        public virtual DbSet<Exam.Data.Models.Exam> Exams { get; set; }
        public virtual DbSet<Question> Questions { get; set; }
        public virtual DbSet<QuestionChoose> QuestionChooses { get; set; }
        public virtual DbSet<QuestionType> QuestionTypes { get; set; }
        public virtual DbSet<UserExam> UserExams { get; set; }
    }
}