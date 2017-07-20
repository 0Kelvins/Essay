<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<nav class="nav-main navbar navbar-default navbar-fixed-top">
    <div class="logo">
        <a class="logo" href="#">随记</a>
    </div>

    <div class="right-item">
        <div class="dropdown nav-main-item">
            <a id="nav-avatar" class="hidden" href="#" data-toggle="dropdown">
                <img src="${user.avatar}" class="avatar"/>
                <span id="currentUsername" style="margin-left: 10px">${user.username}</span>
            </a>
            <ul class="dropdown-menu">
                <li><a href="${pageContext.request.contextPath}/person?id=${user.userId}">个人中心</a></li>
                <li><a href="${pageContext.request.contextPath}/setting">设置</a></li>
                <li><a href="${pageContext.request.contextPath}/logout">退出登录</a></li>
            </ul>
        </div>

        <a id="nav-loginRegister" class="nav-main-item nav-btn hidden"
           href="${pageContext.request.contextPath}/loginRegister" >登录&nbsp;|&nbsp;注册</a>
        <a id="nav-write" class="nav-main-item nav-btn write hidden"
           href="${pageContext.request.contextPath}/write">
            <i class="glyphicon glyphicon-pencil"></i>
            <span>记录</span>
        </a>
    </div>

    <div class="container">
        <a id="nav-home" class="nav-main-item"
           href="${pageContext.request.contextPath}/home">主页</a>
        <a id="nav-plate" class="nav-main-item"
           href="${pageContext.request.contextPath}/plate">版块</a>
        <a class="nav-main-item" href="${pageContext.request.contextPath}/about">关于</a>
        <a class="nav-main-item" href="${pageContext.request.contextPath}/resume">个人简历</a>
    </div>
</nav>