///<reference path="../../DefinitelyTyped/jquery/index.d.ts"/>
///<reference path="../../DefinitelyTyped/bootstrap/index.d.ts"/>
///<reference path="../../DefinitelyTyped/knockout/index.d.ts"/>
window['format'];
var format;
$(document).ready(function () {
    //Debug.log("document is read : " + location.pathname);
    // on load
    Route.renderLocation(location.pathname);
    // on browser back or forward
    window.onpopstate = function (e) {
        //Debug.log(e.state);
        //Debug.log(location.pathname);
        Route.renderLocation(location.pathname);
    };
    ko.applyBindings(ViewModels.navbar, document.getElementById("topMenu"));
});
var ViewModels = (function () {
    function ViewModels() {
    }
    return ViewModels;
}());
ViewModels.navbar = {
    homeActive: ko.observable(false),
    adminActive: ko.observable(false),
    logoutActive: ko.observable(false),
    homeClicked: function () {
        State.push("/home");
        Route.renderLocation("/home");
        return false;
    },
    adminClicked: function () {
        State.push("/admin");
        Route.renderLocation("/admin/users");
        return false;
    },
    logoutClicked: function () {
        State.push("/logout");
        Route.renderLocation("/logout");
        return false;
    }
};
ViewModels.sidebar = {
    usersActive: ko.observable(false),
    formsActive: ko.observable(false),
    machineryActive: ko.observable(false),
    usersClicked: function () {
        State.push("/admin/users");
        Route.renderLocation("/admin/users");
        return false;
    },
    formsClicked: function () {
        State.push("/admin/forms");
        Route.renderLocation("/admin/forms");
        return false;
    },
    machineryClicked: function () {
        State.push("/admin/machinery");
        Route.renderLocation("/admin/machinery");
        return false;
    }
};
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
var State = (function () {
    function State() {
    }
    State.push = function (path) {
        history.pushState(null, null, path);
    };
    return State;
}());
var Route = (function () {
    function Route() {
    }
    Route.renderLocation = function (path) {
        //Debug.log(path);
        switch (path) {
            case "/":
                break;
            case "/home":
                Route.renderHome();
                break;
            case "/admin":
                Route.renderAdminUsers();
                break;
            case "/logout":
                Route.renderLogout();
                break;
            case "/admin/users":
                Route.renderAdminUsers();
                break;
            case "/admin/forms":
                Route.renderAdminForms();
                break;
            case "/admin/machinery":
                Route.renderAdminMachinery();
                break;
        }
    };
    Route.renderHome = function () {
        ViewModels.navbar.homeActive(true);
        ViewModels.navbar.adminActive(false);
        ViewModels.navbar.logoutActive(false);
    };
    Route.renderAdmin = function () {
        ViewModels.navbar.homeActive(false);
        ViewModels.navbar.adminActive(true);
        ViewModels.navbar.logoutActive(false);
    };
    Route.renderLogout = function () {
        ViewModels.navbar.homeActive(false);
        ViewModels.navbar.adminActive(false);
        ViewModels.navbar.logoutActive(true);
    };
    Route.renderAdminUsers = function () {
        Route.renderAdmin();
        if ($("#divSidebarAdmin").length == 0) {
            ko.cleanNode(document.getElementById("sideBar"));
            $("#sideBar").empty();
            var parameters = { active: "users" };
            $.ajax({
                url: "/sidebar/admin",
                method: "POST",
                data: parameters,
                success: function (data, textStatus, jqXHR) {
                    $("#sideBar").append(data);
                    $('#divSidebarAdmin').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                        ViewModels.sidebar.usersActive(true);
                        ViewModels.sidebar.formsActive(false);
                        ViewModels.sidebar.machineryActive(false);
                        ko.applyBindings(ViewModels.sidebar, document.getElementById("sideBar"));
                    });
                }
            });
        }
        else {
            ViewModels.sidebar.usersActive(true);
            ViewModels.sidebar.formsActive(false);
            ViewModels.sidebar.machineryActive(false);
        }
    };
    Route.renderAdminForms = function () {
        Route.renderAdmin();
        if ($("#divSidebarAdmin").length == 0) {
            ko.cleanNode(document.getElementById("sideBar"));
            $("#sideBar").empty();
            var parameters = { active: "forms" };
            $.ajax({
                url: "/sidebar/admin",
                method: "POST",
                data: parameters,
                success: function (data, textStatus, jqXHR) {
                    $("#sideBar").append(data);
                    $('#divSidebarAdmin').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                        ViewModels.sidebar.usersActive(false);
                        ViewModels.sidebar.formsActive(true);
                        ViewModels.sidebar.machineryActive(false);
                        ko.applyBindings(ViewModels.sidebar, document.getElementById("sideBar"));
                    });
                }
            });
        }
        else {
            ViewModels.sidebar.usersActive(false);
            ViewModels.sidebar.formsActive(true);
            ViewModels.sidebar.machineryActive(false);
        }
    };
    Route.renderAdminMachinery = function () {
        Route.renderAdmin();
        if ($("#divSidebarAdmin").length == 0) {
            ko.cleanNode(document.getElementById("sideBar"));
            $("#sideBar").empty();
            var parameters = { active: "machinery" };
            $.ajax({
                url: "/sidebar/admin",
                method: "POST",
                data: parameters,
                success: function (data, textStatus, jqXHR) {
                    $("#sideBar").append(data);
                    $('#divSidebarAdmin').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                        ViewModels.sidebar.usersActive(false);
                        ViewModels.sidebar.formsActive(false);
                        ViewModels.sidebar.machineryActive(true);
                        ko.applyBindings(ViewModels.sidebar, document.getElementById("sideBar"));
                    });
                }
            });
        }
        else {
            ViewModels.sidebar.usersActive(false);
            ViewModels.sidebar.formsActive(false);
            ViewModels.sidebar.machineryActive(true);
        }
    };
    return Route;
}());
