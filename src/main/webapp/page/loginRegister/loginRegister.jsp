<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <title>用户登录</title>
    <jsp:include page="/page/common/head.jsp" flush="true" />

    <link href="${pageContext.request.contextPath}/page/loginRegister/loginRegister.css" rel="stylesheet">
</head>

<body>
    <div class="container">
        <div class="col-md-12 clearfix">
            <a style="text-decoration: none" href="${pageContext.request.contextPath}">
                <h1 class="main-title">随记</h1></a>
        </div>
        <div class="row">
            <div class="col-md-12 main" id="loginMain">
                <div class="head">
                    <span class="title">登录</span>
                    <div class="tips">
                        <div class="operator"><a id="register">注册</a></div>
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
                        <button id="loginSubmit" type="submit" class="btn btn-info btn-block">登录</button>
                    </form>
                </div>
            </div>

            <div class="col-md-12 main"  id="registerMain">
                <div class="head">
                    <span class="title">注册</span>
                    <div class="tips">
                        <div class="operator"><a id="login">登录</a></div>
                        <span class="tips" id="registerTips"></span>
                    </div>
                </div>
                <div class="body">
                    <form id="registerForm" role="form">
                        <div class="input-group input-group-md">
                                <span class="input-group-addon">
                                    <i class="glyphicon glyphicon-envelope" aria-hidden="true"></i>
                                </span>
                            <input type="text" class="form-control" id="registerAccount"
                                   name="account" placeholder="请输入账号"/>
                        </div>
                        <br/>
                        <div class="input-group input-group-md">
                                <span class="input-group-addon">
                                    <i class="glyphicon glyphicon-user" aria-hidden="true"></i>
                                </span>
                            <input type="text" class="form-control" id="registerUsername"
                                   name="username" placeholder="请输入用户名"/>
                        </div>
                        <br/>
                        <div class="input-group input-group-md">
                                <span class="input-group-addon">
                                    <i class="glyphicon glyphicon-lock"></i>
                                </span>
                            <input type="password" class="form-control" id="registerPassword"
                                   name="password" placeholder="请输入密码"/>
                        </div>
                        <br/>
                        <div class="input-group input-group-md">
                                <span class="input-group-addon">
                                    <i class="glyphicon glyphicon-lock"></i>
                                </span>
                            <input type="password" class="form-control" id="registerPasswordForSure"
                                   name="passwordSure" placeholder="请确认密码"/>
                        </div>
                        <br/>
                        <button id="registerSubmit" type="button" class="btn btn-info btn-block">注册</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <footer class="col-md-12 navbar-fixed-bottom foot-wrap">
        <hr>
        <p class="text-center">
            copy right&copy; · 2017 · Liu
        </p>
    </footer>

    <jsp:include page="/page/common/foot.jsp" flush="true" />
    <script type="text/javascript" src="${pageContext.request.contextPath}/page/loginRegister/loginRegister.js"></script>
</body>
</html>
