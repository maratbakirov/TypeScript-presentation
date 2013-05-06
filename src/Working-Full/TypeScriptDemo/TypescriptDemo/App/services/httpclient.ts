/// <reference path="../defs/jquery.d.ts" />

//module Michelotti.Playbook.Utils {

    export class HttpClient {
        get (url: string, callback: (data: any) => any) {
            $.get(url, callback);
        }

        post(url: string, dataToSave: any, callback: (data: string) => any) {
            this.executeAjax(url, dataToSave, "POST", callback);
        }

        put(url: string, dataToSave: any, callback?: (data: string) => any) {
            this.executeAjax(url, dataToSave, "PUT", callback);
        }

        delete (url: string, callback?: (data: string) => any) {
            this.executeAjax(url, null, "DELETE", callback);
        }

        private executeAjax(url: string, dataToSave: any, httpVerb: string, callback: (data: string) => any) {
            $.ajax(url, {
                data: dataToSave,
                type: httpVerb,
                dataType: 'json',
                contentType: 'application/json',
                success: (data) => {
                    if (callback !== undefined) {
                        callback(data);
                    }
                }
            });
        }
    }

    export var http = new HttpClient();
//}