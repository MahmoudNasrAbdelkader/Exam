using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Exam.Migrations
{
    public partial class updateUser5 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserAnswers_QuestionChooses_QuestionChooseId",
                table: "UserAnswers");

            migrationBuilder.AlterColumn<int>(
                name: "QuestionChooseId",
                table: "UserAnswers",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_UserAnswers_QuestionChooses_QuestionChooseId",
                table: "UserAnswers",
                column: "QuestionChooseId",
                principalTable: "QuestionChooses",
                principalColumn: "QuestionChooseId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserAnswers_QuestionChooses_QuestionChooseId",
                table: "UserAnswers");

            migrationBuilder.AlterColumn<int>(
                name: "QuestionChooseId",
                table: "UserAnswers",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_UserAnswers_QuestionChooses_QuestionChooseId",
                table: "UserAnswers",
                column: "QuestionChooseId",
                principalTable: "QuestionChooses",
                principalColumn: "QuestionChooseId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
