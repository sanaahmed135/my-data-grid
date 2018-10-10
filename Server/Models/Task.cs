using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace kuka.Server.Models
{
    public class Task
    {
        public Guid Project { get; set; }
        public string Name { get; set; }

        public string Date { get; set; }

        public string Type { get; set; }

        public string Status { get; set; }
        //public bool isMilestone { get; set; }

        //public bool isActive { get; set; }

        public Guid LinkedTask { get; set; }

    }
}
