using Exam.Data.Models;
using Exam.Identity_Models;
using Exam.IRepository;
using Exam.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Exam.Controllers
{
    [Authorize(Permissions.Exam.Manage)]
    public class QuestionController : Controller
	{
		private readonly IRepositoryExam _IRepositoryExam;
		private readonly IRepositoryQuestion _IRepositoryQuestion;
		private readonly IRepositoryQuestionType _IRepositoryQuestionType;

		public QuestionController(IRepositoryExam RepositoryExam, IRepositoryQuestion IRepositoryQuestion, IRepositoryQuestionType iRepositoryQuestionType)
		{
			_IRepositoryExam = RepositoryExam;
			_IRepositoryQuestion = IRepositoryQuestion;
			_IRepositoryQuestionType = iRepositoryQuestionType;
		}
		public IActionResult Create(int ExamId,int QuestionId = 0)
		{
		  
			try
			{
				
				var exam = _IRepositoryExam.GetById(ExamId);
				if (exam is not null)
				{
					QuestionViewModel model = new QuestionViewModel() { ExamId = exam.ExamId, ExamName = exam.Name };
					if (QuestionId > 0)
					{
						model.Question = _IRepositoryQuestion.GetQuestionDetails(QuestionId);
						model.QuestionId = QuestionId;
						model.QuestionTypes = _IRepositoryQuestionType.GetQuestionTypeAsSelectList(model.Question.QuestionTypeId);

					}
					else
					{
						model.QuestionTypes = _IRepositoryQuestionType.GetQuestionTypeAsSelectList();

					}
					return View(model);
				}
				return View("Error");
			}
			catch (Exception ex)
			{
				return View("Error", ex);
			}

		}
		[HttpPost]
		public IActionResult CreateMultipleChoice(int QuestionId,int ExamId,string questionText,string choice1, string choice2, string choice3, string choice4 ,string choice)
		{

			try
			{
				if (QuestionId > 0)
				{
					_IRepositoryQuestion.Delete(QuestionId);
				}
				
					var exam = _IRepositoryQuestion.CreateMultipleChoice(ExamId, questionText, choice1, choice2, choice3, choice4, choice);
					return RedirectToAction("View", "Exam", new { ExamId, FromQuestion = true });
				
			}
			catch (Exception ex)
			{
				return View("Error", ex);
			}

		}
		[HttpPost]
		public IActionResult CreateTF(int QuestionId, int ExamId, string questionText,string inputtf)
		{

			try
			{
				if (QuestionId > 0)
				{
					_IRepositoryQuestion.Delete(QuestionId);
				}				
			    var exam = _IRepositoryQuestion.CreateTF(ExamId, questionText,inputtf);				
			   return RedirectToAction("View", "Exam", new { ExamId, FromQuestion = true });
			
			}
			catch (Exception ex)
			{
				return View("Error", ex);
			}

		}
		[HttpPost]
		public IActionResult CreateFillBlank(int QuestionId, int ExamId, string questionText, string correctAnswert)
		{

			try
			{
				if (QuestionId > 0)
				{
					_IRepositoryQuestion.Delete(QuestionId);
				}
				
					var exam = _IRepositoryQuestion.CreateFillBlank(ExamId, questionText, correctAnswert);
					return RedirectToAction("View", "Exam", new { ExamId, FromQuestion = true });
				
			}
			catch (Exception ex)
			{
				return View("Error", ex);
			}

		}
		[HttpPost]
		public IActionResult CreateEssay(int QuestionId, int ExamId, string questionText, string correctAnswert)
		{

			try
			{
				if (QuestionId > 0)
				{
					_IRepositoryQuestion.Delete(QuestionId);
				}
				
					var exam = _IRepositoryQuestion.CreateEssay(ExamId, questionText, correctAnswert);
					return RedirectToAction("View", "Exam", new { ExamId, FromQuestion = true });
				
			}
			catch (Exception ex)
			{
				return View("Error", ex);
			}

		}
		[HttpPost]
		public IActionResult Delete(int QuestionId)
		{
			try
			{
				int status = _IRepositoryQuestion.Delete(QuestionId);
				if (status > 0)
				{
					return Json(1);
				}
				return Json(0);
			}
			catch (Exception)
			{
				return Json(0);
			}
		}
	}
}
