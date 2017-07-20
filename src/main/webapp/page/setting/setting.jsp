<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>设置</title>
    <jsp:include page="/page/common/head.jsp" flush="true"/>

    <link href="${pageContext.request.contextPath}/page/setting/setting.css" rel="stylesheet">
</head>
<body>
<div class="container setting">
    <jsp:include page="/page/common/navbar.jsp" flush="true"/>
    <div class="row">
        <div class="aside">
            <ul>
                <li>
                    <a id="profile">
                        <span>个人资料</span>
                    </a>
                </li>
                <li>
                    <a id="misc">
                        <span>帐号管理</span>
                    </a>
                </li>
            </ul>
        </div>
        <div class="col-xs-16 col-xs-offset-8 main"></div>
    </div>
</div>

<jsp:include page="/page/common/foot.jsp" flush="true"/>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/ajaxfileupload.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/page/setting/setting.js"></script>

</body>
</html>
