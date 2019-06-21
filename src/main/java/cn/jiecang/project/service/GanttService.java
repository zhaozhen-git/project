package cn.jiecang.project.service;

import cn.jiecang.project.dao.GanttMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class GanttService {

    @Autowired
    GanttMapper ganttMapper;

    public List<Map<String,Object>> getGanttData(Map<String,Object> map){
        return ganttMapper.getGanttData(map);
    }
}
