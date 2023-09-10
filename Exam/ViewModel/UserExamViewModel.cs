using Exam.Data.Models;

namespace Exam.ViewModel
{
	public class UserExamViewModel
	{
        public Exam.Data.Models.Exam Exam { get; set; }
     
        public List<Exam.Data.Models.UserAnswer> UserAnswers { get; set; }
    }
}
