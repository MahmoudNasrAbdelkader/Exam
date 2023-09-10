using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Exam.Data.Models
{
    public class Exam
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int ExamId { get; set; }
        public string Name { get; set; }
        public DateTime CreateDT { get; set; }
        public bool Deleted { get; set; }
        public string? Description { get; set; }
		public virtual ICollection<Question> Questions { get; }

	}
}
