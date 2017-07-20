<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>文章管理页</title>
    <jsp:include page="/page/common/head.jsp" flush="true" />

    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/bootstrap-table.min.css">
</head>
<body>
    <div class="page-container">
        <table id="essayTable" class="table table-hover table-bordered"></table>
    </div>

    <jsp:include page="/page/common/foot.jsp" flush="true" />
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/bootstrap-table.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/bootstrap-table-zh-CN.min.js"></script>

    <script type="text/javascript" src="${pageContext.request.contextPath}/page/manage/essay-manage/essay-manage.js"></script>

</body>
</html>
