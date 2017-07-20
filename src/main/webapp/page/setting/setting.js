$(document).ready(function () {
    /*获取用户信息*/
    $.ajax({
        type : 'POST',
        contentType : 'application/json;charset=UTF-8',
        url : '/getCurrentUser',
        async: false,
        dataType: 'json',
        success : function(data) {
            if (data) {
                if (data.result == true) {
                    $('#nav-avatar').removeClass("hidden");
                    $('#nav-write').removeClass("hidden");
                    userId = data.object.userId;
                }
                else {
                    $('#nav-loginRegister').removeClass("hidden");
                }
            }
            else {
                $('#nav-loginRegister').removeClass("hidden");
            }
        },
        error : function(err) {
            console.log(err.statusText);
            tipsAlert('alert-danger', '请求异常', '服务器内部异常，请联系管理员！');
        }
    });

    $("#profile").on('click',function () {
        $.get("/setting/profile", function (data) {
            $(".main").html("");
            $(".main").append(data);
            $("#newAvatar").change(function () {
                $.ajaxFileUpload({
                    url:'/c/imageUpload',
                    secureuri:false,                           //是否启用安全提交,默认为false
                    fileElementId:'newAvatar',                 //文件选择框的id属性
                    dataType:'text',                           //服务器返回的格式,可以是json或xml等
                    success:function(data){
                        $("#userAvatar").attr("src", data);
                    },
                    error:function(data, e){
                        console.log(e.stackTrace);
                    }
                });
            });

            $("#settingSave").on('click', function () {
                var avatar = $("#userAvatar").attr("src"),
                    username = $("#username").val(),
                    updateInfo = {
                        "avatar" : avatar,
                        "username" : username
                    },
                    msg = "";

                if (isEmpty(avatar) && isEmpty(username)) {
                    msg = "头像、用户名不可为空", "error";
                }
                if (avatar.length > 100) {
                    msg = "头像文件名过长";
                }
                if (username > 10) {
                    msg = "用户昵称请小于10个字";
                }
                if (msg != "") {
                    alertTip(msg, "error");
                    return;
                }


                $.ajax({
                    type : 'POST',
                    contentType : 'application/json;charset=UTF-8',
                    url : '/updateUserInfo',
                    async: false,
                    dataType: 'json',
                    data : JSON.stringify(updateInfo),
                    success : function(data) {
                        if (data) {
                            if (data.result == true) {
                                alertTip("保存成功", "success");
                                $('#nav-avatar .avatar').attr("src", data.object.avatar);
                                $('#nav-avatar #currentUsername').text(data.object.username);
                            }
                            else {
                                alertTip("保存失败", "error");
                            }
                        }
                        else {
                            alertTip("保存失败", "error");
                        }
                    },
                    error : function(err) {
            console.log(err.statusText);
            tipsAlert('alert-danger', '请求异常', '服务器内部异常，请联系管理员！');
        }
                });
            });
        });

    });

    $("#misc").on('click',function () {
        $.get("/setting/misc", function (data) {
            $(".main").html("");
            $(".main").append(data);

            $("#settingSave").on('click', function () {
                var oldPassword = $("#oldPassword").val(),
                    newPassword = $("#newPassword").val(),
                    newPasswords = $("#newPasswords").val(),
                    passwordInfo = {
                        "password" : oldPassword,
                        "passwords" : newPassword
                    },
                    msg = "";

                if (newPassword != newPasswords) {
                    msg = "确认密码不一致";
                }
                if (isEmpty(oldPassword) || isEmpty(newPassword) || isEmpty(newPasswords)) {
                    msg = "密码不可为空";
                }
                if (msg != "") {
                    alertTip(msg, "error");
                    return;
                }


                $.ajax({
                    type : 'POST',
                    contentType : 'application/json;charset=UTF-8',
                    url : '/updatePassword',
                    async: false,
                    dataType: 'json',
                    data : JSON.stringify(passwordInfo),
                    success : function(data) {
                        if (data) {
                            if (data.result == true) {
                                alertTip(data.message, "success");
                                window.location.href = "/loginRegister";
                            }
                            else {
                                alertTip(data.message, "error");
                            }
                        }
                        else {
                            alertTip("保存失败", "error");
                        }
                    },
                    error : function(err) {
            console.log(err.statusText);
            tipsAlert('alert-danger', '请求异常', '服务器内部异常，请联系管理员！');
        }
                });
            });
        });

    });

    $(".aside ul li").on('click', function () {
        $(".aside ul li").removeClass("active");
        $(this).addClass("active");
    });

    $(".aside ul li").first().children("a").click();


    function alertTip(message, status) {
        $('#tip').text(message);
        $('#tip').addClass(status);
        setTimeout(function () {
            $('#tip').text("");
            $('#tip').removeClass(status);
        }, 3000);
    }

    var isEmpty = function (e) {
        if (e == undefined || e == null || e == "") {
            return true;
        }
        return false;
    }
});