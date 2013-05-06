/// <reference path="../services/httpclient.ts" />
/// <reference path="../defs/knockout.d.ts" />


import Utils = module("../services/httpclient");// Michelotti.Playbook.Utils;
import editable = module("playbook.editableitem");

// Module
//module Michelotti.Playbook {

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


    export class DrillItem extends editable.EditableItem {
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
//}