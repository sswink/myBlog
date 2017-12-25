package com.myBlog.Service.Impl;

import com.myBlog.Service.FavouriteService;
import com.myBlog.common.Result;
import com.myBlog.dao.FavouriteMapper;
import com.myBlog.entity.Favourite;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FavouriteSeviceImpl implements FavouriteService {
    @Autowired
    private FavouriteMapper favouriteMapper;

    //新增爱好
    public Result<Boolean> insertFavourite(String favourite_title, String favourite_desc, String favourite_content, String favourite_pic, long user_id,String favourite_url) {
        try{
             favouriteMapper.insertFavourite(favourite_title,favourite_desc,favourite_content,favourite_pic,1,favourite_url);
             return Result.createBySuccessMessage("成功");
        }catch (Exception e){
            System.out.println(e);
            return Result.createByErrorMessage("服务器出错");
        }
    }
    //查找全部
    public Result<List<Favourite>> favouriteList() {
        try{
            List<Favourite> favouriteList=favouriteMapper.favouritelist();
            return Result.createBySuccess("成功",favouriteList);
        }catch (Exception e){
            return Result.createByErrorMessage("服务器出错");
        }
    }
    //通过用户id查找
    public Result<List<Favourite>> favouriteListById(long user_id) {
        try{
            List<Favourite> favouriteList=favouriteMapper.favouriteListById(1);
            return Result.createBySuccess("成功",favouriteList);
        }catch (Exception e){
            return Result.createByErrorMessage("服务器出错");
        }
    }

    //通过favouriteId查找
    public Result<Favourite> getFavouriteByFavouriteId(long favourite_id) {
        try{
            Favourite getFavouriteByFavouriteId=favouriteMapper.getFavouriteByFavouriteId(favourite_id);
            return Result.createBySuccess("成功",getFavouriteByFavouriteId);
        }catch (Exception e){
            return Result.createByErrorMessage("服务器出错");
        }
    }

    //删除favourite
    public Result<Boolean> deleteFavourite(long favourite_id) {
        try{
           favouriteMapper.deleteFavourite(favourite_id);
            return Result.createByErrorMessage("成功");
        }catch (Exception e){
            return Result.createByErrorMessage("服务器出错");
        }
    }

    //修改favourite
    public Result<Boolean> updateFavourite(long favourite_id, String favourite_title, String favourite_desc, String favourite_content, String favourite_pic,String favourite_url) {
        try{
            favouriteMapper.updateFavourite(favourite_id,favourite_title,favourite_desc,favourite_content,favourite_pic,favourite_url);
            return Result.createByErrorMessage("成功");
        }catch (Exception e){
            return Result.createByErrorMessage("服务器出错");
        }
    }
}
