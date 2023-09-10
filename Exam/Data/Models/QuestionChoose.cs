using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Exam.Data.Models
{
    public class QuestionChoose
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int QuestionChooseId { get; set; }
        public string Text { get; set; }
        public bool IsTrue { get; set; }
        public bool Deleted { get; set; }
        public int QuestionId { get; set; }
        [ForeignKey("QuestionId")]
        public virtual Question Question { get; set; }
    }
}
