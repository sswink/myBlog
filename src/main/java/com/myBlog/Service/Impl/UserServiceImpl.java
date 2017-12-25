package com.myBlog.Service.Impl;

import com.myBlog.Service.UserService;
import com.myBlog.common.Define;
import com.myBlog.common.Result;
import com.myBlog.dao.UserMapper;
import com.myBlog.util.Ase;
import com.myBlog.util.CookieUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.net.URLEncoder;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserMapper userMapper;



    public Result<Long> getUserId(long openId) {
        try {
            long Id=userMapper.getUserId(openId);
            return Result.createBySuccess("成功",Id);
        }catch (Exception e){
            return Result.createByErrorMessage("服务器出错");

        }
    }

    public Result<Boolean> getPermission(long user_id, String InpassWord, HttpServletRequest request, HttpServletResponse response) {
        try {
            String passWord=userMapper.getPassWord(1);
            if(passWord.equals(InpassWord.trim())) {
                String enRds=Ase.AESEncode(Define.encodeRules,passWord);
                Cookie cookie=new Cookie("rds", enRds);
                cookie.setMaxAge(3600*2);
                cookie.setPath("/");
                response.addCookie(cookie);
                return Result.createBySuccess("成功", true);
            }else {
                return Result.createBySuccess("密码错误", true);
            }
        }catch (Exception e){
            System.out.println(e);
            return Result.createByErrorMessage("服务器出错");
        }
    }

    public Result<Boolean> cookieLogin(HttpServletRequest request, HttpServletResponse response) {
        try {
            Cookie c = CookieUtil.getCookieByName(request, "rds");
            String rds = c.getValue();
            String p = Ase.AESDncode(Define.encodeRules, rds);
            System.out.println(p);
            String passWord = userMapper.getPassWord(1);
            if (passWord.equals(p)) {
                return Result.createBySuccessMessage("成功");
            }
        }catch (Exception e){
            System.out.println(e);
        }
        return Result.createByErrorMessage("cookie错误");
    }
}
