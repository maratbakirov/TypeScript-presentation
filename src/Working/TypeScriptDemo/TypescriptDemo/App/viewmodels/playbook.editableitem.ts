/// <reference path="../defs/knockout.d.ts" />

//module Michelotti.Playbook {
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
//}