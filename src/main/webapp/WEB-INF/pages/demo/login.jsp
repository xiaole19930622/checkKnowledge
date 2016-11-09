<%@ page contentType="text/html;charset=UTF-8" %>
<%@include file="../header.jsp"%>

<%@ page import="org.apache.shiro.SecurityUtils" %>
<%@ page import="org.apache.shiro.web.filter.authc.FormAuthenticationFilter" %>
<meta name="pageName" content="登陆页">
</head>

<body>
<nav class="nav page-header" style="height: 200px;background-color: #795cb3;margin: 0;">
    <h1 class="text-center" style="color: #fff;margin-top: 80px;"> <img src="${ctx}/static/images/ICON2.png" style="margin-bottom: 10px;"/><br>星火教育远程学习分享平台(Demo)</h1>
</nav>
<div class="panel" style="max-width: 500px;margin: 40px auto auto auto;" >
    <div class="panel-body" style="padding-right: 100px;">
        <%
            String error = (String) request.getAttribute(FormAuthenticationFilter.DEFAULT_ERROR_KEY_ATTRIBUTE_NAME);
            if (error != null) {
        %>
        <div class="alert alert-danger alert-dismissible" role="alert">
            <button type="button" class="close" data-dismiss="alert" aria-label="关闭"><span aria-hidden="true">&times;</span></button>
            <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
            <span class="sr-only">登录错误：</span>
            <%
                if(error.endsWith("UnknownAccountException")){
                out.println("账号不存在");
                }else if(error.endsWith("IncorrectCredentialsException")){
                out.println("密码错误");
                }else if(error.endsWith("AuthenticationException")){
                    out.println("账号已冻结");
                }else{
                out.println("登陆失败" + error);
                }
            %>
        </div>
        <%
            }
            if (SecurityUtils.getSubject().isAuthenticated()) {
                response.sendRedirect("index");
            }
        %>
        <form class="form-horizontal" method="post">
            <div class="form-group">
                <label for="username" class="col-xs-4 control-label" style="font-size: 16pt;">用户名</label>
                <div class="col-xs-8">
                    <input id="username" name="username" type="input" class="form-control" placeholder="请输入用户名" required autofocus style="border: 2px #a489da solid;border-radius: 0;margin-top: 5px;">
                </div>
            </div>
            <div class="form-group">
                <label for="password" class="col-xs-4 control-label" style="font-size: 16pt;">密码</label>
                <div class="col-xs-8">
                    <input id="password" name="password" type="password" class="form-control" placeholder="请输入密码" required style="border: 2px #a489da solid;border-radius: 0;margin-top: 5px;">
                </div>
            </div>
            <div class="form-group">
                <div class="col-xs-offset-4 col-xs-8">
                    <button type="submit" class="btn btn-large" style="background-color: #d1db2d;border-radius: 0px;width: 40%;color: #000;margin-top: 10px;">登录</button>
                    <button type="reset" class="btn btn-large" style="background-color: #a489da;border-radius: 0px;width: 40%;color: #fff;margin-top: 10px;">重置</button>
                </div>
            </div>
        </form>
    </div>
</div>

<%@include file="../footer.jsp"%>
</body>
</html>
