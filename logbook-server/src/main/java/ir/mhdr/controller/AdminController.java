package ir.mhdr.controller;

import ir.mhdr.lib.SessionManager;
import ir.mhdr.lib.Statics;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

@Controller
public class AdminController {
    @RequestMapping("/templates/admin/users")
    public ModelAndView users(HttpServletRequest request, HttpServletResponse response) {

        SessionManager sessionManager = new SessionManager(request, response);

        Map<String, String[]> data = request.getParameterMap();

        ModelAndView modelAndView = new ModelAndView("admin/users");
        modelAndView.addObject("version", new Statics().getVersion());
        return modelAndView;
    }
}
