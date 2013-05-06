/// <reference path="../defs/knockout.d.ts" />
/// <reference path="playbook.tagsviewmodel.ts" />
/// <reference path="playbook.drillsviewmodel.ts" />

// Module
//module Michelotti.Playbook {

import Utils = module("../services/httpclient");// Michelotti.Playbook.Utils;
import tags = module("playbook.tagsviewmodel");
import drills = module("playbook.drillsviewmodel");

    // Class
    export class PlaybookViewModel {
        // Constructor
        constructor(initialData: any[]) {
            this.tagsViewModel = new tags.TagsViewModel(initialData);
            this.drillsViewModel = new drills.DrillsViewModel();

            this.tagsViewModel.selectedTag.subscribe(newSelectedTag => {
                Utils.http.get("/api/drills?tagId=" + this.tagsViewModel.selectedTag().id(), data => {
                    var mappedData = ko.utils.arrayMap(data, (item: any) => {
                        return new drills.DrillItem(item);
                    });
                    this.drillsViewModel.drills(mappedData);
                });
            });

            this.tagsViewModel.selectedTag(this.tagsViewModel.tags()[0]);
        }

        // Instance member
        tagsViewModel: tags.TagsViewModel;
        drillsViewModel: drills.DrillsViewModel;

    }// end class PlaybookViewModel
//}