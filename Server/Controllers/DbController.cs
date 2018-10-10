﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
        [Route("Test/GetAllProjects")]
        public IEnumerable<Project> GetMeProjects()
        {
            var allProjects = _dal.GetAllProject();
            return allProjects;
        }

        [Route("Test/GetTaskByProjectUID/{guid}")]
        [HttpGet]
        public IEnumerable<Server.Models.Task> GetTaskByProjectUID(string guid)
        {
            var tasks = _dal.GetTaskByProjectUID(new Guid(guid));
            return tasks;
        }
        //[Route("Test/SetTasks/{guid}/{name}/{date}/{type}/{status}/{linkedTask}")]
        [HttpPost, Route("AddTasks")]
        [HttpPost]
        public int SetTasks([FromBody]Server.Models.Task task)
        {
            var tasks = _dal.AddMiletonesByProjectUID(task.Project,task.Name,task.Date,task.Type,task.Status, task.LinkedTask);
            return tasks;
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