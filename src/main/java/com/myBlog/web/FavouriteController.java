package com.myBlog.web;

import com.myBlog.Service.FavouriteService;
import com.myBlog.common.Result;
import com.myBlog.entity.Favourite;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/favourite")
public class FavouriteController {
    @Autowired
    private FavouriteService favouriteService;

    //新增爱好
    @PostMapping("/insertFavourite/{user_id}")
    public Result<Boolean> insertFavourite(HttpServletRequest request, @PathVariable("user_id") long user_id){
        String favourite_title=request.getParameter("favourite_title");
        String favourite_desc=request.getParameter("favourite_desc");
        String favourite_content=request.getParameter("favourite_content");
        String favourite_pic=request.getParameter("favourite_pic");
        String favourite_url=request.getParameter("favourite_url");
       return favouriteService.insertFavourite(favourite_title,favourite_desc,favourite_content,favourite_pic,user_id,favourite_url);
    }

    //查找全部
    @GetMapping("/favouriteList")
    public Result<List<Favourite>> favouriteList(){
        return favouriteService.favouriteList();
    }

    //通过favouriteId查找
    @GetMapping("/getFavouriteByFavouriteId/{favourite_id}")
    public Result<Favourite> getFavouriteByFavouriteId(@PathVariable("favourite_id") long favourite_id) {
        return favouriteService.getFavouriteByFavouriteId(favourite_id);
    }



    //通过用户id查找
    @GetMapping("/favouriteListById/{user_id}")
    public Result<List<Favourite>> favouriteListById(@PathVariable("user_id") long user_id){
        return favouriteService.favouriteListById(user_id);
    }

    //删除favourite
    @PostMapping("/deleteFavourite")
    public Result<Boolean> deleteFavourite(HttpServletRequest request) {
        String favourite_id=request.getParameter("favourite_id");
        return favouriteService.deleteFavourite(Integer.parseInt(favourite_id.trim()));
    }

    //修改favourite
    @PostMapping("/updateFavourite")
    public Result<Boolean> updateFavourite(HttpServletRequest request) {
        String favourite_id=request.getParameter("favourite_id");
        String favourite_title=request.getParameter("favourite_title");
        String favourite_desc=request.getParameter("favourite_desc");
        String favourite_content=request.getParameter("favourite_content");
        String favourite_pic=request.getParameter("favourite_pic");
        String favourite_url=request.getParameter("favourite_url");
        return favouriteService.updateFavourite(Integer.parseInt(favourite_id.trim()), favourite_title.trim(), favourite_desc.trim(), favourite_content.trim(), favourite_pic.trim(),favourite_url.trim());
    }
}
