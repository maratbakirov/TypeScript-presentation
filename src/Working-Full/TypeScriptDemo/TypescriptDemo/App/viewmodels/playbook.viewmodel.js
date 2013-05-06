var Michelotti;
(function (Michelotti) {
    (function (Playbook) {
        var Utils = Michelotti.Playbook.Utils;
        var PlaybookViewModel = (function () {
            function PlaybookViewModel(initialData) {
                var _this = this;
                this.tagsViewModel = new TagsViewModel(initialData);
                this.drillsViewModel = new DrillsViewModel();
                this.tagsViewModel.selectedTag.subscribe(function (newSelectedTag) {
                    Utils.http.get("/api/drills?tagId=" + _this.tagsViewModel.selectedTag().id(), function (data) {
                        var mappedData = ko.utils.arrayMap(data, function (item) {
                            return new DrillItem(item);
                        });
                        _this.drillsViewModel.drills(mappedData);
                    });
                });
                this.tagsViewModel.selectedTag(this.tagsViewModel.tags()[0]);
            }
            return PlaybookViewModel;
        })();
        Playbook.PlaybookViewModel = PlaybookViewModel;        
    })(Michelotti.Playbook || (Michelotti.Playbook = {}));
    var Playbook = Michelotti.Playbook;
})(Michelotti || (Michelotti = {}));
