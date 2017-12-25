package com.myBlog.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by Administrator on 2017/10/26.
 */
public class DateUtil {

    //日期转时间戳
    public static Long dateToLong(String strDate){
        if("".equals(strDate)){
            return 0L;
        }
        String res = "0";
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        try {
            Date date;
            date = simpleDateFormat.parse(strDate);
            long ts = date.getTime();
            res = String.valueOf(ts);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return new Long(res);
    }
    //日期转时间戳
    public static Long smallDateToLong(String strDate){
        if("".equals(strDate)){
            return 0L;
        }
        String res = "0";
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        try {
            Date date;
            date = simpleDateFormat.parse(strDate);
            long ts = date.getTime();
            res = String.valueOf(ts);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return new Long(res);
    }

    // 时间戳转成日期
    public static String longToDate(Long l){
        if(l == 0)
            return "";
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        long lt = new Long(l.toString());
        Date date = new Date(lt);
        String res = simpleDateFormat.format(date);
        return res;
    }

    // 时间戳转成日期
    public static String longToSmallDate(Long l){
        if(l == 0)
            return "";
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        long lt = new Long(l.toString());
        Date date = new Date(lt);
        String res = simpleDateFormat.format(date);
        return res;
    }



    public static void main(String[] args){
        System.out.println(dateToLong("2017/11/02"));
        System.out.println(dateToLong(""));
        System.out.println(longToDate(1506243945000L));
        System.out.println(longToDate(0L));

    }

}
