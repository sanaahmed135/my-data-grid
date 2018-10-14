
using Newtonsoft.Json;
using System;

namespace kuka.Server.Models
{
    public class Milestone
    {
        [JsonProperty("task")]
        public string Name { get; set; }
        
        public string Date { get; set; }

        public string Type { get; set; }

        public string Status { get; set; }

        public Guid ProjectId { get; set; }

        public Guid TaskId { get; set; }

        [JsonProperty("linkedTaskName")]
        public string TaskName { get; set; }


    }
}
