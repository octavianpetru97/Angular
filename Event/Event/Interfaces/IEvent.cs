using Event.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Event.Interfaces
{
    public interface IEvent
    {
        IEnumerable<TblEvents> GetAllEvents();
        int AddEvent(TblEvents events);
        int UpdateEvent(TblEvents events);
        TblEvents GetEventData(int id);
        int DeleteEvent(int id);
        List<TblCities> GetCities();
    }
}
