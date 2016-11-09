<%@ page language='java' pageEncoding='utf-8'%>
<link rel='stylesheet' href='${ctx}/thirdpart/jqselectable/skin/selectable/style.css'>
<link rel='stylesheet' href='${ctx}/thirdpart/ztree/zTreeStyle/zTreeStyle.css'>
<link rel='stylesheet' href='${ctx}/thirdpart/jPaginate/css/style.css'>
<link rel='stylesheet' href='${ctx}/thirdpart/jqgrid/css/ui.jqgrid.css'>
<link rel='stylesheet' href='${ctx}/static/css/admin/document/documentList.css'>

<div class="search-top row">
    <div class="col1 col-sm-3">
        <button id="conditionStepSubjectBtn" class="btn btn-lg btn-purple" style="width: 100%;height: 100%;">
            <span class="glyphicon glyphicon-list" style="float: left;"></span>
            <span id="conditionStepSubjectDisplay" >学段 学科</span>
            <span class="glyphicon glyphicon-menu-down" style="float: right;"></span>
        </button>
        <select id="tag_top2_select" style="display: none;">
        </select>
    </div>
    <div class="col2 col-sm-9" >
        <%--<form id="documentSearchFrm" name="search" method="post" action="" onsubmit="return false;">--%>
            <%--<div class="form-group">--%>
                <%--<div class="input-group input-group-lg">--%>
                    <%--<input name="search_keyword" type="text" class="txt_search form-control" id="search_keyword" value="${searchText}" autocomplete="off" x-webkit-speech="" x-webkit-grammar="builtin:translate" placeholder="标题\内容" data-role="input">--%>
                    <%--<span class="input-group-btn">--%>
                        <%--<input class="btn btn-default" id="search_button" type="submit" value="搜 索" />--%>
                    <%--</span>--%>
                <%--</div>--%>
            <%--</div>--%>
        <%--</form>--%>
            <button class="btn btn-purple pull-right" id="refresh" />刷 新</div>
    </div>
</div>
<div class="row-fluid" id="sec_items">

</div>

<div class="row-fluid" id="content_list">

</div>


    <script src='${ctx}/thirdpart/jqselectable/js/jQselectable.js'></script>
    <script src='${ctx}/thirdpart/jqgrid/jquery.jqGrid.min.js'></script>
    <script src='${ctx}/thirdpart/jPaginate/jquery.paginate.js'></script>
    <script src='${ctx}/thirdpart/jqgrid/grid.locale-cn.js'></script>
    <script src="${ctx}/static/js/document/searchDocument.js"></script>
    <script src="${ctx}/static/js/admin/document/documentCheckList.js"></script>

    <script src="${ctx}/static/js/component/datagrid.js"></script>