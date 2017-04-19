package ir.mhdr.controller;


import ir.mhdr.bl.UsersBL;
import ir.mhdr.lib.SessionManager;
import ir.mhdr.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

@RestController
public class ApiController {

    @Autowired
    UserRepository userRepository;

    @RequestMapping(value = "/api/user/get_users", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Map getUsers(HttpServletRequest request, HttpServletResponse response) {
        SessionManager sessionManager = new SessionManager(request, response);

        Map result=null;

        UsersBL usersBL=new UsersBL(request,response,userRepository);
        result=usersBL.getUsers();

        return result;
    }

}
