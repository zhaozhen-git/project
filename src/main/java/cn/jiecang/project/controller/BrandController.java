package cn.jiecang.project.controller;


import cn.jiecang.project.service.BrandService;
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
public class BrandController {

    @Autowired
    BrandService brandService;

    private static Logger logger = Logger.getLogger(BrandController.class);


    /**
     * 插入关键事件节点
     * @param request
     * @param response
     */
    @RequestMapping("insertBrandList")
    public void insert(HttpServletRequest request,HttpServletResponse response) throws Exception{
        //判断是否有数据
        int x = brandService.getCount();
        String num;
        if(x==0){
            num = "e0";
        }else{
            //获取最大的项目id
            num = String.valueOf(brandService.getNum());
            num = num.substring(1);
            num = "e"+(Integer.valueOf(num) + 1);
        }
        //项目id
        String event_id = num;
        String id = request.getParameter("project_ID");
        String eventName = request.getParameter("eventName");
        String groupLeader = request.getParameter("groupLeader");
//        String phoneNumber = request.getParameter("phoneNumber");
        String duringTime = request.getParameter("duringTime");
        String eventDescription = request.getParameter("eventDescription");
        String eventState = request.getParameter("eventState");
        String startTime = duringTime.substring(0,10);
        String endTime = duringTime.substring(13);
        //将开始时间和结束时间转为毫秒数，相减得到二者之间的毫秒数，在转为天数，即为相差天数，也就是时长
        SimpleDateFormat sdf= new SimpleDateFormat("yyyy-MM-dd");
        Date start = sdf.parse(startTime);
        Date end = sdf.parse(endTime);
        long time = end.getTime()-start.getTime();
        long days = time/(1000*60*60*24);
        Map<String,Object> map = new HashMap<>();
        map.put("event_id",event_id);
        map.put("id",id);
        map.put("eventName",eventName);
        map.put("groupLeader",groupLeader);
//        map.put("phoneNumber",phoneNumber);
        map.put("startTime",startTime);
        map.put("endTime",endTime);
        map.put("eventDescription",eventDescription);
        map.put("days",days);
        map.put("eventState",eventState);
        try{
            brandService.insertBrand(map);
            logger.info("插入对应项目的关键节点成功");
            JSONObject obj = new JSONObject();
            obj.put("msg","插入成功");
            response.setContentType("text/html;charset=UTF-8");
            response.getWriter().println(obj);
        }catch (Exception e){
            logger.error("插入对应项目的关键节点失败");
        }

    }


    /**
     * 获取关键事件节点
     * @param request
     * @return
     */
    @ResponseBody
    @RequestMapping("/getBrandList")
    public Map<String, Object> getBrandList(HttpServletRequest request){
        String id = request.getParameter("id");
        String username = request.getParameter("username");
        Map<String,Object> map = new HashMap<>();
        map.put("id",id);
        map.put("username",username);
        Map<String, Object> resultMap = new HashMap<>();
        try{
            List<Map<String,Object>> list = brandService.getBrandList(map);
            logger.info("得到对应项目的关键节点成功");
            resultMap.put("data", list);
            resultMap.put("code", "0");
            resultMap.put("msg", "");
            resultMap.put("count", "1");
        }catch (Exception e){
            logger.error("得到对应项目的关键节点失败");
        }
        return resultMap;
    }




    @RequestMapping("deleteBrand")
    public void deleteBrand(HttpServletResponse response,HttpServletRequest request){
        String id = request.getParameter("id");
        String ID[] = id.split("[,]");
        List<Map<String,Object>> list = new ArrayList<>();
        for(int i =0;i<ID.length;i++){
            Map<String,Object> map = new HashMap<>();
            map.put("ID",ID[i]);
            list.add(map);
        }
        try{
            brandService.deleteBrand(list);
            logger.info("删除关键节点完成");
            JSONObject obj = new JSONObject();
            obj.put("msg","删除成功");
            response.setContentType("text/html;charset=UTF-8");
            response.getWriter().println(obj);
        }catch (Exception e){
            logger.error("删除关键节点出错");
        }
    }


    @RequestMapping("successBrand")
    public void successBrand(HttpServletResponse response,HttpServletRequest request){
        String id = request.getParameter("id");
        Map<String,Object> map = new HashMap<>();
        map.put("ID",id);
        try{
            //判断是否超过了完成的的时间
            String date = brandService.getDate(map);
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
            long time  = simpleDateFormat.parse(date).getTime();
            Calendar c = Calendar.getInstance(TimeZone.getTimeZone("GMT+08:00"));
            String year = c.get(Calendar.YEAR)+"";
            String month = (c.get(Calendar.MONTH)+1)+"";
            if(month.length()==1){
                month = "0"+month;
            }
            String day = c.get(Calendar.DAY_OF_MONTH)+"";
            if(day.length()==1){
                day = "0"+day;
            }
            String nowDate = year+"-"+month+"-"+day;
            long time1 = simpleDateFormat.parse(nowDate).getTime();
            if(time1>time){
                map.put("tab",1);
            }
            brandService.successBrand(map);
            logger.info("更改节点状态完成");
            JSONObject obj = new JSONObject();
            obj.put("msg","更改成功");
            response.setContentType("text/html;charset=UTF-8");
            response.getWriter().println(obj);
        }catch (Exception e){
            logger.error("更改关键节点状态出错");
        }
    }



    /**
     * 修改更新关键节点
     * @param request
     * @param response
     * @throws Exception
     */
    @RequestMapping("updateBrandList")
    public void update(HttpServletRequest request,HttpServletResponse response) throws Exception{
        String id = request.getParameter("event_id");
        String eventName = request.getParameter("event_name");
        String groupLeader = request.getParameter("group_leader");
//        String phoneNumber = request.getParameter("phone_number");
        String duringTime = request.getParameter("during_time");
        String eventDescription = request.getParameter("event_description");
        String eventState = request.getParameter("event_state");
        String startTime = duringTime.substring(0,10);
        String endTime = duringTime.substring(13);
        //将开始时间和结束时间转为毫秒数，相减得到二者之间的毫秒数，在转为天数，即为相差天数，也就是时长
        SimpleDateFormat sdf= new SimpleDateFormat("yyyy-MM-dd");
        Date start = sdf.parse(startTime);
        Date end = sdf.parse(endTime);
        long time = end.getTime()-start.getTime();
        long days = time/(1000*60*60*24) +1;
        Map<String,Object> map = new HashMap<>();
        map.put("id",id);
        map.put("eventName",eventName);
        map.put("groupLeader",groupLeader);
//        map.put("phoneNumber",phoneNumber);
        map.put("startTime",startTime);
        map.put("endTime",endTime);
        map.put("eventDescription",eventDescription);
        map.put("days",days);
        map.put("eventState",eventState);
        try{
            brandService.updateBrand(map);
            logger.info("修改更新对应项目的关键节点成功");
            JSONObject obj = new JSONObject();
            obj.put("msg","更新成功");
            response.setContentType("text/html;charset=UTF-8");
            response.getWriter().println(obj);
        }catch (Exception e){
            logger.error("修改更新对应项目的关键节点失败");
        }

    }




    /**
     * 得到事件详情
     * @param response
     * @param request
     * @throws IOException
     */
    @RequestMapping("/getEvent")
    public void getEvent(HttpServletResponse response,HttpServletRequest request){
        //项目id
        String project_id = request.getParameter("project_id");
        String event_id = request.getParameter("event_id");
        Map<String,Object> map = new HashMap<>();
        map.put("project_id",project_id);
        map.put("event_id",event_id);
        try{
            List<Map<String,Object>> list = brandService.getBrand(map);
            map.put("event_groupLeader",list.get(0).get("event_groupLeader"));
            String name = brandService.getName(map);
            map.put("event_groupLeader",name);
            Map<String,Object> map1 = list.get(0);
            map1.putAll(map);
            list.clear();
            list.add(map1);
            System.out.println(list);
            logger.info("返回事件详情成功");
            JSONObject obj = new JSONObject();
            obj.put("list",list);
            response.setContentType("text/html;charset=UTF-8");
            response.getWriter().println(obj.toString());
        }catch (Exception e){
            logger.error("返回事件详情错误");
        }
    }


    /**
     * 更改时间节点
     * @param request
     * @param response
     */
    @RequestMapping("/changeTime")
    public void changeTime(HttpServletRequest request,HttpServletResponse response) throws Exception{
        String event_id = request.getParameter("event_id");
        String time = request.getParameter("time");
        String startTime = time.substring(0,11);
        String endTime = time.substring(13);
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        long start = simpleDateFormat.parse(startTime).getTime();
        long end = simpleDateFormat.parse(endTime).getTime();
        long days = (end-start)/(1000*60*60*24) +1;
        String select = request.getParameter("select");
        Map<String,Object> map = new HashMap<>();
        map.put("event_id",event_id);
        map.put("startTime",startTime);
        map.put("endTime",endTime);
        map.put("select",select);
        map.put("days",days);
        try{
            brandService.changeTime(map);
            logger.info("更改时间成功");
            JSONObject obj = new JSONObject();
            obj.put("msg","成功");
            response.setContentType("text/html;charset=UTF-8");
            response.getWriter().println(obj.toString());
        }catch (Exception e){
            logger.error("更改时间失败");
            e.printStackTrace();
        }
    }



    @RequestMapping("/changeProgress")
    public void changeProgress(HttpServletRequest request,HttpServletResponse response) throws Exception{
        String event_id = request.getParameter("event_id");
        String event_progress = request.getParameter("event_progress");
        Map<String,Object> map = new HashMap<>();
        map.put("event_id",event_id);
        map.put("event_progress",event_progress);
        try{
            brandService.changeProgress(map);
            logger.info("更改进度条成功");
            JSONObject obj = new JSONObject();
            response.setContentType("text/html;charset=UTF-8");
            response.getWriter().println(obj.toString());
        }catch (Exception e){
            logger.error("更改进度条失败");
            e.printStackTrace();
        }
    }



}
