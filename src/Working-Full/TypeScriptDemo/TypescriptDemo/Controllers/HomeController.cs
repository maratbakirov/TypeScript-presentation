using System.Web.Mvc;

namespace TypescriptDemo.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            this.ViewBag.Title = "Basketball Playbook";
            return View();
        }
    }
}
