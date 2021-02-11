using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Event.Interfaces;
using Event.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Event.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class EventController : Controller
    {
        private readonly IEvent objevent;
        private IHostingEnvironment _hostingEnvironment;
        private myTestDBContext db;


        public EventController(IEvent _objevent, IHostingEnvironment hostingEnvironment)
        {
            objevent = _objevent;
            _hostingEnvironment = hostingEnvironment;
        }

        [HttpGet]
        [Route("Index")]
        public IEnumerable<TblEvents> Index()
        {
            return objevent.GetAllEvents();
        }

        [HttpPost]
        [Route("Create")]
        public int Create([FromBody] TblEvents events)
        {
            
            return objevent.AddEvent(events);
        }

        [HttpGet]
        [Route("Details/{id}")]
        public TblEvents Details(int id)
        {
            return objevent.GetEventData(id);
        }

        [HttpPut]
        [Route("Edit")]
        public int Edit([FromBody]TblEvents events)
        {
           
            return objevent.UpdateEvent(events);
        }

        [HttpDelete]
        [Route("Delete/{id}")]
        public int Delete(int id)
        {
            return objevent.DeleteEvent(id);
        }

        [HttpGet]
        [Route("GetCityList")]
        public IEnumerable<TblCities> Details()
        {
            return objevent.GetCities();
        }

        [HttpPost, DisableRequestSizeLimit]
        public ActionResult UploadFile()
        {
            TblEvents events = new TblEvents();
            

            try
            {
                
                var file = Request.Form.Files[0];
                string folderName = "Upload";// folderul unde se afla pozele 
                string webRootPath = _hostingEnvironment.WebRootPath; // obtine calea wwwroot 
                string newPath = Path.Combine(webRootPath, folderName);// combina cele doua wwwrooth si upload - wwwroot\\upload
                if (!Directory.Exists(newPath))
                {
                    Directory.CreateDirectory(newPath);
                }
                if (file.Length > 0)
                {
                    
                    string fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"'); // preia numele pzoei - poza.jpg
                    events.Photo = '/' + folderName + '/' + fileName; 
                    string fullPath = Path.Combine(newPath, fileName);// creeaza calea spre poza wwwroot\\upload\\poza
                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);// copiaza tot nume , lungimea pozei 
                    }
                }
                return Json("Upload Successful.");
            }
            catch (System.Exception ex)
            {
                return Json("Upload Failed: " + ex.Message);
            }

        }

    }
}
