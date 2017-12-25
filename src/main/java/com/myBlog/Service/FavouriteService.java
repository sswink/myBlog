package com.myBlog.Service;


import com.myBlog.common.Result;
import com.myBlog.entity.Favourite;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface FavouriteService {

    //新增爱好
    Result<Boolean> insertFavourite(String favourite_title,
                                    String favourite_desc,
                                    String favourite_content,
                                    String favourite_pic,
                                    long user_id,
                                    String favourite_url);

    //查找全部
    Result<List<Favourite>> favouriteList();

    //通过favouriteId查找
    Result<Favourite> getFavouriteByFavouriteId(long favourite_id);


    //通过用户id查找
    Result<List<Favourite>> favouriteListById(long user_id);

    //删除favourite
    Result<Boolean> deleteFavourite(long favourite_id);

    //修改favourite
    Result<Boolean> updateFavourite(long favourite_id,
                                    String favourite_title,
                                    String favourite_desc,
                                    String favourite_content,
                                    String favourite_pic,
                                    String favourite_url);
}
