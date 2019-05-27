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
}
