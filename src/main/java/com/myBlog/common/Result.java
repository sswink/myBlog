package com.myBlog.common;

/**
 * Created by Administrator on 2017/10/26.
 */
public class Result<T> {

        // 请求码
        private int status;
        // 返回信息
        private String msg;
        // 返回数据
        private T data;

        private Result(int status){
            this.status = status;
        }

        private Result(int status, T data){
            this.status = status;
            this.data = data;
        }

        private Result(int status, String msg, T data){
            this.status = status;
            this.msg = msg;
            this.data = data;
        }

        private Result(int status, String msg){
            this.status = status;
            this.msg = msg;
        }

        // 判断状态
        public boolean isSuccess(){
            return this.status == ResultCode.SUCCESS.getCode();
        }

        public int getStatus(){
            return status;
        }
        public T getData(){
            return data;
        }
        public String getMsg(){
            return msg;
        }

        // 创建成功
        // 返回请求码 0
        public static <T> Result<T> createBySuccess(){
            return new Result<T>(ResultCode.SUCCESS.getCode());
        }

        // 创建成功
        // 返回请求码 0  和 传入的参数 msg
        public static <T> Result<T> createBySuccessMessage(String msg){
            return new Result<T>(ResultCode.SUCCESS.getCode(),msg);
        }
        // 创建成功
        // 返回请求码 0  和 传入的参数 data
        public static <T> Result<T> createBySuccess(T data){
            return new Result<T>(ResultCode.SUCCESS.getCode(),data);
        }

        // 创建成功
        // 返回请求码 0  和 传入的参数 msg  和 传入的参数 data
        public static <T> Result<T> createBySuccess(String msg, T data){
            return new Result<T>(ResultCode.SUCCESS.getCode(),msg,data);
        }


        // 创建失败
        // 返回请求码 1  和 错误描述 desc
        public static <T> Result<T> createByError(){
            return new Result<T>(ResultCode.ERROR.getCode(),ResultCode.ERROR.getDesc());
        }

        // 创建失败
        // 返回请求码 1  和 错误信息 errorMessage
        public static <T> Result<T> createByErrorMessage(String errorMessage){
            return new Result<T>(ResultCode.ERROR.getCode(),errorMessage);
        }

        // 创建失败（两个参数都传进来）
        // errorCode:其它 错误码
        // 返回错误码 errorCode  和 错误信息 errorMessage
        public static <T> Result<T> createByErrorCodeMessage(int errorCode, String errorMessage){
            return new Result<T>(errorCode,errorMessage);
        }








    }
