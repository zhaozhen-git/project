package cn.jiecang.project.controller;

import cn.jiecang.project.service.CustomUserService;
import cn.jiecang.project.service.UserService;

import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import org.apache.log4j.Logger;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
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
            String filename = "";
//            String filepath = request.getSession().getServletContext().getRealPath("/uploadFile/");
            String filepath = "/uploadFile/";
            if(supplier!=""){
                String supplierData[] = supplier.split(";");
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
            }
            if(demand!=""){
                String demandData[] = demand.split(";");
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




    @RequestMapping("/changePassword")
    public void changePassword(HttpServletRequest request,HttpServletResponse response) throws IOException {
        String user = request.getParameter("user");
        String pass1 = request.getParameter("pass1");
        String pass2 = request.getParameter("pass2");
        Map<String,Object> map = new HashMap<>();
        map.put("user",user);
        map.put("pass2",pass2);
        String password = userService.getUserPassword(map);
        String msg = "0";
        if(pass1.equals(password)){
            //进行修改秘密
            userService.changePassword(map);
            msg = "1";
            logger.info("密码修改完成");
        }else{
            logger.error("输入的密码不正确");
        }
        JSONObject obj = new JSONObject();
        obj.put("msg", msg);
        response.setContentType("text/html;charset=UTF-8");
        response.getWriter().println(obj.toString());
    }




    @ResponseBody
    @RequestMapping("/getUserList")
    public Map<String,Object> getUserList(HttpServletRequest request){
        String id = request.getParameter("id");
        Map<String,Object> map = new HashMap<>();
        map.put("id",id);
        Map<String,Object> resultMap = new HashMap<>();
        try{
            List<Map<String,Object>> list = userService.getUser(map);
            logger.info("成功获取该项目下得所有用户");
            resultMap.put("data", list);
            resultMap.put("code", "0");
            resultMap.put("msg", "");
            resultMap.put("count", "1");
        }catch (Exception e){
            logger.error("获取该项目下所有用户失败");
            e.printStackTrace();
        }
        return  resultMap;
    }


    @RequestMapping("/deleteUser")
    public void deleteUser(HttpServletRequest request,HttpServletResponse response){
        String id = request.getParameter("id");
        String project = request.getParameter("project");
        String ID[] = id.split("[,]");
        List<Map<String,Object>> list = new ArrayList<>();
        for(int i =0;i<ID.length;i++){
            Map<String,Object> map = new HashMap<>();
            map.put("ID",ID[i]);
            map.put("project",project);
            list.add(map);
        }
        try {
            userService.deleteUser(list);
            JSONObject obj = new JSONObject();
            obj.put("msg", 0);
            response.setContentType("text/html;charset=UTF-8");
            response.getWriter().println(obj.toString());
        }catch (Exception e){
            e.printStackTrace();
        }
    }


    //获取部门列表
    @RequestMapping("/getDepartmentData")
    public void getDepartmentData(HttpServletResponse response){
        try{
            List<Map<String,Object>> list = userService.getDepartmentData();
            JSONObject obj = new JSONObject();
            obj.put("list", list);
            response.setContentType("text/html;charset=UTF-8");
            response.getWriter().println(obj.toString());
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    //获取部门下得用户
    @RequestMapping("/getDepartmentUser")
    public void getDepartmentUser(HttpServletResponse response,HttpServletRequest request){
        String department = request.getParameter("departmentID");
        Map<String,Object> map = new HashMap<>();
        map.put("department",department);
        try{
            List<Map<String,Object>> list = userService.getDepartmentUser(map);
            JSONObject obj = new JSONObject();
            obj.put("list", list);
            response.setContentType("text/html;charset=UTF-8");
            response.getWriter().println(obj.toString());
        }catch (Exception e){
            e.printStackTrace();
        }
    }


    @RequestMapping("/insertUser")
    public void insertUser(HttpServletRequest request,HttpServletResponse response){
        String id = request.getParameter("id");
        String department = request.getParameter("department");
        String user = request.getParameter("user");
        Map<String,Object> map = new HashMap<>();
        map.put("id",id);
        map.put("department",department);
        map.put("user",user);
        try{
            JSONObject obj = new JSONObject();
            //判断是否已经存在该用户
            int x = userService.boolUser(map);
            if(x>0){
                obj.put("msg", 1);
            }else{
                userService.insertUser(map);
                obj.put("msg", 0);
            }
            response.setContentType("text/html;charset=UTF-8");
            response.getWriter().println(obj.toString());
        }catch (Exception e){
            e.printStackTrace();
        }
    }



    //获取项目成员
    @RequestMapping("/getProjectUser")
    public void getProjectUser(HttpServletResponse response,HttpServletRequest request){
        String id = request.getParameter("id");
        Map<String,Object> map = new HashMap<>();
        map.put("id",id);
        JSONObject obj = new JSONObject();
        try{
            List<Map<String,Object>> list = userService.getProjectUser(map);
            obj.put("list", list);
            response.setContentType("text/html;charset=UTF-8");
            response.getWriter().println(obj.toString());
        }catch (Exception e){
            e.printStackTrace();
        }
    }



    //获取所有人员
    @ResponseBody
    @RequestMapping("/getPersonList")
    public Map<String,Object> getPersonList(){
        Map<String,Object> resultMap = new HashMap<>();
        try {
            List<Map<String,Object>> list = userService.getPersonList();
            resultMap.put("data", list);
            resultMap.put("code", "0");
            resultMap.put("msg", "");
            resultMap.put("count", "1");
        }catch (Exception e){
            e.printStackTrace();
        }
        return resultMap;
    }


    //插入单个用户
    @RequestMapping("/insertPerson")
    public void insertPerson(HttpServletRequest request,HttpServletResponse response){
        String userId = request.getParameter("user_id");
        String username = request.getParameter("user_name");
        String departmentId = request.getParameter("department_id");
        String role = request.getParameter("role");
        Map<String,Object> map = new HashMap<>();
        map.put("userId",userId);
        map.put("username",username);
        map.put("departmentId",departmentId);
        map.put("role",role);
        JSONObject obj = new JSONObject();
        try {
            //判断工号是否已经占用
            int x = userService.boolPerson(map);
            if(x>0){
                obj.put("msg","0");
            }else{
                userService.insertPerson(map);
                userService.insertRole(map);
                obj.put("msg","1");
            }
            response.setContentType("text/html;charset=UTF-8");
            response.getWriter().println(obj.toString());
        }catch (Exception e){
            e.printStackTrace();
        }
    }



    //更改用户信息
    @RequestMapping("/updatePerson")
    public void updatePerson(HttpServletResponse response,HttpServletRequest request){
        String user_id = request.getParameter("user_id");
        String user_name = request.getParameter("user_name");
        String department_id = request.getParameter("department_id");
        String role = request.getParameter("role");
        Map<String,Object> map = new HashMap<>();
        map.put("user_id",user_id);
        map.put("user_name",user_name);
        map.put("department_name",department_id);
        map.put("role",role);
        JSONObject obj = new JSONObject();
        try{
            userService.updatePerson(map);
            userService.updateRole(map);
            obj.put("msg","成功");
            response.setContentType("text/html;charset=UTF-8");
            response.getWriter().println(obj.toString());
        }catch (Exception e){
            e.printStackTrace();
        }
    }



    //删除用户
    @RequestMapping("/deletePerson")
    public void deletePerson(HttpServletRequest request,HttpServletResponse response){
        String id = request.getParameter("id");
        String ID[] = id.split("[,]");
        List<Map<String,Object>> list = new ArrayList<>();
        for(int i =0;i<ID.length;i++){
            Map<String,Object> map = new HashMap<>();
            map.put("ID",ID[i]);
            list.add(map);
        }
        try {
            JSONObject obj = new JSONObject();
            int x = userService.boolProject(list);
            if(x>0){
                obj.put("msg", 1);
            }else{
                userService.deletePerson(list);
                userService.deleteRole(list);
                obj.put("msg", 0);
            }
            response.setContentType("text/html;charset=UTF-8");
            response.getWriter().println(obj.toString());
        }catch (Exception e){
            e.printStackTrace();
        }
    }



    //注销用户
    @RequestMapping("/cancelPerson")
    public void cancelPerson(HttpServletRequest request,HttpServletResponse response){
        String id = request.getParameter("id");
        String ID[] = id.split("[,]");
        List<Map<String,Object>> list = new ArrayList<>();
        for(int i =0;i<ID.length;i++){
            Map<String,Object> map = new HashMap<>();
            map.put("ID",ID[i]);
            list.add(map);
        }
        try {
            userService.cancelPerson(list);
            JSONObject obj = new JSONObject();
            obj.put("msg", 0);
            response.setContentType("text/html;charset=UTF-8");
            response.getWriter().println(obj.toString());
        }catch (Exception e){
            e.printStackTrace();
        }
    }


    //启用用户
    @RequestMapping("/usePerson")
    public void usePerson(HttpServletRequest request,HttpServletResponse response){
        String id = request.getParameter("id");
        String ID[] = id.split("[,]");
        List<Map<String,Object>> list = new ArrayList<>();
        for(int i =0;i<ID.length;i++){
            Map<String,Object> map = new HashMap<>();
            map.put("ID",ID[i]);
            list.add(map);
        }
        try {
            userService.usePerson(list);
            JSONObject obj = new JSONObject();
            obj.put("msg", 0);
            response.setContentType("text/html;charset=UTF-8");
            response.getWriter().println(obj.toString());
        }catch (Exception e){
            e.printStackTrace();
        }
    }



    @RequestMapping("/getRole")
    public void getRole(HttpServletResponse response){
        try{
            List<Map<String,Object>> list = userService.getRole();
            JSONObject obj = new JSONObject();
            obj.put("list", list);
            response.setContentType("text/html;charset=UTF-8");
            response.getWriter().println(obj.toString());
        }catch (Exception e){
            e.printStackTrace();
        }
    }


}
