package com.myBlog.dao;

import com.myBlog.entity.Article;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ArticleMapper {
    //根据类型读出文章列表
    List<Article> articleListByType(@Param("article_type") String article_type);
    //根据用户Id和类型查询文章 todo
    List<Article> articleListByUserIdAndType(@Param("user_id") long user_id,@Param("article_type") String article_type);
    //根据文章Id获取文章
    Article article(@Param("article_id") long article_id);
    //文章插入
    int insertArticle(@Param("article_name") String article_name,
                      @Param("article_content") String article_content,
                      @Param("user_id") long user_id,
                      @Param("article_type") String article_type,
                      @Param("article_time") long article_time);

    //修改文章
    int updateArticle(@Param("article_id") long article_id,
                      @Param("article_name") String article_name,
                      @Param("article_content") String article_content,
                      @Param("article_time") long article_time);

    //删除文章
    int deleteArticle(@Param("article_id") long article_id);
}
