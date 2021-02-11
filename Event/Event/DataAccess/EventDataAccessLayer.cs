using Event.Controllers;
using Event.Interfaces;
using Event.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Ninject.Activation;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace Event.DataAccess
{
    public class EventDataAccessLayer : IEvent
    {
        private myTestDBContext db;

       

        public EventDataAccessLayer(myTestDBContext _db)
        {
            db = _db;

          
        }

        public IEnumerable<TblEvents> GetAllEvents()
        {
            try
            {
                return db.TblEvent.ToList().OrderBy(x => x.EventId);
            }
            catch
            {
                throw;
            }
        }

        
        public int AddEvent(TblEvents events)
        {
            try
            {

                string cute_String;
                string MyString = events.Photo;
                cute_String = MyString.Remove(0, 12);
                events.Photo = cute_String;
                db.TblEvent.Add(events);

                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

        public int UpdateEvent(TblEvents events)
        {
            try
            {
                string cute_String;
                string MyString = events.Photo;
                cute_String = MyString.Remove(0, 12);
                events.Photo = cute_String;
                db.Entry(events).State = EntityState.Modified;
                db.SaveChanges();

                return 1;
            }
            catch
            {
                throw;
            }
        }

    
        public TblEvents GetEventData(int id)
        {
            try
            {
                TblEvents events = db.TblEvent.Find(id);
                return events;
            }
            catch
            {
                throw;
            }
        }


        public int DeleteEvent(int id)
        {
            try
            {
                TblEvents events = db.TblEvent.Find(id);
                db.TblEvent.Remove(events);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

   
        public List<TblCities> GetCities()
        {
            List<TblCities> lstCity = new List<TblCities>();
            lstCity = (from CityList in db.TblCities select CityList).ToList();

            return lstCity;
        }


        
    }
}
