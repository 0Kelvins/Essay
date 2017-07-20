<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>板块</title>
    <jsp:include page="/page/common/head.jsp" flush="true" />

    <link href="${pageContext.request.contextPath}/page/plate/plate.css" rel="stylesheet">
</head>

<body>
    <jsp:include page="/page/common/navbar.jsp" flush="true" />

    <div class="container main">
        <div id="plateList" class="plate-list row"></div>
        <h2 id="plate-selected" class="plate-title"></h2>
        <hr/>

        <div class="blog-list">

        </div>
        <nav>
            <ul class="pager">
                <li><a id="prev-page">上一页</a></li>
                <li><a id="next-page">下一页</a></li>
            </ul>
        </nav>
    </div>

    <jsp:include page="/page/common/foot.jsp" flush="true" />
    <script type="text/javascript" src="${pageContext.request.contextPath}/page/plate/plate.js"></script>
</body>
</html>
