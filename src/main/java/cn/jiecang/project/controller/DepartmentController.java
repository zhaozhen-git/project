package cn.jiecang.project.controller;

import cn.jiecang.project.service.DepartmentService;
import cn.jiecang.project.service.ProjectService;
import net.sf.json.JSONObject;
import org.apache.log4j.Logger;
import org.apache.tools.ant.taskdefs.condition.Http;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.jws.soap.SOAPBinding;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class DepartmentController {


    @Autowired
    DepartmentService departmentService;

    @Autowired
    ProjectService projectService;

    private static org.apache.log4j.Logger logger = Logger.getLogger(DepartmentController.class);

    @RequestMapping("/department")
    public String getFirst(HttpSession session){
        try{
            UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext()
                    .getAuthentication()
                    .getPrincipal();
            String name = SecurityContextHolder.getContext().getAuthentication().getName();
            Map<String,Object> map = new HashMap<>();
            map.put("name",name);
            Map<String,Object> username = projectService.getAccount(map);
            //用户名
            session.setAttribute("username",username.get("user_name"));
            //账号
            session.setAttribute("account",name);
            session.setAttribute("rolename",username.get("name"));
            logger.info("加载用户名成功");
        }catch (Exception e){
            logger.error("加载用户名失败");
            return "redirect:/login";
        }
        return "/jsp/department";
    }


    @ResponseBody
    @RequestMapping("/getDepartmentList")
    public Map<String,Object> getDepartmentList(){
        Map<String, Object> resultMap = new HashMap<>();
        try{
            List<Map<String,Object>> list = departmentService.getDepartment();
            logger.info("得到所有部门成功");
            resultMap.put("data", list);
            resultMap.put("code", "0");
            resultMap.put("msg", "");
            resultMap.put("count", list.size());
        }catch (Exception e){
            logger.error("得到所有部门失败");
        }
        return resultMap;
    }



    @RequestMapping("/insertDepartment")
    public void insertDepartment(HttpServletResponse response, HttpServletRequest request){
        String department_id = request.getParameter("department_id");
        String department_name = request.getParameter("department_name");
        Map<String,Object> map = new HashMap<>();
        map.put("department_id",department_id);
        map.put("department_name",department_name);
        JSONObject obj = new JSONObject();
        try {
            //先判断，部门号是否已经存在
            int x = departmentService.boolId(map);
            if(x>0){
                obj.put("msg","0");
                logger.error("插入部门失败，部门ID已经存在");
            }else{
                departmentService.insertDepartment(map);
                obj.put("msg","1");
                logger.info("插入部门成功");
            }
            response.setContentType("text/html;charset=UTF-8");
            response.getWriter().println(obj);
        }catch (Exception e){
            logger.error("插入部门失败");
            e.printStackTrace();
        }
    }



    @RequestMapping("/updateDepartment")
    public void updateDepartment(HttpServletRequest request,HttpServletResponse response){
        String departmentID = request.getParameter("departmentID");
        String departmentName = request.getParameter("departmentName");
        Map<String,Object> map = new HashMap<>();
        map.put("departmentID",departmentID);
        map.put("departmentName",departmentName);
        try {
            departmentService.updateDepartment(map);
            JSONObject obj = new JSONObject();
            obj.put("msg","1");
            logger.info("修改部门成功");
            response.setContentType("text/html;charset=UTF-8");
            response.getWriter().println(obj);
        }catch (Exception e){
            logger.error("修改部门失败");
            e.printStackTrace();
        }
    }




    @RequestMapping("/deleteDepartment")
    public void deleteDepartment(HttpServletResponse response,HttpServletRequest request){
        String id = request.getParameter("id");
        String ID[] = id.split("[,]");
        List<Map<String,Object>> list = new ArrayList<>();
        for(int i =0;i<ID.length;i++){
            Map<String,Object> map = new HashMap<>();
            map.put("ID",ID[i]);
            list.add(map);
        }
        try{
            System.out.println(list);
            departmentService.deleteDepartment(list);
            logger.info("删除部门完成");
            JSONObject obj = new JSONObject();
            obj.put("msg","删除成功");
            response.setContentType("text/html;charset=UTF-8");
            response.getWriter().println(obj);
        }catch (Exception e){
            logger.error("删除部门出错");
        }
    }
}
