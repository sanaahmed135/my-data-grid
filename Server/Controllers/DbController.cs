using System;
using System.Collections.Generic;
using System.Linq;
using System.Transactions;
using Microsoft.AspNetCore.Mvc;
using Dapper;
using System.Data;
using System.Data.SqlClient;
using kuka.Server.Models;
using kuka.Server.DB;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace kuka.Controllers
{
    public class TestController : Controller
    {
        private readonly DAL _dal;

        public TestController()
        {
            _dal = new DAL();
        }

        [HttpGet]
        [Route("kuka/GetAllProjects")]
        public JsonResult GetMeProjects()
        {
            try
            {
                var allProjects = _dal.GetAllProject();
                return Json(new JsonReponse { Data = allProjects, IsSucessful = true, Error = string.Empty });
            }

            catch (Exception ex)
            {
                return Json(new JsonReponse { Data = null, IsSucessful = false, Error = ex.Message });
            }
        }

        [Route("kuka/GetTaskByProjectUID/{guid}")]
        [HttpGet]
        public IEnumerable<Milestone> GetMilestonesByProjectUID(string guid)
        {
            var milestones = _dal.GetMilestonesByProjectId(new Guid(guid));
            return milestones;
        }

        [Route("kuka/GetLinkedTasksByProjectUID/{guid}")]
        [HttpGet]
        public IEnumerable<string> GetLinkedTasksByProjectUID(string guid)
        {
            var linkedLasks=_dal.GetLinkedTasksByProjectUID(new Guid(guid)).Select(x => x.TaskName);
            return linkedLasks;
        }

        [Route("kuka/GetTypes")]
        [HttpGet]
        public IEnumerable<string> GetTypes()
        {
            var types = _dal.GetAllTypes().Select(x=>x.DisplayName);
            return types;
        }

        [Route("kuka/GetStatuses")]
        [HttpGet]
        public IEnumerable<string> GetAllStatuses()
        {
            var statuses = _dal.GetAllStatuses().Select(x => x.DisplayName) ;
            return statuses;
        }

        [HttpPost, Route("kuka/Insert/{projectId}")]
        public JsonResult InsertMilestone(Guid projectId, [FromBody]IEnumerable<Milestone> milestones)
        {
            
            // 1.   Get Status , Type and Linked Task Collection
            //var typeCollection = new List<Server.Models.Type>();
            //try
            //{
                //using (var transactionScope = new TransactionScope())
                //{
                //    _dal.DeletetMiletones(projectId);

                //    foreach (var milestone in milestones)
                //    {
                //        milestone.ProjectId = milestone.ProjectId == Guid.Empty ? projectId : milestone.ProjectId;
                //        milestone.TypeId = typeCollection.Single(x => x.DisplayName == milestone.Name).id;
                //        // Same for status & linkedtask
                //        _dal.InsertMiletone(milestone);
                //    }

                //    transactionScope.Complete();
                //}
                return Json(new JsonReponse { Data = null, IsSucessful = true, Error = string.Empty });

            //}
            //catch (Exception ex)
            //{
            //    return Json(new JsonReponse { Data = null, IsSucessful = false, Error = ex.Message });
            //}
        }

        [Route("GetDisplayContent/{name}")]
        [HttpGet]
        public string GetDisplayContent(string name)
        {
            var result = new List<User>();
            //using (var con = new SqlConnection("")) {
            //    con.Open();
            //    using (var cmd = new SqlCommand()) {
            //        cmd.Connection = con;
            //        cmd.CommandType = CommandType.StoredProcedure;
            //        cmd.CommandText = "kuka.sanawashere";
            //        cmd.Parameters.Add(new SqlParameter() { ParameterName = "@ProjectUid", SqlDbType = SqlDbType.UniqueIdentifier, Value = Guid.NewGuid() });
            //        cmd.Parameters.Add(new SqlParameter() { ParameterName = "@ProjectNAme", SqlDbType = SqlDbType.NVarChar, Size=255, Value = "hugo" });
            //        /*
            //        cmd.Parameters.Add(new SqlParameter() { ParameterName = "@ProjectNAm2e", SqlDbType = SqlDbType.NVarChar, Size=255, Value = null }); // ERROR
            //        cmd.Parameters.Add(new SqlParameter() { ParameterName = "@ProjectNAm2e", SqlDbType = SqlDbType.NVarChar, Size=255, Value = DBNull.Value});
            //        */
            //        using (var reader = cmd.ExecuteReader()) {
            //            while (reader.Read()) {
            //                var user = new User();
            //                user.Username = reader.IsDBNull(0)?null:reader.GetString(0);
            //                user.Email = reader.GetString(1);
            //                result.Add(user);
            //            }
            //        }
            //    }
            //    con.Dispose();
            //}


            return $"Hello  {name} ";
        }

        //[Route("SignIn")]
        //[HttpPost]
        //public User SignIn([FromBody]User account)
        //{
        //    //var output = // db callfdfdsöfsd
        //    return new User { Username = "sana", Password = "saad" };
        //}
    }

    public class User
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
    }
}
