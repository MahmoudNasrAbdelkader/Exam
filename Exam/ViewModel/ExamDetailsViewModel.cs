namespace Exam.ViewModel
{
	public class ExamDetailsViewModel
	{
        public Exam.Data.Models.Exam Exam { get; set; }
        public bool FromQuestion { get; set; }
        public List<QuestionIndexViewModel> questions { get; set; }
		public List<ExamResultsStudentViewModel> exams { get; set; }
	}
	public class QuestionIndexViewModel
	{
        public int QuestionId { get; set; }
        public string Text { get; set; }
		public string TypeName { get; set; }
	}
}
