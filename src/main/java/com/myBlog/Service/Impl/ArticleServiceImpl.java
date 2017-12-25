package com.myBlog.Service.Impl;


import com.myBlog.Service.ArticleService;
import com.myBlog.common.Result;
import com.myBlog.common.ResultCode;
import com.myBlog.dao.ArticleMapper;
import com.myBlog.dao.UserMapper;
import com.myBlog.dto.MyArticle;
import com.myBlog.entity.Article;
import com.myBlog.util.DateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class ArticleServiceImpl implements ArticleService {

    @Autowired
    private UserMapper userMapper;
    @Autowired
    private ArticleMapper articleMapper;


    /*//撰写文章 todo 加密版
    public Result<Integer> insertArticle(String article_name, String article_content, String article_type, long article_time, String rds) {

        try {
            String encodeRules = Define.encodeRules;
            String openIdS = Ase.AESDncode(encodeRules, rds);
            long openId = Integer.parseInt(openIdS);
            long userId = userMapper.getUserId(openId);
            articleMapper.insertArticle(article_name, article_content, userId, article_type, article_time);
            return Result.createBySuccessMessage("插入成功");
        }catch (Exception e){
             return Result.createByErrorMessage("服务器出错");
        }

    }*/

    //文章插入
    public Result<Integer> insertArticle(String article_name, String article_content, String article_type,String user_id) {

        try {
            long dayNow=new Date().getTime();
            articleMapper.insertArticle(article_name, article_content, 1, article_type, dayNow);
            return Result.createBySuccessMessage("插入成功");
        } catch (Exception e) {
            return Result.createByErrorMessage("服务器出错");
        }
    }

    //文章列表
    public Result<List<MyArticle>> articleListByType(String article_type) {
        try {
            List<Article> articleLists=articleMapper.articleListByType(article_type);

            List<MyArticle> myArticleList=new ArrayList<MyArticle>();
            for(int i=0;i<articleLists.size();i++){
                Article a=articleLists.get(i);
                long time=a.getArticleTime();
                MyArticle my=new MyArticle();
                my.setArticleTime(DateUtil.longToDate(time));
                my.setArticleName(a.getArticleName());
                my.setArticleId(a.getArticleId());
                myArticleList.add(my);
            }
            return Result.createBySuccess("成功",myArticleList);
        }catch (Exception e){
            return Result.createByErrorMessage("服务器出错");
        }
    }

    //读文章
    public Result<MyArticle> getArticle(long article_id) {
        try {
            Article article=articleMapper.article(article_id);
            MyArticle myArticle=new MyArticle();
            long time=article.getArticleTime();
            myArticle.setArticleTime(DateUtil.longToSmallDate(time));
            myArticle.setArticleName(article.getArticleName());
            myArticle.setArticleContent(article.getArticleContent());
            myArticle.setArticleType(article.getArticleType());
            return Result.createBySuccess("成功",myArticle);
        }catch (Exception e){
            return Result.createByErrorCodeMessage(ResultCode.ERROR.getCode(),ResultCode.ERROR.getDesc());
        }
    }

    public Result<Boolean> updateArticle(long article_id, String article_name, String article_content) {
        long time=new Date().getTime();
        try{
            articleMapper.updateArticle(article_id,article_name,article_content,time);
        }catch (Exception e){
            return Result.createByErrorMessage("失败");
        }
        return Result.createBySuccessMessage("成功");
    }

    public Result<Boolean> deleteArticle(long article_id) {
        try{
            articleMapper.deleteArticle(article_id);
        }catch (Exception e){
            return Result.createByErrorMessage("失败");
        }
        return Result.createBySuccessMessage("成功");
    }
}
