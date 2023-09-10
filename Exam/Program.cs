using Exam.Data;
using Exam.Data.Models.Identity;
using Exam.Identity_Models;
using Exam.IRepository;
using Exam.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Exam
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

			//builder.Services.AddIdentity<ApplicationUser, IdentityRole>(options =>
			//{
			//	options.User.RequireUniqueEmail = true;

			//}).AddEntityFrameworkStores<ApplicationDbContext>().AddDefaultTokenProviders();

			builder.Services.AddSingleton<IAuthorizationPolicyProvider, PermissionPolicyProvider>();
            builder.Services.AddScoped<IAuthorizationHandler, PermissionAuthorizationHandler>();
			builder.Services.AddSession();
			// Add services to the container.
			var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
            builder.Services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(connectionString));
            builder.Services.AddDatabaseDeveloperPageExceptionFilter();

            builder.Services.AddIdentity<ApplicationUser, IdentityRole>(options => options.SignIn.RequireConfirmedAccount = true)
                .AddEntityFrameworkStores<ApplicationDbContext>().AddDefaultTokenProviders(); 
            builder.Services.AddControllersWithViews();


            builder.Services.AddTransient<IRepositoryExam,RepositoryExam>();
			builder.Services.AddTransient<IRepositoryQuestion, QuestionRepository>();
            builder.Services.AddTransient<IRepositoryQuestionType, RepositoryQuestionType>();
            
			var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseMigrationsEndPoint();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.MapControllerRoute(
                name: "default",
                pattern: "{controller=Home}/{action=Index}/{id?}");
          //  app.MapRazorPages();

            app.Run();
        }
    }
}