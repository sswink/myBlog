package com.myBlog.web;

import com.myBlog.common.Define;
import com.myBlog.util.Ase;
import com.myBlog.util.CookieUtil;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;

@RestController
@RequestMapping("/util")
public class UtilController {

    @RequestMapping(value="/uploadPic",method = RequestMethod.POST)
    public String upload(MultipartFile file, HttpServletRequest request) throws IOException{
        String path = Define.path;
//        System.out.println(path);
        String fileName = file.getOriginalFilename();
        File dir = new File(path,fileName);
        //判断是否存在该文件
        if(!dir.exists()){
            dir.mkdirs();
        }
        //MultipartFile自带的解析方法
        file.transferTo(dir);
        String paths="/myimages"+'/'+fileName;
        System.out.println(paths);
        return paths;
    }


}