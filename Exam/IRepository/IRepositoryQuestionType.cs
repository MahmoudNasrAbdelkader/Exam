using Exam.Data.Models;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.Linq.Expressions;

namespace Exam.IRepository
{
	public interface IRepositoryQuestionType
	{
		SelectList GetQuestionTypeAsSelectList(int selectedValue = 0);
	}
}
