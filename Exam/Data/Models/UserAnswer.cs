using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Exam.Data.Models
{
    public class UserAnswer
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public long AnswerId { get; set; }
        public string? QuestionAnswer { get; set; }
        public int UserExamId { get; set; }
        [ForeignKey("UserExamId")]
        public virtual UserExam UserExam { get; set; }
        public int QuestionId { get; set; }
        [ForeignKey("QuestionId")]
        public virtual Question Question { get; set; }
        public int? QuestionChooseId { get; set; }
        [ForeignKey("QuestionChooseId")]
        public virtual QuestionChoose? QuestionChoose { get; set; }
        public bool UserAnswered { get; set; }
        public bool IsAnswerCorrect { get; set; }
	}

}
