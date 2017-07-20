<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <title>管理平台登录页面</title>
    <jsp:include page="/page/common/head.jsp" flush="true" />

    <link href="${pageContext.request.contextPath}/page/manage/login/login.css" rel="stylesheet">
</head>
<body>
    <div class="container">
        <nav class="nav-main navbar navbar-default navbar-fixed-top">
                <h1 class="main-title">管理平台</h1>
        </nav>
        <div class="row">
            <div class="col-md-12 main" id="loginMain">
                <div class="head">
                    <span class="title">登录</span>
                    <div class="tips">
                        <span class="tips" id="loginTips"></span>
                    </div>
                </div>
                <div class="body">
                    <form id="loginForm" role="form">
                        <div class="input-group input-group-md">
                                    <span class="input-group-addon">
                                        <i class="glyphicon glyphicon-user" aria-hidden="true"></i>
                                    </span>
                            <input type="text" class="form-control" id="account"
                                   name="account" placeholder="请输入账号"/>
                        </div>
                        <br/>
                        <div class="input-group input-group-md">
                                    <span class="input-group-addon">
                                        <i class="glyphicon glyphicon-lock"></i>
                                    </span>
                            <input type="password" class="form-control" id="password"
                                   name="password" placeholder="请输入密码"/>
                        </div>
                        <br/>
                        <button type="submit" class="btn btn-info btn-block">登录</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <jsp:include page="/page/common/foot.jsp" flush="true" />
    <script type="text/javascript" src="${pageContext.request.contextPath}/page/manage/login/login.js"></script>
</body>
</html>
