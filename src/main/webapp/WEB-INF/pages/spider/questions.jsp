<%@ page import="com.xuebang.o2o.business.entity.SpiderZhijiaoQuestion" %>
<%@ page import="org.springframework.boot.json.JsonParser" %>
<%@ page import="org.springframework.boot.json.BasicJsonParser" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--这个页面是徐稳用来导数据的，不要鸟它，过几天就被干掉了--%>
<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
<style>
    hr{
        margin: 50px 0;
        color: #000000;
    }
</style>
<title>初中数学人教版${pageNumber}(${start + 1}-${start + limit})</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
</head>

<body>
<div id="list">
    <c:forEach var="item" items="${list}">
        <%
            SpiderZhijiaoQuestion item = (SpiderZhijiaoQuestion) pageContext.getAttribute("item");
            JsonParser parser = new BasicJsonParser();
        %>
        <div class="row">
            【来源】${item.title}
            <div class="categories">【教材知识点体系】</div>
            <table>
                <%=item.getCategories().replaceAll("<\\/category>","</td>").replaceAll("<category","<td").replaceAll("<\\/item>","</tr>").replaceAll("<item", "<tr")%>
            </table>
            <div>【能力】<%=parser.parseMap(item.getQuesAbility()).get("Name")%></div>
            <div>【难度】<%=parser.parseMap(item.getQuesDiff()).get("Name")%></div>
            <div>【题型】<%=parser.parseMap(item.getQuesType()).get("Name")%></div>
            ${item.quesBody}
            ${item.quesAnswer}
            ${item.quesParse}
            <hr>
        </div>
    </c:forEach>
</div>
</body>
</html>
