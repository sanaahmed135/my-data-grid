
using Newtonsoft.Json;
using System;

namespace kuka.Server.Models
{
    public class Milestone
    {
        [JsonProperty("task")]
        public string Name { get; set; }

        [JsonProperty("rDate")]
        public string Date { get; set; }

        public string Type { get; set; }

        public string Status { get; set; }
        
        public Guid? ProjectId { get; set; }

        [JsonProperty("linkedTaskName")]
        public string TaskName { get; set; }

        [JsonIgnore]
        public int TypeId { get; set; }

        [JsonIgnore]
        public int StatusId { get; set; }

        [JsonIgnore]
        public Guid TaskId { get; set; }

    }
}
