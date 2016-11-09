<%@ page language='java' pageEncoding='utf-8'%>
<%@include file="../header.jsp"%>
<style>
    #nav_list a.active{
        background-color: #A489DA;
        border-color: #A489DA;
    }
    .W_new{
        width: 6px;
        height: 6px;
        display: inline-block;
        border-radius: 3px;
        background: #fa7d3c;
        overflow: hidden;
    }
</style>
</head>
<body>
<%@include file="../nav.jsp"%>
<ol class="breadcrumb" style="margin-bottom: 0px;">
    <li><a href="${ctx}/index">教学资源共享平台</a></li>
    <li class="active">${menu}</li>
</ol>
<div class="container-fluid center-content margin-top-10">
    <div class="row-fluid">
        <div class="col-sm-2">
            <div class="list-group" id="nav_list">
                <a href="${ctx}/admin/document/list" class="text-center list-group-item <c:if test="${menu == '文档管理'}">active</c:if>">文档管理</a>
                <a href="${ctx}/admin/document/check" class="text-center list-group-item <c:if test="${menu == '审核管理'}">active</c:if>">审核管理<c:if test="${menu != '审核管理' && hasAnyUncheckDocument > 0}"><i class="W_new"></i></c:if></a>
                <%--<a href="#" class="text-center list-group-item <c:if test="${menu == '权限管理'}">active</c:if>">权限管理</a>--%>
                <a href="${ctx}/admin/user/score" class="text-center list-group-item <c:if test="${menu == '积分管理'}">active</c:if>">积分管理</a>
                <a href="${ctx}/admin/document/statistics" class="text-center list-group-item <c:if test="${menu == '数据统计'}">active</c:if>">数据统计</a>
                <a href="${ctx}/admin/user/statistics" class="text-center list-group-item <c:if test="${menu == '用户分析'}">active</c:if>">用户分析</a>
            </div>
        </div>
        <div class="col-sm-10">
            <div class="container-fluid">
                <c:choose>
                    <c:when test="${menu == '文档管理'}">
                        <%@include file="document/documentList.jsp"%>
                    </c:when>
                    <c:when test="${menu == '文档管理-修改'}">
                        <%@include file="document/updateDocument.jsp"%>
                    </c:when>
                    <c:when test="${menu == '数据统计'}">
                        <%@include file="document/documentStatics.jsp"%>
                    </c:when>
                    <c:when test="${menu == '审核管理'}">
                        <%@include file="document/documentCheckList.jsp"%>
                    </c:when>
                    <c:when test="${menu == '用户分析'}">
                        <%@include file="user/userStatics.jsp"%>
                    </c:when>
                    <c:when test="${menu == '积分管理'}">
                        <%@include file="user/userScoreList.jsp"%>
                    </c:when>
                    <c:otherwise>
                        <h2>找不到菜单[${menu}]</h2>
                    </c:otherwise>
                </c:choose>
            </div>
        </div>
    </div>
</div>
<%@include file="../footer.jsp"%>
</body>
</html>
