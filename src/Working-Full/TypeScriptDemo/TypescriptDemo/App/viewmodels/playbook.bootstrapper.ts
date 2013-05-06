/// <reference path="playbook.tagsviewmodel.ts" />
/// <reference path="../services/httpclient.ts" />

//module Michelotti.Playbook{
import Utils = module("../services/httpclient");// Michelotti.Playbook.Utils;
import vm = module("playbook.viewmodel");

export function run() {
    Utils.http.get("/api/tags", (data) => {
        //var tagsVM = new TagsViewModel(data);
        var mainVM = new vm.PlaybookViewModel(data);
        ko.applyBindings(mainVM);

    });
}

//}