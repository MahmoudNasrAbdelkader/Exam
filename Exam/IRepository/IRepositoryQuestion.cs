using Exam.Data.Models;

namespace Exam.IRepository
{
	public interface IRepositoryQuestion 
	{
		int CreateMultipleChoice(int ExamId, string questionText, string choice1, string choice2, string choice3, string choice4, string choice);
		int CreateTF(int ExamId, string questionText, string inputtf);
		int CreateFillBlank(int ExamId, string questionText, string correctAnswert);
		int CreateEssay(int ExamId, string questionText, string correctAnswert);
		Question GetQuestionDetails(int QuestionId);
		int Delete(int QuestionId);
	}
}
