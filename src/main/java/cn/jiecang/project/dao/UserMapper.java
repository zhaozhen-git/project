package cn.jiecang.project.dao;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
@Mapper
public interface UserMapper {

    List<Map<String,Object>> getUserList();

    List<Map<String,Object>> findUserName(Map<String,Object> map);

    Map<String,Object> getFileList(Map<String,Object> map);

    String getUserPassword(Map<String,Object> map);

    void changePassword(Map<String,Object> map);

    List<Map<String,Object>> getUser(Map<String,Object> map);

    void deleteUser(List<Map<String,Object>> list);

    List<Map<String,Object>> getDepartmentData();

    List<Map<String,Object>> getDepartmentUser(Map<String,Object> map);

    void insertUser(Map<String,Object> map);

    int boolUser(Map<String,Object> map);

    List<Map<String,Object>> getProjectUser(Map<String,Object> map);
}
