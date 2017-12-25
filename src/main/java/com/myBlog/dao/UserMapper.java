package com.myBlog.dao;

import org.apache.ibatis.annotations.Param;

public interface UserMapper {

    //通过openID获取userID
    long getUserId(@Param("openId") long openId);

    //获取密码
    String getPassWord(@Param("user_id") long user_id);


}
