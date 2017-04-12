package ir.mhdr.lib;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class SessionManager {

    HttpSession httpSession;
    HttpServletRequest request;
    HttpServletResponse response;

    /**
     *
     * @param request Http Request
     * @param response Http Response
     */
    public SessionManager(HttpServletRequest request, HttpServletResponse response)
    {
        this.httpSession=request.getSession(true);
        this.request=request;
        this.response=response;
    }
}
