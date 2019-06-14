package cn.jiecang.project.service;

import cn.jiecang.project.dao.DepartmentMapper;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class DepartmentService {

    @Autowired
    DepartmentMapper departmentMapper;



    public List<Map<String,Object>> getDepartment(){
        return departmentMapper.getDepartment();
    }


    public int boolId(Map<String,Object> map){
        return departmentMapper.boolId(map);
    }


    public void insertDepartment(Map<String,Object> map){
        departmentMapper.insertDepartment(map);
    }

    public void deleteDepartment(List<Map<String,Object>> list){
        departmentMapper.deleteDepartment(list);
    }

    public void updateDepartment(Map<String,Object> map){
        departmentMapper.updateDepartment(map);
    }
}
