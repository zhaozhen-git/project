package cn.jiecang.project.dao;

import com.sun.corba.se.spi.ior.ObjectKey;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
@Mapper
public interface ExtraMapper {


    List<Map<String,Object>> getExtra(Map<String,Object> map);

    void insertExtra(Map<String,Object> map);

    int getCount();

    String getNum();

    void deleteExtra(List<Map<String,Object>> list);

    void updateExtra(Map<String,Object> map);

    void successExtra(Map<String,Object> map);

    void changeExtraTime(Map<String,Object> map);

    List<Map<String,Object>> getExtraHtml(Map<String,Object> map);

    List<Map<String, Object>> getThing(Map<String,Object> map);
}
