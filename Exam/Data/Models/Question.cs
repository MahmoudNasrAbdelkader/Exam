using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Exam.Data.Models
{
    public class Question
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int QuestionId { get; set; }
        public string Text { get; set; }
        public string? CorrectAnswer { get; set; }
        public bool Deleted { get; set; }
        public int QuestionTypeId { get; set; }
        [ForeignKey("QuestionTypeId")]
        public virtual QuestionType QuestionType { get; set; }
        public int ExamId { get; set; }
        [ForeignKey("ExamId")]
        public virtual Exam Exam { get; set; }
        public int Degree { get; set; }
		public virtual List<QuestionChoose> QuestionChoose { get; }


	}
}
