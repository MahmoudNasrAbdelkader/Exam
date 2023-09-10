using Exam.Data;
using Exam.Data.Models;
using Exam.IRepository;
using Microsoft.CodeAnalysis.Differencing;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Exam.Repository
{
	public class QuestionRepository : IRepositoryQuestion
	{
		private ApplicationDbContext _dbContext;
		public QuestionRepository(ApplicationDbContext dbContext)
		{
			_dbContext = dbContext;

		}

		public int CreateMultipleChoice(int ExamId, string questionText, string choice1, string choice2, string choice3, string choice4, string choice)
		{
			 var QuestionType =_dbContext.QuestionTypes.FirstOrDefault(c => c.Text.Contains("Multiple Choice"));
			Question question = new Question()
			{
				ExamId = ExamId,
			    Text = questionText.Trim(),
				QuestionTypeId = QuestionType.QuestionTypeId,
				Deleted =false,
				Degree = 1,				
			};
		    _dbContext.Questions.Add(question);
			_dbContext.SaveChanges();

			QuestionChoose QuestionChoose1 = new QuestionChoose()
			{
				Deleted = false,
				IsTrue = (choice == "choice1" ? true: false),
				QuestionId = question.QuestionId,
				Text = choice1
			};
			QuestionChoose QuestionChoose2 = new QuestionChoose()
			{
				Deleted = false,
				IsTrue = (choice == "choice2" ? true : false),
				QuestionId = question.QuestionId,
				Text = choice2
			};
			QuestionChoose QuestionChoose3 = new QuestionChoose()
			{
				Deleted = false,
				IsTrue = (choice == "choice3" ? true : false),
				QuestionId = question.QuestionId,
				Text = choice3
			};
			
			QuestionChoose QuestionChoose4 = new QuestionChoose()
			{
				Deleted = false,
				IsTrue = (choice == "choice4" ? true : false),
				QuestionId = question.QuestionId,
				Text = choice4
			};

			_dbContext.QuestionChooses.Add(QuestionChoose1);
			_dbContext.QuestionChooses.Add(QuestionChoose2);
			_dbContext.QuestionChooses.Add(QuestionChoose3);
			_dbContext.QuestionChooses.Add(QuestionChoose4);

			_dbContext.SaveChanges();

			return ExamId;
		}
		public int CreateTF(int ExamId, string questionText, string inputtf)
		{
			var QuestionType = _dbContext.QuestionTypes.FirstOrDefault(c => c.Text.Contains("True/False"));
			Question question = new Question()
			{
				ExamId = ExamId,
				Text = questionText.Trim(),
				QuestionTypeId = QuestionType.QuestionTypeId,
				Deleted = false,
				Degree = 1,
				CorrectAnswer = inputtf
			};
			_dbContext.Questions.Add(question);
			_dbContext.SaveChanges();		

			return ExamId;
		}
		public int CreateFillBlank(int ExamId, string questionText, string correctAnswert)
		{
			var QuestionType = _dbContext.QuestionTypes.FirstOrDefault(c => c.Text.Contains("Fill in the blank"));
			Question question = new Question()
			{
				ExamId = ExamId,
				Text = questionText.Trim(),
				QuestionTypeId = QuestionType.QuestionTypeId,
				Deleted = false,
				Degree = 1,
				CorrectAnswer = correctAnswert
			};
			_dbContext.Questions.Add(question);
			_dbContext.SaveChanges();

			return ExamId;
		}
		public int CreateEssay(int ExamId, string questionText, string correctAnswert)
		{
			var QuestionType = _dbContext.QuestionTypes.FirstOrDefault(c => c.Text.Contains("Essay"));
			Question question = new Question()
			{
				ExamId = ExamId,
				Text = questionText.Trim(),
				QuestionTypeId = QuestionType.QuestionTypeId,
				Deleted = false,
				Degree = 1,
				CorrectAnswer = correctAnswert
			};
			_dbContext.Questions.Add(question);
			_dbContext.SaveChanges();
			return ExamId;
		}

		public Question GetQuestionDetails(int QuestionId)
		{
			var question = _dbContext.Questions.Include(c=>c.QuestionType).Include(c => c.QuestionChoose).FirstOrDefault(c=>c.QuestionId == QuestionId);		

			return question;
		}
		public int Delete(int QuestionId)
		{
			var question = _dbContext.Questions.Include(c => c.QuestionType).Include(c => c.QuestionChoose).FirstOrDefault(c => c.QuestionId == QuestionId);
			if (question is not null)
			{
				question.Deleted = true;
				if (question.QuestionChoose is not null && question.QuestionChoose.Count>0)
				{
					foreach (var item in question.QuestionChoose)
					{
						item.Deleted = true;
					}
				}
				_dbContext.SaveChanges();

				return question.QuestionId;
			}
			return 0;
		}

	}
}
