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



<div class="container" style="min-height: 627px;display: block;  padding-left: 100px;">
    <div class="info-left">
        <a href="${ctx}/index" style="text-decoration: none;">
        <h3>
            教学资源共享平台
        </h3>
        <h4>
            TEACHING RESOURCE SHARING PLATFORM
        </h4>
        </a>
        <div class="p-data">
            <a href="javascript:void(0)" onclick="$('#picture').modal('show');"><img src="${user.pictureUrlDisplay != null ? user.pictureUrlDisplay : 'http://xuebangsoft-tools.oss-cn-shenzhen.aliyuncs.com/defaultIcon.gif'}"  alt="个人头像"></a>

    			<span>
    				${user.name} 老师
    			</span>
            <ul>
                <li>
                    <span>${user.score}</span>
                    积分
                </li>
                <li>
                    <span>${myDocumentsCount}</span>
                    贡献
                </li>
                <li>
                    <span>${myDownloadCount}</span>
                    下载
                </li>
            </ul>
        </div>

        <div class="p-center">
            <div class="title">
                个人中心
    				<span>
    					PERSONAL CENTER
    				</span>
            </div>
            <ul>
                <li class="active active-li">
                    <a href="javascript:void(0)" class="p-text"  onclick="myCollection.initListGrid();">
                        我的收藏
                    </a>
                </li>
                <li class="active-li">
                    <a href="javascript:void(0)" onclick="myContribution.initListGrid();"
                       class="p-text">我的贡献</a>
                </li>
                <li class="active-li">
                    <a href="javascript:void(0)" class="p-text "  onclick="myDownload.initListGrid();">我的下载</a>
                </li>
                <li class="active-li">
                    <a href="javascript:void(0)" class="p-text" onclick="myScore.initListGrid();">我的积分</a>
                </li>
                <li class="active-li">
                    <a href="javascript:void(0)" class="p-text"  onclick="myMessage.initListGrid();">我的消息</a>
                </li>

            </ul>
        </div>
    </div>
    <div class="info-right">
        <form id="searchForm" action="${ctx}/document/search" class="input-group" style="width: 725px;">
            <!-- <button class="form-control-feedback" style="color: #fff;font-size: 18px;left:0;z-index: 3;">搜索</button> -->
            <input type="text" name="searchText" class="form-control" placeholder="搜索">
            <button class="form-control-feedback btn-green" type="submit" style="font-size: 18px;  width: 90px;"><img src="/o2o/static/images/ICON07.png">搜索</button>
        </form>
        <div class="basic-info">
            <div class="basic-h">
                <div class="basic-f">
                    基本信息
                </div>
                <div id="editInfo" class="basic-e" style="cursor: pointer">
                    编辑
                </div>
                <div id="saveInfo" class="basic-e" style="cursor: pointer">
                    保存
                </div>
            </div>
            <div class="panel-body">

            </div>


        </div>

        <%--<button style="background-color: #a489da" id='doBatchCancelCollecting' class='btn btn-default col-md-offset-11 btn-sm' onclick='information.doBatchCancelCollecting();' >取消收藏</button>--%>
        <div  id="myCollection" class="myinfo">
        </div>

        <div id="myContribution" class="myinfo"></div>

        <%--<button id="deleteDownloadRecord" class='btn btn-default col-md-offset-10 btn-sm' onclick='javascript:{this.disabled=true;information.doBatchDownloadLogicDelete();}' >删除下载记录</button>--%>
        <div id="myDownload" class="myinfo"></div>

        <%--<button id="deleteMyMessage" class="btn btn-default col-md-offset-10 btn-sm" onclick="javascript:{this.disabled=true;information.doBatchMyMessage();}">删除消息记录</button>--%>
        <div id="myMessage" class="myinfo"></div>

        <div id="myScore" class="myinfo"></div>


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
