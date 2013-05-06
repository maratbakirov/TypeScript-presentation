define(["require", "exports"], function(require, exports) {
    var HttpClient = (function () {
        function HttpClient() { }
        HttpClient.prototype.get = function (url, callback) {
            $.get(url, callback);
        };
        HttpClient.prototype.post = function (url, dataToSave, callback) {
            this.executeAjax(url, dataToSave, "POST", callback);
        };
        HttpClient.prototype.put = function (url, dataToSave, callback) {
            this.executeAjax(url, dataToSave, "PUT", callback);
        };
        HttpClient.prototype.delete = function (url, callback) {
            this.executeAjax(url, null, "DELETE", callback);
        };
        HttpClient.prototype.executeAjax = function (url, dataToSave, httpVerb, callback) {
            $.ajax(url, {
                data: dataToSave,
                type: httpVerb,
                dataType: 'json',
                contentType: 'application/json',
                success: function (data) {
                    if(callback !== undefined) {
                        callback(data);
                    }
                }
            });
        };
        return HttpClient;
    })();
    exports.HttpClient = HttpClient;    
    exports.http = new HttpClient();
})
