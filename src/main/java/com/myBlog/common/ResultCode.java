package com.myBlog.common;

/**
 * Created by Administrator on 2017/10/26.
 */
public enum ResultCode {
    SUCCESS(0,"SUCCESS"),
    ERROR(1,"ERROR"),
    NEED_LOGIN(10,"未登录");

    private final int code;
    private final String desc;


    ResultCode(int code,String desc){
        this.code = code;
        this.desc = desc;
    }

    public int getCode(){
        return code;
    }
    public String getDesc(){
        return desc;
    }


}
