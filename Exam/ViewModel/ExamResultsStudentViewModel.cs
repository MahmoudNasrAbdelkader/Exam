namespace Exam.ViewModel
{
	public class ExamResultsStudentViewModel
	{
        public string UserId { get; set; }
		public int UserExamId { get; set; }
		public string? FirstName { get; set; }
		public string? LastName { get; set; }
		public string? UserName { get; set; }
		public string ExamName { get; set; }
		public DateTime CreateDT { get; set; }
		public DateTime? EndDT { get; set; }
        public List<QuestionResultStudentViewModel> QuestionsResults { get; set; }
    }
	public class QuestionResultStudentViewModel
	{
		public string Question { get; set; }
		public string? CorrectAnswer { get; set; }
		public string? UserAnswer { get; set; }
		public bool IsUserAnswered { get; set; }
		public bool IsAnswerCorrect { get; set; }
	}
}
