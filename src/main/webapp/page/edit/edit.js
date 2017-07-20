$(document).ready(function () {
    $("textarea").markdown({
        language: 'zh',
        fullscreen: {
            enable: true
        },
        resize: 'vertical',
        localStorage: 'md',
        imgurl: '/c/imageUpload',
        base64url: '/c/imageUpload'
    });

    /*加载目录*/
    var loadDir = function (data) {
        $("#directoryList li").remove();   //清空列表
        if (data.result == true) {
            $.each(data.data, function (n, element) {
                var li = $('<li id="' + n + '" value="' + element.dirId + '">'
                    + '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">'
                    + '<i class=" glyphicon glyphicon-cog "></i></button>'
                    + '<span id="dirName">' + element.dirName + '</span></li>');
                $("#directoryList").append(li);
            });
        }
        else {
            tipsAlert("alert-warning", "提醒：", "目录加载失败...");
        }

        /*点击目录，加载文章列表*/
        $("#directoryList li").on('click', function () {
            $(".directory #dirAllEssay").removeClass("selected");
            $("#directoryList li").removeClass("selected");
            $(this).addClass("selected");
            var d_clicked = $(this).val(),
                dirId = {
                    "dirId": d_clicked
                };
            $.ajax({
                type: 'POST',
                contentType: 'application/json;charset=UTF-8',
                url: '/essays/getEssayInDir',
                async: false,
                dataType: 'json',
                data: JSON.stringify(dirId),
                success: function (data) {
                    if (data) {
                        loadEssayList(data);
                        $("#essayList #0").click();
                    }
                    else {
                        tipsAlert("alert-danger", "错误：", "文章加载失败");
                    }
                },
                error: function (err) {
                    console.log(err.statusText);
                    tipsAlert('alert-danger', '请求异常', '服务器内部异常，请联系管理员！');
                }
            });
        });

        /*修改删除目录*/
        $("#directoryList li .close").on('click', function () {
            var d_clicked = $(this).parent().val(),
                d_name = $(this).parent().children('#dirName').text();
            $("#modal").modal('show');
            $("#modalLabel").text("目录");
            $("#modal-id").val(d_clicked);
            $("#modal-name").val(d_name);
            $("#modal-name").attr("disabled", false);
            $("#plate-group").addClass("hidden");
            $("#modal-updateBtn").text("修改");
            return false;   //不触发父元素事件
        });
    };

    /*加载文章列表*/
    var loadEssayList = function (data) {
        $("#essayList li").remove();   //清空列表
        if (data.result == true) {
            loadEssay(null);
            $.each(data.data, function (n, element) {
                if (element.title == "" || element.title == null) {
                    element.title = "未添加标题文章"
                }
                var li = $('<li id="' + n + '" value="' + element.essayId + '">'
                    + '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">'
                    + '<i class=" glyphicon glyphicon-cog "></i></button>'
                    + '<span id="essayName">' + element.title + '</span></li>');
                $("#essayList").append(li);
            });
        }
        else {
            tipsAlert("alert-warning", "提醒：", "文章加载失败...");
        }

        /*操作文章*/
        $("#essayList li .close").on('click', function () {
            var e_clicked = $(this).parent().val(),
                e_name = $(this).parent().children('#essayName').text();
            $("#modal").modal('show');
            $("#modalLabel").text("文章");
            $("#modal-id").val(e_clicked);
            $("#modal-name").val(e_name);
            $("#modal-name").attr("disabled", true);

            $("#plate-group").removeClass("hidden");
            loadPublishPlateList(); //初始化版块下拉选择列表

            var publish = {
                "essayId": e_clicked
            }

            $.ajax({
                type: 'POST',
                contentType: 'application/json;charset=UTF-8',
                url: '/publish/publishCheck',
                async: false,
                dataType: 'json',
                data: JSON.stringify(publish),
                success: function (data) {
                    if (data) {
                        if (data.result == true) {
                            $("#modal-updateBtn").text("取消发布");
                        }
                        else {
                            $("#modal-updateBtn").text("发布");
                        }
                    }
                    else {
                        $("#modal-updateBtn").text("");
                        tipsAlert("alert-danger", "错误：", "获取文章发布信息失败！");
                    }
                },
                error: function (err) {
                    console.log(err.statusText);
                    tipsAlert('alert-danger', '请求异常', '服务器内部异常，请联系管理员！');
                }
            });
        });
        /*点击文章列表项，加载文章*/
        $(".file #essayList li").on('click', function () {
            var e_clicked = $(this).val(),
                essayId = {
                    "essayId": e_clicked
                };

            if (e_clicked == undefined || e_clicked == null || e_clicked == "") {
                tipsAlert("alert-warning", "提醒：", "请重新选择文章");
                return;
            }
            $("#essayList li").removeClass("selected");
            $(this).addClass("selected");

            $.ajax({
                type: 'POST',
                contentType: 'application/json;charset=UTF-8',
                url: '/essays/getEssayById',
                async: false,
                dataType: 'json',
                data: JSON.stringify(essayId),
                success: function (data) {
                    if (data) {
                        loadEssay(data);
                    }
                    else {
                        tipsAlert("alert-danger", "错误：", "文章获取失败");
                    }
                },
                error: function (err) {
                    console.log(err.statusText);
                    tipsAlert('alert-danger', '请求异常', '服务器内部异常，请联系管理员！');
                }
            });
        });
    };

    /*版块选择列表加载*/
    var loadPublishPlateList = function () {
        var options = "";

        $.ajax({
            type: 'POST',
            contentType: 'application/json;charset=UTF-8',
            url: '/plate/getPlateList',
            async: false,
            dataType: 'json',
            success: function (data) {
                if (data) {
                    if (data.result == true) {
                        $("#publishPlate option").remove();
                        $.each(data.data, function (n, element) {
                            var op = "";
                            op = '<option id="' + n + '" value="' + element.plateId + '">' + element.name + '</option>';
                            options += op;
                        });
                    }
                    else {
                        options = "<option>版块加载失败...</option>";
                    }
                }
                else {
                    options = "<option>版块加载失败...</option>";
                }
            },
            error: function (err) {
                console.log(err.statusText);
                tipsAlert('alert-danger', '请求异常', '服务器内部异常，请联系管理员！');
            }
        });

        $("#publishPlate").append(options);
    };

    /*加载文章内容*/
    var loadEssay = function (data) {
        if (data == null) {
            $("#title").val("");
            $("#editor").val("");
        }
        else if (data.result == true) {
            $("#title").val(data.object.title);
            $("#editor").val(data.object.content);
        }
        else {
            tipsAlert("alert-warning", "提醒：", "文章加载失败");
        }
    };

    /*用户文章目录*/
    $.ajax({
        type: 'POST',
        contentType: 'application/json;charset=UTF-8',
        url: '/directory/getUserDirectory',
        async: false,
        dataType: 'json',
        success: function (data) {
            if (data) {
                loadDir(data);
            }
            else {
                data.result = false;
                loadDir(data);
            }
        },
        error: function (err) {
            console.log(err.statusText);
            tipsAlert('alert-danger', '请求异常', '服务器内部异常，请联系管理员！');
        }
    });

    /*新建目录*/
    $(".create-dir-form").on('submit', function () {
        $(".collapse.in").collapse('hide');
        var dirName = $("#newDir").val(),
            newDir = {
                "dirName": dirName
            };

        $.ajax({
            type: 'POST',
            contentType: 'application/json;charset=UTF-8',
            url: '/directory/newDirectory',
            async: false,
            dataType: 'json',
            data: JSON.stringify(newDir),
            success: function (data) {
                if (data) {
                    loadDir(data);
                }
                else {
                    data.result = false;
                    loadDir(data);
                }
            },
            error: function (err) {
                console.log(err.statusText);
                tipsAlert('alert-danger', '请求异常', '服务器内部异常，请联系管理员！');
            }
        });
        return false;
    });

    /*所有文章目录*/
    $(".directory #dirAllEssay").on('click', function () {
        $("#directoryList li").removeClass("selected");
        $(this).addClass("selected");

        $.ajax({
            type: 'POST',
            contentType: 'application/json;charset=UTF-8',
            url: '/essays/getEssayList',
            async: false,
            dataType: 'json',
            success: function (data) {
                if (data) {
                    loadEssayList(data);
                    $("#essayList #0").click();
                }
                else {
                    data.result = false;
                    loadEssayList(data);
                }
            },
            error: function (err) {
                console.log(err.statusText);
                tipsAlert('alert-danger', '请求异常', '服务器内部异常，请联系管理员！');
            }
        });
    });

    /*模态框内事件*/
    /*目录删除或文章回收*/
    $("#modal-deleteBtn").on('click', function () {
        var modalId = $("#modal-id").val(),
            modalLable = $("#modalLabel").text();

        $("#modal").hide();
        if (modalLable == "目录") {
            var dirInfo = {
                "dirId": modalId
            };
            $.ajax({
                type: 'POST',
                contentType: 'application/json;charset=UTF-8',
                url: '/directory/deleteDirectory',
                async: false,
                dataType: 'json',
                data: JSON.stringify(dirInfo),
                success: function (data) {
                    if (data) {
                        loadDir(data);
                    }
                    else {
                        data.result = false;
                        loadDir(data);
                    }
                },
                error: function (err) {
                    console.log(err.statusText);
                    tipsAlert('alert-danger', '请求异常', '服务器内部异常，请联系管理员！');
                }
            });
        }
        else if (modalLable == "文章") {
            var essayInfo = {
                "essayId": modalId
            }
            $.ajax({
                type: 'POST',
                contentType: 'application/json;charset=UTF-8',
                url: '/essays/deleteEssay',
                async: false,
                dataType: 'json',
                data: JSON.stringify(essayInfo),
                success: function (data) {
                    if (data) {
                        $(".directory .selected").click();
                    }
                    else {
                        $(".directory .selected").click();
                    }
                },
                error: function (err) {
                    console.log(err.statusText);
                    tipsAlert('alert-danger', '请求异常', '服务器内部异常，请联系管理员！');
                }
            });
        }

    });
    /*目录修改或文章发布*/
    $("#modal-updateBtn").on('click', function () {
        var modalId = $("#modal-id").val(),
            modalName = $("#modal-name").val(),
            modalLable = $("#modalLabel").text();

        $("#modal").modal('hide');
        if (modalLable == "目录") {
            var dirInfo = {
                "dirId": modalId,
                "dirName": modalName
            };
            $.ajax({
                type: 'POST',
                contentType: 'application/json;charset=UTF-8',
                url: '/directory/updateDirectory',
                async: false,
                dataType: 'json',
                data: JSON.stringify(dirInfo),
                success: function (data) {
                    if (data) {
                        loadDir(data);
                    }
                    else {
                        data.result = false;
                        loadDir(data);
                    }
                },
                error: function (err) {
                    console.log(err.statusText);
                    tipsAlert('alert-danger', '请求异常', '服务器内部异常，请联系管理员！');
                }
            });
        }
        else if (modalLable == "文章") {
            var title = $("#modal-name").val(),
                operator = $("#modal-updateBtn").text();

            if (operator != undefined && operator != null) {
                if (operator == "发布") {

                    if (title == "未添加标题文章") {
                        tipsAlert("alert-warning", "提醒：", "请添加标题再发布");
                        return;
                    }

                    var plateId = $("#publishPlate").val(),
                        summary = "...",
                        illustration = null;
                    summary = removeHTMLTag($("#editor").data('markdown').parseContent()).substring(0, 100) + summary;
                    var urlMatch = $("#editor").data('markdown').getContent().match(/!\[(.*)\]\((\S*) \"(.*)\"\)/);
                    if (urlMatch != null && urlMatch[2] != null)
                        illustration = urlMatch[2];
                    var essayInfo = {
                            "essayId": modalId,
                            "plateId": plateId,
                            "summary": summary,
                            "illustration": illustration
                        };
                    $.ajax({
                        type: 'POST',
                        contentType: 'application/json;charset=UTF-8',
                        url: '/publish/publishEssay',
                        async: false,
                        dataType: 'json',
                        data: JSON.stringify(essayInfo),
                        success: function (data) {
                            if (data) {
                                if (data.result == true) {
                                    tipsAlert("alert-success", "提示：", "发布成功");
                                }
                                else {
                                    tipsAlert("alert-warning", "提醒：", "发布失败");
                                }
                            }
                            else {
                                tipsAlert("alert-danger", "错误：", "发布失败");
                            }
                        },
                        error: function (err) {
                            console.log(err.statusText);
                            tipsAlert('alert-danger', '请求异常', '服务器内部异常，请联系管理员！');
                        }
                    });
                    //$(".directory .selected").click();
                }
                else if (operator == "取消发布") {
                    var essayInfo = {
                        "essayId": modalId
                    };
                    $.ajax({
                        type: 'POST',
                        contentType: 'application/json;charset=UTF-8',
                        url: '/publish/publishCancel',
                        async: false,
                        dataType: 'json',
                        data: JSON.stringify(essayInfo),
                        success: function (data) {
                            if (data) {
                                if (data.result == true) {
                                    tipsAlert("alert-success", "提示：", "取消发布成功");
                                }
                                else {
                                    tipsAlert("alert-warning", "提醒：", "取消发布失败");
                                }
                            }
                            else {
                                tipsAlert("alert-danger", "错误：", "取消发布失败");
                            }
                        },
                        error: function (err) {
                            console.log(err.statusText);
                            tipsAlert('alert-danger', '请求异常', '服务器内部异常，请联系管理员！');
                        }
                    });
                }
            }
        }
    });

    /*新建文章*/
    $("#newEssay").on('click', function () {
        var d_selected = $('#directoryList li.selected').val(),
            newInfo = {
                "dirId": d_selected
            };

        $.ajax({
            type: 'POST',
            contentType: 'application/json;charset=UTF-8',
            url: '/essays/newEssay',
            async: false,
            dataType: 'json',
            data: JSON.stringify(newInfo),
            success: function (data) {
                if (data) {
                    if (data.result == true) {
                        $(".directory .selected").click();
                        loadEssay(data);
                        $("#essayList #0").click();
                    }
                    else {
                        tipsAlert("alert-warning", "提醒：", "新建文章失败...");
                    }
                }
                else {
                    tipsAlert("alert-danger", "错误：", "新建文章失败...");
                }
            },
            error: function (err) {
                console.log(err.statusText);
                tipsAlert('alert-danger', '请求异常', '服务器内部异常，请联系管理员！');
            }
        });
    });


    var autoSave = 0;
    /*保存文章*/
    $("#saveBtn").on('click', function () {
        var essayId = $("#essayList .selected").val(),
            title = $(".editArea #title").val(),
            content = $("#editor").data('markdown').getContent(),
            essay = {
                "essayId": essayId,
                "title": title,
                "content": content
            };

        $.ajax({
            type: 'POST',
            contentType: 'application/json;charset=UTF-8',
            url: '/essays/updateEssay',
            async: false,
            dataType: 'json',
            data: JSON.stringify(essay),
            success: function (data) {
                if (data) {
                    if (data.result == true) {
                        $("#essayList .selected #essayName").text(title);
                        if (autoSave == 0) {
                            tipsAlert("alert-success", "提示：", "文章保存成功");
                        }
                        else {
                            autoSave = 0;
                        }
                    }
                    else {
                        tipsAlert("alert-warning", "提醒：", "文章保存失败");
                    }
                }
                else {
                    tipsAlert("alert-danger", "错误：", "文章获取失败");
                }
            },
            error: function (err) {
                console.log(err.statusText);
                tipsAlert('alert-danger', '请求异常', '服务器内部异常，请联系管理员！');
            }
        });
    });

    /*初始选中目录文章*/
    $(".directory #dirAllEssay").click();
    $("#essayList #0").click();

    /*自动保存*/
    setInterval(function () {
        autoSave = 1;
        $("#saveBtn").click();
        alertTips("自动保存中...");
    }, 30000);

    /*弹出提示*/
    var alertTips = function (msg) {
        $("#tips").text(msg);
        setTimeout(function () {
            $("#tips").text("");
        }, 3000);
    }

    /*获取html纯文本*/
    var removeHTMLTag = function (str) {
        str = str.replace(/<\/?[^>]*>/g, ''); //去除HTML tag
        str = str.replace(/[ | ]*\n/g, '\n'); //去除行尾空白
        str = str.replace(/\n[\s| | ]*\r/g, '\n'); //去除多余空行
        str = str.replace(/&nbsp;/ig, '');//去掉&nbsp;
        str = str.replace(/\s/g, ''); //将空格去掉
        return str;
    }
});