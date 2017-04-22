///<reference path="../../DefinitelyTyped/jquery/index.d.ts"/>
///<reference path="../../DefinitelyTyped/bootstrap/index.d.ts"/>
///<reference path="../../DefinitelyTyped/knockout/index.d.ts"/>
///<reference path="../../DefinitelyTyped/async/index.d.ts"/>
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
ViewModels.adminUsers = {
    users: ko.observableArray(),
    showNavbarLoading: ko.observable(false),
    disableInactiveButtons: ko.observable(true)
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
                Navbar.renderHome();
                break;
            case "/admin":
                async.parallel([
                    function (callback) {
                        Navbar.renderAdmin();
                        callback(null, "one");
                    },
                    function (callback) {
                        Sidebar.renderAdminUsers();
                        callback(null, "two");
                    }
                ], function (err, results) {
                    Content.Admin.renderUsers();
                });
                break;
            case "/logout":
                Navbar.renderLogout();
                break;
            case "/admin/users":
                async.parallel([
                    function (callback) {
                        Navbar.renderAdmin();
                        callback(null, "one");
                    },
                    function (callback) {
                        Sidebar.renderAdminUsers();
                        callback(null, "two");
                    }
                ], function (err, results) {
                    Content.Admin.renderUsers();
                });
                break;
            case "/admin/forms":
                async.parallel([
                    function (callback) {
                        Navbar.renderAdmin();
                        callback(null, "one");
                    },
                    function (callback) {
                        Sidebar.renderAdminForms();
                        callback(null, "two");
                    }
                ], function (err, results) {
                });
                break;
            case "/admin/machinery":
                async.parallel([
                    function (callback) {
                        Navbar.renderAdmin();
                        callback(null, "one");
                    },
                    function (callback) {
                        Sidebar.renderAdminMachinery();
                        callback(null, "two");
                    }
                ], function (err, results) {
                });
                break;
        }
    };
    return Route;
}());
var Sidebar = (function () {
    function Sidebar() {
    }
    Sidebar.renderAdminUsers = function () {
        if ($("#divSidebarAdmin").length == 0) {
            ko.cleanNode(document.getElementById("sideBar"));
            $("#sideBar").empty();
            var parameters = { active: "users" };
            $.ajax({
                url: "/templates/sidebar/admin",
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
    Sidebar.renderAdminForms = function () {
        if ($("#divSidebarAdmin").length == 0) {
            ko.cleanNode(document.getElementById("sideBar"));
            $("#sideBar").empty();
            var parameters = { active: "forms" };
            $.ajax({
                url: "/templates/sidebar/admin",
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
    Sidebar.renderAdminMachinery = function () {
        if ($("#divSidebarAdmin").length == 0) {
            ko.cleanNode(document.getElementById("sideBar"));
            $("#sideBar").empty();
            var parameters = { active: "machinery" };
            $.ajax({
                url: "/templates/sidebar/admin",
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
    return Sidebar;
}());
var Navbar = (function () {
    function Navbar() {
    }
    Navbar.renderHome = function () {
        ViewModels.navbar.homeActive(true);
        ViewModels.navbar.adminActive(false);
        ViewModels.navbar.logoutActive(false);
    };
    Navbar.renderAdmin = function () {
        ViewModels.navbar.homeActive(false);
        ViewModels.navbar.adminActive(true);
        ViewModels.navbar.logoutActive(false);
    };
    Navbar.renderLogout = function () {
        ViewModels.navbar.homeActive(false);
        ViewModels.navbar.adminActive(false);
        ViewModels.navbar.logoutActive(true);
    };
    return Navbar;
}());
var Content;
(function (Content) {
    var Admin = (function () {
        function Admin() {
        }
        Admin.renderUsers = function () {
            if ($("#divAdminUsers").length == 0) {
                ko.cleanNode(document.getElementById("mainBody"));
                async.waterfall([
                    function (callback) {
                        var parameters1 = {};
                        $.ajax({
                            url: "/templates/admin/users",
                            method: "POST",
                            data: parameters1,
                            success: function (data, textStatus, jqXHR) {
                                $("#mainBody").empty();
                                $("#mainBody").append(data);
                                ko.applyBindings(ViewModels.adminUsers, document.getElementById("mainBody"));
                                callback(null, "one");
                            }
                        });
                    }, function (arg1, callback) {
                        var parameters2 = {};
                        $.ajax({
                            url: "/api/user/get_users",
                            method: "POST",
                            data: parameters2,
                            success: function (data, textStatus, jqXHR) {
                                if (data.error === 0) {
                                    ViewModels.adminUsers.users(data.users);
                                }
                                callback(null, "two");
                            }
                        });
                    }
                ], function (err, results) {
                });
            }
        };
        return Admin;
    }());
    Content.Admin = Admin;
})(Content || (Content = {}));
