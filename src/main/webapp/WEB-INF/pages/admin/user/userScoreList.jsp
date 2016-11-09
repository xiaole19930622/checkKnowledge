<%@ page language='java' pageEncoding='utf-8'%>
<link rel='stylesheet' href='${ctx}/thirdpart/jPaginate/css/style.css'>
<link rel='stylesheet' href='${ctx}/thirdpart/jqgrid/css/ui.jqgrid.css'>
<link rel='stylesheet' href='${ctx}/thirdpart/select2/css/select2.min.css'>
<link rel='stylesheet' href='${ctx}/static/component/multipleSelectPanel/css/multipleSelectPanel.css'>

<div id="container_user_list">
    <form class="form-inline">
        <div class="form-group">
            <label for="container_campus" class="control-label">校区</label>
            <div style="display:inline-block;"><select id="container_campus" ></select></div>
        </div>

        <div class="form-group">
            <label for="container_name" class="control-label">姓名</label>
            <input type="input" class="date" style="height:35px;" id="container_name" />
        </div>

        <input type="button" class="btn btn-purple" value="查询" id="btn001"/>

        <a class="btn btn-purple pull-right" href="javascript:showScoreModifyRecord()">查看积分修改记录</a>
    </form>

    <div class="row-fluid" id="user_list">

    </div>
</div>

<div id="container_record_list"></div>

<script>
    var adminId = '<%=RealmUtils.getCurrentUserId()%>';
</script>

<script src='${ctx}/thirdpart/jqgrid/jquery.jqGrid.min.js'></script>
<script src='${ctx}/thirdpart/jPaginate/jquery.paginate.js'></script>
<script src='${ctx}/thirdpart/jqgrid/grid.locale-cn.js'></script>
<script src="${ctx}/static/js/admin/user/userScoreList.js"></script>
<script src="${ctx}/static/js/component/datagrid.js"></script>
<script src='${ctx}/thirdpart/select2/js/select2.min.js'></script>
<script src='${ctx}/static/component/multipleSelectPanel/js/multipleSelectPanel.js'></script>