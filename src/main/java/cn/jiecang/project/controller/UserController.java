package cn.jiecang.project.controller;

import cn.jiecang.project.service.CustomUserService;
import cn.jiecang.project.service.UserService;

import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import org.apache.log4j.Logger;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.*;

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
            List<Map<String,Object>> list1 = new ArrayList<>();
            List<Map<String,Object>> list2 = new ArrayList<>();
            List<Map<String,Object>> list3 = new ArrayList<>();
            List<Map<String,Object>> list4 = new ArrayList<>();
            logger.info("获取用户列表:"+list);
            for(int i=0;i<list.size();i++){
                //获取角色
                String role = list.get(i).get("name").toString();
                if(role.equals("ROLE_USER")){
                    list1.add(list.get(i));
                }else if(role.equals("ROLE_SUPPLIER")){
                    list2.add(list.get(i));
                }else if(role.equals("ROLE_DEMAND")){
                    list3.add(list.get(i));
                }else if(role.equals("ROLE_MANAGER")){
                    list4.add(list.get(i));
                }
            }
            JSONObject obj = new JSONObject();
            obj.put("user", list1);
            obj.put("supplier",list2);
            obj.put("demand",list3);
            obj.put("manager",list4);
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
    public String login(HttpServletRequest request){
        Enumeration em = request.getSession().getAttributeNames();
        while(em.hasMoreElements()){
            request.getSession().removeAttribute(em.nextElement().toString());
        }
        return "redirect:/login";
    }



    @RequestMapping("/getFilePath")
    public void getFilePath(HttpServletRequest request,HttpServletResponse response){
        String id = request.getParameter("project_id");
        Map<String,Object> map = new HashMap<>();
        map.put("id",id);
        try{
            //得到对应项目的文件
            Map<String,Object> map1 = userService.getFileList(map);
            List<Map<String,Object>> list1 = new ArrayList<>();
            List<Map<String,Object>> list2 = new ArrayList<>();
            String supplier = map1.get("supplier_data").toString();
            String demand = map1.get("demand_data").toString();
            String supplierData[] = supplier.split(";");
            String demandData[] = demand.split(";");
            String filename = "";
//            String filepath = request.getSession().getServletContext().getRealPath("/uploadFile/");
            String filepath = "/uploadFile/";
            for(int i=0;i<supplierData.length;i++){
                Map<String,Object> map2 = new HashMap<>();
                if(supplierData[i].equals("")){
                    continue;
                }else{
                    String path = "";
                    path = filepath + supplierData[i];
                    filename = supplierData[i].substring(36);
                    map2.put("filepath",path);
                    map2.put("filename",filename);
                    list1.add(map2);
                }
            }
            for(int j=0;j<demandData.length;j++){
                Map<String,Object> map2 = new HashMap<>();
                if(demandData[j].equals("")){
                    continue;
                }else{
                    String path = "";
                    path = filepath + demandData[j];
                    filename = demandData[j].substring(36);
                    map2.put("filepath",path);
                    map2.put("filename",filename);
                    list2.add(map2);
                }
            }
            JSONObject obj = new JSONObject();
            obj.put("supplier", list1);
            obj.put("demand", list2);
            response.setContentType("text/html;charset=UTF-8");
            response.getWriter().println(obj.toString());
        }catch (Exception e){
            e.printStackTrace();
        }


    }




}
