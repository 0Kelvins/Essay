$(document).ready(function () {
    var pageVO = {
        sortMethod: 0,    //排序方式
        dateRange: -365,  //起始日期
        currentPage: 1,   //当前页面
        pageNo: 0,        //跳转页
        totalPage: 0      //总页
    };


    /*导航栏选中*/
    $('#nav-home').addClass("active");

    $(function () {
        $(window).scroll(function () {
            if ($(document).scrollTop() > 0) {
                $(".side-tool").fadeIn();//一秒渐入动画
            } else {
                $(".side-tool").fadeOut();//一秒渐隐动画
            }
        });
    });

    /*获取用户信息*/
    $.ajax({
        type: 'POST',
        contentType: 'application/json;charset=UTF-8',
        url: '/getCurrentUser',
        async: false,
        dataType: 'json',
        success: function (data) {
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
        error: function (err) {
            console.log(err.statusText);
            tipsAlert('alert-danger', '请求异常', '服务器内部异常，请联系管理员！');
        }
    });

    var loadCarousel = function (i, carousel) {
        var active = "";
        if (i == 0) {
            active += "active ";
        }
        $("#carousel .carousel-indicators").append(
            '<li data-target="#carousel" data-slide-to="' + i + '" class="' + active + '"></li>'
        );
        $("#carousel .carousel-inner").append(
            '<div class="' + active + 'item">' +
            '<a href="' + carousel.url + '" target="_blank">' +
            '<img src="' + carousel.imageUrl + '" alt="' + carousel.description + '"></a>' +
            '</div>'
        );
    };

    /*获取轮播信息*/
    $.ajax({
        type: 'POST',
        contentType: 'application/json;charset=UTF-8',
        url: '/carousel/getCarouselList',
        async: false,
        dataType: 'json',
        success: function (data) {
            if (data) {
                if (data.result == true) {
                    $("#carousel .carousel-indicators").html('');
                    $("#carousel .carousel-inner").html('');
                    $.each(data.data, function (n, element) {
                        loadCarousel(n, element);
                    });
                }
                else {
                    $('#nav-loginRegister').removeClass("hidden");
                }
            }
            else {
                $('#nav-loginRegister').removeClass("hidden");
            }
        },
        error: function (err) {
            console.log(err.statusText);
            tipsAlert('alert-danger', '请求异常', '服务器内部异常，请联系管理员！');
        }
    });

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
                var summaryCol = "", illustration = "";
                if (element.publish.illustration != undefined
                    && element.publish.illustration != null
                    && element.publish.illustration != "") {
                    summaryCol =  'class="col-md-9" style="padding-left:0px"';
                    illustration = '<div class="thumbnail col-md-3">'
                                 +   '<img src="' + element.publish.illustration + '" alt="封面">'
                                 + '</div>';
                }

                var e = $('<div class="blog-post clearfix" style="display: none">'
                    + '<div ' + summaryCol + '>'
                    +   '<h2 class="blog-post-title">'
                    +   '<a href="/e?id=' + element.publish.essayId + '" target="_blank">' + element.title + '</a></h2>'
                    +   '<a class="blog-author" href="/person?id=' + element.author.userId + '" target="_blank">'
                    +   '<img class="avatar" src="' + element.author.avatar + '">'
                    +   '<span class="author">' + element.author.username + '</span>'
                    +   '<span class="blog-post-meta">发表于：' + new Date(element.publish.publishTime).toLocaleString() + '</span></a>'
                    +   '<blockquote> <p>' + element.publish.summary + '</p> </blockquote>'
                    + '</div>'
                    + illustration
                    + '<hr></div>'
                );
                $(".blog-list").append(e);
                e.fadeIn('slow');
            });
        }
        else {
            $(".blog-list").append("<div><p>文章加载失败...</p></div>");
        }

    };

    var loadHomeEssayList = function (info) {
        $.ajax({
            type: 'POST',
            contentType: 'application/json;charset=UTF-8',
            url: '/publish/getEssayList',
            async: false,
            dataType: 'json',
            data: JSON.stringify(info),
            success: function (data) {
                if (data) {
                    loadEssayList(data);
                }
                else {
                    data.result = false;
                    loadEssayList(data);
                }
            },
            error: function (err) {
                tipsAlert('alert-danger', '请求异常', '服务器内部异常，请联系管理员！');
                ;
            }
        });
    };

    /*初始化获取文章*/
    loadHomeEssayList(pageVO);

    $(".list-unstyled li").on('click', function () {
        var id = $(this).attr('id'),
            title = "最新文章",
            description = "这里有最新发布的文章。";
        pageVO.currentPage = 1;
        pageVO.pageNo = 0;


        if (id == "0") {
            title = "最新文章";
            description = "这里有最新发布的文章。";
            pageVO.sortMethod = 0;
            pageVO.dateRange = -365;
        }
        else if (id == "1") {
            title = "7天热门文章";
            description = "一周内比较热门的文章。";
            pageVO.sortMethod = 1;
            pageVO.dateRange = -7;
        }
        else if (id == "2") {
            title = "30天热门文章";
            description = "一个月内最热门的文章。";
            pageVO.sortMethod = 1;
            pageVO.dateRange = -30;
        }
        $(".home-header .home-title").text(title);
        $(".home-header .home-description").text(description);

        loadHomeEssayList(pageVO);
    });

    $("#prev-page").on('click', function () {
        pageVO.pageNo = -1;
        loadHomeEssayList(pageVO);
    });

    $("#next-page").on('click', function () {
        pageVO.pageNo = 1;
        loadHomeEssayList(pageVO);
    });

});