package ir.mhdr.controller;

import ir.mhdr.lib.SessionManager;
import ir.mhdr.lib.Statics;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
public class DefaultController {

    @RequestMapping({"/","/admin","/home","/login","/admin/user","/admin/forms","/admin/machinery"})
    public ModelAndView index(HttpServletRequest request, HttpServletResponse response) {

        SessionManager sessionManager=new SessionManager(request,response);

        ModelAndView modelAndView=new ModelAndView("index");
        modelAndView.addObject("version",new Statics().getVersion());
        return modelAndView;
    }
}
