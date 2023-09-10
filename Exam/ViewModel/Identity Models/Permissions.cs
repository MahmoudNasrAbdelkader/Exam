using Exam.Identity_Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Exam.Identity_Models
{
    public static class Permissions
    {
        public static List<string> GeneratePermissionsList(string module)
        {
            //   if module do somthing else
        
          if (module == "Users")
            {
                return new List<string>()
            {
                $"Permissions.{module}.View",
                $"Permissions.{module}.Create",
                $"Permissions.{module}.Edit"

            };


            }

            else if (module == "Roles")
            {
                return new List<string>()
                    {
                        $"Permissions.{module}.View",
                        $"Permissions.{module}.Create",
                        $"Permissions.{module}.Edit",
                        $"Permissions.{module}.ManagePermissions"
                    };

            }
            else if (module == "Exam")
            {
                return new List<string>()
                    {                       
                        $"Permissions.{module}.Manage"
                    };

            }
			

	        else if (module == "StartExam")
			{
				return new List<string>()
					{
						$"Permissions.{module}.Manage"
					};

			}

			else
            {
                return new List<string>()
            {
                $"Permissions.{module}.View",
                $"Permissions.{module}.Create",
                $"Permissions.{module}.Edit",
                 $"Permissions.{module}.Active_DeActive"
            };
            }
        }

        public static List<string> GenerateAllPermissions()
        {
            var allPermissions = new List<string>();

            var modules = Enum.GetValues(typeof(Modules));

            foreach (var module in modules)
                allPermissions.AddRange(GeneratePermissionsList(module.ToString()));

            return allPermissions;
        }

        
        public static class Users
        {
            public const string View = "Permissions.Users.View";
            public const string Create = "Permissions.Users.Create";
            public const string Edit = "Permissions.Users.Edit";

        }
        public static class Roles
        {
            public const string View = "Permissions.Roles.View";
            public const string Create = "Permissions.Roles.Create";
            public const string Edit = "Permissions.Roles.Edit";
            public const string ManagePermissions = "Permissions.Roles.ManagePermissions";


        }
       
        public static class Exam
		{
            public const string Manage = "Permissions.Exam.Manage";
        }
		public static class StartExam
		{
			public const string Manage = "Permissions.StartExam.Manage";
		}
		

	}
}
