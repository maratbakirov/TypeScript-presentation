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
    public class TagsController : ApiController
    {
        private PlaybookContext db = new PlaybookContext();

        // GET api/Tags
        public IEnumerable<Tag> GetTags()
        {
            return db.Tags.AsEnumerable();
        }

        // GET api/Tags/5
        public Tag GetTag(int id)
        {
            Tag tag = db.Tags.Find(id);
            if (tag == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return tag;
        }

        // PUT api/Tags/5
        public HttpResponseMessage PutTag(int id, Tag tag)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != tag.Id)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(tag).State = EntityState.Modified;

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

        // POST api/Tags
        public HttpResponseMessage PostTag(Tag tag)
        {
            if (ModelState.IsValid)
            {
                db.Tags.Add(tag);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, tag);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = tag.Id }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/Tags/5
        public HttpResponseMessage DeleteTag(int id)
        {
            Tag tag = db.Tags.Find(id);
            if (tag == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.Tags.Remove(tag);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, tag);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}