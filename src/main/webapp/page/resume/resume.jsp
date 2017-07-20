<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>关于</title>
    <jsp:include page="/page/common/head.jsp" flush="true" />
    <style>
        .main {
            margin-top: 100px;
            height: 800px;
        }
        .center-div {
            padding-left: 140px;
            margin-bottom: 100px;
        }
    </style>
</head>
<body>
<jsp:include page="/page/common/navbar.jsp" flush="true" />
<div class="container main">
    <a href="${pageContext.request.contextPath}/resume/resume.html" target="_blank"><h2>个人简历</h2></a>
    <a href="${pageContext.request.contextPath}/download/resume" style="float: right">下载</a>
    <br/>
    <div class="center-div">
    <iframe class="body-iframe" name="resume" width="100%" height="100%" scrolling="no"
            src="${pageContext.request.contextPath}/resume/resume.html" frameborder="0" seamless></iframe>
    </div>
</div>

<jsp:include page="/page/common/foot.jsp" flush="true" />
</body>
</html>
