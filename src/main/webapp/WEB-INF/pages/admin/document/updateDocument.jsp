<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ page language='java' pageEncoding='utf-8'%>
<link rel='stylesheet' href='${ctx}/thirdpart/select2/css/select2.min.css'>
<link rel='stylesheet' href='${ctx}/thirdpart/ztree/zTreeStyle/zTreeStyle.css'>
<link rel='stylesheet' href='${ctx}/thirdpart/jPaginate/css/style.css'>

<div class="container-fluid">
                <form id="fm"  >
                    <div id="fileInfos" class="row" >
                        <div class="container-fluid  table-bordered">


                            <div class="row" style="display: block;margin-top: 10px;">
                                <div class="col-md-7">
                                    <input type="hidden" name="id" value="${document.id}">
                                    <input type="hidden" name="checkStatus" value="${document.checkStatus}">

                                    <div class="form-group row">
                                        <label class="col-md-4 control-label text-right">*标题：</label>

                                        <div class="col-md-8">
                                            <input name="name" id="name" class="name form-control" placeholder="文档名称" value="${document.name}">
                                        </div>

                                    </div>
                                    <div class="form-group row">
                                        <label class="col-md-4 control-label text-right">简介：</label>

                                        <div class="col-md-8">
                                         <textarea name="description" class="form-control"
                                          placeholder="填写文档简介，能帮助文档传播更久">${document.description}</textarea>
                                        </div>


                                    </div>
                                    <div class="form-group row">
                                        <label class="col-md-4 control-label text-right">*类型：</label>

                                        <div class="col-md-8">
                                            <div class="input-group">
                                                <input name="type" type="hidden" class="typeId" value="${document.type.id}">
                                                <input type="text" class="form-control typeOfDocument" readonly="readonly" value="${document.type.name}">

                                                <div class="input-group-btn">
                                                    <button class="btn btn-default" type="button">选择类型</button>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div class="form-group row  ${document.type.id.substring(0,2) != '19' ? "hide" : null} ">
                                        <label class="col-md-4 control-label text-right">*年级：</label>

                                        <div class="col-md-8">
                                            <div class="input-group">
                                                <select class="form-control year" name="grade">
                                                    <c:forEach items="${requestScope.grade}" var="g" >
                                                        <option value="${g.id}"    <c:if test="${document.grade.id == g.id}"> selected </c:if>>${g.name}</option>
                                                    </c:forEach>
                                                </select>
                                            </div>
                                        </div>

                                    </div>
                                    <div class="form-group  row ${document.type.id.substring(0,2) == '19' ? "hide" : null}">
                                        <label class="col-md-4 control-label text-right">*标签：</label>

                                        <div class="col-md-8">
                                            <div class="input-group">
                                                <input name="tag" type="hidden" value="${document.tags[0].id}"  >
                                                <input type="text" class="form-control tagOfDocument" readonly="readonly" value="${document.tags[0].name}" >

                                                <div class="input-group-btn">
                                                    <button class="btn btn-default " type="button">选择标签</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-1">

                                </div>


                                <div class="col-md-4">
                                    <div class="form-group row   ${document.type.id.substring(0,2) != '19' ? "hide" : null}">
                                        <label class="col-md-4 control-label text-right">*科目：</label>

                                        <div class="col-md-8">
                                            <div class="input-group">
                                                <select class="form-control year" name="subject">
                                                    <c:forEach items="${requestScope.subject}" var="s" >
                                                        <option value="${s.id}"    <c:if test="${document.subject.id == s.id}"> selected </c:if>>${s.name}</option>
                                                    </c:forEach>
                                                </select>
                                            </div>
                                        </div>

                                    </div>
                                    <div class="form-group row">
                                        <label class="col-md-4 control-label text-right">*地区：</label>

                                        <div class="col-md-8">
                                            <div class="input-group">
                                                <%--<input name="areaCode" type="hidden" id="areaCode" value="${document.areaCode.id}">--%>
                                                <%--<input type="text" class="form-control areaCode" readonly="readonly" value="${document.areaCode.name}">--%>

                                                <%--<div class="input-group-btn">--%>
                                                    <%--<button class="btn btn-default " type="button">选择地区</button>--%>
                                                <%--</div>--%>
                                                <select name="areaCode"  id="areaCode"  value="${fn:length(document.areaCode.id) >= 4 ?document.areaCode.id.substring(0,4)  : document.areaCode.id }" class="form-control">
                                                    <option value="4419" >东莞</option>
                                                    <option value="4406">佛山</option>
                                                    <option value="4499">顺德</option>
                                                    <option value="4413">惠州</option>
                                                    <option value="4420">中山</option>
                                                    <option value="4407">江门</option>
                                                    <option value="4404">珠海</option>
                                                    <option value="5301">昆明</option>
                                                    <option value="3601">南昌</option>
                                                    <option value="3401">合肥</option>
                                                    <option value="3702">青岛</option>
                                                    <option value="3310">台州</option>
                                                    <option value="3301">杭州</option>
                                                    <option value="3205">苏州</option>
                                                    <option value="3202">无锡</option>
                                                    <option value="3204">常州</option>
                                                    <option value="3210">扬州</option>
                                                    <option value="4408">湛江</option>
                                                    <option value="6101">西安</option>
                                                    <option value="3501">福州</option>
                                                    <option value="4301">长沙</option>
                                                    <option value="5201">贵阳</option>
                                                    <option value="3303">温州</option>
                                                    <option value="3206">南通</option>
                                                    <option value="2102">大连</option>
                                                    <option value="1501">呼和浩特</option>
                                                    <option value="4101">郑州</option>
                                                    <option value="4403">深圳</option>
                                                    <option value="3307">金华</option>
                                                    <option value="3306">绍兴</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>


                                    <div class="form-group row">
                                        <label class="col-md-4 control-label text-right">*来源：</label>

                                        <div class="col-md-8">
                                            <div class="input-group">
                                                <input name="organization" type="hidden" id="organization" value="${document.organization.id}">
                                                <input type="text" class="form-control organization" readonly="readonly" value="${document.organization.name}" >

                                                <div class="input-group-btn">
                                                    <button class="btn btn-default" type="button">选择来源</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="form-group row hide">
                                        <label class="col-md-4 control-label text-right">*年份：</label>

                                        <div class="col-md-8">
                                            <div class="input-group">
                                                <select class="form-control year" name="year">
                                                    <option value="-1"></option>
                                                    <c:forEach var="item" begin="2000" end="2100">
                                                        <option value="${item}" <c:if test="${document.year == item}"> selected="selected" </c:if>>${item}</option>
                                                    </c:forEach>
                                                </select>
                                            </div>
                                        </div>


                                    </div>

                                    <div class="form-group row hide">
                                        <label class="col-md-4 control-label text-right">*难度：</label>

                                        <div class="col-md-8">
                                            <div class="input-group">
                                                <select class="form-control difficulty" name="difficulty">
                                                    <option value="-1" <c:if test="${document.difficulty == -1}"> selected="selected" </c:if>></option>
                                                    <option value="1" <c:if test="${document.difficulty == 1}"> selected="selected" </c:if>>难</option>
                                                    <option value="2" <c:if test="${document.difficulty == 2}"> selected="selected" </c:if>>中</option>
                                                    <option value="3" <c:if test="${document.difficulty == 3}"> selected="selected" </c:if>>易</option>
                                                </select>

                                            </div>
                                        </div>

                                    </div>
                                    <div class="form-group row ">
                                        <label class="col-md-4 control-label text-right">*官方推荐：</label>

                                        <div class="col-md-8">
                                            <div class="input-group">
                                                <select class="form-control isOfficial" name="isOfficial">
                                                    <option value="0" <c:if test="${document.isOfficial == 0}"> selected="selected" </c:if>>非官方</option>
                                                    <option value="1" <c:if test="${document.isOfficial == 1}"> selected="selected" </c:if>>官方</option>
                                                </select>

                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row text-center">
                        <button id="saveFileInfo" class="btn btn-default" type="button" >保存修改</button>
                    </div>
                </form>
            </div>

<div class="modal fade" data-backdrop="static" id="selectType" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                    &times;
                </button>
                <h4 class="modal-title">选择类型</h4>
            </div>
            <div class="modal-body" style="padding-left:10px;padding-right:10px;">
                <form action="" class="form-horizontal" novalidate="novalidate">
                    <fieldset>
                        <div class="zsd-tree-div">
                            <ul id="zsdTree" class="ztree col-md-12 padding-left-10"></ul>
                        </div>
                    </fieldset>
                </form>
            </div>
            <div class="modal-footer">

                <button type="button" class="btn btn-primary" onclick="onSubmitType(this);"
                        data-loading-text="提交中...">
                    确定
                </button>
                <button type="button" class="btn btn-default" data-dismiss="modal">
                    取消
                </button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" data-backdrop="static" id="selectTag" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel"
     aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                    &times;
                </button>
                <h4 class="modal-title">选择标签</h4>
            </div>
            <div class="modal-body" style="padding-left:10px;padding-right:10px;">
                <form action="" class="form-horizontal" novalidate="novalidate">
                    <fieldset>
                        <div class="zsd-tree-div">
                            <ul id="zsdTreeOfTag" class="ztree col-md-12 padding-left-10"></ul>
                        </div>
                    </fieldset>
                </form>
            </div>
            <div class="modal-footer">

                <button type="button" class="btn btn-primary" onclick="onSubmitTags(this);"
                        data-loading-text="提交中...">
                    确定
                </button>
                <button type="button" class="btn btn-default" data-dismiss="modal">
                    取消
                </button>
            </div>
        </div>
    </div>
</div>


<div class="modal fade" data-backdrop="static" id="selectAreaCode" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                    &times;
                </button>
                <h4 class="modal-title">选择地区</h4>
            </div>
            <div class="modal-body" style="padding-left:10px;padding-right:10px;">
                <form action="" class="form-horizontal" novalidate="novalidate">
                    <fieldset>
                        <div class="zsd-tree-div">
                            <ul id="zsdTreeOfAreaCode" class="ztree col-md-12 padding-left-10"></ul>
                        </div>
                    </fieldset>
                </form>
            </div>
            <div class="modal-footer">

                <button type="button" class="btn btn-primary" onclick="onSubmitAreaCode(this);"
                        data-loading-text="提交中...">
                    确定
                </button>
                <button type="button" class="btn btn-default" data-dismiss="modal">
                    取消
                </button>
            </div>
        </div>
    </div>
</div>


<div class="modal fade" data-backdrop="static" id="selectOrganization" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                    &times;
                </button>
                <h4 class="modal-title">选择来源</h4>
            </div>
            <div class="modal-body" style="padding-left:10px;padding-right:10px;">
                <form action="" class="form-horizontal" novalidate="novalidate">
                    <fieldset>
                        <div class="zsd-tree-div">
                            <ul id="zsdTreeOfOrganization" class="ztree col-md-12 padding-left-10"></ul>
                        </div>
                    </fieldset>
                </form>
            </div>
            <div class="modal-footer">

                <button type="button" class="btn btn-primary" onclick="onSubmitOrganization(this);"
                        data-loading-text="提交中...">
                    确定
                </button>
                <button type="button" class="btn btn-default" data-dismiss="modal">
                    取消
                </button>
            </div>
        </div>
    </div>
</div>

<script src='${ctx}/thirdpart/select2/js/select2.min.js'></script>
<script src='${ctx}/thirdpart/jqgrid/jquery.jqGrid.min.js'></script>
<script src='${ctx}/thirdpart/jPaginate/jquery.paginate.js'></script>
<script src='${ctx}/thirdpart/jqgrid/grid.locale-cn.js'></script>
<script src='${ctx}/thirdpart/ztree/jquery.ztree.all-3.5.min.js'></script>
<script src="${ctx}/static/js/admin/document/updateDocument.js"></script>
<script>
    //地区选择回显
    var areaCode =  $("#areaCode").attr("value");
    console.log(areaCode);
    var areaOptions = $("#areaCode").children();
    $.each(areaOptions,function(i,item){
        var value = item.value;
        var name = item.text;
        if(value == areaCode){
            $(this).attr("selected",true);
        }
    })
</script>
</body>
</html>
