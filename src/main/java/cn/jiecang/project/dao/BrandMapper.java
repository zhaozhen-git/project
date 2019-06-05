package cn.jiecang.project.dao;


import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
@Mapper
public interface BrandMapper {

    List<Map<String,Object>> getBrandList(Map<String,Object> map);

    void insertBrand(Map<String,Object> map);

    void deleteBrand(List<Map<String,Object>> list);

    void successBrand(Map<String,Object> map);

    void updateBrand(Map<String,Object> map);

    List<Map<String,Object>> getBrand(Map<String,Object> map);

    String getDate(Map<String,Object> map);

    void changeTime(Map<String,Object> map);

    void changeProgress(Map<String,Object> map);

    int getCount();

    String getNum();

    List<Map<String,Object>> getThing(Map<String,Object> map);

}
