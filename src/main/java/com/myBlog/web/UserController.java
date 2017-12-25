package com.myBlog.web;


import com.myBlog.Service.UserService;
import com.myBlog.common.Define;
import com.myBlog.common.Result;
import com.myBlog.util.Ase;
import com.myBlog.util.CookieUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    //普通登录
    @PostMapping("/getPerssion/{user_id}/{password}")
    public Result<Boolean> getPerssion(@PathVariable("user_id") long user_id,
                                       @PathVariable("password") String password,
                                       HttpServletRequest request,
                                       HttpServletResponse response){
        return userService.getPermission(user_id,password,request,response);
    }

    //cookie登录
    @PostMapping("/cookieLogin")
    public Result<Boolean> cookieLogin(HttpServletRequest request,
                              HttpServletResponse response){
        return userService.cookieLogin(request,response);

    }
}
