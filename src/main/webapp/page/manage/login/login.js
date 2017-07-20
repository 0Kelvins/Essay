$(document).ready(function () {
    // 登录
    $("#loginForm").submit(function() {
        var account = $("#account").val(),
            password = $("#password").val();
        if (isEmpty(account) || isEmpty(password)) {
            $("#loginTips").text("账号密码不能为空！");
            $(".input-group").addClass("has-error");
            return ;
        }

        var userInfo = {
            "account" : account,
            "password" : password
        }
        $.ajax({
            type : 'POST',
            contentType : 'application/json;charset=UTF-8',
            url : '/manage/login',
            processData : false,
            dataType : 'json',
            data : JSON.stringify(userInfo),
            success : function(data) {
                if (data) {
                    if (data.result == true) {
                        window.location.href = "/manage/main";
                    }
                    else {
                        $("#loginTips").text(data.message);
                        $(".input-group").addClass("has-error");
                    }
                }
                else {
                    alert("请求失败！");
                }
            },
            error : function(err) {
            console.log(err.statusText);
            tipsAlert('alert-danger', '请求异常', '服务器内部异常，请联系管理员！');
        }
        });

        return false;
    });
    //点击框清除错误警告
    $(".input-group").on('click',function () {
        $("#loginTips").text("");
        $("#registerTips").text("");
        $(".input-group").removeClass("has-error");
    });

    /*字符串判空*/
    var isEmpty = function (e) {
        if (e == undefined || e == null || e == "") {
            return true;
        }
        return false;
    }
});