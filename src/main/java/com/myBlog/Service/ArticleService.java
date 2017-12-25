package com.myBlog.Service;

import com.myBlog.common.Result;
import com.myBlog.dto.MyArticle;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ArticleService {


   /* //文章插入 todo 加密版
    Result<Integer> insertArticle(String article_name,String article_content,String article_type,long article_time,String rds);
*/
   //文章插入
   Result<Integer> insertArticle(String article_name,String article_content,String article_type,String user_id);


    //根据类型读出文章列表
    Result<List<MyArticle>> articleListByType(String article_type);

    //阅读文章
    Result<MyArticle> getArticle(long article_id);

    //修改文章
    Result<Boolean> updateArticle(long article_id,
                      String article_name,
                      String article_content
                      );

    //删除文章
    Result<Boolean> deleteArticle(long article_id);
}
