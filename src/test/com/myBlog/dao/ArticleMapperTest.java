package com.myBlog.dao;

import com.myBlog.Service.ArticleService;
import com.myBlog.Service.FavouriteService;
import com.myBlog.common.Result;
import com.myBlog.dto.MyArticle;
import com.myBlog.entity.Article;
import com.myBlog.entity.Favourite;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import sun.rmi.runtime.Log;

import java.util.Date;
import java.util.List;
import java.util.logging.Logger;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({"classpath:spring/spring-dao.xml","classpath:spring/spring-service.xml"})
public class ArticleMapperTest {
//    Logger logger=Logger.getLogger(this.getClass());

    @Autowired
    private ArticleMapper articleMapper;
    @Autowired
    private ArticleService articleService;
    @Autowired
    private FavouriteService favouriteService;
    @Autowired
    private UserMapper userMapper;
    //文章列表
    @Test
    public void articleListByType() throws Exception {
        Result<List<MyArticle>> list= articleService.articleListByType("javaEE");
        System.out.println(list);
    }

    //文章列表
    @Test
    public void articleListByUserIdAndType() throws Exception {
        String passWord=userMapper.getPassWord(1);
        System.out.println(passWord);
    }


    //读文章
    @Test
    public void article() throws Exception {
        Article article=articleMapper.article(1);
        System.out.println(article);

    }
    //撰写文章
    @Test
    public void insertArticle() throws Exception {
        Date s=new Date();
        String content="<h1>你好</h1><div></div><h1>你好</h1><div></div><h1>你好</h1><div></div><h1>你好</h1><div></div><h1>你好</h1><div></div><h1>你好</h1>" +
                "<div></div><h1>你好</h1><div></div>" +
                "<h1>你好</h1><div></div><h1>你好</h1><div></div><h1>你好</h1><div></div><h1>你好</h1><div></div>"
                + "<h1>你好</h1><div></div><h1>你好</h1><div></div><h1>你好</h1><div></div><h1>你好</h1><div></div>"
                + "<h1>你好</h1><div></div><h1>你好</h1><div></div><h1>你好</h1><div></div><h1>你好</h1><div></div>"
                + "<h1>你好</h1><div></div><h1>你好</h1><div></div><h1>你好</h1><div></div><h1>你好</h1><div></div>"
                + "<h1>你好</h1><div></div><h1>你好</h1><div></div><h1>你好</h1><div></div><h1>你好</h1><div></div>"
                + "<h1>你好</h1><div></div><h1>你好</h1><div></div><h1>你好</h1><div></div><h1>你好</h1><div></div>"
                + "<h1>你好</h1><div></div><h1>你好</h1><div></div><h1>你好</h1><div></div><h1>你好</h1><div></div>";
        int res=articleMapper.insertArticle("java底层",content,1,"javaEE",s.getTime());
        System.out.println(res);
    }

    //新增爱好
    @Test
    public void insertFavourite() throws Exception {
        Result<Boolean> s=favouriteService.insertFavourite("3","dasdsada","dasdasdsdas","dasdasdsa",31221412,"httptest");
        System.out.println(s);
    }

    @Test
    public void updateFavourite() throws Exception {
        Result<Boolean> s=favouriteService.updateFavourite(4,"tset","test","test","test","testHttp");
        System.out.println(s);
    }

    @Test
    public void favouriteList() throws Exception {
        Result<List<Favourite>> favouriteList=favouriteService.favouriteList();
        System.out.println(favouriteList);
    }

    @Test
    public void favouriteListById() throws Exception {
        Result<List<Favourite>> favouriteList=favouriteService.favouriteListById(1);
        System.out.println(favouriteList);
    }

    @Test
    public void updateArticle() throws Exception {
        articleService.updateArticle(2,"修改","修改内容");
        System.out.println();
    }
    @Test
    public void deleteArticle() throws Exception {
        articleService.deleteArticle(11);
        System.out.println();
    }
    @Test
    public void daleteFavourite() throws Exception {
        Result<Boolean> s=favouriteService.deleteFavourite(1);
        System.out.println(s);
    }
}