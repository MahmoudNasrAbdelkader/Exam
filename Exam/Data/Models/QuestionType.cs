using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Exam.Data.Models
{
    public class QuestionType
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int QuestionTypeId { get; set; }
        public string Text { get; set; }
        public bool Deleted { get; set; }
        public virtual ICollection<Question> Questions { get; }
    }
}
