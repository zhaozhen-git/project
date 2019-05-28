package cn.jiecang.project.controller;
import net.sf.json.JSONObject;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.util.Iterator;
import java.util.UUID;

@Controller
public class UploadController {


    private static Logger logger = Logger.getLogger(UploadController.class);

    @ResponseBody
    @RequestMapping("/upload")
    public JSONObject uploadFile(HttpServletRequest request){
        CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver(request.getSession().getServletContext());
        //检查form中是否有enctype="multipart/form-data"
        JSONObject res = new JSONObject();
        JSONObject resUrl = new JSONObject();
        if(multipartResolver.isMultipart(request)){
            //将request变成多request
            MultipartHttpServletRequest multiRequest = (MultipartHttpServletRequest)request;
            //获取multiRequest中所有的文件名
            Iterator iter = multiRequest.getFileNames();
            while(iter.hasNext()){
                //一次遍历所有的文件
                MultipartFile file = multiRequest.getFile(iter.next().toString());

                if(null== file) {
                    res.put("msg", "上传失败！");
                }else if(file!=null){
                    String filename = file.getOriginalFilename();//获取文件的名字
//                    String suffixFile = filename.substring(filename.lastIndexOf(".")+1);
                    String filePath = request.getSession().getServletContext().getRealPath("/uploadFile");
                    String newFileName = UUID.randomUUID()+filename;
                    File file1 = new File(filePath);
                    if (!file1.exists()){
                        file1.mkdirs();
                    }
                    logger.error("初："+filePath);
                    String newFilePath = filePath + "\\"+ newFileName; //新文件的路径
                    logger.error("文件路径"+newFilePath);
                    try{
                        file.transferTo(new File(newFilePath));
                        resUrl.put("src", newFileName);
                        res.put("code", 0);
                        res.put("msg", "");
                        res.put("data", resUrl);
                    }catch (Exception e){
                        e.printStackTrace();
                    }
                }
            }
        }
        return res;
    }
}
