var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../services/httpclient", "playbook.editableitem"], function(require, exports, __Utils__, __editable__) {
    var Utils = __Utils__;

    var editable = __editable__;

    var TagsViewModel = (function () {
        function TagsViewModel(initialData) {
            var _this = this;
            this.tagToAdd = ko.observable("");
            this.selectedTag = ko.observable();
            var mappedData = ko.utils.arrayMap(initialData, function (item) {
                return new TagItem(item);
            });
            this.tags = ko.observableArray(mappedData);
            this.deleteTag = function (tagToDelete) {
                Utils.http.delete("/api/tags/" + tagToDelete.id());
                _this.tags.remove(tagToDelete);
            };
            this.selectTag = function (tag) {
                return _this.selectedTag(tag);
            };
            this.editTagCancel = function () {
                return _this.selectedTag().revert();
            };
            this.editTagSave = function () {
                _this.selectedTag().commit();
                Utils.http.put("/api/tags/" + _this.selectedTag().id(), ko.toJSON(_this.selectedTag));
            };
        }
        TagsViewModel.prototype.addTag = function () {
            var _this = this;
            var newTag = new TagItem({
                name: this.tagToAdd()
            });
            this.tagToAdd("");
            Utils.http.post("/api/tags", ko.toJSON(newTag), function (data) {
                return _this.tags.push(new TagItem(data));
            });
        };
        TagsViewModel.prototype.tagNameFor = function (id) {
            var tagItem = ko.utils.arrayFirst(this.tags(), function (item) {
                return item.id() === id;
            });
            return tagItem.name;
        };
        return TagsViewModel;
    })();
    exports.TagsViewModel = TagsViewModel;    
    var TagItem = (function (_super) {
        __extends(TagItem, _super);
        function TagItem(data) {
                _super.call(this);
            this.name = ko.observable();
            this.id = ko.observable();
            this.updateValues(data);
        }
        return TagItem;
    })(editable.EditableItem);
    exports.TagItem = TagItem;    
})
