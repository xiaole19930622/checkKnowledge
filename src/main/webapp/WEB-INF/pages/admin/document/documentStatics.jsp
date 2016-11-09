<%@ page language='java' pageEncoding='utf-8'%>


<link rel='stylesheet' href='${ctx}/thirdpart/select2/css/select2.min.css'>
<link rel='stylesheet' href='${ctx}/static/css/admin/document/documentStatics.css'>
<link rel='stylesheet' href='${ctx}/static/component/multipleSelectPanel/css/multipleSelectPanel.css'>

<div class="row-fluid" id="brench_statics">
    <form class="form-inline">
        <div class="form-group">
            <label for="select1" class="control-label">学段学科</label>
            <div style="display:inline-block;"><select id="select1" ></select></div>
        </div>
        <div class="form-group">
            <label for="dt_type1" class="control-label">文件类型</label>
            <div style="display:inline-block;"><select id="dt_type1" ></select></div>
        </div>
        <div class="form-group">
            <label for="dt_organize11" class="control-label">开始时间</label>
            <input type="input" class="date" id="dt_organize11" />
        </div>
        <div class="form-group">
            <label for="dt_organize12" class="control-label">结束时间</label>
            <input type="input" class="date" id="dt_organize12" />
        </div>
        <input type="button" class="btn btn-purple" value="查询" id="btn001"/>
        <input type="button" class="btn btn-purple" value="导出" id="btn0012"/>
        <input type="button" class="btn btn-purple" value="各公司下载量导出" id="btn0013"/>
    </form>
    <div class="h3">各公司资源上传情况</div>
    <div class="row-fluid">
        <div class="row-fluid">

        </div>
        <div class="row-fluid" id="container_brench">

        </div>
    </div>
</div>
<div class="row-fluid" id="campus_statics">
    <form class="form-inline">
        <div class="form-group">
            <label for="container_campus_brench23" class="control-label">分公司</label>
            <div style="display:inline-block;"><select id="container_campus_brench23" ></select></div>
        </div>
        <div class="form-group">
            <label for="select2" class="control-label">学段学科</label>
            <div style="display:inline-block;"><select id="select2" ></select></div>
        </div>
        <div class="form-group">
            <label for="dt_type2" class="control-label">文件类型</label>
            <div style="display:inline-block;"><select id="dt_type2" ></select></div>
        </div>
        <div class="form-group">
            <label for="dt_organize21" class="control-label">开始时间</label>
            <input type="input" class="date" id="dt_organize21" />
        </div>
        <div class="form-group">
            <label for="dt_organize22" class="control-label">结束时间</label>
            <input type="input" class="date" id="dt_organize22" />
        </div>
        <input type="button" class="btn btn-purple" value="查询" id="btn002"/>
    </form>

    <div class="h3">各校区资源上传情况</div>
    <div class="row-fluid">
        <div class="row-fluid">

        </div>
        <div class="row-fluid" id="container_campus">

        </div>
    </div>
</div>
<div class="row-fluid" id="brench_statics_detail">
    <form class="form-inline">
        <div class="form-group">
            <label for="container_campus_brench33" class="control-label">分公司</label>
            <div style="display:inline-block;"><select id="container_campus_brench33" ></select></div>
        </div>
        <div class="form-group">
            <label for="container_campus_campus43" class="control-label">校区</label>
            <div style="display:inline-block;"><select id="container_campus_campus43" ></select></div>
        </div>
        <div class="form-group">
            <label for="select3" class="control-label">学段学科</label>
            <div style="display:inline-block;"><select id="select3" ></select></div>
        </div>
        <div class="form-group">
            <label for="dt_type3" class="control-label">文件类型</label>
            <div style="display:inline-block;"><select id="dt_type3" ></select></div>
        </div>
        <div class="form-group">
            <label for="dt_organize31" class="control-label">开始时间</label>
            <input type="input" class="date" id="dt_organize31" />
        </div>
        <div class="form-group">
            <label for="dt_organize32" class="control-label">结束时间</label>
            <input type="input" class="date" id="dt_organize32" />
        </div>
        <input type="button" class="btn btn-purple" value="查询" id="btn003"/>
    </form>
    <div class="h3">各公司资源上传情况</div>
    <div class="row-fluid">
        <div class="row-fluid">

        </div>
        <div class="row-fluid" id="container_brench_detail">
            <table class="table table-bordered">
                <thead>
                <th>姓名</th>
                <th>组织架构</th>
                <th>上传数量</th>
                </thead>
                <tbody>

                </tbody>
            </table>
        </div>
    </div>
</div>
<script src='${ctx}/thirdpart/select2/js/select2.min.js'></script>
<script src='${ctx}/thirdpart/highcharts/js/highcharts.js'></script>
<script src="${ctx}/static/js/admin/document/documentStatics.js"></script>
<script src='${ctx}/static/component/multipleSelectPanel/js/multipleSelectPanel.js'></script>

