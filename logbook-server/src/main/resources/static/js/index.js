///<reference path="../../DefinitelyTyped/jquery/index.d.ts"/>
///<reference path="../../DefinitelyTyped/bootstrap/index.d.ts"/>
///<reference path="../../DefinitelyTyped/knockout/index.d.ts"/>
///<reference path="../../DefinitelyTyped/handlebars/index.d.ts"/>
///<reference path="../../DefinitelyTyped/velocity-animate/index.d.ts"/>
window['format'];
var format;
$(document).ready(function () {
    //Debug.log("document is read : " + location.pathname);
    Navbar.bind();
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
    Browser.changeUrl = function (path) {
        history.pushState(null, null, path);
        // on every pushState
        Browser.renderLocation(path);
    };
    Browser.renderLocation = function (path) {
        //Debug.log(path);
        switch (path) {
            case "/":
                break;
            case "/home":
                Navbar.swapActiveItem(path);
                break;
            case "/admin":
                Navbar.swapActiveItem(path);
                break;
            case "/logout":
                Navbar.swapActiveItem(path);
                break;
        }
    };
    return Browser;
}());
var Navbar = (function () {
    function Navbar() {
    }
    Navbar.bind = function () {
        var li_items = $("#topMenu").find("li");
        //Debug.log(li_items);
        $.each(li_items, function (index, value) {
            var a_item = $(li_items[index]).find("a").get(0);
            //Debug.log(a_item);
            $(a_item).click(function () {
                var t = $(a_item).attr("href");
                // on click link
                Browser.changeUrl("/" + t);
                return false;
            });
        });
    };
    Navbar.swapActiveItem = function (path) {
        var li_items = $("#topMenu").find("li");
        var a_item = null;
        path = path.slice(1, path.length);
        //Debug.log(path);
        $.each(li_items, function (index, value) {
            var current_a_item = $(li_items[index]).find("a").get(0);
            if ($(current_a_item).attr("href") === path) {
                a_item = current_a_item;
            }
            var current_li = $(li_items[index]);
            $(current_li).removeClass("active");
        });
        if (a_item != null) {
            $(a_item).parent().addClass("active");
        }
    };
    return Navbar;
}());
