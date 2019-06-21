package cn.jiecang.project.controller;

import cn.jiecang.project.service.GanttService;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
public class GanttController {

    @Autowired
    GanttService ganttService;

    @RequestMapping("/getGanttData")
    public void getGanttData(HttpServletResponse response, HttpServletRequest request) throws Exception{
        //获取项目得ID
        String id = request.getParameter("id");
        Map<String,Object> map = new HashMap<>();
        map.put("id",id);
        List<Map<String,Object>> list = ganttService.getGanttData(map);
        List<Map<String,Object>> list1 = new ArrayList<>();
        for(int i=0;i<list.size();i++){
            String event = String.valueOf(list.get(i).get("event_id"));
            List<Map<String,Object>> list2 = new ArrayList<>();
            Map<String,Object> map1 = new HashMap<>();
            Map<String,Object> map2 = new HashMap<>();
            map1.put("user_ID",String.valueOf(list.get(i).get("user_ID")));
            if(!"null".equals(event)){
                SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
                String start = String.valueOf(list.get(i).get("event_startTime"));
                String end = String.valueOf(list.get(i).get("event_endTime"));
                long time1 = simpleDateFormat.parse(start).getTime();
                long time2 = simpleDateFormat.parse(end).getTime();
                map2.put("from","/Date("+time1+")/");
                map2.put("to","/Date("+time2+")/");
                map2.put("dataObj",String.valueOf(list.get(i).get("event_id")));
                map2.put("label",String.valueOf(list.get(i).get("event_name")));
                String tab = String.valueOf(list.get(i).get("event_tab"));
                String state = String.valueOf(list.get(i).get("event_state"));
                String success = String.valueOf(list.get(i).get("event_success"));
                String color = "ganttBlue";
                if("0".equals(success)){
                    //完成
                }else{
                    //紧急
                    if("1".equals(state)){
                        color = "ganttRed";
                    }else{
                        //延期
                        if("1".equals(tab)){
                            color = "ganttOrange";
                        }
                    }
                }
                map2.put("customClass",color);

            }else{
                map2.put("from","");
                map2.put("to","");
                map2.put("dataObj","");
                map2.put("label","");
                map2.put("customClass","");
            }
            list2.add(map2);
            map1.put("desc",String.valueOf(list.get(i).get("user_name")));
            map1.put("name",String.valueOf(list.get(i).get("departmentName")));
            if(list1.size()!=0){
                //循环合并
                String userID = String.valueOf(list.get(i).get("user_ID"));
                for(int j=0;j<list1.size();j++){
                    String userid = String.valueOf(list1.get(j).get("user_ID"));
                    if(userID.equals(userid)){
                        Object object = list1.get(j).get("values");
                        List<Map<String, Object>> list3 = (List<Map<String, Object>>) object;
                        list3.addAll(list2);
                        map1.put("values",list3);
                        list1.remove(j);
                        list1.add(map1);
                        break;
                    }
                    if(j==list1.size()-1){
                        map1.put("values",list2);
                        list1.add(map1);
                    }
                }
            }else{
                map1.put("values",list2);
                list1.add(map1);
            }
        }
        JSONObject obj = new JSONObject();
        obj.put("data",list1);
        response.setContentType("text/html;charset=UTF-8");
        response.getWriter().println(obj);
    }

}
