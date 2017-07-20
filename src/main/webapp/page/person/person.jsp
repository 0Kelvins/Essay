<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <title>个人中心</title>
    <jsp:include page="/page/common/head.jsp" flush="true"/>

    <link href="${pageContext.request.contextPath}/page/person/person.css" rel="stylesheet">
</head>
<body class="reader-black-font" lang="zh-CN" style="-ms-overflow-y: scroll;">
<jsp:include page="/page/common/navbar.jsp" flush="true"/>
<div class="container person">
    <div class="row">
        <div class="col-xs-16 main">
            <div class="main-top">
                <a id="${author.userId}" class="avatar uId">
                    <img alt="240" src="${author.avatar}">
                </a>

                <div class="title">
                    <a class="name">${author.username}</a>
                </div>
                <div class="info">
                    <ul>
                        <!--
                        <li>
                            <div class="meta-block">
                                <a href="/users/6e2348a551a9/following">
                                    <p>0</p>
                                    关注
                                </a></div>
                        </li>
                        <li>
                            <div class="meta-block">
                                <a href="/users/6e2348a551a9/followers">
                                    <p>0</p>
                                    粉丝
                                </a></div>
                        </li>
                        -->
                        <li>
                            <div class="meta-block">
                                <a href="">
                                    <p>${author.essayNum}</p>
                                    文章
                                </a>
                            </div>
                        </li>
                        <li>
                            <div class="meta-block">
                                <a href="">
                                    <p>${author.commentNum}</p>
                                    评论
                                </a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <div>
                <ul id="tabMenu" class="trigger-menu">
                    <li id="essayTab" class="active"><a>文章</a></li>
                    <li id="commentTab"><a>最新评论</a></li>
                </ul>

                <div id="list-container">
                    <!-- 列表模块 -->
                    <div class="list"></div>
                </div>
                <nav>
                    <ul class="pager">
                        <li><a id="prev-page" class="hidden">上一页</a></li>
                        <li><a id="next-page" class="hidden">下一页</a></li>
                    </ul>
                </nav>
            </div>
        </div>
    </div>
</div>


<jsp:include page="/page/common/foot.jsp" flush="true"/>
<script type="text/javascript" src="${pageContext.request.contextPath}/page/person/person.js"></script>
</body>
</html>
