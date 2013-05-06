/// <reference path="../services/httpclient.ts" />
/// <reference path="playbook.editableitem.ts" />
/// <reference path="../defs/knockout.d.ts" />

//module Michelotti.Playbook {
import Utils = module("../services/httpclient");// Michelotti.Playbook.Utils;
import editable = module("playbook.editableitem");

    export class TagsViewModel {
        constructor(initialData) {
            var mappedData = ko.utils.arrayMap(initialData, item => new TagItem(item));
            this.tags = ko.observableArray(mappedData);

            this.deleteTag = (tagToDelete) => {
                Utils.http.delete ("/api/tags/" + tagToDelete.id());
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

    export class TagItem extends editable.EditableItem {
        constructor(data) {
            super();
            this.updateValues(data);
        }

        name: KnockoutObservableString = ko.observable();
        id: KnockoutObservableNumber = ko.observable();
    }
//}