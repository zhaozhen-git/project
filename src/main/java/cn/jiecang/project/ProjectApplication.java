package cn.jiecang.project;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.MultipartConfigFactory;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.servlet.MultipartConfigElement;

@Configuration
@SpringBootApplication
public class ProjectApplication extends SpringBootServletInitializer{

    public static void main(String[] args) {
        SpringApplication.run(ProjectApplication.class, args);
    }

//    @Override
//    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder){
//        return builder.sources(new Class[] { ProjectApplication.class });
//    }



    @Value("${spring.server.MaxFileSize}")
    private String MaxFileSize;
//    @Value("${spring.server.MaxRequestSize}")
//    private String MaxRequestSize;

    @Bean
    public MultipartConfigElement multipartConfigElement() {
        MultipartConfigFactory factory = new MultipartConfigFactory();
        //  单个数据大小
        factory.setMaxFileSize(MaxFileSize);
        // 总上传数据大小
//        factory.setMaxRequestSize(MaxRequestSize);
        return factory.createMultipartConfig();
    }

}



