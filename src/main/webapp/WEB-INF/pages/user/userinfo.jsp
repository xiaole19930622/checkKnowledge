<%@ page language='java' pageEncoding='utf-8' %>
<%@include file="../header.jsp" %>
<link rel="stylesheet" href="${ctx}/thirdpart/Jcrop-0.9.12/css/jquery.Jcrop.css">
<link rel='stylesheet' href='${ctx}/thirdpart/select2/css/select2.min.css'>
<link rel="stylesheet" href="${ctx}/thirdpart/jqselectable/skin/selectable/style.css" >
<%--<link rel='stylesheet' href='${ctx}/thirdpart/jqPagination/css/jqpagination.css'>--%>
<link rel='stylesheet' href='${ctx}/thirdpart/jPaginate/css/style.css'>
<link rel="stylesheet" href="${ctx}/static/css/userCenter/userCenter.css">
</head>
<body>
<%@include file="../nav.jsp" %>
<ol class="breadcrumb" style="margin-bottom: 0px;">
    <li><a href="${ctx}/index">教学资源共享平台</a></li>
    <li style="display: inline-block;color: #777;">个人中心</li>
</ol>
<div class="container-fluid" style="max-width: 80%;">
    <div class="row" style="padding-top: 20px;">
        <div class="col-md-3 table-bordered">
            <div class="img-center">
                <%-- <div class="thumbnail">
                     <img  src="http://himg.bdimg.com/sys/portraitn/item/30a767756f736869626f313336ba09"/>
                 </div>--%>
                <p class="pusername">${user.name}老师，您好</p>

                <div class="thumbnail">
                    <a href="javascript:void(0)" class="thumbnail" onclick="$('#picture').modal('show');">
                        <img src="${user.pictureUrlDisplay != null ? user.pictureUrlDisplay : 'http://xuebangsoft-tools.oss-cn-shenzhen.aliyuncs.com/defaultIcon.gif'}" style="width: 154px;height: 154px" alt="个人头像">
                    </a>

                    <p class="changeimg">点击头像可以更换</p>
                </div>

            </div>

            <div class="list-group" id="nav_list">
                <a href="javascript:void(0)" class="text-center list-group-item active"  onclick="myCollection.initListGrid();">
                    我的收藏
                </a>
                <a href="javascript:void(0)" onclick="myContribution.initListGrid();"
                   class="text-center list-group-item ">我的贡献</a>
                <a href="javascript:void(0)" class="text-center list-group-item "  onclick="myDownload.initListGrid();">我的下载</a>
                <a href="javascript:void(0)" class="text-center list-group-item "  onclick="myMessage.initListGrid();">我的消息</a>
            </div>
        </div>
        <div class="col-md-9">
            <div class="panel panel-default">
                <!-- Default panel contents -->
                <div class="panel-heading">基本信息
                    <div id="editInfo" class="btn btn-default btn-sm col-md-offset-10" style="display: inline-block" >编辑资料</div>
                    <div id="saveInfo" class="btn btn-default btn-sm col-md-offset-10" style="display: inline-block" >保存资料</div>
                </div>

                <div class="panel-body">
                    <div class="selectBody container-fluid">


                    </div>

                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-3 baseinfo">
                                积分
                            </div>
                            <div class="col-md-3 baseinfo">贡献资源数</div>
                            <div class="col-md-3 baseinfo">被下载数</div>
                            <div class="col-md-3 baseinfo">下载文档数</div>
                        </div>

                        <div class="row">
                            <div class="col-md-3 baseNumber">
                                <%--${user.score == null ? 0 : user.score}--%>
                                    ${myDownloadedCount}
                            </div>
                            <div class="col-md-3 baseNumber">${myDocumentsCount}</div>
                            <div class="col-md-3 baseNumber">${myDownloadedCount}</div>
                            <div class="col-md-3 baseNumber">${myDownloadCount}</div>
                        </div>

                    </div>


                </div>

                <!-- Table -->
                <%--<table id="document" style="table-layout:fixed;" class="table  table-hover table-striped">
                    <thead class="theading">
                    <tr>
                        <th ><input id="selectAll"  type="checkbox"></th>
                        <th class="fontColor">文档名称</th>
                        <th class="fontColor" id="readingAmountOrCategory">分类</th>
                        <th class="fontColor" id="downloadAmount">文件类型</th>
                        <th class="fontColor" id="areaOrscore">地区</th>
                        <th class="fontColor" id="orgOrRank">来源</th>
                        <th class="fontColor" id="time">上传时间</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        &lt;%&ndash;<td class="name">10</td>
                        <td class="tags">25</td>
                        <td class="type">256</td>
                        <td class="areaCode">98</td>
                        <td class="organization">98</td>
                        <td class="createTime">98</td>&ndash;%&gt;
                    </tr>

                    </tbody>

                </table>--%>


            </div>
            <button style="background-color: #a489da" id='doBatchCancelCollecting' class='btn btn-default col-md-offset-11 btn-sm' onclick='information.doBatchCancelCollecting();' >取消收藏</button>
            <div  id="myCollection">
            </div>

            <button id="deleteDownloadRecord" class='btn btn-default col-md-offset-10 btn-sm' onclick='javascript:{this.disabled=true;information.doBatchDownloadLogicDelete();}' >删除下载记录</button>
            <div id="myContribution"></div>
            <div id="myDownload"></div>

            <button id="deleteMyMessage" class="btn btn-default col-md-offset-10 btn-sm" onclick="javascript:{this.disabled=true;information.doBatchMyMessage();}">删除消息记录</button>
            <div id="myMessage"></div>
           <%-- <div>
                <ul class="document-list ul-no-style list-group">
                </ul>
                <div class="pagination">
                    <a href="#" class="first" data-action="first">&laquo;</a>
                    <a href="#" class="previous" data-action="previous">&lsaquo;</a>
                    <input type="text" readonly="readonly" data-max-page="1"/>
                    <a href="#" class="next" data-action="next">&rsaquo;</a>
                    <a href="#" class="last" data-action="last">&raquo;</a>
                </div>
            </div>--%>


        </div>
    </div>
</div>


<div class="modal fade" data-backdrop="static" id="picture" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content" style="width: 850px;height: 600px;">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                    &times;
                </button>
                <h4 class="modal-title">更换头像</h4>
            </div>

            <div class="modal-body" style="padding-left:10px;padding-right:10px; width: 800px;height: 480px;">
                <%--<img src="http://himg.bdimg.com/sys/portraitn/item/30a767756f736869626f313336ba09" style="height: 100px; width: 50%; display: block;" class="img-responsive center-block" alt="上传图片">--%>
                <div id="dropArea">
                    <input type="file" id="addFile" style="display: none" accept=".jpeg,.png,.gif,.jpg">
                </div>
                <div id="editPic" class="container">
                    <div class="row">
                        <div><img src="" id="target"/></div>

                        <div id="preview-pane">
                            <div class="preview-container">
                                <img src="" class="jcrop-preview" id="preview"/>
                            </div>
                        </div>

                    </div>
                </div>

                <form id="saveCutedPic" action="${ctx}/user/confirmUpload">
                    <input type="hidden" name="x" id="x"/>
                    <input type="hidden" name="y" id="y"/>
                    <input type="hidden" name="finalWidth" id="width"/>
                    <input type="hidden" name="finalHeight" id="height"/>
                </form>

            </div>

            <div class="modal-footer">
                <button id="uploadPicture" class="btn  btn-warning ">选择照片
                </button>
                <button id="picSubmit" type="button" class="btn btn-primary" onclick=""
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


<script>
    var user ='${user.id}';
</script>

<script src="${ctx}/thirdpart/Jcrop-0.9.12/js/jquery.Jcrop.min.js"></script>
<script src='${ctx}/thirdpart/select2/js/select2.full.min.js'></script>
<script src="${ctx}/thirdpart/jqselectable/js/jQselectable.js"></script>
<script src='${ctx}/thirdpart/jPaginate/jquery.paginate.js'></script>
<script src='${ctx}/thirdpart/dmuploader-0.1/src/dmuploader.min.js'></script>
<script type='text/javascript' src="${ctx}/static/js/user/userCentre.js"></script>
<script src="${ctx}/static/js/component/datagrid.js"></script>
<%@include file="../footer.jsp" %>
</body>
</html>
