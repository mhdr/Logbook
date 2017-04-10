package ir.mhdr.controller;

import ir.mhdr.lib.Statics;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
public class DefaultController {
    @RequestMapping("/")
    public ModelAndView index(HttpServletRequest request, HttpServletResponse response) {

        request.getSession(true);

        ModelAndView modelAndView=new ModelAndView("index");
        modelAndView.addObject("version",new Statics().getVersion());
        return modelAndView;
    }
}
