require.config({
    baseUrl: "/app/viewmodels",
    shim: {
        jquery: {
            exports: '$'
        },
        bootstrap: {
            deps: [
                'jquery'
            ]
        }
    },
    paths: {
        'jquery': '../../scripts/jquery-1.9.1',
        'ko': '../../scripts/knockout-2.2.0',
        'bootstrap': '../../scripts/bootstrap'
    }
});
require([
    'playbook.bootstrapper', 
    'jquery', 
    'ko', 
    'bootstrap'
], function (bootstrapper, $, ko) {
    (window).ko = ko;
    bootstrapper.run();
});
