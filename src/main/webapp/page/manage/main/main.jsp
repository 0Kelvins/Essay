<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>管理平台主页</title>
    <jsp:include page="/page/common/head.jsp" flush="true" />

    <link rel="stylesheet" href="${pageContext.request.contextPath}/page/manage/main/main.css">
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/skin/qingxin/skin.css" id="layout-skin"/>
</head>
<body>
    <div class="layout-admin">
        <header class="layout-header">
            <span class="header-logo">随笔管理平台</span>
            <a class="header-menu-btn" href="javascript:;"><i class="icon-font">&#xe600;</i></a>
            <ul class="header-bar">
                <li class="header-bar-role"><a href="javascript:;">超级管理员</a></li>
                <li class="header-bar-nav">
                    <a href="javascript:;">${manager.name}<i class="icon-font" style="margin-left:5px;">&#xe60c;</i></a>
                    <ul class="header-dropdown-menu">
                        <li><a href="javascript:;">个人信息</a></li>
                        <li><a href="${pageContext.request.contextPath}/manage/logout">退出</a></li>
                    </ul>
                </li>
                <li class="header-bar-nav">
                    <a href="javascript:;" title="换肤"><i class="icon-font">&#xe608;</i></a>
                    <ul class="header-dropdown-menu right dropdown-skin">
                        <li><a href="javascript:;" data-val="qingxin" title="清新">清新</a></li>
                        <li><a href="javascript:;" data-val="blue" title="蓝色">蓝色</a></li>
                        <li><a href="javascript:;" data-val="molv" title="墨绿">墨绿</a></li>

                    </ul>
                </li>
            </ul>
        </header>
        <aside class="layout-side">
            <ul class="side-menu">

            </ul>
        </aside>

        <div class="layout-side-arrow"><div class="layout-side-arrow-icon"><i class="icon-font">&#xe60d;</i></div></div>

        <section class="layout-main">
            <div class="layout-main-tab">
                <button class="tab-btn btn-left"><i class="icon-font">&#xe60e;</i></button>
                <nav class="tab-nav">
                    <div class="tab-nav-content">
                        <a href="javascript:;" class="content-tab active" data-id="home">首页</a>
                    </div>
                </nav>
                <button class="tab-btn btn-right"><i class="icon-font">&#xe60f;</i></button>
            </div>
            <div class="layout-main-body">
                <iframe class="body-iframe" name="iframe0" width="100%" height="99%" src="${pageContext.request.contextPath}/manage/home" frameborder="0" data-id="home" seamless></iframe>
            </div>
        </section>
    </div>

    <jsp:include page="/page/common/foot.jsp" flush="true" />
    <script type="text/javascript" src="${pageContext.request.contextPath}/page/manage/main/main.js"></script>
</body>
</html>
