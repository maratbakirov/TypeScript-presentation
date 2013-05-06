var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../services/httpclient"], function(require, exports, __Utils__) {
    var Utils = __Utils__;

    
    var DrillsViewModel = (function () {
        function DrillsViewModel() {
            var _this = this;
            this.drills = ko.observableArray();
            this.drillToAdd = ko.observable("");
            this.clickedDrill = ko.observable();
            this.hoverDrill = ko.observable();
            this.useDrillEditTemplate = ko.observable(false);
            this.drillClick = function (drill) {
                _this.clickedDrill(drill);
            };
            this.drillMouseOver = function (drill) {
                _this.hoverDrill(drill);
            };
            this.drillMouseOut = function () {
                _this.hoverDrill(null);
            };
            this.selectedDrill = ko.computed(function () {
                var hoverDrill = _this.hoverDrill();
                var clickedDrill = _this.clickedDrill();
                return hoverDrill ? hoverDrill : (clickedDrill ? clickedDrill : _this.drills()[0]);
            });
            this.editDrill = function () {
                _this.useDrillEditTemplate(true);
            };
            this.cancelDrillEdit = function () {
                _this.selectedDrill().revert();
                _this.useDrillEditTemplate(false);
            };
            this.addDrill = function () {
                var newDrill = {
                    name: _this.drillToAdd(),
                    tagId: 1
                };
                _this.drillToAdd("");
                Utils.http.post("/api/drills", ko.toJSON(newDrill), function (data) {
                    _this.drills.push(new DrillItem(data));
                    console.log("Added drill");
                });
            };
            this.saveDrill = function () {
                var drillToSave = _this.selectedDrill();
                drillToSave.commit();
                _this.useDrillEditTemplate(false);
                Utils.http.put("/api/drills/" + drillToSave.id(), ko.toJSON(drillToSave));
            };
            this.deleteDrill = function (item) {
                _this.drills.remove(item);
                Utils.http.delete("/api/drills/" + item.id());
                _this.clickedDrill(null);
                _this.hoverDrill(null);
            };
        }
        return DrillsViewModel;
    })();
    exports.DrillsViewModel = DrillsViewModel;    
    var DrillItem = (function (_super) {
        __extends(DrillItem, _super);
        function DrillItem(data) {
            _super.call(this);
            this.id = ko.observable();
            this.name = ko.observable();
            this.description = ko.observable();
            this.url = ko.observable();
            this.tagId = ko.observable();
            this.updateValues(data);
        }
        return DrillItem;
    })(editable.EditableItem);
    exports.DrillItem = DrillItem;    
})
