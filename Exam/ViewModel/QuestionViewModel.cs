using Exam.Data.Models;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace Exam.ViewModel
{
	public class QuestionViewModel
	{
        public int QuestionId { get; set; }
        public int ExamId { get; set; }
		public string ExamName{ get; set; }
		public SelectList QuestionTypes { get; set; }
        public Question Question { get; set; }
    }
}
