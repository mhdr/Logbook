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

    static adminUsers = {
        users: ko.observableArray(),
        disableInactiveButtons: ko.observable(true),
        selectedUser: ko.observable(),
        rowClicked: function (user) {

            let usersClone = [];

            for (let i: number = 0; i < ViewModels.adminUsers.users().length; i++) {
                let current: any = ViewModels.adminUsers.users()[i];

                if (current.id === user.id) {
                    current.isSelected = true;
                    ViewModels.adminUsers.selectedUser(current);
                    ViewModels.adminUsers.disableInactiveButtons(false);
                }
                else {
                    current.isSelected = false;
                }

                usersClone.push(current);
            }

            ViewModels.adminUsers.users.removeAll();
            ViewModels.adminUsers.users(usersClone);
        },
        newUserClicked: function () {
            async.parallel([function (callback) {
                $("#modalNewUser").modal("show");
                callback(null,"one");
            }]);

        }
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

                async.parallel([
                        function (callback) {
                            Navbar.renderAdmin();
                            callback(null, "one");
                        },
                        function (callback) {
                            Sidebar.renderAdminUsers();
                            callback(null, "two");
                        }
                    ],
                    function (err, results) {
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
                    ],
                    function (err, results) {
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
                    ],
                    function (err, results) {

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
                    ],
                    function (err, results) {

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
                url: "/templates/sidebar/admin",
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
                url: "/templates/sidebar/admin",
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
                url: "/templates/sidebar/admin",
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
    export class Admin {
        static renderUsers() {
            if ($("#divAdminUsers").length === 0) {

                ko.cleanNode(document.getElementById("mainBody"));

                async.waterfall([
                        function (callback) {
                            let parameters1 = {};

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
                            let parameters2 = {};

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
                    ],
                    function (err, results) {

                    });
            }
        }
    }
}