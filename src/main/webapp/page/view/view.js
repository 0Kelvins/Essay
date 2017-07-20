$(document).ready(function () {
    var essayId = $(".essay-content").attr("id"),   // 当前文章标识
        userLogin = false,
        pageVO = {
        message : essayId,    //文章标识信息
        currentPage : 1,   //当前页面
        pageNo : 0,        //跳转页
        totalPage : 0      //总页
    };

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
                    userLogin = true;
                    //显示头像...
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

    //获取文章内容转换
    var mdContent = $("#mdContent").html();
    $(".essay-main").html(marked(mdContent));
    $(".essay-main").fadeIn("fast");

    // 评论框显示
    if (userLogin == false) {
        $(".new-comment").html("");
        $(".new-comment").removeClass("hidden");
        $(".new-comment").append("<p class='text-center'>请登录后评论...</p>");
    }
    else {
        $(".new-comment").removeClass("hidden");
    }

    //评论列表加载
    var loadCommentList = function (data) {
        pageVO.currentPage = data.currentPage;
        pageVO.pageSize = data.pageSize;
        pageVO.totalPage = data.totalPage;

        if (pageVO.currentPage <= 1) {
            $("#prev-page").addClass("hidden");
        }
        else {
            $("#prev-page").removeClass("hidden");
        }
        if (pageVO.currentPage >= pageVO.totalPage) {
            $("#next-page").addClass("hidden");
        }
        else {
            $("#next-page").removeClass("hidden");
        }

        $(".comment-list div").remove();
        if (data.result == true) {
            if (data.data.length <= 0) {
                $(".comment-list").append("<div><p>暂无评论...</p></div>");
                return;
            }

            $.each(data.data, function (n, element) {
                var replyBtn = "", replyBlock = "";
                if (userLogin == true) {
                    replyBtn += '<div class="col-md-2 pull-right"><a id="' + element.comment.floor + '" class="replyBtn">回复</a></div>';
                }

                var index = element.comment.replyFloor - 1;
                if (index >= 0) {
                    replyBlock += '<blockquote class="reply-content"><p>#' + element.replyComment.floor
                        + '· @' + element.replyAuthor.username + '：'
                        + element.replyComment.commentContent + '</p></blockquote>';
                }

                var e = $('<div id="comment-' + element.comment.floor + '" class="comment-post" style="display: none"><hr>'
                    + '<div class="comment-head clearfix">'
                    + '<div id="' + element.author.userId + '" class="author col-md-10">'
                    + '<a class="col-md-2"><div class="clearfix"><img class="avatar" src="' + element.author.avatar + '">'
                    + '<span class="name">' + element.author.username + '</span></div></a>'
                    + '<span class="meta">#' + element.comment.floor + ' · ' + new Date(element.comment.publishTime).toLocaleString() + '</span>'
                    + '</div>'
                    + replyBtn
                    + '</div>'
                    + replyBlock
                    + '<p class="comment-content">' + element.comment.commentContent + '</p>'
                    + '</div>');
                $(".comment-list").append(e);
                e.fadeIn("slow");
            });
        }
        else {
            $(".comment-list").append("<div><p>评论加载失败...</p></div>");
        }


        /*回复评论*/
        $(".replyBtn").on('click', function () {
            var floorId = $(this).attr("id");
            if ($('#comment-' + floorId + ' .reply-block').length > 0) {
                $("#comment-" + floorId + " .reply-block").remove();
            }
            else {
                var commentBlock = $('<div id="reply-' + floorId + '" class="reply-block clearfix">'
                    + '<textarea class="replyContent" placeholder="写下你的回复..."></textarea>'
                    + '<div class="reply-operator pull-right">'
                    + '<span class="replyTip"></span>'
                    + '<a class="replyCancelBtn btn cancelBtn">取消</a>'
                    + '<a class="replySendBtn btn btn-info">发送</a>'
                    + '</div>'
                    + '</div>');

                $('#comment-' + floorId).append(commentBlock);
                commentBlock.fadeIn("slow");

                $(".replyCancelBtn").on('click', function () {
                    $("#comment-" + floorId + " .reply-block").remove();
                });

                $(".replySendBtn").on('click', function () {
                    var replyFloor = null;
                    if ($(this).parent("div").parent(".reply-block").length > 0) {
                        replyFloor = $(this).parent("div").parent(".reply-block").attr("id").substring(6);
                    }
                    else {
                        $(this).prev(".replyTip").text("回复失败...");
                        setTimeout(function () {
                            $(this).prev(".replyTip").text("");
                        }, 3000);
                        return ;
                    }

                    var content = $(this).parent("div").prev(".replyContent").val(),
                        comment = {
                            "essayId" : essayId,
                            "commentContent" : content,
                            "replyFloor" : replyFloor
                        };

                    if (content == null || content.length <= 0) {
                        $(this).prev(".replyTip").text("回复不能为空.");
                        setTimeout(function () {
                            $(this).prev(".replyTip").text("");
                        }, 3000);
                        return false;
                    }

                    $.ajax({
                        type : 'POST',
                        contentType : 'application/json;charset=UTF-8',
                        url : '/comment/addComment',
                        async: false,
                        dataType: 'json',
                        data : JSON.stringify(comment),
                        success : function(data) {
                            if (data) {
                                if (data.result == true) {
                                    getCommentList(pageVO);
                                }
                                else {
                                    $(this).prev(".replyTip").text("回复失败...");
                                    setTimeout(function () {
                                        $(this).prev(".replyTip").text("");
                                    }, 3000);
                                }
                            }
                            else {
                                $(this).prev(".replyTip").text("回复失败...");
                                setTimeout(function () {
                                    $(this).prev(".replyTip").text("");
                                }, 3000);
                            }
                        },
                        error : function(err) {
            console.log(err.statusText);
            tipsAlert('alert-danger', '请求异常', '服务器内部异常，请联系管理员！');
        }
                    });
                });
            }

        });
    };

    /*添加评论*/
    $("#commentSendBtn").on('click',function () {
        var content = $(this).parent("div").prev("#commentContent").val(),
            comment = {
                "essayId" : essayId,
                "commentContent" : content
            };

        if (content == null || content.length <= 0) {
            $(this).prev("#tip").text("评论不能为空.");
            setTimeout(function () {
                $(this).prev("#tip").text("");
            }, 3000);
            return ;
        }

        $.ajax({
            type : 'POST',
            contentType : 'application/json;charset=UTF-8',
            url : '/comment/addComment',
            async: false,
            dataType: 'json',
            data : JSON.stringify(comment),
            success : function(data) {
                if (data) {
                    if (data.result == true) {
                        $(this).parent("div").prev("#commentContent").val("");
                        getCommentList(pageVO);
                    }
                    else {
                        $(this).prev("#tip").text("评论失败...");
                        setTimeout(function () {
                            $(this).prev("#tip").text("");
                        }, 3000);
                    }
                }
                else {
                    $(this).prev("#tip").text("评论失败...");
                    setTimeout(function () {
                        $(this).prev("#tip").text("");
                    }, 3000);
                }
            },
            error : function(err) {
            console.log(err.statusText);
            tipsAlert('alert-danger', '请求异常', '服务器内部异常，请联系管理员！');
        }
        });
    });

    //请求评论数据
    var getCommentList = function (info) {
        $.ajax({
            type : 'POST',
            contentType : 'application/json;charset=UTF-8',
            url : '/comment/getCommentList',
            async: false,
            dataType: 'json',
            data : JSON.stringify(info),
            success : function(data) {
                if (data) {
                    loadCommentList(data);
                }
                else {
                    data.result = false;
                    loadCommentList(data);
                }
            },
            error : function(err) {
            console.log(err.statusText);
            tipsAlert('alert-danger', '请求异常', '服务器内部异常，请联系管理员！');
        }
        });
    };

    /*初始化获取评论*/
    getCommentList(pageVO);


    $("#prev-page").on('click', function () {
        pageVO.pageNo = -1;
        getCommentList(pageVO);
    });

    $("#next-page").on('click', function () {
        pageVO.pageNo = 1;
        getCommentList(pageVO);
    });


});
