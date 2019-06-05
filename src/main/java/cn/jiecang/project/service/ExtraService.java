package cn.jiecang.project.service;

import cn.jiecang.project.dao.ExtraMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class ExtraService {

    @Autowired
    ExtraMapper extraMapper;


    public List<Map<String,Object>> getExtra(Map<String,Object> map){
        return extraMapper.getExtra(map);
    }


    public void insertExtra(Map<String,Object> map){
        extraMapper.insertExtra(map);
    }

    public int getCount(){
        return extraMapper.getCount();
    }

    public String getNum(){
        return extraMapper.getNum();
    }

    public void deleteExtra(List<Map<String,Object>> list){
        extraMapper.deleteExtra(list);
    }


    public void updateExtra(Map<String,Object> map){
        extraMapper.updateExtra(map);
    }


    public void successExtra(Map<String,Object> map){
        extraMapper.successExtra(map);
    }

    public void changeExtraTime(Map<String,Object> map){
        extraMapper.changeExtraTime(map);
    }

    public List<Map<String,Object>> getExtraHtml(Map<String,Object> map){
        return extraMapper.getExtraHtml(map);
    }

    public List<Map<String,Object>> getThing(Map<String,Object> map){
        return extraMapper.getThing(map);
    }

}
