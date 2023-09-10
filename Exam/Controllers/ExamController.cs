using Exam.Identity_Models;
using Exam.IRepository;
using Exam.Repository;
using Exam.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Exam.Controllers
{
    
    public class ExamController : Controller
    {
        private readonly IRepositoryExam _IRepositoryExam;
        public ExamController(IRepositoryExam RepositoryExam)
        {
            _IRepositoryExam = RepositoryExam;
        }
		// GET: ExamController
		[Authorize(Permissions.Exam.Manage)]
		public ActionResult Index(int CurrentPageIndex = 1)
        {
            try
            {
                return View(_IRepositoryExam.FindByCondition(c=>!c.Deleted));
            }
			 catch (Exception ex)
			{
				return View("Error", ex);
			}

		}

		// GET: ExamController/Details/5
		[Authorize(Permissions.Exam.Manage)]
		public ActionResult Details(int id)
        {
            return View();
        }

		// GET: ExamController/Create
		[Authorize(Permissions.Exam.Manage)]
		public ActionResult Create()
        {
            return View(new ExamViewModel());
        }

		// POST: ExamController/Create
		[Authorize(Permissions.Exam.Manage)]
		[HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(ExamViewModel model)
        {
            try
            {
				Exam.Data.Models.Exam exam = new Exam.Data.Models.Exam()
                {
                    Description = model.Description,
                    Name = model.Name,  
                    CreateDT = DateTime.Now,
                    Deleted = false                  
                };
                int ExamId =  _IRepositoryExam.Create(exam);
                if (ExamId > 0)
                {
					return RedirectToAction("View",new { ExamId });
				}
				return View("Error");
			}
            catch (Exception ex)
            {
				return View("Error", ex);
			}
        }

		// GET: ExamController/Edit/5
		[Authorize(Permissions.Exam.Manage)]
		public ActionResult Edit(int ExamId)
        {
            try
            {
                var exam = _IRepositoryExam.GetById(ExamId);
                if (exam != null)
                {
                    return View("Create", new ExamViewModel { Name = exam.Name, Description = exam.Description, ExamId = exam.ExamId });
                }
                return View("Error");
            }
            catch (Exception ex)
            {
                return View("Error", ex);
            }
           
        }

        // POST: ExamController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
		[Authorize(Permissions.Exam.Manage)]
		public ActionResult Edit(ExamViewModel model)
        {
            try
            {
               var ExamId= _IRepositoryExam.Update(model);
                if (ExamId > 0)
                {
                    return RedirectToAction("View", new { ExamId });
                }
                return View("Error");
            }
            catch (Exception ex)
            {
                return View("Error", ex);
            }
        }

		[Authorize(Permissions.Exam.Manage)]
		public ActionResult View(int ExamId,bool FromQuestion =false)
        {
			
			try
			{
				var Exam = _IRepositoryExam.GetDetailsById(ExamId);
				if (Exam != null)
				{
                    Exam.FromQuestion= FromQuestion;                   
					return View(Exam);
				}
				return View("Error");
			}
			catch (Exception ex)
			{
				return View("Error", ex);
			}

		}

        // POST: ExamController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
		[Authorize(Permissions.Exam.Manage)]
		public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
		[Authorize(Permissions.StartExam.Manage)]
		public ActionResult ExamsForStudent()
        {

            try
            {
                var Exams = _IRepositoryExam.FindByCondition(c=> !c.Deleted && c.Questions.Where(c=> !c.Deleted).Count() > 0);
                if (Exams != null)
                {                    
                    return View(Exams);
                }
                return View("Error");
            }
            catch (Exception ex)
            {
                return View("Error", ex);
            }

        }
		[Authorize(Permissions.StartExam.Manage)]
		public ActionResult StartExam(int ExamId)
		{

			try
			{
                var UserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
				var model = _IRepositoryExam.StartExam(ExamId, UserId);
                if (model != null )
                {
                    return View(model);
                }
                return View("Error");
			}
			catch (Exception ex)
			{
				return View("Error", ex);
			}

		}
		[HttpPost]
		public IActionResult SaveAnswer(long AnswerId,string AnswerValue,string QuestionType)
		{
			try
			{
				long answerId = _IRepositoryExam.SaveAnswer(AnswerId, AnswerValue, QuestionType);
				if (answerId > 0)
				{
					return Json(answerId);
				}
				return Json(0);
			}
			catch (Exception)
			{
				return Json(0);
			}
		}
		
		public ActionResult EndExam(int UserExamId)
		{

			try
			{
				var UserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
			    var model =  _IRepositoryExam.EndExam(UserExamId);
				
			    return RedirectToAction("DisplayExamResultsStudent",new { UserExamId = UserExamId, UserId = UserId });
				
				
			}
			catch (Exception ex)
			{
				return View("Error", ex);
			}

		}
		public ActionResult DisplayExamResultsStudent(int UserExamId,string UserId)
		{

			try
			{
				
				var model =_IRepositoryExam.DisplayExamResultsStudent( UserExamId, UserId);
				if (model != null)
				{
					return View(model);
				}
				return View("Error");
			}
			catch (Exception ex)
			{
				return View("Error", ex);
			}

		}
	}
}
