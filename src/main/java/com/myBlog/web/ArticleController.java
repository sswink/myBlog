package com.myBlog.web;

import com.myBlog.Service.ArticleService;
import com.myBlog.common.Result;
import com.myBlog.dto.MyArticle;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/article")
@Api(value = "articleController",description = "文章")
public class ArticleController {

    @Autowired
    private ArticleService articleService;

    /*//撰写文章 todo 加密版
    @PostMapping("/insertArticle/{article_name}/{article_content}/{article_type}/{article_time}/{rds}")
    public Result<Integer> insertArticle(@PathVariable("article_name") String article_name,
                                         @PathVariable("article_content") String article_content,
                                         @PathVariable("article_type") String article_type,
                                         @PathVariable("article_time") long article_time,
                                         @PathVariable("rds") String rds
                                         ){

        return articleService.insertArticle(article_name,article_content,article_type,article_time,rds);
    }*/
    //撰写文章
    @ApiOperation(value = "撰写文章",httpMethod = "POST",response =Integer.class)
    @PostMapping("/insertArticle/{article_type}/{user_id}")
    public Result<Integer> insertArticle(HttpServletRequest request,
//            @ApiParam(name = "article_name",value = "文章名",required = true)@PathVariable("article_name") String article_name,
//            @ApiParam(name = "article_content",value = "内容",required = true)@PathVariable("article_content") String article_content,
            @ApiParam(name = "article_type",value = "文章类型",required = true)@PathVariable("article_type") String article_type,
            @ApiParam(name = "user_id",value = "用户id",required = true)@PathVariable("user_id") String user_id
    ){
        String article_name=request.getParameter("article_name");
        String article_content=request.getParameter("article_content");
        return articleService.insertArticle(article_name,article_content,article_type,user_id);
    }
    //文章列表
    @GetMapping("/articleListByType/{article_type}")
    public Result<List<MyArticle>> articleListByType(@PathVariable("article_type") String article_type){
        return articleService.articleListByType(article_type);

    }

    //阅读文章
    @GetMapping("/articleById/{article_id}")
    public Result<MyArticle> articleListByType(@PathVariable("article_id") long article_id){
        return articleService.getArticle(article_id);

    }

    //修改文章
    @PostMapping("/updateArticle/{article_id}")
    public Result<Boolean> updateArticle(@PathVariable("article_id") long article_id,
                                         HttpServletRequest request){
        String article_name=request.getParameter("article_name");
        String article_content=request.getParameter("article_content");
        return articleService.updateArticle(article_id,article_name,article_content);
    }

    //删除文章
    @PostMapping("/deleteArticle/{article_id}")
    public Result<Boolean> deleteArticle(@PathVariable("article_id") long article_id){
        return articleService.deleteArticle(article_id);
    }
}
