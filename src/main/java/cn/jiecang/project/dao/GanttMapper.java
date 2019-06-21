package cn.jiecang.project.dao;


import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
@Mapper
public interface GanttMapper {

    List<Map<String,Object>> getGanttData(Map<String,Object> map);


}
