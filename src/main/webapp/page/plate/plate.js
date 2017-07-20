$(document).ready(function () {
    var pageVO = {
        plateId : 1,       //板块信息
        sortMethod : 0,    //排序方式
        dateRange : -365,  //起始日期
        currentPage : 1,   //当前页面
        pageNo : 0,        //跳转页
        totalPage : 0      //总页
    },
    currentPlate = 1;   //当前板块

    /*导航栏选中*/
    $('#nav-plate').addClass("active");

    $(function(){
        $(window).scroll(function(){
            if($(document).scrollTop() > 0){
                $(".side-tool").fadeIn();//一秒渐入动画
            }else{
                $(".side-tool").fadeOut();//一秒渐隐动画
            }
        });
    });


    /*加载板块列表*/
    var loadPlateList = function (data) {
        $("#plateList .plate").remove();
        if (data.result == true) {
            $.each(data.data, function (n, element) {
                var p = "";
                p += '<div id="' + element.plateId + '" class="plate">'
                   + '<a><span class="plate-name">' + element.name + '</span>'
                   + '<span class="badge pull-right">' + element.essayNum + '</span></a>'
                   + '</div>';
                $("#plateList").append(p);
            });
        }
        else {
            p = "<div><p>板块加载失败...</p></div>";
            $("#plateList").append(p);
        }

        $(".plate").on('click', function () {
            currentPlate = $(this).attr("id");

            $("#plate-selected").text($(this).find('.plate-name').text());

            pageVO.plateId = currentPlate;
            pageVO.pageNo = 0;
            pageVO.currentPage = 1;

            loadPlateEssayList(pageVO);
        });

    };

    /*获取板块列表*/
    $.ajax({
        type : 'POST',
        contentType : 'application/json;charset=UTF-8',
        url : '/plate/getPlateList',
        async: false,
        dataType: 'json',
        success : function(data) {
            if (data) {
                loadPlateList(data);
            }
            else {
                loadPlateList(null);
            }
        },
        error : function(err) {
            console.log(err.statusText);
            tipsAlert('alert-danger', '请求异常', '服务器内部异常，请联系管理员！');
        }
    });



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

        $(".blog-list .blog-post").remove();
        if (data.result == true) {
            $.each(data.data, function (n, element) {
                var e = $('<div class="blog-post" style="display: none">'
                    + '<h2 class="blog-post-title">'
                    + '<a href="/e?id=' + element.publish.essayId + '" target="_blank">' + element.title + '</a></h2>'
                    + '<a class="blog-author" href="/person?id='+ element.author.userId +'" target="_blank">'
                    + '<img class="avatar" src="'+ element.author.avatar +'">'
                    + '<span class="author">' + element.author.username + '</span>'
                    + '<span class="blog-post-meta">发表于：' + new Date(element.publish.publishTime).toLocaleString()+ '</span></a>'
                    + '<blockquote> <p>' + element.publish.summary + '</p> </blockquote><hr></div>');
                $(".blog-list").append(e);
                e.fadeIn("slow");
            });
        }
        else {
            $(".blog-list").append("<div><p>文章加载失败...</p></div>");
        }
    };

    var loadPlateEssayList = function (info) {
        $.ajax({
            type : 'POST',
            contentType : 'application/json;charset=UTF-8',
            url : '/publish/getEssayList',
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
    $("#plateList .plate").first().click();

    $("#prev-page").on('click', function () {
        pageVO.plateId = currentPlate;
        pageVO.pageNo = -1;
        loadPlateEssayList(pageVO);
    });

    $("#next-page").on('click', function () {
        pageVO.plateId = currentPlate;
        pageVO.pageNo = 1;
        loadPlateEssayList(pageVO);
    });

});