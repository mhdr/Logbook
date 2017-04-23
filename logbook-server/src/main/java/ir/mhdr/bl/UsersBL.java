package ir.mhdr.bl;

import ir.mhdr.model.User;
import ir.mhdr.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.*;

public class UsersBL{

    HttpServletRequest request;
    HttpServletResponse response;
    UserRepository userRepository;

    public UsersBL(HttpServletRequest request, HttpServletResponse response,UserRepository userRepository) {
        this.request = request;
        this.response = response;
        this.userRepository=userRepository;
    }

    public Map<String,Object> koGetUsers(Map obj)
    {
        Map<String, Object> result = new HashMap<>();
        HashMap<String, Object> obj1 = (HashMap<String, Object>) obj;
        ArrayList<Map<String, Object>> usersMap = (ArrayList<Map<String, Object>>) obj1.get("users");

        for (Map<String,Object> u:usersMap)
        {
            u.put("isSelected",false);
        }

        result.put("users", usersMap);
        result.put("error", obj.get("error"));
        return result;
    }

    public Map<String, Object> getUsers() {
        Map<String, Object> result = new HashMap<>();

        try {
            ArrayList<Map<String, Object>> usersMap = new ArrayList<Map<String, Object>>();

            List<User> users= userRepository.findAll();

            for (User user:users)
            {
                // remove admin
                if (Objects.equals(user.userName, "admin")) {
                    continue;
                }

                Map<String, Object> mUser = new HashMap<String, Object>();

                mUser.put("id", String.valueOf(user.id));
                mUser.put("userName", user.userName);
                mUser.put("firstName", user.firstName);
                mUser.put("lastName", user.lastName);

                usersMap.add(mUser);
            }

            result.put("users", usersMap);
            result.put("error", 0);
        } catch (Exception ex) {
            // exception
            result.put("error", 1);
            ex.printStackTrace();
        }

        return result;
    }
}
