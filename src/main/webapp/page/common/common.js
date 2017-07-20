
$(function(){
    $(window).scroll(function(){
        if($(document).scrollTop() > 0){
            $(".side-tool").fadeIn();//一秒渐入动画
        }else{
            $(".side-tool").fadeOut();//一秒渐隐动画
        }
    });
});

/*设置cookie*/
function setCookie(name, value, days){
    if(days == null || days == ''){
        days = 300;
    }
    var exp  = new Date();
    exp.setTime(exp.getTime() + days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + "; path=/;expires=" + exp.toGMTString();
}

/*获取cookie*/
function getCookie(name) {
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

/*ajax请求*/
function ajax(url, param, datat, callback) {
    $.ajax({
        type: "post",
        url: url,
        data: param,
        dataType: datat,
        success: function(data){
            callback;
        },
        error: function () {
            alert("失败..");
        }
    });
}

/*提示*/
function tipsAlert(alertLevel, alertType, alertMessage) {
    $(".tipsAlert").removeClass("alert-success alert-warning alert-danger");
    $(".tipsAlert").addClass(alertLevel);
    $(".tipsAlert .alertType").text(alertType);
    $(".tipsAlert .alertMessage").text(alertMessage);
    $(".tipsAlert").fadeIn();

    $(".alertClose").click(function(){
        $(".tipsAlert").alert();
    });

    setTimeout(function () {
        $(".tipsAlert").fadeOut();
    }, 5000);
}

var Common = {
    confirm:function(params){
        $("#confirmDialog").modal('show');
        var model = $("#confirmDialog");
        model.find(".message").html(params.message);

/*        model.find(".cancel").die("click");
        model.find(".ok").die("click");*/

        model.find(".ok").on("click",function(){
            params.operate(true);
        });

        model.find(".cancel").on("click",function(){
            params.operate(false);
        });
    }
};
