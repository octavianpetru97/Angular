using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Event.Models
{
    public partial class TblEvents
    {
        public int EventId { get; set; }
        public string Name { get; set; }
        public string City { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
        public string Photo { get; set; }

      

    }
}
