package com.myBlog.Service;

import com.myBlog.common.Result;
import org.apache.ibatis.annotations.Param;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public interface UserService {
    //通过openID获取userID
    Result<Long> getUserId(long openId);

    //验证密码
    Result<Boolean> getPermission(long user_id, String InpassWord, HttpServletRequest request, HttpServletResponse response);

    //cookie登录
    Result<Boolean> cookieLogin(HttpServletRequest request,HttpServletResponse response);
}
