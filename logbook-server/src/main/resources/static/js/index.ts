///<reference path="../../DefinitelyTyped/jquery/index.d.ts"/>
///<reference path="../../DefinitelyTyped/bootstrap/index.d.ts"/>
///<reference path="../../DefinitelyTyped/async/index.d.ts"/>
///<reference path="../../DefinitelyTyped/handlebars/index.d.ts"/>
///<reference path="../../DefinitelyTyped/velocity-animate/index.d.ts"/>

window['format'];
let format: any;

$(document).ready(() => {
    //Debug.log("document is read : " + location.pathname);

    // on load
    Browser.renderLocation(location.pathname);

    // on browser back or forward
    window.onpopstate = (e) => {

        //Debug.log(e.state);
        //Debug.log(location.pathname);

        Browser.renderLocation(location.pathname);
    };
});

class Debug {

    static DEBUG = true;

    static log(obj: any) {
        if (Debug.DEBUG) {
            console.log(obj);
        }
    }
}

class Browser {

    static renderLocation(path: string) {

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
    }
}