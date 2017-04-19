///<reference path="../../DefinitelyTyped/jquery/index.d.ts"/>
///<reference path="../../DefinitelyTyped/bootstrap/index.d.ts"/>
///<reference path="../../DefinitelyTyped/knockout/index.d.ts"/>
///<reference path="../../DefinitelyTyped/async/index.d.ts"/>

window['format'];
let format: any;

$(document).ready(() => {
    //Debug.log("document is read : " + location.pathname);

    // on load
    Route.renderLocation(location.pathname);

    // on browser back or forward
    window.onpopstate = (e) => {

        //Debug.log(e.state);
        //Debug.log(location.pathname);

        Route.renderLocation(location.pathname);
    };

    ko.applyBindings(ViewModels.navbar, document.getElementById("topMenu"));
});


class ViewModels {

    static navbar = {
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

    static sidebar = {
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

    static AdminUsers = {
        users: ko.observableArray()
    };
}


class Debug {

    static DEBUG = true;

    static log(obj: any) {
        if (Debug.DEBUG) {
            console.log(obj);
        }
    }
}

class State {
    static push(path: string) {
        history.pushState(null, null, path);
    }
}

class Route {

    static renderLocation(path: string) {

        //Debug.log(path);

        switch (path) {
            case "/":
                break;
            case "/home":
                Navbar.renderHome();
                break;
            case "/admin":

                async.parallel({
                    one: function (callback) {
                        Navbar.renderAdmin();
                        callback(null, null);
                    },
                    two: function (callback) {
                        Sidebar.renderAdminUsers();
                        callback(null, null);
                    }
                }, function (err, results) {

                });

                break;
            case "/logout":
                Navbar.renderLogout();
                break;
            case "/admin/users":

                async.parallel({
                    one: function (callback) {
                        Navbar.renderAdmin();
                        callback(null, null);
                    },
                    two: function (callback) {
                        Sidebar.renderAdminUsers();
                        callback(null, null);
                    }
                }, function (err, results) {

                });

                break;
            case "/admin/forms":

                async.parallel({
                    one: function (callback) {
                        Navbar.renderAdmin();
                        callback(null, null);
                    },
                    two: function (callback) {
                        Sidebar.renderAdminForms();
                        callback(null, null);
                    }
                }, function (err, results) {

                });

                break;
            case "/admin/machinery":

                async.parallel({
                    one: function (callback) {
                        Navbar.renderAdmin();
                        callback(null, null);
                    },
                    two: function (callback) {
                        Sidebar.renderAdminMachinery();
                        callback(null, null);
                    }
                }, function (err, results) {

                });
                break;
        }
    }


}

class Sidebar {
    static renderAdminUsers() {
        if ($("#divSidebarAdmin").length == 0) {
            ko.cleanNode(document.getElementById("sideBar"));
            $("#sideBar").empty();

            let parameters = {active: "users"};

            $.ajax({
                url: "/sidebar/admin",
                method: "POST",
                data: parameters,
                success: function (data, textStatus, jqXHR) {

                    $("#sideBar").append(data);

                    $('#divSidebarAdmin').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
                        function () {
                            ViewModels.sidebar.usersActive(true);
                            ViewModels.sidebar.formsActive(false);
                            ViewModels.sidebar.machineryActive(false);

                            ko.applyBindings(ViewModels.sidebar, document.getElementById("sideBar"));
                        });
                }
            });
        } else {
            ViewModels.sidebar.usersActive(true);
            ViewModels.sidebar.formsActive(false);
            ViewModels.sidebar.machineryActive(false);
        }
    }

    static renderAdminForms() {
        if ($("#divSidebarAdmin").length == 0) {
            ko.cleanNode(document.getElementById("sideBar"));
            $("#sideBar").empty();

            let parameters = {active: "forms"};

            $.ajax({
                url: "/sidebar/admin",
                method: "POST",
                data: parameters,
                success: function (data, textStatus, jqXHR) {

                    $("#sideBar").append(data);

                    $('#divSidebarAdmin').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
                        function () {
                            ViewModels.sidebar.usersActive(false);
                            ViewModels.sidebar.formsActive(true);
                            ViewModels.sidebar.machineryActive(false);

                            ko.applyBindings(ViewModels.sidebar, document.getElementById("sideBar"));
                        });
                }
            });
        } else {
            ViewModels.sidebar.usersActive(false);
            ViewModels.sidebar.formsActive(true);
            ViewModels.sidebar.machineryActive(false);
        }
    }

    static renderAdminMachinery() {
        if ($("#divSidebarAdmin").length == 0) {
            ko.cleanNode(document.getElementById("sideBar"));
            $("#sideBar").empty();

            let parameters = {active: "machinery"};

            $.ajax({
                url: "/sidebar/admin",
                method: "POST",
                data: parameters,
                success: function (data, textStatus, jqXHR) {

                    $("#sideBar").append(data);

                    $('#divSidebarAdmin').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
                        function () {
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
    }
}

class Navbar {
    static renderHome() {
        ViewModels.navbar.homeActive(true);
        ViewModels.navbar.adminActive(false);
        ViewModels.navbar.logoutActive(false);
    }


    static renderAdmin() {
        ViewModels.navbar.homeActive(false);
        ViewModels.navbar.adminActive(true);
        ViewModels.navbar.logoutActive(false);
    }

    static renderLogout() {
        ViewModels.navbar.homeActive(false);
        ViewModels.navbar.adminActive(false);
        ViewModels.navbar.logoutActive(true);
    }
}

namespace Content {
    class Admin {
        static renderUsers() {
            if ($("#divAdminUsers").length == 0) {

                let parameters = {};

                $.ajax({
                    url: "/api/user/get_users",
                    method: "POST",
                    data: parameters,
                    success: function (data, textStatus, jqXHR) {

                    }
                });

            }
        }
    }
}
