#NoEnv  ; Recommended for performance and compatibility with future AutoHotkey releases.
; #Warn  ; Enable warnings to assist with detecting common errors.
SendMode Input  ; Recommended for new scripts due to its superior speed and reliability.
SetWorkingDir %A_ScriptDir%  ; Ensures a consistent starting directory.


::ts1::
;httpclient
Clipboard = 
(
        /// <reference path="../defs/jquery.d.ts" />

module Michelotti.Playbook.Utils {

    export class HttpClient {
        get (url: string, callback: (data: any) => any) {
            $.get(url, callback);
        }

        post(url: string, dataToSave: any, callback: (data: string) => any) {
            this.executeAjax(url, dataToSave, "POST", callback);
        }

        put(url: string, dataToSave: any, callback?: (data: string) => any) {
            this.executeAjax(url, dataToSave, "PUT", callback);
        }

        delete(url: string, callback?: (data: string) => any) {
            this.executeAjax(url, null, "DELETE", callback);
        }

        private executeAjax(url: string, dataToSave: any, httpVerb: string, callback: (data: string) => any) {
            $.ajax(url, {
                data: dataToSave,
                type: httpVerb,
                dataType: 'json',
                contentType: 'application/json',
                success: (data) => {
                    if (callback !== undefined) {
                        callback(data);
                    }
                }
            });
        }
    }

    export var http = new HttpClient();
}
)
send ^v
return



;******************************************************************************
::ts2::
;initialBundleFiles
Clipboard = 
(
"~/App/services/httpclient.js",
                "~/App/viewmodels/playbook.tagsviewmodel.js",
                "~/App/viewmodels/playbook.bootstrapper.js"
)
send ^v
return



;******************************************************************************
::ts3::
;initialIndex
Clipboard = 
(
<div id="main-content">

    <div class="row">

        <div id="tagsList" class="span5 box-section">
            <div class="row title">
                <h4>Tags</h4>
            </div>
            <div class="row input-append input-row">
                <input type="text" placeholder="Add New Tag" />
                <button type="submit" class="btn btn-primary"><i class="icon-plus icon-white"></i> Add</button>
            </div>

            <div class="row container-list">
                <div class="row item-row">
                    <div class="span2"></div>
                     <div class="span2">
                        <a href="#" data-toggle="modal" data-target="#tagDialog" role="button"><i class="icon-edit"></i> Edit</a>
                        <a href="#"><i class="icon-remove"></i> Delete</a>
                    </div>
                </div>
            </div>
        </div><!--end tags box-->


    </div><!--outer row-->

    
</div>

@section scripts {
    @Scripts.Render("~/bundles/app")
}
)
send ^v
return



;******************************************************************************
::ts4::
;tagsDialog
Clipboard = 
(
        <div id="tagDialog" class="modal hide fade" role="dialog" data-backdrop="static" data-bind="with: selectedTag">
            <div class="modal-header">
                <h3>Tag Name:</h3>
            </div>
            <div class="modal-body">
                <input type="text" data-bind="value: name" />
            </div>
            <div class="modal-footer">
                <button class="btn" data-dismiss="modal" aria-hidden="true">Cancel</button>
                <button class="btn btn-primary" data-dismiss="modal" aria-hidden="true">Save</button>
            </div>
        </div>
)
send ^v
return



;******************************************************************************
::ts5::
;editableItem
Clipboard = 
(
/// <reference path="../defs/knockout.d.ts" />

module Michelotti.Playbook {
    export class EditableItem {
        private cache: any;

        constructor() {
            this.cache = function () { };
        }

        revert() {
            this.updateValues(this.cache.latestData);
        }

        commit() {
            this.cache.latestData = ko.toJS(this);
        }

        updateValues(data) {
            this.cache.latestData = data;

            for (var property in data) {
                if (data.hasOwnProperty(property) && this.hasOwnProperty(property)) {
                    this[property](data[property]);
                }
            }
        }
    }
}
)
send ^v
return



;******************************************************************************
::ts6::
;DrillsViewModel
Clipboard = 
(
/// <reference path="../services/httpclient.ts" />
/// <reference path="../defs/knockout.d.ts" />
/// <reference path="playbook.editableItem.ts" />

import Utils = Michelotti.Playbook.Utils;

// Module
module Michelotti.Playbook {

    // Class
    export class DrillsViewModel {
        // Construtor
        constructor() {
            this.drillClick = (drill: DrillItem) => {
                this.clickedDrill(drill);
            };

            this.drillMouseOver = (drill: DrillItem) => {
                this.hoverDrill(drill);
            };

            this.drillMouseOut = () => {
                this.hoverDrill(null);
            }

            this.selectedDrill = ko.computed(() => {
                var hoverDrill = this.hoverDrill();
                var clickedDrill = this.clickedDrill();
                return hoverDrill ? hoverDrill : (clickedDrill ? clickedDrill : this.drills()[0]);
            });

            this.editDrill = () => {
                this.useDrillEditTemplate(true);
            }

            this.cancelDrillEdit = () => {
                this.selectedDrill().revert();
                this.useDrillEditTemplate(false);
            }

            this.addDrill = () => {
                var newDrill = { name: this.drillToAdd(), tagId: 1 };
                this.drillToAdd("");
                Utils.http.post("/api/drills", ko.toJSON(newDrill), (data) => {
                    this.drills.push(new DrillItem(data));
                    console.log("Added drill");
                });
            }

            this.saveDrill = () => {
                var drillToSave = this.selectedDrill();
                drillToSave.commit();
                this.useDrillEditTemplate(false);
                Utils.http.put("/api/drills/" + drillToSave.id(), ko.toJSON(drillToSave));
            }

            this.deleteDrill = (item) => {
                this.drills.remove(item);
                Utils.http.delete ("/api/drills/" + item.id());
                this.clickedDrill(null);
                this.hoverDrill(null);
            }
        }

        // data
        selectedDrill: KnockoutComputed;
        drills = ko.observableArray();
        drillToAdd = ko.observable("");
        clickedDrill = ko.observable();
        hoverDrill = ko.observable();
        useDrillEditTemplate = ko.observable(false);

        // Functions declarations
        drillClick: (drill: DrillItem) => void;
        drillMouseOver: (drill: DrillItem) => void;
        drillMouseOut: () => void;
        editDrill: () => void;
        cancelDrillEdit: () => void;
        addDrill: () => void;
        saveDrill: () => void;
        deleteDrill: (item: DrillItem) => void;
    }


    export class DrillItem extends EditableItem {
        constructor(data: any) {
            super();
            this.updateValues(data);
        }

        id: KnockoutObservableNumber = ko.observable();
        name: KnockoutObservableString = ko.observable();
        description: KnockoutObservableString = ko.observable();
        url: KnockoutObservableString = ko.observable();
        tagId: KnockoutObservableNumber = ko.observable();
    }
}
)
send ^v
return



;******************************************************************************
::ts7::
;TagsViewModelFull
Clipboard =
(
/// <reference path="../services/httpclient.ts" />
/// <reference path="playbook.editableitem.ts" />
/// <reference path="../defs/knockout.d.ts" />

module Michelotti.Playbook {
    import Utils = Michelotti.Playbook.Utils;

    export class TagsViewModel {
        constructor(initialData) {
            var mappedData = ko.utils.arrayMap(initialData, item => new TagItem(item));
            this.tags = ko.observableArray(mappedData);

            this.deleteTag = (tagToDelete) => {
                Utils.http.delete("/api/tags/" + tagToDelete.id());
                this.tags.remove(tagToDelete);
            }

            this.selectTag = (tag) => this.selectedTag(tag);
            this.editTagCancel = () => this.selectedTag().revert();
            
            this.editTagSave = () => {
                this.selectedTag().commit();
                Utils.http.put("/api/tags/" + this.selectedTag().id(), ko.toJSON(this.selectedTag));
            }
        }

        // fields
        tags: KnockoutObservableArray;
        tagToAdd = ko.observable("");
        selectedTag = ko.observable();

        // methods
        deleteTag: (tagToDelete) => void;
        selectTag: (tag) => void;
        editTagCancel: () => void;
        editTagSave: () => void;

        addTag() {
            var newTag = new TagItem({ name: this.tagToAdd() });
            this.tagToAdd("");
            Utils.http.post("/api/tags", ko.toJSON(newTag), data => this.tags.push(new TagItem(data)));
        }

        tagNameFor(id: number) {
            var tagItem = ko.utils.arrayFirst(this.tags(), item => {
                return item.id() === id;
            });
            return tagItem.name;
        }
    }

    export class TagItem extends EditableItem {
        constructor(data) {
            super();
            this.updateValues(data);
        }

        name: KnockoutObservableString = ko.observable();
        id: KnockoutObservableNumber = ko.observable();
    }
}
)
send ^v
return



;******************************************************************************
::ts8::
;ViewModel
Clipboard =
(
/// <reference path="../defs/knockout.d.ts" />
/// <reference path="playbook.tagsviewmodel.ts" />
/// <reference path="playbook.drillsviewmodel.ts" />

// Module
module Michelotti.Playbook {

    import Utils = Michelotti.Playbook.Utils;

    // Class
    export class PlaybookViewModel {
        // Constructor
        constructor(initialData: any[]) {
            this.tagsViewModel = new TagsViewModel(initialData);
            this.drillsViewModel = new DrillsViewModel();

            this.tagsViewModel.selectedTag.subscribe(newSelectedTag => {
                Utils.http.get("/api/drills?tagId=" + this.tagsViewModel.selectedTag().id(), data => {
                    var mappedData = ko.utils.arrayMap(data, (item: any) => {
                        return new DrillItem(item);
                    });
                    this.drillsViewModel.drills(mappedData);
                });
            });

            this.tagsViewModel.selectedTag(this.tagsViewModel.tags()[0]);
        }

        // Instance member
        tagsViewModel: TagsViewModel;
        drillsViewModel: DrillsViewModel;

    }// end class PlaybookViewModel
}
)
send ^v
return



;******************************************************************************
::ts9::
;IndexRemaining
Clipboard =
(
<div id="main-content">
    <div class="row">

        <div id="tagsList" class="span5 box-section" data-bind="with: tagsViewModel">
            <div class="row title">
                <h4>Tags</h4>
            </div>
            <div class="row input-append input-row">
                <input type="text" placeholder="Add New Tag" data-bind="value: tagToAdd" />
                <button type="submit" class="btn btn-primary" data-bind="click: addTag"><i class="icon-plus icon-white"></i> Add</button>
            </div>

            <div class="row container-list" data-bind="foreach: tags">
                <div class="row item-row" data-bind="click: $parent.selectTag">
                    <div class="span2" data-bind="text: name"></div>
                     <div class="span2">
                        <a href="#" data-toggle="modal" data-target="#tagDialog" role="button"><i class="icon-edit"></i> Edit</a>
                        <a href="#" data-bind="click: $parent.deleteTag"><i class="icon-remove"></i> Delete</a>
                    </div>
                </div>
            </div>
        </div><!--end tags box-->
 
        <div id="tagDialog" class="modal hide fade" role="dialog" data-backdrop="static" data-bind="with: tagsViewModel.selectedTag">
            <div class="modal-header">
                <h3>Tag Name:</h3>
            </div>
            <div class="modal-body">
                <input type="text" data-bind="value: name" />
            </div>
            <div class="modal-footer">
                <button class="btn" data-dismiss="modal" aria-hidden="true" data-bind="click: $parent.tagsViewModel.editTagCancel">Cancel</button>
                <button class="btn btn-primary" data-dismiss="modal" aria-hidden="true" data-bind="click: $parent.tagsViewModel.editTagSave">Save</button>
            </div>
        </div>


         <div id="drillsList" class="span4 box-section">
            <div class="row title">
                <h4 data-bind="text: tagsViewModel.selectedTag().name() + ' Drills'"></h4>
            </div>
            <div class="row input-append input-row">
                <input id="newDrill" type="text" placeholder="Add New Drill" data-bind="value: drillsViewModel.drillToAdd, valueUpdate: 'afterkeydown'" />
                <button type="submit" class="btn btn-primary" data-bind="click: drillsViewModel.addDrill, enable: drillsViewModel.drillToAdd().length > 0"><i class="icon-plus icon-white"></i> Add</button>
            </div>

            <div class="row container-list" data-bind="foreach: drillsViewModel.drills">
                <div class="row item-row" data-bind="click: $parent.drillsViewModel.drillClick, css: { activeDrill: $parent.drillsViewModel.clickedDrill() === $data }, event: { mouseover: $parent.drillsViewModel.drillMouseOver, mouseout: $parent.drillsViewModel.drillMouseOut }">
                    <div class="span2" data-bind="text: name"></div>
                    <div class="span1">
                        <a href="#" data-bind="click: $parent.drillsViewModel.deleteDrill"><i class="icon-remove"></i> Delete</a>
                    </div>
                </div>
            </div>
        </div><!--end drills box-->


        <div id="drillDetail" class="span3 box-section" data-bind="with: drillsViewModel.selectedDrill">
            <div class="row title ">
                <div class="pull-left">
                    <h4 data-bind="text: 'Drill: ' + name()"></h4>
                </div>
                <div class="pull-right">
                    <button class="btn btn-small btn-edit btn-success" data-bind="click: $parent.drillsViewModel.editDrill"><i class="icon-edit"></i> Edit</button>
                </div>
            </div>

            <div class="row container-list">
                <form>
                    <fieldset>
                        <legend></legend>
                    
                        <label>Name:</label>
                        <input type="text" data-bind="value: name, visible: $parent.drillsViewModel.useDrillEditTemplate" />
                        <span data-bind="text: name, visible: !$parent.drillsViewModel.useDrillEditTemplate()"></span>


                        <label>Description:</label>
                        <input type="text" data-bind="value: description, visible: $parent.drillsViewModel.useDrillEditTemplate" />
                        <span data-bind="text: description, visible: !$parent.drillsViewModel.useDrillEditTemplate()"></span>

                  
                        <label>Link:</label>
                        <input type="text" data-bind="value: url, visible: $parent.drillsViewModel.useDrillEditTemplate" />
                        <!-- ko ifnot: $parent.drillsViewModel.useDrillEditTemplate -->
                        <a href="#" data-bind="visible: url, text: name, attr: { href: url }" target="_blank"></a>
                        <span data-bind="visible: !url()">(None)</span>
                        <!-- /ko -->

                        <label>Tag:</label>
                        <select data-bind="options: $parent.tagsViewModel.tags, optionsText: 'name', optionsValue: 'id', value: tagId, visible: $parent.drillsViewModel.useDrillEditTemplate"></select>                            
                        <span data-bind="text: $parent.tagsViewModel.tagNameFor(tagId()), visible: !$parent.drillsViewModel.useDrillEditTemplate()"></span>

                         <!-- ko if: $parent.drillsViewModel.useDrillEditTemplate -->
                        <div class="control-group">
                            <button class="btn btn-primary" data-bind="click: $parent.drillsViewModel.saveDrill">Save</button>
                            <button class="btn" data-bind="click: $parent.drillsViewModel.cancelDrillEdit">Cancel</button>
                        </div>
                        <!-- /ko -->
                    </fieldset>
                </form>
            </div><!--end row container-list-->
        </div><!--end drill details box-->
        
    </div><!--outer row-->
</div><!--end main-content-->

@section scripts {
    @Scripts.Render("~/bundles/app")
}
)
send ^v
return



;******************************************************************************
::ts10::
;main.ts
Clipboard =
(
/// <reference path="defs/require.d.ts" />

require.config({
    baseUrl: "/app/viewmodels",
    shim: {
        jquery: { exports: '$' },
        bootstrap: { deps: ['jquery'] }
    },
    paths: {
        'jquery': '../../scripts/jquery-1.9.1',
        'ko': '../../scripts/knockout-2.2.0',
        'bootstrap': '../../scripts/bootstrap'
    }
});

require(['playbook.bootstrapper', 'jquery', 'ko', 'bootstrap'],
    (bootstrapper, $, ko) => {
        (<any>window).ko = ko;
        bootstrapper.run();
    });
)
send ^v
return

