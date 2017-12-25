$(document).ready(function() {
    chooseValue();
    sumbits();
    hidClick();
    $('.modal-header').on('DOMNodeInserted',function (e) {
        setTimeout(function (e) {
            $('#ccc').click();
        },2000);
    });
})

var Urls='http://www.zziheng.xin/myBlog';
var HbtnFlag = true;
var Hbtn;
var CbtnFlag = true;
var Cbtn;
var Articletype=$('#BtnValue').text();
var article_content;
var article_name;
 var isLogin;
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
                $('#goLogin').click();
            }else {
                isLogin=data.msg;
                $('#sumBtns').click();
            }
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
			if(upFlag==false){
				$('#pics div').css("display","none");
			}
			upFlag=true;
		};	
		$('#pics>img:eq(1)').remove();
		picFlag=true;
	}
//提交服务器图片并返回图片路径
function upLoadPics(){
    console.log("上传函数");
    var bt=$('#unab');
    bt.attr("disabled","true");
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
                bt.removeAttr("disabled");
                
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

    }else {
		$('.modal-header').append('<div class="alert alert-danger alert-dismissible" role="alert">\n' +
            '  <button type="button" class="close" id="ccc" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n' +
            '  <strong>未选择图片！</strong>' +'</div>'
            )
        setTimeout(function(){
            $('.close').click();
        },1500)
	}
}
//选择文章类型
function chooseValue() {
	$('#chooseValue li>a').click(function (e) {
        e.preventDefault();
        Articletype=$(this).data('value');
		$('#BtnValue').text(Articletype);
    })
}
//点击隐藏按钮插入节点
function hidClick() {
	$('#hid').on('click',function (e) {
        e.preventDefault();
        $('#title').append("<span></span>");
        $('#cont').append("<span></span>");
    })
}
//提交文章
function  sumbits() {
	//动态监听
    $('#title').on('DOMNodeInserted',function (e) {
        e.preventDefault();
        article_name=$(this).text();
    })

    $('#cont').on('DOMNodeInserted',function (e) {
        e.preventDefault();
		article_content=$(this).html();
    })
    $('#sumBtns').bind('click',function (e) {
    		$('#sumBtns').attr("disabled","true");
        e.preventDefault();
        if(isLogin=="成功"){
            console.log("已登录");
            $('#hid').click();
            article_name=$.trim(article_name);
            article_content=$.trim(article_content);
            $.ajax({
                type: 'post',
                datatype: 'JSON',
                data: {"article_name": article_name, "article_content": article_content},
                url: Urls + '/article/insertArticle/' + Articletype + '/' + '3dsa0',
                success: function (data) {
                    // console.log(data);
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
        }else {
            cookie();
            console.log("判断需要登录");
        }
    })

}

//密码验证请求
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
                    $('.modal-header').append('<div class="alert alert-danger alert-dismissible" role="alert">\n' +
                        '  <button type="button" class="close cccs" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n' +
                        '  <strong>密码错误！</strong>' + '</div>'
                    )
                    shakeup();
                    setTimeout(function () {
                        $('.cccs').click();
                    }, 2000)
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
    },1000);
}
function chospic(){
	$('#myFile').trigger("click");
}
