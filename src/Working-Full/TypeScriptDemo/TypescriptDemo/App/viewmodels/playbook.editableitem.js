define(["require", "exports"], function(require, exports) {
    var EditableItem = (function () {
        function EditableItem() {
            this.cache = function () {
            };
        }
        EditableItem.prototype.revert = function () {
            this.updateValues(this.cache.latestData);
        };
        EditableItem.prototype.commit = function () {
            this.cache.latestData = ko.toJS(this);
        };
        EditableItem.prototype.updateValues = function (data) {
            this.cache.latestData = data;
            for(var property in data) {
                if(data.hasOwnProperty(property) && this.hasOwnProperty(property)) {
                    this[property](data[property]);
                }
            }
        };
        return EditableItem;
    })();
    exports.EditableItem = EditableItem;    
})
