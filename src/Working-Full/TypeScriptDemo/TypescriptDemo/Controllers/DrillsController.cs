using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using TypescriptDemo.Models;

namespace TypescriptDemo.Controllers
{
    public class DrillsController : ApiController
    {
        private PlaybookContext db = new PlaybookContext();

        // GET api/Drills
        public IEnumerable<Drill> GetDrills()
        {
            var drills = db.Drills.Include(d => d.Tag);
            return drills.AsEnumerable();
        }

        public List<Drill> GetByTag(int tagId)
        {
            //var list = this.drillRepository.All.Where(d => d.TagId == tagId).ToList();
            var list = db.Drills.Where(d => d.TagId == tagId).ToList();
            return list;
        }

        // GET api/Drills/5
        public Drill GetDrill(int id)
        {
            Drill drill = db.Drills.Find(id);
            if (drill == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return drill;
        }

        // PUT api/Drills/5
        public HttpResponseMessage PutDrill(int id, Drill drill)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != drill.Id)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(drill).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        // POST api/Drills
        public HttpResponseMessage PostDrill(Drill drill)
        {
            if (ModelState.IsValid)
            {
                db.Drills.Add(drill);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, drill);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = drill.Id }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/Drills/5
        public HttpResponseMessage DeleteDrill(int id)
        {
            Drill drill = db.Drills.Find(id);
            if (drill == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.Drills.Remove(drill);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, drill);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}