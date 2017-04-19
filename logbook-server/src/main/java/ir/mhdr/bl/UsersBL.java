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

    public Map<String, Object> getUsers() {
        Map<String, Object> result = new HashMap<>();

        try {
            ArrayList<Map<String, String>> usersMap = new ArrayList<Map<String, String>>();

            List<User> users= userRepository.findAll();

            for (User user:users)
            {
                // remove admin
                if (Objects.equals(user.userName, "admin")) {
                    continue;
                }

                Map<String, String> mUser = new HashMap<String, String>();

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
