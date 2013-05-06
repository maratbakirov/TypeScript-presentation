using System.Web;
using System.Web.Optimization;

namespace TypescriptDemo
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            RegisterScriptBundles(bundles);
            RegisterStyleBundles(bundles);
        }

        private static void RegisterScriptBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include("~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/app").Include(
                "~/Scripts/jquery-{version}.js",
                "~/Scripts/bootstrap.js",
                "~/Scripts/knockout-{version}.js",
                "~/App/services/httpclient.js",
                "~/App/viewmodels/playbook.editableitem.js",
                "~/App/viewmodels/playbook.tagsviewmodel.js",
                "~/App/viewmodels/playbook.bootstrapper.js"
                ));
        }

        private static void RegisterStyleBundles(BundleCollection bundles)
        {
            bundles.Add(new StyleBundle("~/Content/css").Include("~/Content/site.css"));

            //bundles.Add(new StyleBundle("~/Content/themes/base/css").Include(
            //            "~/Content/themes/base/jquery.ui.core.css",
            //            //"~/Content/themes/base/jquery.ui.resizable.css",
            //            //"~/Content/themes/base/jquery.ui.selectable.css",
            //            //"~/Content/themes/base/jquery.ui.accordion.css",
            //            //"~/Content/themes/base/jquery.ui.autocomplete.css",
            //            //"~/Content/themes/base/jquery.ui.button.css",
            //            //"~/Content/themes/base/jquery.ui.dialog.css",
            //            //"~/Content/themes/base/jquery.ui.slider.css",
            //            //"~/Content/themes/base/jquery.ui.tabs.css",
            //            //"~/Content/themes/base/jquery.ui.datepicker.css",
            //            //"~/Content/themes/base/jquery.ui.progressbar.css",
            //            "~/Content/themes/base/jquery.ui.theme.css"));
        }
    }
}