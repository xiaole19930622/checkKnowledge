<%@ page import="com.xuebang.o2o.business.service.realm.RealmUtils" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<%@include file="header.jsp"%>

<nav style="height:62px;margin-bottom: 0px;"></nav>
<div class="top" style="height:62px;position: fixed;top: 0;width: 100%;background-color: #6e529f;z-index: 1001;">
    <div class="container" style="width: 1024px;">
        <div class="right" style="padding-top: 18px;float:right;color:#fff;">
            <a href="${ctx}/user/userinfo" class="" title="个人信息">
                <img style="margin-left: 10px;" src="${ctx}/static/images/ICON03.png" /><%--个人信息--%>
            </a>
            <shiro:hasAnyRoles name="管理员,超级管理员">
                <a href="${ctx}/admin" class="" title="后台管理">
                    <img style="margin-left: 10px;" src="${ctx}/static/images/ICON05.png" class="<c:if test="${menu != '审核管理' && hasAnyUncheckDocument > 0}">red-point-bg</c:if>" /><%--设置，可以考虑做成后台管理入口--%>
                </a>
            </shiro:hasAnyRoles>
            <a href="${ctx}/logout" class="" title="退出系统">
                <img style="margin-left: 10px;" src="${ctx}/static/images/ICON06.png" /><%--退出--%>
            </a>
        </div>
        <div class="right" id="admin" style="float:right;padding-top: 10px;color:#fff;font-size: 12px;  line-height: 40px;">
            <%--<img style="border-radius: 50%;" src="${user.pictureUrlDisplay != null ? user.pictureUrlDisplay : 'http://xuebangsoft-tools.oss-cn-shenzhen.aliyuncs.com/defaultIcon.gif'}" height="40" width="41" alt="">--%>
            <span><%=RealmUtils.getCurrentUserAttributes().get("name")%>老师，您好！</span>

        </div>
    </div>
</div>
