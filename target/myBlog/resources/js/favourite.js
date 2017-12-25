$(document).ready(function(){
    reviseList();
    cookieLogin();
    //动态监听
    $('#titlef').on('DOMNodeInserted',function (e) {
        e.preventDefault();
        titlef=$.trim($(this).text());
    })
    $('#descsf').on('DOMNodeInserted',function (e) {
        e.preventDefault();
        descsf=$.trim($(this).text());
    })
    $('#contf').on('DOMNodeInserted',function (e) {
        e.preventDefault();
        contf=$.trim($(this).text());
    })
    $('#urlf').on('DOMNodeInserted',function (e) {
        e.preventDefault();
        urlf=$.trim($(this).text());
    })
})
var titlef;
var descsf;
var contf;
var urlf;
var picurl;
var upFlag=false;
var Urls='http://www.zziheng.xin/myBlog';
var isLogin;
var favouriteId;
//提交变量
var submitFlag;
$('#favPic').on('click',function(){
	$('#favourFile').click();
})
//cookie登录
function cookie(flag) {
    console.log("cookie");
    $.ajax({
        type: 'POST',
        datatype:'JSON',
        data:{},
        url: Urls+'/user/cookieLogin',
        success: function (data) {
            console.log(data);
            if(data.msg=="cookie错误"){
                $('#goLogin').click();
            }else {
                isLogin=data.msg;
                // $('#sumBtnFavour').click();
            }
        },
        error : function(){
            console.log("服务器出错");
        }
    });
}
function login() {
    if(isLogin!="成功"){
        $('#goLogin').click();
    }
}
function cookieLogin() {
    $.ajax({
        type: 'POST',
        datatype:'JSON',
        data:{},
        url: Urls+'/user/cookieLogin',
        success: function (data) {
            console.log(data);
            isLogin=data.msg;
        },
        error : function(){
            console.log("服务器出错");
        }
    });
}
//选择图片
function choosePic() {
		// console.log("dsadas");
        console.log("开始选择");
		var pis=$('#favourFile');
		pis.addClass('thumbnail');
		var r = new FileReader();
		f = document.getElementById('favourFile').files[0];
		r.readAsDataURL(f);
		r.onload = function(e) {
            console.log("选择成功");
            var theimg=$('#favPic>img:eq(0)');
            if(upFlag==false){
                console.log("test");
                $('#imgContainer').addClass("none");
                theimg.removeClass("none");
            }
            theimg.attr("src",this.result);
            $('#favourFile>img:eq(1)').remove();
            upFlag=true;
			// document.getElementById('thepic').src = this.result;
		};

}

//上传图片
$('#sumBtnFavour').on('click',function(){
	$('#sumBtnFavour').attr("disabled","true");
    if(upFlag==true){
        // 是否有登入
        if(isLogin=="成功"){
            console.log("不需要登录");
            $('.modal-header').append('<div class="alert alert-warning alert-dismissible" id="loading" role="alert">\n' +
                '  <button type="hidden" class="close"  data-dismiss="alert"  aria-label="Close"><span aria-hidden="true">&times;</span></button>\n' +
                '  <strong id="loadText"><span class="fa fa-spinner" aria-hidden="true">上传中...</span></strong>' +'</div>'
            )
            var s = $('#uploadForm');
            // s.sumbits;
            var formParam = new FormData(s[0]);
            $.ajax({
                type: 'post',
                url: Urls + '/util/uploadPic',  //todo 改
                data: formParam,
                contentType: false,
                processData: false,
                dataType: 'text',
                success: function (data) {
                    console.log(data);
                    picurl = '<img src="' + data +'" '+'>';
                    $('#hidf').click();
                    insertFavourite();
                },
                error: function () {
                    $('.modal-header').append('<div class="alert alert-danger alert-dismissible" role="alert">\n' +
                        '  <button type="button" class="close" id="ccc" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n' +
                        '  <strong>服务器出错！</strong>' +'</div>'
                    )
                    setTimeout(function (e) {
                        $('.close').click();
                    },1500)
                }
            });
        }else {
       	 	$('#sumBtnFavour').removeAttr("disabled");
            cookie();
            console.log("判断需要登录");
        }
    }else {
        $('.modal-header').append('<div class="alert alert-danger alert-dismissible" role="alert">\n' +
            '  <button type="button" class="close" id="ccc" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n' +
            '  <strong>未选择图片！</strong>' +'</div>'
        )
        shakeup();
		setTimeout(function (e) {
			$('#ccc').click();
			$('.close').click();
        },1500)
    }
})
$('#hidf').on('click',function (e) {
    e.preventDefault();
    $('#titlef').append("<span></span>");
    $('#descsf').append("<span></span>");
    $('#contf').append("<span></span>");
    $('#urlf').append("<span></span>");
})
//插入请求
function insertFavourite() {
        $.ajax({
            type: 'post',
            url: Urls + '/favourite/insertFavourite/' + '124129',  //todo 改
            data: {
                "favourite_title": titlef,
                "favourite_desc": descsf,
                "favourite_content": contf,
                "favourite_pic": picurl,
                "favourite_url":urlf
            },
            dataType: 'JSON',
            success: function (data) {
                var text=$('#loadText');
                var load=$('#loading');
                text.empty();
                text.text("发表成功！");
                load.removeClass("alert-warning");
                load.addClass("alert-success");
                setTimeout(function () {
                    $(location).prop('href', Urls);
                }, 1500);
            },
            error: function () {
                $('.modal-header').append('<div class="alert alert-warning alert-dismissible" role="alert">\n' +
                    '  <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n' +
                    '  <strong>服务器出错！</strong>' + '</div>'
                )
            }
        });

}

// 密码验证请求
$('#Gs').on('click',function(){
    confirm();
})
function confirm() {
    var uId=312312312;
    var passW=$('#pass').val();
    if($.trim(passW)==""){
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
                    $('.modal-header').append('<div class="alert alert-danger alert-dismissible" role="alert">\n' +
                        '  <button type="button" class="close cccs" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n' +
                        '  <strong>密码错误！</strong>' + '</div>'
                    )
                    shakeup();
                    setTimeout(function (e) {
                        $('.cccs').click();
                    }, 2000);
                } else {
                    $('#closeModel').click();
                    $('#updates').removeClass("none");
                    $('#deletes').removeClass("none");
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

//修改功能
//加载修改列表
function reviseList() {
    var uId=312312312;
    $.ajax({
        type: 'GET',
        url: Urls + '/favourite/favouriteListById/'+uId,
        data: {},
        dataType: 'json',
        success: function (data) {
            var s=$('#revise>ul')
            $.each(data.data,function(index,item){
                s.append('<li><a href="#" data-revise='+item.favouriteId+'>'+item.favouriteTitle+'</a></li>'+'<li role="separator" class="divider"></li>');
                if(index==data.data.length-1){
                    s.append('<li><a href="http://www.zziheng.xin/myBlog/favourite.html">revise</a></li>');
                }
            })
        },
        error: function () {

        }
    });
}
$('body').on('click','#revise>ul a',function(){
    if(isLogin=="成功"){
        $('#updates').removeClass("none");
        $('#deletes').removeClass("none");
    }
    favouriteId=$(this).data("revise");
    $('#inputs').css("display","none");
    favouriteById();
    upFlag=false;
})
//根据Id获取favourite
function favouriteById() {
    $.ajax({
        type: 'GET',
        url: Urls + '/favourite/getFavouriteByFavouriteId/'+favouriteId,
        data: {},
        dataType: 'json',
        success: function (data) {
            picurl=data.data.favouritePic;
            $('#titlef').text(data.data.favouriteTitle);
            $('#favPic').html(picurl);
            $('#descsf').text(data.data.favouriteDesc);
            $('#contf').text(data.data.favouriteContent);
            $('#reviseSpan').text(data.data.favouriteTitle);
            $('#urlf').text(data.data.favouriteUrl);
        },
        error: function () {

        }
    });
}
//修改前上传图片
function uploadBeforeUpdate() {
    console.log("开始上传");
    var s = $('#uploadForm');
    var sumBtn=$('#sumBtns');
    var formParam = new FormData(s[0]);
    $('#sumBtns').attr("disabled","true");
    $('.modal-header').append('<div class="alert alert-warning alert-dismissible" id="loading" role="alert">\n' +
        '  <button type="hidden" class="close k"  data-dismiss="alert"  aria-label="Close"><span aria-hidden="true">&times;</span></button>\n' +
        '  <strong id="loadText"><span class="fa fa-spinner" aria-hidden="true">上传中...</span></strong>' +'</div>'
    )
    $.ajax({
        type: 'post',
        url: Urls+'/util/uploadPic',  //todo 改
        data: formParam,
        contentType: false,
        processData: false,
        dataType: 'text',
        success: function (data) {
            console.log(data);
            picurl = '<img src="' + data +'" '+'>';
            $(".k").click();
            updateFavourite();
        },
        error : function(){
            setTimeout(function(){
                $('.modal-header').append('<div class="alert alert-warning alert-dismissible" id="loading" role="alert">\n' +
                    '  <button type="hidden" class="close"  data-dismiss="alert"  aria-label="Close"><span aria-hidden="true">&times;</span></button>\n' +
                    '  <strong id="loadText"><span class="fa fa-spinner" aria-hidden="true">网速不太好...</span></strong>' +'</div>'
                )
            },5000)
        }
    });
}
//修改favourite
function updateFavourite() {
    console.log(picurl);
    var favourite_title=$('#titlef').text();
    var favourite_desc=$('#descsf').text();
    var favourite_content=$('#contf').text();
    var favourite_url=$('#urlf').text();
    console.log(favourite_url);
    $.ajax({
        type: 'POST',
        url: Urls + '/favourite/updateFavourite',
        data: {
            "favourite_id":favouriteId,
            "favourite_title":favourite_title,
            "favourite_desc":favourite_desc,
            "favourite_content":favourite_content,
            "favourite_pic":picurl,
            "favourite_url":favourite_url
        },
        dataType: 'json',
        success: function (data) {
        		console.log(data);
            $('.modal-header').append('<div class="alert alert-success alert-dismissible" role="alert">\n' +
                '  <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n' +
                '  <strong>发表成功!</strong>' + '</div>'
            )
            favouriteById();
            $('#sumBtns').removeAttr("disabled");
            setTimeout(function () {
                $(".close").click();
            }, 1500)

        },
        error: function () {
			
        }
    });
}
//删除favourite
function deleteFavourite() {
    $.ajax({
        type: 'POST',
        url: Urls + '/favourite/deleteFavourite',
        data: {
            "favourite_id":favouriteId
        },
        dataType: 'json',
        success: function (data) {
            $('.modal-header').append('<div class="alert alert-success alert-dismissible" role="alert">\n' +
                '  <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n' +
                '  <strong>发表成功!</strong>' + '</div>'
            )
            setTimeout(function () {
                $(location).prop('href', Urls);
            }, 1500)
        },
        error: function () {

        }
    });
}
$('#sumBtns').on('click',function(){
    if(submitFlag=="删除"){
        console.log("删除操作");
        deleteFavourite();
    }else {
        console.log("更新操作");
        console.log(upFlag);
        if(upFlag==true){
            uploadBeforeUpdate();
        }else {
            updateFavourite();
        }

    }
})
$('#deletes').on('click',function () {
    submitFlag="删除";
    $('#sumBitModal').click();
})
$('#updates').on('click',function () {
    submitFlag="修改";
    $('#sumBitModal').click();
})