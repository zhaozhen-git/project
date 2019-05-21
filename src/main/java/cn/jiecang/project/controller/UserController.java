package cn.jiecang.project.controller;

import cn.jiecang.project.service.CustomUserService;
import cn.jiecang.project.service.UserService;

import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import org.apache.log4j.Logger;

import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;

@Controller
public class UserController {


    private static Logger logger = Logger.getLogger(UserController.class);

    @Autowired
    UserService userService;

    @Autowired
    CustomUserService customUserService;





    /**
     * 获取未注销的用户
     */
    @RequestMapping("/getUser")
    public void getUser(HttpServletResponse response){
        try{
            List<Map<String,Object>> list = userService.getUserList();
            logger.info("获取用户列表:"+list);
            JSONObject obj = new JSONObject();
            obj.put("list", list);
            response.setContentType("text/html;charset=UTF-8");
            response.getWriter().println(obj.toString());
        }catch (Exception e){
            e.printStackTrace();
            logger.error("获取用户信息失败");
        }
    }


    @RequestMapping("/login")
    public String getLogin(){
        return "/jsp/login";
    }

    @RequestMapping("/login1")
    public String getLogin1(){
        return "/jsp/login1";
    }



    @RequestMapping("/")
    public String login(){
        return "redirect:/login";
    }




}
