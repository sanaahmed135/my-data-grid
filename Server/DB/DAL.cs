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

        public IEnumerable<Milestone> GetMilestonesByProjectId(Guid projectId)
        {
            using (var conn = new SqlConnection(_connectionString))
            {
                var result = conn.Query<Milestone>("kuka.GetTasksByProjectUID",
                    new { @ProjectUid = projectId },
                    commandType: CommandType.StoredProcedure);

                return result;
            }

        }

        public IEnumerable<LinkedTask> GetLinkedTasksByProjectUID(Guid projectId)
        {
            using (var conn = new SqlConnection(_connectionString))
            {
                var result = conn.Query<LinkedTask>("kuka.GetLinkedTasksByProjectUID",
                    new { @ProjectUid = projectId },
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

        public int InsertMiletone(Milestone milestone)
        {
            using (var conn = new SqlConnection(_connectionString))
            {
                var result = conn.Execute("[kuka].[AddMiletonesByProjectUID]",
                    new
                    {
                        @Project = milestone.ProjectId,
                        @Name = milestone.Name,
                        @Date = milestone.Date,
                        @Type = milestone.Type,
                        @Status = milestone.Status,
                        @linkedTask = milestone.TaskId
                    },
                    commandType: CommandType.StoredProcedure);

                return result;
            }

        }

        public int DeletetMiletones(Guid projectId)
        {
            using (var conn = new SqlConnection(_connectionString))
            {
                var result = conn.Execute("[kuka].[DeleteMilestonesByProjectId]",
                    new
                    {
                        @ProjectId = projectId

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