using kuka.Server.Models;
using Dapper;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System;
using System.Data;

namespace kuka.Server.DB
{
    public class DAL
    {
        private readonly string _connectionString = $@"Data Source=JELA;Initial Catalog=SOLVIN_DWH_devflorian;Integrated Security=SSPI;";

        public IEnumerable<Project> GetAllProject()
        {
            using (var conn = new SqlConnection(_connectionString))
            {

                var result = conn.Query<Project>("kuka.GetMilestoneProjects",
                    commandType: CommandType.StoredProcedure);
                return result;
            }

        }
       
        public IEnumerable<Task> GetTaskByProjectUID(Guid projectId)
        {
            using (var conn = new SqlConnection(_connectionString))
            {
                var result = conn.Query<Task>("kuka.GetTasksByProjectUID",
                    new { @ProjectUid = projectId},
                    commandType: CommandType.StoredProcedure);
 
                return result;
            }

        }
        public IEnumerable<Models.Type> GetAllTypes()
        {
            using (var conn = new SqlConnection(_connectionString))
            {
                var result = conn.Query<Models.Type>("kuka.GetTypes",
                    commandType: CommandType.StoredProcedure);

                return result;
            }

        }

        public IEnumerable<Models.Status> GetAllStatuses()
        {
            using (var conn = new SqlConnection(_connectionString))
            {
                var result = conn.Query<Models.Status>("kuka.GetStatuses",
                    commandType: CommandType.StoredProcedure);

                return result;
            }

        }
        public int AddMiletonesByProjectUID(Guid projectId, string task, string date, string type, string status, Guid linkedTask)

        {
            using (var conn = new SqlConnection(_connectionString))
            {
                var result = conn.Execute("[kuka].[AddMiletonesByProjectUID]",
                    new { @Project = projectId,
                    @Name =task,
                    @Date =date,
                    @Type = type,
                    @Status = status,
                    @linkedTask = linkedTask
                    },
                    commandType: CommandType.StoredProcedure);

                return result;
            }

        }

        //public IEnumerable<SamWasHere> GetSameWasHereByProjectId(Guid projectId)
        //{
        //    try
        //    {
        //        using (var conn = new SqlConnection(_connectionString))
        //        {

        //            var result = conn.Query<SamWasHere>("[kuka].[SanaWasHere]", new { @ProjectUid = projectId, @ProjectName= "Milestone3" }, commandType: CommandType.StoredProcedure);
        //            return result;
        //        }
        //    }

        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}
    }
}