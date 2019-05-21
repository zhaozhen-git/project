package cn.jiecang.project.controller;

import cn.jiecang.project.service.ExtraService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
public class extraController {


    @Autowired
    ExtraService extraService;

    private static Logger logger = Logger.getLogger(extraController.class);


    @ResponseBody
    @RequestMapping("/getExtraList")
    public Map<String, Object> getExtraList(HttpServletRequest request) {
        //获取项目id
        String ID = request.getParameter("id");
        //账号
        String username = request.getParameter("username");
        Map<String, Object> map = new HashMap<>();
        map.put("id", ID);
        map.put("username", username);
        Map<String, Object> resultMap = new HashMap<>();
        try {
            List<Map<String, Object>> list = extraService.getExtra(map);
            logger.info("获取待完成数据成功");
            resultMap.put("data", list);
            resultMap.put("code", "0");
            resultMap.put("msg", "");
            resultMap.put("count", "1");
        } catch (Exception e) {
            e.printStackTrace();
            logger.error("获取待完成数据失败");
        }
        return resultMap;
    }



    @RequestMapping("/insertExtraList")
    public void insertExtraList(HttpServletRequest request,HttpServletResponse response) throws IOException{
        String project_ID = request.getParameter("project_ID");
        String extraName = request.getParameter("extraName");
        String groupLeader = request.getParameter("groupLeader");
        String addPerson = request.getParameter("addPerson");
        String duringTime = request.getParameter("duringTime");
        Map<String,Object> map = new HashMap<>();
        map.put("project_ID",project_ID);
        map.put("extraName",extraName);
        map.put("groupLeader",groupLeader);
        map.put("addPerson",addPerson);
        map.put("duringTime",duringTime);
        extraService.insertExtra(map);
        logger.info("插入待办理事件成功");
        JSONObject obj = new JSONObject();
        obj.put("msg","成功");
        response.setContentType("text/html;charset=UTF-8");
        response.getWriter().println(obj.toString());
    }



    @RequestMapping("/deleteExtra")
    public void deleteExtra(HttpServletResponse response,HttpServletRequest request){
        String id = request.getParameter("id");
        String ID[] = id.split("[,]");
        List<Map<String,Object>> list = new ArrayList<>();
        for(int i =0;i<ID.length;i++){
            Map<String,Object> map = new HashMap<>();
            map.put("ID",ID[i]);
            list.add(map);
        }
        try{
            extraService.deleteExtra(list);
            logger.info("删除待完成事件完成");
            JSONObject obj = new JSONObject();
            obj.put("msg","删除成功");
            response.setContentType("text/html;charset=UTF-8");
            response.getWriter().println(obj);
        }catch (Exception e){
            logger.error("删除待完成事件出错");
        }
    }


    @RequestMapping("/updateExtraList")
    public void update(HttpServletRequest request,HttpServletResponse response) throws Exception{
        String id = request.getParameter("extra_id");
        String name = request.getParameter("extra_name");
        String person = request.getParameter("extra_person");
        String time = request.getParameter("extra_time");
        Map<String,Object> map = new HashMap<>();
        map.put("id",id);
        map.put("name",name);
        map.put("person",person);
        map.put("time",time);
        try{
            extraService.updateExtra(map);
            logger.info("更新待完成事件成功");
            JSONObject obj = new JSONObject();
            obj.put("msg","更新成功");
            response.setContentType("text/html;charset=UTF-8");
            response.getWriter().println(obj);
        }catch (Exception e){
            logger.error("更新待完成事件失败");
        }

    }


    @RequestMapping("/successExtra")
    public void successExtra(HttpServletResponse response,HttpServletRequest request){
        String id = request.getParameter("id");
        Map<String,Object> map = new HashMap<>();
        map.put("ID",id);
        try{
            JSONObject obj = new JSONObject();
            extraService.successExtra(map);
            logger.info("更改待完成状态完成");
            obj.put("msg","1");
            response.setContentType("text/html;charset=UTF-8");
            response.getWriter().println(obj);
        }catch (Exception e){
            logger.error("更改待完成状态出错");
        }
    }



    @RequestMapping("/changeExtraTime")
    public void changeExtraTime(HttpServletRequest request,HttpServletResponse response) throws Exception{
        String extra_id = request.getParameter("extra_id");
        String time = request.getParameter("time");
        Map<String,Object> map = new HashMap<>();
        map.put("extra_id",extra_id);
        map.put("time",time);
        try{
            extraService.changeExtraTime(map);
            logger.info("更改待完成时间成功");
            JSONObject obj = new JSONObject();
            obj.put("msg","成功");
            response.setContentType("text/html;charset=UTF-8");
            response.getWriter().println(obj.toString());
        }catch (Exception e){
            logger.error("更改待完成时间失败");
            e.printStackTrace();
        }
    }





}
