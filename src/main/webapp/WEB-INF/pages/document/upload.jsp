<%@ page language='java' pageEncoding='utf-8' %>
<%@include file="../header.jsp" %>
<link rel='stylesheet' href='${ctx}/thirdpart/ztree/zTreeStyle/zTreeStyle.css'>
<link rel="stylesheet" type="text/css" href="${ctx}/static/css/document/framework.css"/>
<link rel="stylesheet" type="text/css" href="${ctx}/static/css/document/base.css"/>
<link rel="stylesheet" type="text/css" href="${ctx}/static/css/document/_upload.css"/>
<link rel="stylesheet" type="text/css" href="${ctx}/static/css/document/upload.css"/>
<link rel="stylesheet" type="text/css" href="${ctx}/static/component/multipleSelectPanel/css/multipleSelectPanel.css">

</head>
<body>
<%@include file="../nav.jsp" %>

<%--
<div style="opacity: 1;" class="nav_up" id="nav_up"></div>
<div style="opacity: 1;" class="nav_down" id="nav_down"></div>
--%>

<ol class="breadcrumb">
    <li><a href="${ctx}/index">教学资源库</a></li>
    <li class="active">文档上传</li>
</ol>

<div id="content">

<div class="body">
    <div class="main">
        <div id="upload-ext-info-container" class="task-info upload-ext-info-container mb10" style="display:none;">
        </div>
        <div id="upload-widget" class="upload-widget">
            <div id="upload-flash-container" class="upload-flash-container" style="display:none;"></div>
            <div id="upload-init-container">
                <div class="mod mod-upload">
                    <div id="dropArea" class="bd">

                        <input id="addFile" type="file" name="files[]" multiple="multiple" title='点击添加文件'
                               accept=".doc,.docx,.ppt,.pptx,.xls,.xlsx,.vsd,.pot,.rtf,.wps,.pdf,.txt,.swf,.mp3,.wav,.mp4"
                               style="display: none">

                        <button id="uploadMyDocument" class="btn btn-lg btnColorSubmit " style="margin-top: 45px;">上传我的文档
                        </button>

                        <p class="text-center"><b>支持多文件上传</b></p>
                    </div>
                </div>
                <p class="up-tips">从我的电脑选择要上传的文档，也可以把文件直接拖动到框内</p>

                <div class="upload-notice">
                    <h4>温馨提示</h4>
                    <ol>
                        <li>1.您可以上传日常积累和撰写的文档资料，如模板、总结，每份≤2GB，支持多种文档类型：</li>
                        <li class="doc-type"><b class="ic ic-doc mr5"></b>doc,docx<b class="ic ic-ppt ml10 mr5"></b>ppt,pptx<b
                                class="ic ic-xls ml10 mr5"></b>xls,xlsx<b class="ic ic-vsd ml10 mr5"></b>vsd<b
                                class="ic ic-pot ml10 mr5"></b>pot<b
                                class="ic ic-rtf ml10 mr5"></b>rtf<br/><b class="ic ic-wps mr5"></b>wps<b class="ic ic-pdf ml10 mr5"></b>pdf<b
                                class="ic ic-txt ml10 mr5"></b>txt,swf,MP3,WAV,MP4,FLV
                        </li>
                        <li>2.为营造绿色网络环境，严禁上传含有淫秽色情及低俗信息等文档，让我们一起携手共同打造健康文库</li>
                    </ol>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="upload-widget">
    <div class="container-fluid">
        <div class="row table-bordered" style="padding: 20px 15%;">
            <div class="col-md-8">
                <h3 style="font-size: 28pt;color: #3a3230;">您有<span id="successfulFileCount" class="text-danger">0</span>篇文档上传成功</h3>
            </div>
        </div>
    </div>
    <div class="container-fluid">
        <form id="fm" action="${ctx}/document/confirmUpload" method="post">
            <div id="fileInfos" class="row" >
                <div class="container-fluid  table-bordered">
                    <label class="label label-success">1</label>
                    <label class="label label-success">名字.txt</label>

                    <div class="row" style="display: block;margin-top: 10px;">
                        <div class="col-md-8">
                            <input type="hidden" name="fileKey">

                            <div class="form-group row">
                                <label class="col-md-3 control-label text-right">上传进度：</label>

                                <div class="col-md-9">
                                    <div class="progress">
                                        <div class="progress-bar progress-bar-success progress-bar-striped"
                                             role="progressbar"
                                             aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"
                                             style="width: 0%;">
                                            0%
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-md-3 control-label text-right">上传状态：</label>

                                <div class="col-md-9">
                                    <span name="uploadStatus" class="text-info">正在上传</span>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-md-3 control-label text-right">*标题：</label>

                                <div class="col-md-9">
                                    <input name="name"  class="name form-control"  placeholder="文档名称" >
                                </div>

                            </div>
                            <div class="form-group row">
                                <label class="col-md-3 control-label text-right">简介：</label>

                                <div class="col-md-9">
                                <textarea name="description" class="form-control"
                                          placeholder="填写文档简介，能帮助文档传播更久" ></textarea>
                                </div>


                            </div>
                            <div class="form-group row typeOfDocument">
                                <label class="col-md-3 control-label text-right">*类型：</label>

                                <div class="col-md-9">
                                    <div class="input-group">
                                        <%--<input name="type" type="hidden" class="typeId" required>--%>
                                       <%-- <input type="text" name="typeDisplay"  readonly="readonly" class="form-control typeOfDocument" >

                                        <div class="input-group-btn">
                                            <button class="btn btn-default btnReset" type="button">选择类型</button>
                                        </div>--%>
                                        <select name="type" class="typeId"></select>
                                    </div>
                                </div>

                            </div>

                            <div class="form-group row  hide gradeOfDocument">
                                <label class="col-md-3 control-label text-right">*年级：</label>

                                <div class="col-md-9">
                                    <div class="input-group">
                                        <%--<input name="type" type="hidden" class="typeId" required>--%>
                                        <%-- <input type="text" name="typeDisplay"  readonly="readonly" class="form-control typeOfDocument" >

                                         <div class="input-group-btn">
                                             <button class="btn btn-default btnReset" type="button">选择类型</button>
                                         </div>--%>
                                        <select name="grade" class="gradeId"></select>
                                    </div>
                                </div>

                            </div>

                            <div class="form-group row  hide subjectOfDocument">
                                <label class="col-md-3 control-label text-right">*科目：</label>

                                <div class="col-md-9">
                                    <div class="input-group">
                                        <%--<input name="type" type="hidden" class="typeId" required>--%>
                                        <%-- <input type="text" name="typeDisplay"  readonly="readonly" class="form-control typeOfDocument" >

                                         <div class="input-group-btn">
                                             <button class="btn btn-default btnReset" type="button">选择类型</button>
                                         </div>--%>
                                        <select name="subject" class="subjectId"></select>
                                    </div>
                                </div>

                            </div>

                            <div class="form-group row hide year">
                                <label class="col-md-3 control-label text-right">*年份：</label>

                                <div class="col-md-9">
                                    <div class="input-group">
                                        <select class="year form-control col-md-1" name="year" style="width: 110px;">
                                            <c:forEach var="item" items="${conditionYears}">
                                                <option value="${item}">${item}</option>
                                            </c:forEach>
                                            <option value="-1">更早以前</option>
                                        </select>
                                    </div>
                                </div>


                            </div>

                            <div class="form-group row hide difficulty">
                                <label class="col-md-3 control-label text-right">*难度：</label>

                                <div class="col-md-9">
                                    <div class="input-group">
                                        <select class="difficulty form-control col-md-1" style="width: 110px;" name="difficulty">
                                            <option value="-1"></option>
                                            <option value="1">难</option>
                                            <option value="2">中</option>
                                            <option value="3">易</option>
                                        </select>

                                    </div>
                                </div>

                            </div>

                            <div class="form-group row tagOfDocument">
                                <label class="col-md-3 control-label text-right">*标签：</label>

                                <div class="col-md-9">
                                    <div class="input-group">
                                        <%--<input name="tag" type="hidden" value="${userGrade}" >
                                        <input type="text" name="tagDisplay"   readonly="readonly" class="form-control tagOfDocument" title="${tagName}" value="${tagName}">

                                        <div class="input-group-btn">
                                            <button class="btn btn-default btnReset" type="button">选择标签</button>
                                        </div>--%>

                                        <select name="tag" ></select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-1">
                            <label id="noupload" name="no_upload" type="button" class="btn-warning every-noupload" onclick="javascript:noupload(this);" rowid="fileInfo">取消</label>
                        </div>
                        <div class="col-md-8 ">
                            <div class="form-group row areaCode ">
                                <label class="col-md-3 control-label text-right">*地区：</label>

                                <div class="col-md-9">
                                    <div class="input-group">
                                        <%--<input name="areaCode" type="hidden" id="areaCode">
                                        <input type="text" name="areaCodeDisplay" readonly="readonly" class="form-control areaCode"  >

                                        <div class="input-group-btn">
                                            <button class="btn btn-default btnReset" type="button">选择地区</button>
                                        </div>--%>

                                        <select name="areaCode" class="areaCodeId" ></select>
                                    </div>
                                </div>
                            </div>

                            <%--<div class="form-group row">
                                <label class="col-md-4 control-label text-right">*来源：</label>

                                <div class="col-md-8">
                                    <div class="input-group">
                                        <input name="organization" type="hidden" id="organization">
                                        <input type="text" name="organizationDisplay"  readonly="readonly" class="form-control organization"  >

                                        <div class="input-group-btn">
                                            <button class="btn btn-default btnReset" type="button">选择来源</button>
                                        </div>
                                    </div>
                                </div>
                            </div>--%>

                        </div>
                    </div>
                </div>
            </div>

            <div class="row text-center">
                <button id="confirmUpload" class="btn btn-default btnColorSubmit" type="submit" style="display: none;">完成上传</button>
                <button id="cancel" type="button" class="btn btn-warning" style="display: none;">取消上传</button>
            </div>
        </form>
    </div>

</div>
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

                <button type="button" class="btn btnColorSubmit" onclick="onSubmitType(this);"
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

                <button type="button" class="btn btnColorSubmit" onclick="onSubmitTags(this);"
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

                <button type="button" class="btn btnColorSubmit" onclick="onSubmitAreaCode(this);"
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


<%--<div class="modal fade" data-backdrop="static" id="selectOrganization" tabindex="-1" role="dialog"
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

                <button type="button" class="btn btnColorSubmit" onclick="onSubmitOrganization(this);"
                        data-loading-text="提交中...">
                    确定
                </button>
                <button type="button" class="btn btn-default" data-dismiss="modal">
                    取消
                </button>
            </div>
        </div>
    </div>
</div>--%>
<script>
    var tagId='${userGrade}';
    var tagName='${tagName}';
    var areaCodeId='${areaCode}';
    var areaCodeNames='${areaCodeNames}';
    //isok
    var isok='${isok}';

</script>
<script src='${ctx}/thirdpart/ztree/jquery.ztree.all-3.5.min.js'></script>
<script src='${ctx}/thirdpart/dmuploader-0.1/src/dmuploader.min.js'></script>
<script src="${ctx}/static/component/multipleSelectPanel/js/multipleSelectPanel.js"></script>
<script type='text/javascript' src="${ctx}/static/js/document/upload.js"></script>
<%@include file="../footer.jsp" %>
</body>
</html>
