<%@ page language='java' pageEncoding='utf-8'%>

<link rel='stylesheet' href='${ctx}/thirdpart/select2/css/select2.min.css'>
<link rel='stylesheet' href='${ctx}/static/css/admin/document/documentStatics.css'>
<link rel='stylesheet' href='${ctx}/static/component/multipleSelectPanel/css/multipleSelectPanel.css'>

<div class="row-fluid" id="branch_login_statics">
    <form class="form-inline">
        <div class="form-group">
            <label for="container_campus_branch01" class="control-label">分公司</label>
            <div style="display:inline-block;"><select id="container_campus_branch01" ></select></div>
        </div>
        <div class="form-group">
            <label for="container_campus_campus01" class="control-label">校区</label>
            <div style="display:inline-block;"><select id="container_campus_campus01" ></select></div>
        </div>
        <div class="form-group">
            <label for="login_start_date" class="control-label">开始时间</label>
            <input type="input" class="date" id="login_start_date" />
        </div>
        <div class="form-group">
            <label for="login_end_date" class="control-label">结束时间</label>
            <input type="input" class="date" id="login_end_date" />
        </div>
        <input type="button" class="btn btn-purple" value="查询" id="btn001"/>
        <input type="button" class="btn btn-purple" value="导出" id="btn0012"/>
    </form>
    <div class="h3">各公司登陆人次</div>
    <div class="row-fluid">
        <div class="row-fluid">

        </div>
        <div class="row-fluid" id="container_branch_login">

        </div>
    </div>
</div>

<div class="row-fluid" id="branch_usage_statics">
    <form class="form-inline">
        <div class="form-group">
            <label for="container_campus_branch02" class="control-label">分公司</label>
            <div style="display:inline-block;"><select id="container_campus_branch02" ></select></div>
        </div>
        <div class="form-group">
            <label for="container_campus_campus02" class="control-label">校区</label>
            <div style="display:inline-block;"><select id="container_campus_campus02" ></select></div>
        </div>
        <div class="form-group">
            <label for="usage_start_date" class="control-label">开始时间</label>
            <input type="input" class="date" id="usage_start_date" />
        </div>
        <div class="form-group">
            <label for="usage_end_date" class="control-label">结束时间</label>
            <input type="input" class="date" id="usage_end_date" />
        </div>
        <input type="button" class="btn btn-purple" value="查询" id="btn002"/>
    </form>
    <div class="h3">各公司共享平台和学科网使用情况</div>
    <div class="row-fluid">
        <div class="row-fluid">

        </div>
        <div class="row-fluid" id="container_branch_usage">

        </div>
    </div>
</div>

<script src='${ctx}/thirdpart/select2/js/select2.min.js'></script>
<script src='${ctx}/thirdpart/highcharts/js/highcharts.js'></script>
<script src="${ctx}/static/js/admin/user/userStatics.js"></script>
<script src='${ctx}/static/component/multipleSelectPanel/js/multipleSelectPanel.js'></script>
