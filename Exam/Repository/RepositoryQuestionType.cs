using Exam.Data;
using Exam.Data.Models;
using Exam.IRepository;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.Linq.Expressions;

namespace Exam.Repository
{
	public class RepositoryQuestionType : IRepositoryQuestionType
	{
		private ApplicationDbContext _dbContext;
		public RepositoryQuestionType(ApplicationDbContext dbContext)
		{
			_dbContext = dbContext;

		}
		public SelectList GetQuestionTypeAsSelectList(int selectedValue = 0)
		{
			var types = _dbContext.QuestionTypes.Where(c=> !c.Deleted).Select(c=> new { c.QuestionTypeId, c.Text}).ToList();
			SelectList items;
			if (selectedValue > 0)
				items = new SelectList(types, "Text", "Text", types.FirstOrDefault(c=>c.QuestionTypeId == selectedValue)?.Text);
			else
				items = new SelectList(types, "Text", "Text");

			return items;

		}
	}
}
