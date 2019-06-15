package cn.jiecang.project.controller;

import cn.jiecang.project.service.BrandService;
import cn.jiecang.project.service.ExtraService;
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
import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
public class ProjectController {

    private static Logger logger = Logger.getLogger(ProjectController.class);

    @Autowired
    ProjectService projectService;

    @Autowired
    ExtraService extraService;

    @Autowired
    BrandService brandService;



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
        String projectName = request.getParameter("projectName");
        //负责人姓名
        String projectDirector = request.getParameter("projectDirector");
        //计划任务完成周期
        String time = request.getParameter("projectTime");
        //供应商联系人
        String projectSupplier = request.getParameter("projectSupplier");
        //供应商电话
        String supplierPhone = request.getParameter("supplierPhone");
        //需求方联系人
        String projectDemand = request.getParameter("projectDemand");
        //需求方电话
        String demandPhone = request.getParameter("demandPhone");
        //计划任务详细说明
        String remark = request.getParameter("projectDetail");
        //供应方上传文件
        String supplier = request.getParameter("data1");
        //需求方上传文件
        String demand = request.getParameter("data2");
        Map<String,Object> map = new HashMap<>();
        if(supplier!="" && supplier!=null){
            supplier = supplier.replaceAll("[;]{2,}",";");
            if(supplier.substring(0,1).equals(";")){
                supplier = supplier.substring(1);
            }
            if(supplier!=""){
                supplier = supplier.substring(0,supplier.length()-1);
                map.put("supplier",supplier);
            }
        }
        if(demand!="" && demand!=null){
            demand = demand.replaceAll("[;]{2,}",";");
            if(demand.substring(0,1).equals(";")){
                demand = demand.substring(1);
            }
            if(demand!=""){
                demand = demand.substring(0,demand.length()-1);
                map.put("demand",demand);
            }

        }
        map.put("id",id);
        map.put("projectName",projectName);
        map.put("projectDirector",projectDirector);
        map.put("time",time);
        map.put("projectSupplier",projectSupplier);
        map.put("supplierPhone",supplierPhone);
        map.put("projectDemand",projectDemand);
        map.put("demandPhone",demandPhone);
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
            //获取该用户可以访问的所有未完成的项目
            List<Map<String,Object>> list = projectService.getProjectList(map);
            logger.info("加载所有数据成功");
            JSONArray obj = new JSONArray();
            obj.add(list);
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
    public void getProjectOne(HttpServletResponse response,HttpServletRequest request,HttpSession session){
        //获取项目id
        String ID = request.getParameter("project_id");
        Map<String,Object> map = new HashMap<>();
        map.put("id",ID);
        session.setAttribute("ID",ID);
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




    @RequestMapping("/person")
    public String getPersonHtml(HttpSession session){
        try{
            UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext()
                    .getAuthentication()
                    .getPrincipal();
            String name = SecurityContextHolder.getContext().getAuthentication().getName();
            Map<String,Object> map = new HashMap<>();
            map.put("name",name);
            Map<String,Object> username = projectService.getAccount(map);
            session.setAttribute("username",username.get("user_name"));
            session.setAttribute("account",name);
            session.setAttribute("rolename",username.get("name"));
            logger.info("加载用户名成功");
        }catch (Exception e){
            logger.error("加载用户名失败");
            return "redirect:/login";
        }
        return "/jsp/person";
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
            Map<String,Object> username = projectService.getAccount(map);
            session.setAttribute("username",username.get("user_name"));
            session.setAttribute("account",name);
            session.setAttribute("rolename",username.get("name"));
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
        String project_name = request.getParameter("project_name");
        String project_director = request.getParameter("project_director");
        String project_time = request.getParameter("project_time");
        String project_supplier = request.getParameter("project_supplier");
        String supplier_phone = request.getParameter("supplier_phone");
        String project_demand = request.getParameter("project_demand");
        String demand_phone = request.getParameter("demand_phone");
        String project_detail = request.getParameter("project_detail");
        String data1 = request.getParameter("data1");
        String data2 = request.getParameter("data2");
        data1 = data1.replaceAll("[;]{2,}",";");
        data2 = data2.replaceAll("[;]{2,}",";");
        if(!";".equals(data1) && data1!=null){
            data1 = data1.replaceAll("[;]{2,}",";");
            if(data1.substring(0,1).equals(";")){
                data1 = data1.substring(1);
            }
            data1 = data1.substring(0,data1.length()-1);
        }
        if(!";".equals(data2) && data2!=null){
            if(data2.substring(0,1).equals(";")){
                data2 = data2.substring(1);
            }
            data2 = data2.substring(0,data2.length()-1);
        }
        Map<String,Object> map = new HashMap<>();
        map.put("id",id);
        map.put("project_name",project_name);
        map.put("project_director",project_director);
        map.put("project_time",project_time);
        map.put("project_supplier",project_supplier);
        map.put("supplier_phone",supplier_phone);
        map.put("project_demand",project_demand);
        map.put("demand_phone",demand_phone);
        map.put("project_detail",project_detail);
        map.put("data1",data1);
        map.put("data2",data2);
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



    @RequestMapping("/getFile")
    public void getFile(HttpServletResponse response,HttpServletRequest request) throws IOException {
        String supplier = request.getParameter("supplier_data");
        String demand = request.getParameter("demand_data");
        JSONObject obj = new JSONObject();
        //文件存放路径
        String filePath = request.getSession().getServletContext().getRealPath("");
        if(supplier!="" && supplier!=null){
            List<Map<String,Object>> list = new ArrayList<>();
            String data1[] = null;
            data1 = supplier.split(";");
            for(int i=0;i<data1.length;i++){
                File file = new File(filePath+"\\uploadFile\\"+data1[i]);
                String size = String.valueOf(file.length());
                String filename = data1[i];
                String name = data1[i].substring(36);
                Map<String,Object> map = new HashMap<>();
                map.put("size",size);
                map.put("name",name);
                map.put("filename",filename);
                list.add(map);
            }
            obj.put("list",list);
        }
        if(demand!="" && demand!=null){
            List<Map<String,Object>> list1 = new ArrayList<>();
            String data2[] = null;
            data2 = demand.split(";");
            for(int j=0;j<data2.length;j++){
                File file = new File(filePath+data2[j]);
                String size = String.valueOf(file.length());
                String filename = data2[j];
                String name = data2[j].substring(36);
                Map<String,Object> map = new HashMap<>();
                map.put("size",size);
                map.put("name",name);
                map.put("filename",filename);
                list1.add(map);
            }
            obj.put("list1",list1);
        }
        response.setContentType("text/html;charset=UTF-8");
        response.getWriter().println(obj.toString());
    }




    @RequestMapping("/getExcelList")
    public void getExcelList(HttpServletRequest request,HttpServletResponse response){
        //项目id
        String id = request.getParameter("id");
        //用户名
        Map<String,Object> map = new HashMap<>();
        map.put("id",id);
        JSONObject obj = new JSONObject();
        try{
            //获取事件项目是否有数据
            int x = projectService.getEventCount(map);
            //获取额外事件是否有
            int y = projectService.getExtraCount(map);
            //获取项目的信息
            List<Map<String,Object>> projectMsg = projectService.getProjectMsg(map);
            //获取事件得数据
            List<Map<String,Object>> list = projectService.getExcelList(map);
            //获取额外节点事件数据
            List<Map<String,Object>> list1 = projectService.getExtraList(map);
            //该项目得主要信息
            if(projectMsg.size()!=0){
                Map<String,Object> map1 = new HashMap<>();
                //项目名
                String projectName = projectMsg.get(0).get("project_name").toString();
                //项目负责人
                String projectDirector = projectMsg.get(0).get("project_director").toString();
                //项目周期
                String projectTime = projectMsg.get(0).get("project_time").toString();
                //项目供应商
                String supplier = projectMsg.get(0).get("project_supplier").toString();
                //供应商电话
                String suppliePhone = projectMsg.get(0).get("supplier_phone").toString();
                //需求方
                String demand = projectMsg.get(0).get("project_demand").toString();
                //需求方电话
                String demandPhone = projectMsg.get(0).get("demand_phone").toString();
                //详情
                String project_detail = projectMsg.get(0).get("project_detail").toString();
                //供应方文件
                String supplier_data = projectMsg.get(0).get("supplier_data").toString();
                //需求方文件
                String demand_data = projectMsg.get(0).get("demand_data").toString();
                map1.put("projectName",projectName);
                map1.put("projectDirector",projectDirector);
                map1.put("projectTime",projectTime);
                map1.put("supplier",supplier);
                map1.put("supplierPhone",suppliePhone);
                map1.put("demand",demand);
                map1.put("demandPhone",demandPhone);
                map1.put("project_detail",project_detail);
                map1.put("supplier_data",supplier_data);
                map1.put("demand_data",demand_data);
                if(x!=0 || y!=0) {
                    SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
                    //项目里面员工得任务
                    List<Map<String, Object>> list2 = new ArrayList<>();
                    if(x!=0){
                        for (int i = 0; i < list.size(); i++) {
                            Map<String, Object> map2 = new HashMap<>();
                            Map<String, Object> map3 = new HashMap<>();
                            String name = list.get(i).get("departmentName").toString();
                            String desc = list.get(i).get("user_name").toString();
                            String user_id = list.get(i).get("user_ID").toString();
                            if(list.get(i).size()>3){
                                String event_success = list.get(i).get("event_success").toString();
                                String event_state = list.get(i).get("event_state").toString();
                                String event_tab = list.get(i).get("event_tab").toString();
                                String event_id = list.get(i).get("event_id").toString();
                                String color = "#5FB878";
                                //如果事件完成，则为绿色；
                                //事件未完成，则判断状态是正常还是紧急状态。如果是紧急，显示红色；正常则判断是否延期
                                //如果事件延期，则为黄色
                                if(!event_success.equals("0")){
                                    if(!event_state.equals("0")){
                                        color = "#e4393c";
                                    }else{
                                        if(!event_tab.equals("0")){
                                            color = "#d58512";
                                        }
                                    }
                                }
                                map3.put("color",color);
                                map3.put("event_id",event_id);
                            }
                            map2.put("name", name);
                            map2.put("desc", desc);
                            map2.put("user_ID", user_id);
                            List<Map<String, Object>> list4 = new ArrayList<>();
                            if (!list.get(i).containsKey("event_startTime") && !list.get(i).containsKey("event_endTime")) {
                                map2.put("values","");
                                list2.add(map2);
                                continue;
                            }
                            String startTime = list.get(i).get("event_startTime").toString();
                            String endTime = list.get(i).get("event_endTime").toString();
                            startTime = String.valueOf(simpleDateFormat.parse(startTime).getTime());
                            endTime = String.valueOf(simpleDateFormat.parse(endTime).getTime());
                            map3.put("from", startTime);
                            map3.put("to", endTime);
                            map3.put("label", list.get(i).get("event_name"));
                            list4.add(map3);
                            //将相同得人得事件加起来
                            if (list2.size() != 0) {
                                for (int j = 0; j < list2.size(); j++) {
                                    String name1 = list2.get(j).get("name").toString();
                                    String desc1 = list2.get(j).get("desc").toString();
                                    if (name1.equals(name) && desc1.equals(desc)) {
                                        Map<String, Object> map4 = new HashMap<>();
                                        //获取对象，要转换为list-------------------------------------------l
                                        Object object = list2.get(j).get("values");
                                        List<Map<String, Object>> list5 = (List<Map<String, Object>>) object;
                                        list4.addAll(list5);
                                        list2.remove(j);
                                        j--;
                                    }
                                }
                            }
                            map2.put("values", list4);
                            list2.add(map2);
                        }
                    }
                    //额外事件
                    if (list1.size() != 0) {
                        for (int k = 0; k < list1.size(); k++) {
                            if (!list1.get(k).containsKey("extra_ID")) {
                                continue;
                            }
                            String user_ID = list1.get(k).get("user_ID").toString();
                            String extra_name = list1.get(k).get("extra_name").toString();
                            String extra_time = list1.get(k).get("extra_time").toString();
                            String extra_success = list1.get(k).get("extra_success").toString();
                            String extra_tab = list1.get(k).get("extra_tab").toString();
                            String extra_id = list1.get(k).get("extra_ID").toString();
                            //如果判断是否完成，如果完成则为绿色；
                            //未完成：判断是否延期，延期为红色，不延期为红色
                            String color = "#5FB878";
                            if(!extra_success.equals("0")) {
                                if (!extra_tab.equals("0")) {
                                    color = "#d58512";
                                }else{
                                    color = "#e4393c";
                                }
                            }
                            String time = String.valueOf(simpleDateFormat.parse(extra_time).getTime());
                            if (list2.size() != 0) {
                                for (int s = 0; s < list2.size(); s++) {
                                    String userid = list2.get(s).get("user_ID").toString();
                                    String username = list2.get(s).get("name").toString();
                                    String desc = list2.get(s).get("desc").toString();
                                    if (user_ID.equals(userid)) {
                                        List<Map<String, Object>> list5 = new ArrayList<>();
                                        Map<String, Object> map2 = new HashMap<>();
                                        map2.put("from", time);
                                        map2.put("to", time);
                                        map2.put("color",color);
                                        map2.put("event_id",extra_id);
                                        map2.put("label", extra_name);
                                        list5.add(map2);
                                        Map<String, Object> map3 = new HashMap<>();
                                        map3.put("name", username);
                                        map3.put("desc", desc);
                                        map3.put("user_ID", userid);
                                        //判断是否包含
                                        if (!list1.get(k).containsKey("extra_name")) {

                                        } else {
                                            Object object = list2.get(s).get("values");
                                            if(object.toString().equals("")){
                                                list2.remove(s);
                                            }else{
                                                List<Map<String, Object>> list6 = (List<Map<String, Object>>) object;
                                                list5.addAll(list6);
                                                list2.remove(s);
                                            }
                                        }
                                        map3.put("values", list5);
                                        list2.add(map3);
                                        break;
                                    }
                                }
                            }
                        }
                    }
                    obj.put("list", list2);
                }
                List<Map<String, Object>> list3 = new ArrayList<>();
                list3.add(map1);
                obj.put("projectList", list3);
            }else{
                obj.put("list","");
                obj.put("projectList","");
            }
            response.setContentType("text/html;charset=UTF-8");
            response.getWriter().println(obj);
        }catch (Exception e){
            e.printStackTrace();
        }
    }



    @RequestMapping("/getThing")
    public void getThing(HttpServletRequest request,HttpServletResponse response) throws IOException{
        String id = request.getParameter("id");
        List<Map<String,Object>> list = new ArrayList<>();
        List<Map<String,Object>> list1 = new ArrayList<>();
        Map<String,Object> map = new HashMap<>();
        map.put("id",id);
        if(id.contains("ex")){
            list = extraService.getThing(map);
            Map<String,Object> map1 = new HashMap<>();
            map1.put("departmentName",list.get(0).get("departmentName"));
            map1.put("time",list.get(0).get("extra_time"));
            map1.put("person",list.get(0).get("extra_person"));
            map1.put("description",list.get(0).get("extra_name"));
            list1.add(map1);
        }else{
            list = brandService.getThing(map);
            Map<String,Object> map1 = new HashMap<>();
            map1.put("departmentName",list.get(0).get("departmentName"));
            String start = String.valueOf(list.get(0).get("event_startTime"));
            String end = String.valueOf(list.get(0).get("event_endTime"));
            map1.put("time",start+" - "+end);
            map1.put("person",list.get(0).get("event_groupLeader"));
            map1.put("description",list.get(0).get("event_description"));
            list1.add(map1);
        }
        JSONObject obj = new JSONObject();
        obj.put("list",list1);
        response.setContentType("text/html;charset=UTF-8");
        response.getWriter().println(obj);
    }
}
