<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>关于</title>
    <jsp:include page="/page/common/head.jsp" flush="true" />
    <style>
        .main {
            margin-top: 100px;
        }
    </style>
</head>
<body>
<jsp:include page="/page/common/navbar.jsp" flush="true" />
<div class="container main">
    <h2>关于</h2>
    <br/>
    <blockquote>
        <p>本网站是基于SSM框架的随笔分享系统，提供随笔的记录以及分享。</p>
        <p>网站包含功能，除了可以查看他人发布的文章，还提供简单的文章编辑、发布，以及对文章的评论等功能。</p>
        <p>网站后台暂不开放。</p>
    </blockquote>
</div>

<jsp:include page="/page/common/foot.jsp" flush="true" />

</body>
</html>
