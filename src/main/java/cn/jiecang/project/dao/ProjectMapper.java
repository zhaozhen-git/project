package cn.jiecang.project.dao;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
@Mapper
public interface ProjectMapper {

    void insertProject(Map<String,Object> map);

    List<Map<String,Object>> getProjectList(Map<String,Object> map);

    List<Map<String,Object>> getFinish();

    List<Map<String,Object>> getProjectOne(Map<String,Object> map);

    int getNum();

    int getCount();

    void insertMsg(Map<String,Object> map);

    List<Map<String,Object>> getAllProject(Map<String,Object> map);

    void deleteProject(List<Map<String,Object>> list);

    void updateProject(Map<String,Object> map);

    int boolEvent(Map<String,Object> map);

    void successProject(Map<String,Object> map);

    Map<String,Object> getAccount(Map<String,Object> map);

    List<Map<String,Object>> getExcelList(Map<String,Object> map);

    List<Map<String,Object>> getExtraList(Map<String,Object> map);

    List<Map<String,Object>> getProjectMsg(Map<String,Object> map);

    int getEventCount(Map<String,Object> map);

    int getExtraCount(Map<String,Object> map);

}
