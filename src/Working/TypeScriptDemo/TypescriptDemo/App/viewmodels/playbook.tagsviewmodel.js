var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "playbook.editableitem"], function(require, exports, __editable__) {
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
            this.deleteTag = function (tag) {
                return _this.tags.remove(tag);
            };
            this.selectTag = function (tag) {
                return _this.selectedTag(tag);
            };
            this.editTagCancel = function () {
                return _this.selectedTag().revert();
            };
            this.editTagSave = function () {
                return _this.selectedTag().commit();
            };
        }
        TagsViewModel.prototype.addTag = function () {
            var newTag = new TagItem({
                name: this.tagToAdd()
            });
            this.tags.push(newTag);
            this.tagToAdd("");
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
