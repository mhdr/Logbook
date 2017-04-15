///<reference path="../../DefinitelyTyped/jquery/index.d.ts"/>
///<reference path="../../DefinitelyTyped/bootstrap/index.d.ts"/>
///<reference path="../../DefinitelyTyped/knockout/index.d.ts"/>
///<reference path="../../DefinitelyTyped/handlebars/index.d.ts"/>
///<reference path="../../DefinitelyTyped/velocity-animate/index.d.ts"/>

window['format'];
let format: any;

$(document).ready(() => {
    //Debug.log("document is read : " + location.pathname);
    Navbar.bind();

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
    static changeUrl(path: string) {
        history.pushState(null, null, path);

        // on every pushState
        Browser.renderLocation(path);
    }

    static renderLocation(path: string) {

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
    }
}

class Navbar {

    static bind() {
        let li_items = $("#topMenu").find("li");

        //Debug.log(li_items);

        $.each(li_items, (index, value) => {

            let a_item = $(li_items[index]).find("a").get(0);

            //Debug.log(a_item);

            $(a_item).click(() => {

                let t = $(a_item).attr("href");

                // on click link
                Browser.changeUrl("/" + t);
                return false;
            });
        });
    }

    static swapActiveItem(path:string)
    {
        let li_items = $("#topMenu").find("li");
        let a_item=null;
        path = path.slice(1,path.length);

        //Debug.log(path);

        $.each(li_items, (index, value) => {

            let current_a_item = $(li_items[index]).find("a").get(0);

            if ($(current_a_item).attr("href")===path)
            {
                a_item=current_a_item;
            }

            let current_li=$(li_items[index]);

            $(current_li).removeClass("active");
        });

        if (a_item!=null)
        {
            $(a_item).parent().addClass("active");
        }
    }
}