package cn.jiecang.project.dao;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
@Mapper
public interface DepartmentMapper {

    List<Map<String,Object>> getDepartment();

    int boolId(Map<String,Object> map);

    void insertDepartment(Map<String,Object> map);

    void deleteDepartment(List<Map<String,Object>> list);

    void updateDepartment(Map<String,Object> map);
}
