$(document).ready(function () {
        cookie();
})
var Urls='http://www.zziheng.xin/myBlog';


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
                $('body>div:eq(0)').removeClass("pingzhang");
            }
        },
        error : function(){

        }
    });
}

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
                    $('.modal-header').append("<div class=\"alert alert-danger alert-dismissible\" role=\"alert\">\n" +
                        "                 <button type=\"button\" class=\"close\"  id='cc' data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n" +
                        "             <strong>密码错误!</strong>" +
                        "             </div>");
                    shakeup();
                    setTimeout(function (e) {
                        // e.preventDefault();
                        $('#cc').click();
                    }, 2000);
                } else {
                    $('#closeModel').click();
                    $('body>div:eq(0)').removeClass("pingzhang");
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