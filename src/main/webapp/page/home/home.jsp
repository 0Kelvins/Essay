<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <title>主页</title>
    <jsp:include page="/page/common/head.jsp" flush="true" />

    <link href="${pageContext.request.contextPath}/page/home/home.css" rel="stylesheet">
</head>

<body>
    <jsp:include page="/page/common/navbar.jsp" flush="true" />
    <div class="container home-main">
        <div id="carousel" class="carousel slide">
            <!-- 轮播（Carousel）指标 -->
            <ol class="carousel-indicators">
                <li data-target="#carousel" data-slide-to="0" class="active"></li>
            </ol>
            <!-- 轮播（Carousel）项目 -->
            <div class="carousel-inner">
                <div class="item active">
                    <img src="">
                </div>
            </div>
            <!-- 轮播（Carousel）导航 -->
            <a class="carousel-control left" href="#carousel" data-slide="prev">
                <span class="glyphicon glyphicon-chevron-left"></span>
            </a>
            <a class="carousel-control right" href="#carousel" data-slide="next">
                <span class="glyphicon glyphicon-chevron-right"></span>
            </a>
        </div>
        <div class="home-header">
            <h4 class="home-title">最新文章</h4>
            <p class="lead home-description">发现你喜欢的，发表你热爱的。</p>
        </div>
        <hr/>
        <div class="row">
            <div class="col-sm-8 blog-main">
                <div class="blog-list">

                </div>

                <nav>
                    <ul class="pager">
                        <li><a id="prev-page">上一页</a></li>
                        <li><a id="next-page">下一页</a></li>
                    </ul>
                </nav>
            </div>

            <div class="col-sm-3 col-sm-offset-1 home-sidebar">
                <div class="sidebar-module sidebar-module-inset">
                    <h4>公告</h4>
                    <p><em>网站开发中...</em></p>
                </div>
                <div class="sidebar-module">
                    <ol class="list-unstyled">
                        <li id="0"><a href="#" class="btn btn-primary btn-lg btn-block btn-warning">最新文章</a></li>
                        <li id="1"><a href="#" class="btn btn-primary btn-lg btn-block btn-info">7天热门文章</a></li>
                        <li id="2"><a href="#" class="btn btn-primary btn-lg btn-block btn-success">30天热门文章</a></li>
                    </ol>
                </div>
            </div><!-- /.home-sidebar -->

        </div><!-- /.row -->

    </div><!-- /.container -->

    <footer class="home-footer">
        <p class="text-center">
            copy right&copy; · 2017 · Liu
        </p>
    </footer>

    <jsp:include page="/page/common/foot.jsp" flush="true" />
    <script type="text/javascript" src="${pageContext.request.contextPath}/page/home/home.js"></script>
</body>
</html>
