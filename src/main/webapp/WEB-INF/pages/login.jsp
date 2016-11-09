<%@ page contentType="text/html;charset=UTF-8" %>
<%@include file="header.jsp"%>

<%@ page import="org.apache.shiro.SecurityUtils" %>
<%@ page import="org.apache.shiro.web.filter.authc.FormAuthenticationFilter" %>
<meta name="pageName" content="登陆页">
</head>

<body>
<div class="container">
    <div class="row" style="padding: 40px 0 20px 0;">
        <img src="${ctx}/static/images/logo.png" class="pull-left">
        <a class="btn btn-xs pull-right" style="margin-top:20px;background-color:#ACC337;color: #ffffff;">收藏本站</a>
    </div>
    <div class="row text-center">
        <img src="${ctx}/static/images/xiaobiaoti.png">
    </div>
    <div class="row text-center" style="margin-top: 40px;">
        <img src="${ctx}/static/images/dabiaoti.png">
    </div>
</div>
<div class="container-fluid" style="margin-top: 40px;">
    <div class="row" style="  height: 50px;overflow: hidden;">
        <img src="${ctx}/static/images/sekuai.png" style="width: 100%;">
    </div>
    <div class="row" style="background-color: #6E529F;padding-bottom: 40px;">
        <div class="panel" style="max-width: 600px;border:none;background-color:#6E529F;margin: 40px auto auto auto;" >
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
                            out.println("(若您是首次登陆，请从BOSS系统中进行登陆)");
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
                        <label for="username" class="col-xs-4 control-label" style="font-size: 13pt;color: #fff;font-weight: normal;">用户名</label>
                        <div class="col-xs-8">
                            <input id="username" name="username" type="input" class="form-control" placeholder="请输入用户名" required autofocus style="border-radius: 0;margin-top: 5px;height: 40px;">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="password" class="col-xs-4 control-label" style="font-size: 13pt;color: #fff;font-weight: normal;">密&nbsp;&nbsp;&nbsp;码</label>
                        <div class="col-xs-8">
                            <input id="password" name="password" type="password" class="form-control" placeholder="请输入密码" required style="border-radius: 0;margin-top: 5px;height: 40px;">
                        </div>
                    </div>
                    <div class="row" style="  width: 120%;margin-top: 40px;">
                        <button type="submit" class="btn btn-large" style="height:60px;background-color: #ACC337;border-radius: 0px;width: 70.5%;color: #000;margin: 10px 0 0 90px;font-size: 24pt;color: #fff;">登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</button>
                        <button type="reset" style="border:none;background-color: #6E529F;color: #fff;padding: 5px;border-bottom: 2px solid #fff;font-size: 12pt;">重置</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<%@include file="footer.jsp"%>
</body>
</html>
