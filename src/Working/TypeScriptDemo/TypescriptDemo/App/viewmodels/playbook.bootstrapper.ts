/// <reference path="playbook.tagsviewmodel.ts" />
/// <reference path="../services/httpclient.ts" />

//module Michelotti.Playbook{
import Utils = module("../services/httpclient");// Michelotti.Playbook.Utils;
import tags = module("playbook.tagsviewmodel");

    
export function run() {
    Utils.http.get("/api/tags", (data) => {
        var tagsVM = new tags.TagsViewModel(data);
        ko.applyBindings(tagsVM);
    });
}

//}