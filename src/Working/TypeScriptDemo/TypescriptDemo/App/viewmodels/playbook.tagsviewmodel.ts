/// <reference path="playbook.editableitem.ts" />
/// <reference path="../defs/knockout.d.ts" />

//module Michelotti.Playbook{
import editable = module("playbook.editableitem");

    export class TagsViewModel{

        constructor(initialData) {
            var mappedData = ko.utils.arrayMap(initialData, item => new TagItem(item));
            this.tags = ko.observableArray(mappedData);

            this.deleteTag = (tag) => this.tags.remove(tag);

            this.selectTag = (tag) => this.selectedTag(tag);

            this.editTagCancel = () => this.selectedTag().revert();
            this.editTagSave = () => this.selectedTag().commit();
        }

        // fields
        tags: KnockoutObservableArray;
        tagToAdd = ko.observable("");
        selectedTag = ko.observable();

        // functions
        addTag() {
            var newTag = new TagItem({ name: this.tagToAdd() });
            this.tags.push(newTag);
            this.tagToAdd("");
        }

        deleteTag: (tag) => void;
        selectTag: (tag) => void;
        editTagCancel: () => void;
        editTagSave: () => void;

    }

    export class TagItem extends editable.EditableItem {
        constructor(data) {
            super();
            this.updateValues(data);
        }

        name = ko.observable();
        id = ko.observable();
    }

//}