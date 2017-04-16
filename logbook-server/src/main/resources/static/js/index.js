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
    Browser.renderLocation = function (path, onComplete) {
        //Debug.log(path);
        switch (path) {
            case "/":
                break;
            case "/home":
                Navbar.swapActiveItem("/home");
                break;
            case "/admin":
                var data_1 = {
                    divSideBar: "divSidebarAdmin",
                    url: "./hbs/sidebar/admin.hbs",
                    aSideBar: "aUserAdmin"
                };
                Navbar.swapActiveItem("/admin", function () {
                    Sidebar.loadSidebar(data_1);
                });
                break;
            case "/logout":
                Navbar.swapActiveItem("/logout");
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
var Navbar = (function () {
    function Navbar() {
    }
    Navbar.bind = function (onComplete) {
        var li_items = $("#topMenu").find("li");
        //Debug.log(li_items);
        $.each(li_items, function (index, value) {
            var a_item = $(li_items[index]).find("a").get(0);
            //Debug.log(a_item);
            $(a_item).click(function () {
                var t = $(a_item).attr("href");
                // on click link
                history.pushState(null, null, "/" + t);
                return false;
            });
        });
        onComplete();
    };
    Navbar.swapActiveItem = function (path, onComplete) {
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
        onComplete();
    };
    return Navbar;
}());
var Sidebar = (function () {
    function Sidebar() {
    }
    Sidebar.bind = function (onComplete) {
        var a_items = $("#sideBar").find("a");
        $.each(a_items, function (index, value) {
            var a_item = a_items[index];
            $(a_item).click(function () {
                var t = $(a_item).attr("href");
                // on click link
                history.pushState(null, null, "//" + t);
                return false;
            });
        });
        onComplete();
    };
    Sidebar.loadSidebar = function (value, onComplete) {
        if ($("#" + value.divSideBar).length == 0) {
            $.ajax({
                url: value.url,
                dataType: "text",
                method: "GET",
                success: function (data, textStatus, jqXHR) {
                    $("#sideBar").empty();
                    var newData = $(data).addClass("animated slideInRight");
                    $(newData).find("#" + value.aSideBar).addClass("active");
                    $("#sideBar").append(newData);
                }
            });
        }
        onComplete();
    };
    Sidebar.swapActiveItem = function (id, onComplete) {
        var a_items = $("#sideBar").find("a");
        $.each(a_items, function (index, value) {
            var a_item = a_items[index];
            $(a_item).removeClass("active");
            if (a_item.attr("id") === id) {
                $(a_item).addClass("active");
            }
        });
        onComplete();
    };
    return Sidebar;
}());
