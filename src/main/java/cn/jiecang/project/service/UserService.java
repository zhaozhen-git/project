package cn.jiecang.project.service;

import cn.jiecang.project.dao.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class UserService {

    @Autowired
    UserMapper userMapper;

    public List<Map<String,Object>> getUserList(){
        return userMapper.getUserList();
    }

    public Map<String,Object> getFileList(Map<String,Object> map){
        return userMapper.getFileList(map);
    }

    public String getUserPassword(Map<String,Object> map){
        return userMapper.getUserPassword(map);
    }

    public void changePassword(Map<String,Object> map){
        userMapper.changePassword(map);
    }

    public List<Map<String,Object>> getUser(Map<String,Object> map){
        return userMapper.getUser(map);
    }

    public void deleteUser(List<Map<String,Object>> list){
        userMapper.deleteUser(list);
    }

    public List<Map<String,Object>> getDepartmentData(){
        return userMapper.getDepartmentData();
    }

    public List<Map<String,Object>> getDepartmentUser(Map<String,Object> map){
        return userMapper.getDepartmentUser(map);
    }

    public void insertUser(Map<String,Object> map){
        userMapper.insertUser(map);
    }

    public int boolUser(Map<String,Object> map){
        return userMapper.boolUser(map);
    }

    public List<Map<String,Object>> getProjectUser(Map<String,Object> map){
        return userMapper.getProjectUser(map);
    }
}
