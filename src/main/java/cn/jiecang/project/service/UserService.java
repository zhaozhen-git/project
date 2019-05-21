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
}
