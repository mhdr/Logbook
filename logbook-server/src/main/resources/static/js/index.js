///<reference path="../../DefinitelyTyped/jquery/index.d.ts"/>
///<reference path="../../DefinitelyTyped/bootstrap/index.d.ts"/>
///<reference path="../../DefinitelyTyped/async/index.d.ts"/>
///<reference path="../../DefinitelyTyped/handlebars/index.d.ts"/>
///<reference path="../../DefinitelyTyped/velocity-animate/index.d.ts"/>
window['format'];
var format;
$(document).ready(function () {
    //Debug.log("document is read : " + location.pathname);
    // on load
    Browser.renderLocation(location.pathname);
    // on browser back or forward
    window.onpopstate = function (e) {
        //Debug.log(e.state);
        //Debug.log(location.pathname);
        Browser.renderLocation(location.pathname);
    };
});
var Debug = (function () {
    function Debug() {
    }
    Debug.log = function (obj) {
        if (Debug.DEBUG) {
            console.log(obj);
        }
    };
    return Debug;
}());
Debug.DEBUG = true;
var Browser = (function () {
    function Browser() {
    }
    Browser.renderLocation = function (path) {
        //Debug.log(path);
        switch (path) {
            case "/":
                break;
            case "/home":
                break;
            case "/admin":
                break;
            case "/logout":
                break;
            case "/admin/user":
                break;
            case "/admin/forms":
                break;
            case "/admin/machinery":
                break;
        }
    };
    return Browser;
}());
