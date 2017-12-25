package com.myBlog.dao;

import com.myBlog.entity.Favourite;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface FavouriteMapper {
    //新增爱好
    int insertFavourite(@Param("favourite_title") String favourite_title,
                        @Param("favourite_desc") String favourite_desc,
                        @Param("favourite_content") String favourite_content,
                        @Param("favourite_pic") String favourite_pic,
                        @Param("user_id") long user_id,
                        @Param("favourite_url") String favourite_url);

    //查找全部
    List<Favourite> favouritelist();

    //通过favouriteId查找
    Favourite getFavouriteByFavouriteId(@Param("favourite_id") long favourite_id);


    //通过用户id查找
    List<Favourite> favouriteListById(@Param("user_id") long user_id);

    //删除favourite
    int deleteFavourite(@Param("favourite_id") long favourite_id);

    //修改favourite
    int updateFavourite(@Param("favourite_id") long favourite_id,
                        @Param("favourite_title") String favourite_title,
                        @Param("favourite_desc") String favourite_desc,
                        @Param("favourite_content") String favourite_content,
                        @Param("favourite_pic") String favourite_pic,
                        @Param("favourite_url") String favourite_url
                        );
}
