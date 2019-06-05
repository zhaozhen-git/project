package cn.jiecang.project.service;

import cn.jiecang.project.dao.BrandMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class BrandService {

    @Autowired
    BrandMapper brandMapper;

    public List<Map<String,Object>> getBrandList(Map<String,Object> map){
        return brandMapper.getBrandList(map);
    }

    public void insertBrand(Map<String,Object> map){
        brandMapper.insertBrand(map);
    }


    public void deleteBrand(List<Map<String,Object>> list){
        brandMapper.deleteBrand(list);
    }

    public void successBrand(Map<String,Object> map){
        brandMapper.successBrand(map);
    }

    public void updateBrand(Map<String,Object> map){
        brandMapper.updateBrand(map);
    }

    public List<Map<String,Object>> getBrand(Map<String,Object> map){
        return brandMapper.getBrand(map);
    }


    public String getDate(Map<String,Object> map){
        return brandMapper.getDate(map);
    }

    public void changeTime(Map<String,Object> map){
        brandMapper.changeTime(map);
    }

    public void changeProgress(Map<String,Object> map){
        brandMapper.changeProgress(map);
    }

    public int getCount(){
        return brandMapper.getCount();
    }

    public String getNum(){
        return brandMapper.getNum();
    }

    public List<Map<String,Object>> getThing(Map<String,Object> map){
        return brandMapper.getThing(map);
    }
}
