$(document).ready(function () {

    /*字符串判空*/
    var isEmpty = function (e) {
        if (e == undefined || e == null || e == "") {
            return true;
        }
        return false;
    }

    /**
     * 登录
     */
    $("#loginForm").submit(function () {
        var account = $("#account").val(),
            password = $("#password").val();
        if (isEmpty(account) || isEmpty(password)) {
            $("#loginTips").text("账号密码不能为空！");
            $(".input-group").addClass("has-error");
            return;
        }

        var userInfo = {
            "account": account,
            "password": password
        }
        $.ajax({
            type: 'POST',
            contentType: 'application/json;charset=UTF-8',
            url: '/login',
            processData: false,
            dataType: 'json',
            data: JSON.stringify(userInfo),
            success: function (data) {
                if (data) {
                    if (data.result == true) {
                        window.location.href = "/home";
                    }
                    else {
                        $("#loginTips").text(data.message);
                        $(".input-group").addClass("has-error");
                    }
                }
                else {
                    tipsAlert('alert-danger', '异常', '请求失败');
                }
            },
            error: function (err) {
                console.log(err.statusText);
                tipsAlert('alert-danger', '请求异常', '服务器内部异常，请联系管理员！');
            }
        });

        return false;
    });
    //点击框清除错误警告
    $(".input-group").on('click', function () {
        $("#loginTips").text("");
        $("#registerTips").text("");
        $(".input-group").removeClass("has-error");
    });

    /**
     * 登录注册框切换
     */
    $("#register").on('click', function () {
        $("#loginMain").fadeOut();
        $("#registerMain").fadeIn();
    });
    $("#login").on('click', function () {
        $("#registerMain").fadeOut();
        $("#loginMain").fadeIn();
    });

    /**
     * 注册
     */
    $("#registerForm #registerSubmit").on('click', function () {
        var account = $("#registerAccount").val(),
            username = $("#registerUsername").val(),
            password = $("#registerPassword").val(),
            passwords = $("#registerPasswordForSure").val();
        if (isEmpty(account) || isEmpty(username)) {
            $("#registerTips").text("账号、用户名不能为空！");
            $(".input-group").addClass("has-error");
            return;
        }
        if (password == undefined || password.length < 5
            || passwords == undefined || passwords.length < 5) {
            $("#registerTips").text("密码至少5位！");
            $("#registerPassword").addClass("has-error");
            $("#registerPasswordForSure").addClass("has-error");
            return;
        }
        if (password != passwords) {
            $("#registerTips").text("确认密码不一致！");
            $("#registerPassword").addClass("has-error");
            $("#registerPasswordForSure").addClass("has-error");
            return;
        }

        var userInfo = {
            "account": account,
            "username": username,
            "password": password,
            "passwords": passwords
        }
        $.ajax({
            type: 'POST',
            contentType: 'application/json;charset=UTF-8',
            url: '/register',
            processData: false,
            dataType: 'json',
            data: JSON.stringify(userInfo),
            success: function (data) {
                if (data) {
                    if (data.result == true) {
                        //window.location.href = "/loginRegister";
                        $("#registerMain").fadeOut();
                        $("#loginMain").fadeIn();
                        alert("注册成功，请登录");
                    }
                    else {
                        $("#registerTips").text(data.message);
                        $(".input-group").addClass("has-error");
                    }
                }
                else {
                    tipsAlert('alert-danger', '异常', '请求失败');
                }
            },
            error: function (err) {
                console.log(err.statusText);
                tipsAlert('alert-danger', '请求异常', '服务器内部异常，请联系管理员！');
            }
        });
    });
});

