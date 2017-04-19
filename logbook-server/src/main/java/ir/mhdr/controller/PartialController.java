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
public class PartialController {

    @RequestMapping("/sidebar/admin")
    public ModelAndView index(HttpServletRequest request, HttpServletResponse response) {

        SessionManager sessionManager=new SessionManager(request,response);

        Map<String, String[]> data = request.getParameterMap();

        String active = data.get("active")[0];

        boolean activeUsers=false;
        boolean activeForms=false;
        boolean activeMachinery=false;

        switch (active)
        {
            case "users":
                activeUsers=true;
                break;
            case "forms":
                activeForms=true;
                break;
            case "machinery":
                activeMachinery=true;
                break;
        }

        ModelAndView modelAndView=new ModelAndView("sidebar/admin");
        modelAndView.addObject("version",new Statics().getVersion());
        modelAndView.addObject("activeUsers",activeUsers);
        modelAndView.addObject("activeForms",activeForms);
        modelAndView.addObject("activeMachinery",activeMachinery);
        return modelAndView;
    }

}
