package cn.jiecang.project.controller;

import cn.jiecang.project.service.ProjectService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
public class ProjectController {

    private static Logger logger = Logger.getLogger(ProjectController.class);

    @Autowired
    ProjectService projectService;



    /**
     * 新建项目的基本信息插入
     * @param request
     */
    @RequestMapping("/insertProject")
    public void insertProject(HttpServletRequest request,HttpServletResponse response){
        //判断是否有数据
        int x = projectService.getCount();
        int num = 0;
        if(x==0){
            num = 1;
        }else{
            //获取最大的项目id
            num = projectService.getNum();
            num = num + 1;
        }
        //项目id
        String id = String.valueOf(num);
        //项目名
        String name = request.getParameter("project_name");
        //负责人姓名
        String username = request.getParameter("project_director");
        //计划任务完成周期
        String time = request.getParameter("project_duringtime");
        //计划任务详细说明
        String remark = request.getParameter("detailed_information");
        Map<String,Object> map = new HashMap<>();
        map.put("id",id);
        map.put("name",name);
        map.put("username",username);
        map.put("time",time);
        map.put("remark",remark);
        try{
            projectService.insertProject(map);
            JSONObject obj = new JSONObject();
            obj.put("id",id);
            response.setContentType("text/html;charset=UTF-8");
            response.getWriter().println(obj.toString());
            logger.info("插入成功");
        }catch (Exception e){
            e.printStackTrace();
            logger.error("插入失败");
        }
    }


    /**
     * 获取所有未完成项目列表、完成项目列表
     * @param response
     */
    @RequestMapping("/getProjectList")
    public void getProjectList(HttpServletResponse response,HttpServletRequest request){
        //获取当前登录用户的账号
        String username = request.getParameter("username");
        Map<String,Object> map = new HashMap<>();
        map.put("username",username);
        try{
            //获取所有未完成的项目
            List<Map<String,Object>> list = projectService.getProjectList(map);
//            //获取所有完成的项目
//            List<Map<String,Object>> list1 = projectService.getFinish();
            logger.info("加载所有数据成功");
            JSONArray obj = new JSONArray();
            obj.add(list);
//            obj.add(list1);
            response.setContentType("text/html;charset=UTF-8");
            response.getWriter().println(obj.toString());
        }catch (Exception e){
            e.printStackTrace();
            logger.error("加载所有项目信息失败");
        }
    }


    /**
     * 获取单独一个项目的所有信息
     * @param response
     * @param request
     */
    @RequestMapping("/getProjectOne")
    public void getProjectOne(HttpServletResponse response,HttpServletRequest request){
        //获取项目id
        String ID = request.getParameter("project_id");
        Map<String,Object> map = new HashMap<>();
        map.put("id",ID);
        try{
            List<Map<String,Object>> list = projectService.getProjectOne(map);
            logger.info("获取单个项目数据成功");
            JSONArray obj = new JSONArray();
            obj.add(list);
            response.setContentType("text/html;charset=UTF-8");
            response.getWriter().println(obj);
        }catch (Exception e){
            e.printStackTrace();
            logger.error("获取单个项目失败");
        }

    }




    @RequestMapping("/crud")
    public String getFirst(HttpSession session){
        try{
            UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext()
                    .getAuthentication()
                    .getPrincipal();
            String name = SecurityContextHolder.getContext().getAuthentication().getName();
            Map<String,Object> map = new HashMap<>();
            map.put("name",name);
            String username = projectService.getAccount(map);
            //用户名
            session.setAttribute("username",username);
            //账号
            session.setAttribute("account",name);
            logger.info("加载用户名成功");
        }catch (Exception e){
            logger.error("加载用户名失败");
            return "redirect:/login";
        }
        return "/jsp/crud";
    }

    @RequestMapping("/loginError")
    public String getError(){
        return "/jsp/error";
    }


    /**
     * 插入事件
     * @param response
     * @param request
     */
    @RequestMapping("insertMsg")
    public void insertMsg(HttpServletResponse response,HttpServletRequest request) throws Exception{
        String event_title = request.getParameter("event_title");
        String event_person = request.getParameter("event_person");
        String startDate = request.getParameter("startDate");
        //将时间转换一下
        startDate = startDate.replace("GMT", "").replaceAll("\\(.*\\)", "");
        //将字符串转化为date类型，格式2016-10-12
        SimpleDateFormat format = new SimpleDateFormat("EEE MMM dd yyyy HH:mm:ss z", Locale.ENGLISH);
        Date d = format.parse(startDate);
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        startDate = formatter.format(d);
        String project_id = request.getParameter("project_id");
        String state = request.getParameter("state");
        String event_remark = request.getParameter("event_remark");
        Map<String,Object> map = new HashMap<>();
        map.put("title",event_title);
        map.put("event_person",event_person);
        map.put("startDate",startDate);
        map.put("project_id",project_id);
        map.put("state",state);
        map.put("event_remark",event_remark);
        projectService.insertMsg(map);
        logger.info(startDate);
        logger.info("插入事件成功");
        JSONObject obj = new JSONObject();
        obj.put("msg",startDate);
        response.setContentType("text/html;charset=UTF-8");
        response.getWriter().println(obj.toString());
    }




    @RequestMapping("/project")
    public String getProjectHtml(HttpSession session){
        try{
            UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext()
                    .getAuthentication()
                    .getPrincipal();
            String name = SecurityContextHolder.getContext().getAuthentication().getName();
            Map<String,Object> map = new HashMap<>();
            map.put("name",name);
            String username = projectService.getAccount(map);
            session.setAttribute("username",username);
            session.setAttribute("account",name);
            logger.info("加载用户名成功");
        }catch (Exception e){
            logger.error("加载用户名失败");
            return "redirect:/login";
        }
        return "/jsp/project";
    }


    @ResponseBody
    @RequestMapping("/getAllProject")
    public Map<String, Object> getAllProject(HttpServletRequest request){
        String username = request.getParameter("username");
        Map<String,Object> map = new HashMap<>();
        map.put("username",username);
        Map<String, Object> resultMap = new HashMap<>();
        try{
            List<Map<String,Object>> list = projectService.getAllProject(map);
            logger.info("得到所有项目成功");
            resultMap.put("data", list);
            resultMap.put("code", "0");
            resultMap.put("msg", "");
            resultMap.put("count", list.size());
        }catch (Exception e){
            logger.error("得到所有项目失败");
        }
        return resultMap;
    }


    @RequestMapping("deleteProject")
    public void deleteProject(HttpServletResponse response,HttpServletRequest request){
        String id = request.getParameter("id");
        String ID[] = id.split("[,]");
        List<Map<String,Object>> list = new ArrayList<>();
        for(int i =0;i<ID.length;i++){
            Map<String,Object> map = new HashMap<>();
            map.put("ID",ID[i]);
            list.add(map);
        }
        try{
            projectService.deleteProject(list);
            logger.info("删除关键节点完成");
            JSONObject obj = new JSONObject();
            obj.put("msg","删除成功");
            response.setContentType("text/html;charset=UTF-8");
            response.getWriter().println(obj);
        }catch (Exception e){
            logger.error("删除关键节点出错");
        }
    }



    @RequestMapping("updateProjectList")
    public void update(HttpServletRequest request,HttpServletResponse response) throws Exception{
        String id = request.getParameter("project_id");
        String name = request.getParameter("project_name");
        String director = request.getParameter("project_director");
        String time = request.getParameter("project_time");
        String remark = request.getParameter("project_remark");
        Map<String,Object> map = new HashMap<>();
        map.put("id",id);
        map.put("name",name);
        map.put("director",director);
        map.put("time",time);
        map.put("remark",remark);
        try{
            projectService.updateProject(map);
            logger.info("更新对应项目成功");
            JSONObject obj = new JSONObject();
            obj.put("msg","更新成功");
            response.setContentType("text/html;charset=UTF-8");
            response.getWriter().println(obj);
        }catch (Exception e){
            logger.error("更新对应项目失败");
        }

    }


    @RequestMapping("successProject")
    public void successBrand(HttpServletResponse response,HttpServletRequest request){
        String id = request.getParameter("id");
        Map<String,Object> map = new HashMap<>();
        map.put("ID",id);
        try{
            //先判断该项目下的事件是否全部完成
            int x = projectService.boolEvent(map);
            JSONObject obj = new JSONObject();
            if(x>0){
                obj.put("msg","0");
                logger.error("还有事件没有完成");
            }else{
                projectService.successProject(map);
                logger.info("更改节点状态完成");
                obj.put("msg","1");
            }
            response.setContentType("text/html;charset=UTF-8");
            response.getWriter().println(obj);
        }catch (Exception e){
            logger.error("更改关键节点状态出错");
        }
    }




}
