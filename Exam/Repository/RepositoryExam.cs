using Exam.Const;
using Exam.Data;
using Exam.Data.Models;
using Exam.IRepository;
using Exam.ViewModel;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using System.Xml.Linq;

namespace Exam.Repository
{
    public class RepositoryExam : IRepositoryExam
    {
        private ApplicationDbContext _dbContext;
        public RepositoryExam(ApplicationDbContext dbContext)
        {
            _dbContext =dbContext;

        }
        public int Create(Data.Models.Exam entity)
        {
            _dbContext.Exams.Add(entity);
            _dbContext.SaveChanges();
            return entity.ExamId;
        }

        public int Delete(Data.Models.Exam entity)
        {
            throw new NotImplementedException();
        }

        public IQueryable<Data.Models.Exam> FindAll()
        {
            throw new NotImplementedException();
        }

        public IQueryable<Data.Models.Exam> FindByCondition(Expression<Func<Data.Models.Exam, bool>> expression)
        {
			return _dbContext.Exams.Where(expression);
		}

        public Data.Models.Exam GetById(int id)
        {
            return _dbContext.Exams.Find(id);
        }

		public ExamDetailsViewModel GetDetailsById(int id)
		{
			var Exam = _dbContext.Exams.Include("Questions.QuestionType").FirstOrDefault(c => c.ExamId == id);

			ExamDetailsViewModel model = new ExamDetailsViewModel()
			{
				Exam = Exam,
				questions = Exam.Questions.Where(c => !c.Deleted).OrderBy(c => c.Text).Select(c => new QuestionIndexViewModel() { QuestionId = c.QuestionId, Text = c.Text, TypeName = c.QuestionType.Text }).ToList(),
			};
			var users = _dbContext.Users.ToList();
			var exams = _dbContext.UserExams.Where(c => c.ExamId == id).Include(C => C.Exam).Include("UserAnswers.Question.QuestionType").ToList()
				.Select(c => new ExamResultsStudentViewModel()
				{
					CreateDT = c.CreateDT,
					EndDT = c.EndDT,
					ExamName = c.Exam.Name,
					UserExamId = c.UserExamId,
					FirstName = users.FirstOrDefault(x => x.Id == c.ApplicationUserId)?.FirstName,
					LastName = users.FirstOrDefault(x => x.Id == c.ApplicationUserId)?.SeconedName,
					UserName = users.FirstOrDefault(x => x.Id == c.ApplicationUserId)?.UserName,
					UserId = users.FirstOrDefault(x => x.Id == c.ApplicationUserId)?.Id,

				}).ToList();
			model.exams = exams;


			return model;
		}

		public UserExamViewModel StartExam(int ExamId, string UserId)
		{
           var Exam = _dbContext.Exams.Include(c => c.Questions).FirstOrDefault(c => c.ExamId == ExamId);
            UserExam userExam = new UserExam()
            {
                CreateDT = DateTime.Now,
                ExamId = ExamId,
                ApplicationUserId = UserId,

            };
            _dbContext.UserExams.Add(userExam);
            _dbContext.SaveChanges();
            List<UserAnswer> userAnswers = new List<UserAnswer>();
            if (Exam?.Questions != null)
            {
				foreach (var item in Exam.Questions)
				{
                    if (!item.Deleted)
                    {
                        userAnswers.Add(new UserAnswer() { 
                        QuestionId = item.QuestionId,
                        UserAnswered =false,
                         IsAnswerCorrect = false, 
                         UserExamId = userExam.UserExamId,
                         
                        });
                    }
				
		     	}
				_dbContext.UserAnswers.AddRange(userAnswers);
				_dbContext.SaveChanges();
			}
            var UAnswers =  _dbContext.UserAnswers.Where(c => c.UserExamId == userExam.UserExamId).Include(c => c.Question.QuestionChoose).Include(c => c.Question.QuestionType).ToList();
			if (UAnswers != null && UAnswers.Count > 0)
			{
                UserExamViewModel model = new UserExamViewModel()
                {
                    UserAnswers = UAnswers,
                    Exam = GetById(ExamId)
                };
              
                return model;
			}

			return null;
        }
        public int EndExam(int UserExamId)
        {
			var EndExam = _dbContext.UserExams.FirstOrDefault(c=>c.UserExamId==UserExamId);
            if (EndExam is not null)
            {
                EndExam.EndDT = DateTime.Now;
                return 1;
            }
			return 0;

		}
		public ExamResultsStudentViewModel DisplayExamResultsStudent(int UserExamId, string UserId)
		{
			var exam = _dbContext.UserExams.Include(C=>C.Exam).Include("UserAnswers.Question.QuestionType").FirstOrDefault(c => c.UserExamId == UserExamId);
            var user = _dbContext.Users.FirstOrDefault(c=> c.Id == UserId);
            if ( exam is not null)
			{
				ExamResultsStudentViewModel model = new ExamResultsStudentViewModel()
                {
                    CreateDT=exam.CreateDT,
                    EndDT=exam.EndDT,
                    ExamName=exam.Exam.Name,
                    UserExamId=UserExamId,
                    FirstName = user?.FirstName,
                    LastName =user?.SeconedName,
                    UserName = user?.UserName,
                    UserId=UserId,
                    QuestionsResults = exam.UserAnswers.Select(c => new QuestionResultStudentViewModel {
                        Question = c.Question.Text,
                        CorrectAnswer = c.Question.CorrectAnswer,
                        IsUserAnswered =c.UserAnswered,
                        IsAnswerCorrect= c.IsAnswerCorrect,
                        UserAnswer =c.QuestionAnswer                       
                    
                    } ).ToList()
                };

              return  model;
			}
			return null;

		}

		//public PagingViewModel<Data.Models.Exam> GetExamsPaging(int currentPage)
		//{
		//	throw new NotImplementedException();
		//}

		//public PagingViewModel<Data.Models.Exam> GetExamsPaging(int currentPage)
		//{
		//    PagingViewModel<Data.Models.Exam> model = new PagingViewModel<Data.Models.Exam>();
		//    var items = _dbContext.Exams.Where(c => !c.Deleted).        
		//    Skip((currentPage - 1) * TablesMaxRows.ExamIndex).Take(TablesMaxRows.ExamIndex).ToList();

		//    model.items = items;
		//    var itemsCount = _dbContext.Exams.Where(c => !c.Deleted).Count();
		//    double pageCount = (double)(itemsCount / Convert.ToDecimal(TablesMaxRows.ExamIndex));
		//    model.PageCount = (int)Math.Ceiling(pageCount);
		//    model.CurrentPageIndex = currentPage;
		//    model.itemsCount = itemsCount;
		//    model.Tablelength = TablesMaxRows.ExamIndex;
		//    return model;
		//}

		public int Update(ExamViewModel entity)
        {
           var Exam =  GetById(entity.ExamId);
            if (Exam is not null)
            {
                Exam.Name = entity.Name;
                Exam.Description = entity.Description;
                _dbContext.SaveChanges();
                return Exam.ExamId;
            }
            return 0;
        }
		public long SaveAnswer(long AnswerId, string AnswerValue, string QuestionType)
		{
            var answer = _dbContext.UserAnswers.Include(c=>c.Question.QuestionChoose).FirstOrDefault(c=>c.AnswerId == AnswerId);
			if (answer is not null)
			{
				answer.UserAnswered = true;
				answer.QuestionAnswer = AnswerValue;
				if (QuestionType.Contains("Multiple Choice"))
                {
                    foreach (var item in answer.Question.QuestionChoose)
                    {
                        if (item.Text == AnswerValue)
                        {
                            answer.QuestionChooseId = item.QuestionChooseId;
                            answer.IsAnswerCorrect = item.IsTrue;

						}
                    }
                }
                else
                {
                    if (answer.Question.CorrectAnswer !=  null && answer.Question.CorrectAnswer.ToLower().Trim().Contains(AnswerValue.ToLower().Trim()))
                    {
						answer.IsAnswerCorrect = true;
                    }
                    else
                    {
						answer.IsAnswerCorrect = false;
					}
                }
               
                
				_dbContext.SaveChanges();
				return answer.AnswerId;
			}
			return 0;
		}
	}
}
