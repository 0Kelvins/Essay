$(document).ready(function () {
    var uId = $(".uId").attr("id");

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

    var pageVO = {
        message : uId,  //用户ID
        currentPage : 1,   //当前页面
        pageNo : 0,        //跳转页
        totalPage : 0      //总页
    };

    /*加载文章列表*/
    var loadEssayList = function (data) {
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

        $(".list").html("");
        if (data.result == true) {
            $.each(data.data, function (n, element) {
                var e = $('<div class="blog-post" style="display: none">'
                    + '<h4 class="blog-post-title">'
                    + '<a href="/e?id=' + element.publish.essayId + '">' + element.title + '</a></h4>'
                    + '<p><span class="blog-post-meta">' + new Date(element.publish.publishTime).toLocaleString()+ '</span></p>'
                    + '<blockquote> <p>' + element.publish.summary + '</p> </blockquote><hr></div>');
                $(".list").append(e);
                e.fadeIn("slow");
            });
        }
        else {
            $(".list").append("<div><p>文章加载失败...</p></div>");
        }
    };

    var loadUserEssayList = function (info) {
        $.ajax({
            type : 'POST',
            contentType : 'application/json;charset=UTF-8',
            url : '/publish/getPersonPublishList',
            async: false,
            dataType: 'json',
            data : JSON.stringify(info),
            success : function(data) {
                if (data) {
                    loadEssayList(data);
                }
                else {
                    data.result = false;
                    loadEssayList(data);
                }
            },
            error : function(err) {
            console.log(err.statusText);
            tipsAlert('alert-danger', '请求异常', '服务器内部异常，请联系管理员！');
        }
        });
    };

    /*初始化获取文章*/
    loadUserEssayList(pageVO);


    /*评论分页*/
    var cPageVO = {
        message : uId,  //用户ID
        currentPage : 1,   //当前页面
        pageNo : 0,        //跳转页
        totalPage : 0      //总页
    };

    /*加载评论列表*/
    var loadCommentList = function (data) {
        cPageVO.currentPage = data.currentPage;
        cPageVO.pageSize = data.pageSize;
        cPageVO.totalPage = data.totalPage;

        if (cPageVO.currentPage <= 1) {
            $("#prev-page").addClass("hidden");
        }
        else {
            $("#prev-page").removeClass("hidden");
        }
        if (cPageVO.currentPage >= cPageVO.totalPage) {
            $("#next-page").addClass("hidden");
        }
        else {
            $("#next-page").removeClass("hidden");
        }

        $(".list").html("");
        if (data.result == true) {
            $.each(data.data, function (n, element) {
                var e = $('<div class="comment-post" style="display: none">'
                    + '<h4 class="comment-post-title">'
                    + '<a href="/e?id=' + element.comment.essayId + '">' + element.essayTitle + '</a></h4>'
                    + '<p><span class="comment-post-meta">' + new Date(element.comment.publishTime).toLocaleString()+ '</span></p>'
                    + '<blockquote> <p>' + element.comment.commentContent + '</p> </blockquote><hr></div>');
                $(".list").append(e);
                e.fadeIn("slow");
            });
        }
        else {
            $(".list").append("<div><p>评论加载失败...</p></div>");
        }
    };

    var loadUserCommentList = function (info) {
        $.ajax({
            type : 'POST',
            contentType : 'application/json;charset=UTF-8',
            url : '/comment/getPersonCommentList',
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



    $("#tabMenu li").on('click',function () {
        var id = $(this).attr("id");

        if (id == "essayTab") {
            pageVO.pageNo = 0;
            loadUserEssayList(pageVO);

            $("#prev-page").on('click', function () {
                pageVO.pageNo = -1;
                loadUserEssayList(pageVO);
            });

            $("#next-page").on('click', function () {
                pageVO.pageNo = 1;
                loadUserEssayList(pageVO);
            });
        }
        else if (id == "commentTab") {
            cPageVO.pageNo = 0;
            loadUserCommentList(cPageVO);

            $("#prev-page").on('click', function () {
                cPageVO.pageNo = -1;
                loadUserCommentList(cPageVO);
            });

            $("#next-page").on('click', function () {
                cPageVO.pageNo = 1;
                loadUserCommentList(cPageVO);
            });
        }
        $("#tabMenu li").removeClass("active");
        $(this).addClass("active");
    });

});