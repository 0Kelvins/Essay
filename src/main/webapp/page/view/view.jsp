<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<html>
<head>
    <title>${essay.title}</title>
    <jsp:include page="/page/common/head.jsp" flush="true"/>

    <link href="${pageContext.request.contextPath}/css/thinker-md.vendor.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/emoji/nature.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/emoji/object.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/emoji/people.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/emoji/place.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/emoji/Sysmbols.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/emoji/twemoji.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/page/view/view.css" rel="stylesheet">
</head>
<body>
    <jsp:include page="/page/common/navbar.jsp" flush="true"/>
    <div class="container essay-container">
        <div class="essay-head">
            <h1><strong>${essay.title}</strong></h1>
            <div class="head-detail">
                <a href="${pageContext.request.contextPath}/person?id=${author.userId}">
                    <img class="avatar" style="margin-right: 10px" src="${author.avatar}">
                    <span>作者：${author.username}</span>
                </a>
                发表于：<fmt:formatDate value="${essay.updateTime}" type="both" pattern="yyyy/mm/d EEEE HH:mm:ss"/>
            </div>
        </div>
        <div id="${essay.essayId}" class="essay-content">
            <div class="essay-main" style="display: none">
                <xmp id="mdContent" class="hidden">${essay.content}</xmp>
            </div>
        </div>

        <div class="comment">
            <h4>发表评论</h4>
            <hr/>
            <div class="new-comment clearfix hidden">
                <div class="col-md-1">
                    <a><img class="avatar" src="${user.avatar}"></a>
                </div>
                <div class="col-md-11">
                    <textarea id="commentContent" placeholder="写下你的评论..."></textarea>
                    <div class="comment-operator">
                        <span id="tip"></span>
                        <a id="commentSendBtn" class="btn btn-info pull-right">发送</a>
                    </div>
                </div>
            </div>

            <div class="comment-list"><h4>所有评论</h4></div>
            <nav>
                <ul class="pager">
                    <li><a id="prev-page" class=" hidden">上一页</a></li>
                    <li><a id="next-page" class=" hidden">下一页</a></li>
                </ul>
            </nav>
        </div>
    </div>

    <jsp:include page="/page/common/foot.jsp" flush="true"/>
    <script type="text/javascript" charset="utf-8"
            src="${pageContext.request.contextPath}/js/thinker-md.vendor.min.js"></script>
    <script type="text/javascript" charset="utf-8"
            src="${pageContext.request.contextPath}/page/view/view.js"></script>
</body>
</html>