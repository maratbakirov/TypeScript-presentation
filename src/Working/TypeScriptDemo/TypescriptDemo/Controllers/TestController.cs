using System.Web.Mvc;

namespace TypescriptDemo.Controllers
{
    public class TestController : Controller
    {
        public ActionResult Index()
        {
            this.ViewBag.Title = "TypeScript Test";
            return View();
        }
    }
}
