<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <title>信息页面</title>
    <jsp:include page="/page/common/head.jsp" flush="true" />

    <style>
        .main {
            padding-top: 50px;
        }
    </style>
</head>
<body>
    <jsp:include page="/page/common/navbar.jsp" flush="true" />
    <div class="container main">
        <h1>信息：${info.title}</h1>
        <blockquote>
            <p>详情：${info.detail}</p>
        </blockquote>
    </div>

    <footer class="col-md-12 navbar-fixed-bottom foot-wrap home-footer">
        <p class="text-center">
            <a href="#">回到顶部</a>
        </p>
    </footer>
    <jsp:include page="/page/common/foot.jsp" flush="true" />
</body>
</html>
