$(document).ready(function () {
    list('JavaEE');
    select();
    getFavourite();
})

var Urls='http://www.zziheng.xin/myBlog';
// var Urls='http://localhost:8080';
// var imgGo=0;
var titles=new Array();
var desc=new Array();
var contents=new Array();
// var src=new Array();
//普通按钮请求
function list(type) {
    $.ajax({
        type: 'GET',
        datatype:'JSON',
        data:{},
        url: Urls+'/article/articleListByType/'+type,
        success: function (data) {
            $.each(data.data,function (index,item) {
                articleLists(item.articleName,item.articleTime,item.articleId);
            })
        },
        error : function(){

        }
    });
}
//撰写文章跳转
$('#myBtn').click(function(){
    window.open("writing.html");
});
//ECS按钮请求
function ecsBtn(type) {
    $.ajax({
        type: 'GET',
        datatype:'JSON',
        data:{},
        url: Urls+'/article/articleListByType/'+type,
        success: function (data) {
            var li=$('#btnList');
            li.empty();
            if(data.data.length<=0){
                li.append('<li><a href="#">该人很懒，没有文章</a></li>');
            }
            $.each(data.data,function (index,item) {
                btnList(item.articleName,item.articleId);
                // console.log(index);
                if(index!=0&&index%3==0){
                    li.append('<li role="separator" class="divider"></li>');
                }
            })
        },
        error : function(){

        }
    });
}
//favourite信息请求
function getFavourite() {
    $.ajax({
        type: 'GET',
        datatype:'JSON',
        data:{},
        url: Urls+'/favourite/favouriteListById/'+231241,
        success: function (data) {
            var sect=$('.carousel-indicators');
            var list=$('#imglist');
            list.empty();
            sect.empty();
            // console.log(data);
            $.each(data.data,function (index,item) {
                    titles[index]=item.favouriteTitle;
                    desc[index]=item.favouriteDesc;
                    contents[index]=item.favouriteContent;
                    list.append('<div class=\"item\">\n' +
                        '<a href="'+item.favouriteUrl+'" target="_blank">' +'<div class=\"theimgs\">'+item.favouritePic +'</div>' +
                        '</a></div>');
                    sect.append('<li data-target="#carousel-example-generic" data-slide-to='+index+'></li>');
					
            })
            $('#imglist div:eq(0)').addClass("active");
            $('.carousel-indicators li:eq(0)').addClass("active");
            $('.middleRightFloatR>h3').text(titles[0]);
            $('#myDesc').text(desc[0]);
            $('.middleRightSpan3>h5').text(contents[0]);
            setTimeout(function(){
            		$('.load').css("display","none");
            },2000);
            // console.log(titles);
            // console.log(desc);
            // console.log(contents);
        },
        error : function(){

        }
    });
}
//动态监听点数
$('body').on('click','.carousel-indicators li',function (e) {
    e.preventDefault();
    var slidId=$(this).data("slide-to");
    console.log(slidId);
    // imgGo=slidId;
    $('.middleRightFloatR>h3').text(titles[slidId]);
    $('#myDesc').text(desc[slidId]);
    $('.middleRightSpan3>h5').text(contents[slidId]);
})

// 轮播速度
$('.carousel').carousel({
    interval: false
});

// var picInter;
// picInter=setInterval("goOn()",6500);

setInterval(function () {
    $('#go').trigger("click");
},6500);
function goOn() {
    var s=$('#imglist').children(".active");
    var index=s.index()+1;
    if(index>=desc.length){
        index=0;
    }
    $('.middleRightFloatR>h3').text(titles[index]);
    $('#myDesc').text(desc[index]);
    $('.middleRightSpan3>h5').text(contents[index]);
    // console.log("ds");
}

//向前
$('#go').on('click',function(){
    // window.clearInterval(picInter);
    goOn();
    // picInter=setInterval("goOn()",6500);
});
//向后
$('#gooff').on('click',function(){
    // window.clearInterval(picInter);
    var s=$('#imglist').children(".active");
    var index=s.index()-1;
    console.log(index);
    if(index<=-1){
        index=desc.length-1;
    }
    $('.middleRightFloatR>h3').text(titles[index]);
    $('#myDesc').text(desc[index]);
    $('.middleRightSpan3>h5').text(contents[index]);
    // picInter=setInterval("goOn()",6500);
})
//动态监听跳转read读文章
$('body').on('click','#articleList #listC',function (e) {
    e.preventDefault();
    var aId=$(this).data("id");
    console.log(aId);
    window.location.href='read.html?id='+aId;
})

//动态监听点数
$('body').on('click','#btnList #EcsList',function (e) {
    e.preventDefault();
    console.log($(this));
    var aId=$(this).data("id");
    console.log(aId);
    window.location.href='read.html?id='+aId;
})
//普通文章循环
function articleLists(name,time,id) {
    var list=$('#articleList');
    list.append('<div class="middleLSpan" id="listC"'+ 'data-id='+id+'\>' +
        "<span>"+name+"</span>\n" +
        "<span class=\"middleLDay\">\n" +
        "<span class=\"fa fa-calendar\"></span>\n" +
        "<span>"+time+"</span>\n" +
        "</span>\n" +
        "</div>");
}
//按钮文章循环
function btnList(name,id) {
    var list=$('#btnList');
    list.append('<li id="EcsList"'+'data-id='+id+'><a href="#">'+name+'</a></li>');
}
//按钮点击
function select() {
    var type;
    var child=$('#selects').children();
    child.on('click',function (e) {
        type=$(this).text();
        if(type.length<16) {
            e.preventDefault();
            $(this).addClass("active");
            $(this).siblings().removeClass("active");
        }
        var lists=$('#articleList');
        if(type.length<16){
            lists.empty();
            list(type);
        }else {
            ecsBtn('ECS');
        }
    })
}
$('#search').on('click',function (e) {
    $('#baiduForm').submit();
})