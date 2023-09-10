using Exam.Data.Models.Identity;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Exam.Data.Models
{
    public class UserExam
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int UserExamId { get; set; }
        public int ExamId { get; set; }
        [ForeignKey("ExamId")]
        public virtual Exam Exam { get; set; }
        public string ApplicationUserId { get; set; }

        [ForeignKey("ApplicationUserId")]
        public virtual ApplicationUser User { get; set; }
        public DateTime CreateDT { get; set; }
		public DateTime? EndDT { get; set; }
		public virtual List<UserAnswer> UserAnswers { get; }

	}
}
