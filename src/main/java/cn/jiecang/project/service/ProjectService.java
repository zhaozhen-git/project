package cn.jiecang.project.service;

import cn.jiecang.project.dao.ProjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class ProjectService {

    @Autowired
    ProjectMapper projectMapper;


    public void insertProject(Map<String,Object> map){
        projectMapper.insertProject(map);
    }

    public List<Map<String,Object>> getProjectList(Map<String,Object> map){
        return projectMapper.getProjectList(map);
    }

    public List<Map<String,Object>> getFinish(){
        return projectMapper.getFinish();
    }

    public List<Map<String,Object>> getProjectOne(Map<String,Object> map){
        return projectMapper.getProjectOne(map);
    }

    public int getNum(){
        return projectMapper.getNum();
    }

    public int getCount(){
        return projectMapper.getCount();
    }

    public void insertMsg(Map<String,Object> map){
        projectMapper.insertMsg(map);
    }

    public List<Map<String,Object>> getAllProject(Map<String,Object> map){
        return projectMapper.getAllProject(map);
    }

    public void deleteProject(List<Map<String,Object>> list){
        projectMapper.deleteProject(list);
    }

    public void updateProject(Map<String,Object> map){
        projectMapper.updateProject(map);
    }

    public int boolEvent(Map<String,Object> map){
        return projectMapper.boolEvent(map);
    }

    public void successProject(Map<String,Object> map){
        projectMapper.successProject(map);
    }

    public Map<String,Object> getAccount(Map<String,Object> map){
        return projectMapper.getAccount(map);
    }

    public List<Map<String,Object>> getExcelList(Map<String,Object> map){
        return projectMapper.getExcelList(map);
    }

    public List<Map<String,Object>> getExtraList(Map<String,Object> map){
        return projectMapper.getExtraList(map);
    }


    public List<Map<String,Object>> getProjectMsg(Map<String,Object> map){
        return projectMapper.getProjectMsg(map);
    }

    public int getEventCount(Map<String,Object> map){
        return projectMapper.getEventCount(map);
    }

    public  int getExtraCount(Map<String,Object> map){
        return projectMapper.getExtraCount(map);
    }

}
