define(["require", "exports", "../services/httpclient", "playbook.tagsviewmodel"], function(require, exports, __Utils__, __tags__) {
    var Utils = __Utils__;

    var tags = __tags__;

    function run() {
        Utils.http.get("/api/tags", function (data) {
            var tagsVM = new tags.TagsViewModel(data);
            ko.applyBindings(tagsVM);
        });
    }
    exports.run = run;
})
