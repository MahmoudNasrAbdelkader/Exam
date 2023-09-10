using Exam.Data.Models;
using Exam.ViewModel;
using static Exam.Identity_Models.Permissions;

namespace Exam.IRepository
{
    public interface IRepositoryExam : IRepositoryBase<Exam.Data.Models.Exam>
    {   
        int Update(ExamViewModel entity);
		ExamDetailsViewModel GetDetailsById(int id);
		UserExamViewModel StartExam(int ExamId,string UserId);
		long SaveAnswer(long AnswerId, string AnswerValue, string QuestionType);
		 int EndExam(int UserExamId);
		ExamResultsStudentViewModel DisplayExamResultsStudent(int UserExamId, string UserId);
	}
}
