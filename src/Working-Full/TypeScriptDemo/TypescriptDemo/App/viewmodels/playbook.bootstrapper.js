define(["require", "exports", "../services/httpclient", "playbook.viewmodel"], function(require, exports, __Utils__, __vm__) {
    var Utils = __Utils__;

    var vm = __vm__;

    function run() {
        Utils.http.get("/api/tags", function (data) {
            var mainVM = new vm.PlaybookViewModel(data);
            ko.applyBindings(mainVM);
        });
    }
    exports.run = run;
})
