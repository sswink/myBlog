$(document).ready(function(){
    $('#titles').on('DOMNodeInserted',function (e) {
        e.preventDefault();
        titlesValue=$(this).text();
    })
    $('#articlesRead').on('DOMNodeInserted',function (e) {
        e.preventDefault();
        contentValue=$(this).html();
    })
    var articleId=request("id");
    getArticle(articleId);
    cookie();
})
var article_id;
var Urls='http://www.zziheng.xin/myBlog';
//按钮变量
var HbtnFlag = true;
var Hbtn;
var CbtnFlag = true;
var Cbtn;
//编辑变量
var upFlag=false;
//登录变量
var loginFlag=false;
//文章变量
var titlesValue;
var contentValue;

var submitFlag;
//cookie登录
function cookie() {
    $.ajax({
        type: 'POST',
        datatype:'JSON',
        data:{},
        url: Urls+'/user/cookieLogin',
        success: function (data) {
            console.log(data);
            if(data.msg=="cookie错误"){

            }else {
                $('#updates').removeClass("none");
                $('#deletes').removeClass("none");
                loginFlag=true;
            }
        },
        error : function(){
            console.log("服务器出错");
        }
    });
}
//登录
function login() {
    if(loginFlag==false){
        $('#goLogin').click();
    }else {
        return null;
    }
}
//进行验证
$('#Gs').on('click',function(){
    confirm();
})
function confirm() {
    var uId=312312312;
    var passW=$('#pass').val();
    if($.trim(passW)=="") {
        $('.modal-header').append('<div class="alert alert-danger alert-dismissible" role="alert">\n' +
            '  <button type="button" class="close cccs" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n' +
            '  <strong>请输入密码！</strong>' + '</div>'
        )
        shakeup();
        setTimeout(function (e) {
            $('.cccs').click();
        }, 2000);
    }else {
        $.ajax({
            type: 'post',
            url: Urls + '/user/getPerssion/' + uId + '/' + passW,  //todo 改
            data: {},
            dataType: 'json',
            success: function (data) {
                var s = data.msg;
                if (s == "密码错误") {
                    $('.modal-header').append('<div class="alert alert-danger alert-dismissible" id="loading" role="alert">\n' +
                        '  <button type="hidden" class="close ccs"  data-dismiss="alert"  aria-label="Close"><span aria-hidden="true">&times;</span></button>\n' +
                        '  <strong id="loadText">密码错误！</strong>' +'</div>');
                    shakeup();
                    setTimeout(function (e) {
                        // e.preventDefault();
                        $('.ccs').click();
                    }, 2000);
                } else {
                    $('#closeModel').click();
                    cookie();
                }
            },
            error: function () {

            }
        });
    }
}
function shakeup() {
    $('#loginM').addClass("shake");
    setTimeout(function (e) {
        $('#loginM').removeClass("shake");
    },1000)
}
//判断编辑
$('#updates').on('click',function (e) {
    var uti=$('#util');
    var utilR=$('#utilRight');
    var artR=$('#articlesRead');
    var tit=$('#titles');
    var upSpan = $('#updates>span');
    var up = $('#updates');
    if(upFlag==false) {
        uti.removeClass("none");
        utilR.removeClass("none");
        artR.attr("contenteditable", "true");
        tit.attr("contenteditable", "true");
        up.removeClass("btn-warning");
        up.addClass("btn-success");
        upSpan.text('   '+'保存'+'  ');
        upFlag=true;
    }else {
        uti.addClass("none");
        utilR.addClass("none");
        artR.attr("contenteditable", "false");
        tit.attr("contenteditable", "false");
        up.removeClass("btn-success");
        up.addClass("btn-warning");
        upSpan.text('   '+'修改'+'  ');
        upFlag=false;
        $('#sumBitModal').click();
        submitFlag="修改";
    }
})

// 百度
$('#search').click(function (e) {
    console.log("dsa");
    $('#baiduForm').submit();
})

$('#myBtns').click(function(){
	window.open("ziheng.html");
});
function request(paras){
    var url = location.href;
    var paraString = url.substring(url.indexOf("?")+1,url.length).split("&");
    var paraObj = {}
    for (i=0; j=paraString[i]; i++){
        paraObj[j.substring(0,j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=")+1,j.length);
    }
    var returnValue = paraObj[paras.toLowerCase()];
    if(typeof(returnValue)=="undefined"){
        return "";
    }else{
        return returnValue;
    }
}
//获取文章
function getArticle(id){
    article_id=id;
	 $.ajax({
        type: 'GET',
        datatype:'JSON',
        data:{},
        url: Urls+'/article/articleById/'+id,
        success: function (data) {
            console.log(data);
            var res=data.data;
            console.log(data.data.articleName);
            $('#titles').text(res.articleName);
            $('#articlesRead').html(res.articleContent);
            $('#time').text(res.articleTime);
        },
        error : function(){

        }
    });
}




var picFlag=false;
var upFlag=false;
//选择图片
function filesa() {
    pis=$('#pics')
    pis.addClass('thumbnail');
    pis.append('<img src="" id="show">');
    var r = new FileReader();
    f = document.getElementById('myFile').files[0];
    r.readAsDataURL(f);
    r.onload = function(e) {
        document.getElementById('show').src = this.result;
//			console.log(this.result);
    };
    if(picFlag==true){
        $('#pics>img:eq(1)').remove();
    }
    picFlag=true;
    upFlag=true;
}
//删除click
$('#deletes').on('click',function () {
    submitFlag="删除";
    $('#sumBitModal').click();
})
$('#sumBtns').on('click',function(){
    if(submitFlag=="删除"){
        deleteUrl();
    }else {
        updateUrL();
    }
})
function updateUrL() {
    var t=$('#titles');
    var arti=$('#articlesRead');
    t.append("<span></span>");
    arti.append("<span></span>");
    $.ajax({
        type: 'POST',
        datatype:'JSON',
        data:{
            "article_name":titlesValue,
            "article_content":contentValue
        },
        url: Urls+'/article/updateArticle/'+article_id,
        success: function (data) {
            $('.modal-header').append('<div class="alert alert-success alert-dismissible" role="alert">\n' +
                '  <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n' +
                '  <strong>发表成功!</strong>' + '</div>'
            )
            getArticle(article_id);
            setTimeout(function () {
                $(".close").click();
            }, 1500)
        },
        error : function(){
            $('.modal-header').append('<div class="alert alert-danger alert-dismissible" role="alert">\n' +
                '  <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n' +
                '  <strong>服务器出错!</strong>' + '</div>'
            )
        }
    });
}

//删除请求
function  deleteUrl() {
    $.ajax({
        type: 'POST',
        datatype:'JSON',
        data:{
        },
        url: Urls+'/article/deleteArticle/'+article_id,
        success: function (data) {
            $('.modal-header').append('<div class="alert alert-success alert-dismissible" role="alert">\n' +
                '  <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n' +
                '  <strong>发表成功!</strong>' + '</div>'
            )
            setTimeout(function () {
                $(location).prop('href', Urls);
            }, 1500)
        },
        error : function(){

        }
    });

}
//提交服务器图片并返回图片路径
function upLoadPics(){
    console.log("上传函数");
    if(upFlag==true) {
        $('.modal-header').append('<div class="alert alert-warning alert-dismissible" id="loading" role="alert">\n' +
            '  <button type="hidden" class="close"  data-dismiss="alert"  aria-label="Close"><span aria-hidden="true">&times;</span></button>\n' +
            '  <strong id="loadText"><span class="fa fa-spinner" aria-hidden="true">上传中...</span></strong>' +'</div>'
        )
        var formParam = new FormData($('#uploadForm')[0]);
        $.ajax({
            type: 'post',
            url: Urls+'/util/uploadPic',  //todo 改
            data: formParam,
            contentType: false,
            processData: false,
            dataType: 'text',
            success: function (data) {
                console.log(data);
                var text=$('#loadText');
                var load=$('#loading');
                text.empty();
                text.text("上传成功！");
                load.removeClass("alert-warning");
                load.addClass("alert-success");
                insertImg(data);
                setTimeout(function () {
                    $('.close').click();
                },1000);

            },
            error : function(){

            }
        });
    }else {
        $('.modal-header').append('<div class="alert alert-danger alert-dismissible" role="alert">\n' +
            '  <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n' +
            '  <strong>未选择图片！</strong>' +'</div>'
        )
        setTimeout(function(){
            $('.close').click();
        },1500)
    }
}