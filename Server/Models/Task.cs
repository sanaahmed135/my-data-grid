using System;
using System.Collections.Generic;


namespace kuka.Server.Models
{
    public class Task
    {
        public Guid Project { get; set; }
        public string Name { get; set; }

        public string Date { get; set; }

        public string Type { get; set; }

        public string Status { get; set; }
       
        public IEnumerable<string> LinkedTask { get; set; }

    }
}
