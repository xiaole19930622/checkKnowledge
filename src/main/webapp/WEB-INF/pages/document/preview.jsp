<%@ page language='java' pageEncoding='utf-8' %>
<%@include file="../header.jsp" %>

<link rel="stylesheet" href="${ctx}/static/css/document/preview.css">
<link rel='stylesheet' href='${ctx}/thirdpart/FlexPaper_Zine_Trial/css/flexpaper.css' />
<script src="${ctx}/thirdpart/jwplayer-7.1.4/jwplayer.js"></script>

<script>
    $(function(){
        $('#content').height($('#content').width() * 0.5);
        $('#content').children().height($('#content').height());
        $.fn.raty.defaults.path = ctx + '/thirdpart/jquery-raty-2.5.2/lib/img';
        // 评分
        $('#rank').raty({
            <%--readOnly: ${myRanked != null && myRanked > 0},--%>
            readOnly : ${myRanked != null},
            score : ${myRanked != null ? myRanked : 0},
            width : false,
            click : function(score,event) {
                $.get('${ctx}/documentRankRecord/doRankingDocument/${document.id}',{rank : score},function(res){
                    alert('评分成功');
                    $('#rank').raty({
                        readOnly : true,
                        score : score,
                        width : false
                    });
                });
            }
        });
        // 文档得分
        $('#score').raty({
            readOnly: true,
            score : ${document.rank != null ? document.rank : 0},
            width : false
        });
    });

    function collecting(){
        var colletced = $('#btn_collect').text().trim() === '已收藏';
        if(colletced){
            $.get('${ctx}/documentCollectRecord/doCancelCollecting/${document.id}',function(res){
                $('#btn_collect').text('收藏');
                alert('取消收藏成功');
            })
        }else{
            $.get('${ctx}/documentCollectRecord/doCollecting/${document.id}',function(res){
                $('#btn_collect').text('已收藏');
                alert('收藏成功');
            })
        }
    }

    function doDownload(){
        if ('${document.createUser.id}' != '${user.id}'
                && !${downloaded}
                && (${user.score} + (${downloadScore.score}) < 0)) {
            alert('亲，你的积分不够哦');
            return false;
        }
        return true;
    }

</script>
</head>
<body>
<%@include file="../nav.jsp" %>
<ol class="breadcrumb" style="margin-bottom: 0px;">
    <li><a href="/o2o/index">教学资源共享平台</a></li>
    <li class="active">文档预览</li>
</ol>
<div class="container-fluid" >

    <%--顶部名称、上传按钮等--%>
    <div class="row">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-9">
                    <h3 class="fileName">${document.name}</h3>
                    <div  class="start">星级：<div id="score" style="display: inline-block;"></div>&nbsp;&nbsp;阅读：<span>${document.readCount}</span>&nbsp;下载：<span>${document.downloadCount}</span></div>

                </div>
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-3" style="padding-top: 30px;">
                            <a href="${ctx}/document/upload" class="btn  btn-lg btnColorSubmit" style="width: 100%">上传我的文档</a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
    <%--内容及相关文档--%>
    <div class="row">
        <%--左侧--%>
        <div class="col-md-9">
            <div class="container-fluid">
                <div class="row">
                    <div id="content" class="container-fluid table-bordered text-center" style="overflow: hidden;padding: 0;">
                        <c:choose>
                            <c:when test="${document.convertStatus == 0 || document.convertStatus == 3}">
                                <h3>文档预览格式正在转换中，过一会儿再刷新页面进行预览吧</h3>
                                <script>
                                    setInterval(function(){
                                        $.get(ctx + '/document/checkConvertStatus?id=${document.id}',function(result){
                                            if(result.msg > 0){
                                                window.location.reload();
                                            }
                                        });
                                    },15000);
                                </script>
                            </c:when>
                            <c:when test="${document.convertStatus == 2}">
                                <h3>文档转换成可预览格式出错，请联系管理员或下载文件进行观看</h3>
                            </c:when>
                            <%--<c:when test="${document.previewUrl == null || document.previewUrl == ''}">--%>
                                <%--<h3>文档预览地址访问出错，请联系管理员</h3>--%>
                            <%--</c:when>--%>
                            <c:when test="${document.suffix == 'doc' || document.suffix == 'docx' || document.suffix == 'xls' || document.suffix == 'xlsx' || document.suffix == 'ppt' || document.suffix == 'pptx' || document.suffix == 'odt' || document.suffix == 'wps' || document.suffix == 'rtf' || document.suffix == 'pot' || document.suffix == 'pdf' || document.suffix == 'txt' || document.suffix == 'vsd'}">
                                <iframe width="100%" height="500px" src="${document.previewUrl}"  ></iframe>
                                <%--<iframe width="100%" height="500px" src="http://120.76.165.39:8090/conversion/conversion/toPrefix?id=${document.converId}"  ></iframe>--%>

                                <%--<div id="documentViewer" class="flexpaper_viewer center-block" style="width:100%;height:500px"></div>--%>
                                <%--<script src="${ctx}/thirdpart/FlexPaper_Zine_Trial/js/flexpaper.js"></script>--%>
                                <%--<script src="${ctx}/thirdpart/FlexPaper_Zine_Trial/js/flexpaper_handlers.js"></script>--%>
                                <%--<script>--%>
                                    <%--$(function(){--%>
                                        <%--$('#content').css('overflow','hidden');--%>
                                        <%--$('#documentViewer').FlexPaperViewer(--%>
                                                <%--{ config : {--%>
                                                    <%--SWFFile : '${ctx}/document/previewFile/${document.id}',--%>
                                                    <%--Scale : 0.6,--%>
                                                    <%--ZoomTransition : 'easeOut',--%>
                                                    <%--ZoomTime : 0.5,--%>
                                                    <%--ZoomInterval : 0.2,--%>
                                                    <%--//FitPageOnLoad : true,--%>
                                                    <%--FitWidthOnLoad : true,--%>
                                                    <%--FullScreenAsMaxWindow : false,--%>
                                                    <%--ProgressiveLoading : false,--%>
                                                    <%--MinZoomSize : 0.2,--%>
                                                    <%--MaxZoomSize : 5,--%>
                                                    <%--SearchMatchAll : true,--%>
                                                    <%--InitViewMode : 'Portrait',--%>
                                                    <%--RenderingOrder : 'flash',--%>
                                                    <%--StartAtPage : '',--%>
                                                    <%--ViewModeToolsVisible : false, // 工具栏上是否显示样式选择框--%>
                                                    <%--ZoomToolsVisible : true, // 工具栏上是否显示缩放工具--%>
                                                    <%--NavToolsVisible : true, // 工具栏上是否显示导航工具--%>
                                                    <%--CursorToolsVisible : false, // 工具栏上是否显示光标工具--%>
                                                    <%--SearchToolsVisible : true, // 工具栏上是否显示搜索--%>
                                                    <%--WMode : 'window',--%>
                                                    <%--localeChain: 'zh_CN'--%>
                                                <%--}}--%>
                                        <%--);--%>
                                    <%--})--%>
                                <%--</script>--%>
                            </c:when>
                            <c:when test="${document.suffix == 'mp4' || document.suffix == 'flv'}">
                                <div id="jwplayer"></div>
                                <script>
                                    jwplayer.key = "Bjwikhkqvh92ZsvKbWLQXDMJ5qQ/IuBk75bCzw==";
                                    jwplayer('jwplayer').setup({
                                        file : '${document.previewUrl}',
                                        aspectratio: "16:9",
                                        autostart: true,
                                        controls: true,
                                        displaydescription: true,
                                        displaytitle: true,
                                        flashplayer: "${ctx}/thirdpart/jwplayer-7.1.4/jwplayer.flash.swf",
                                        logo: {"position": "bottom-right", "margin": "10", "hide": false, "file": "http://assets-jpcust.jwpsrv.com/watermarks/2gp06ao2.png"},
                                        mute: false,
                                        ph: 1,
                                        plugins: {"http://assets-jpcust.jwpsrv.com/player/6/6124956/ping.js": {"pixel": "http://content.jwplatform.com/ping.gif"}},
                                        primary: "html5",
                                        repeat: true,
                                        stagevideo: false,
                                        stretching: "uniform",
                                        visualplaylist: true,
                                        height : '100%',
                                        width : 'auto'
                                    })
                                </script>
                            </c:when>
                            <c:when test="${document.suffix == 'swf'}">
                                <embed id="flashView" style="width:100%;height: auto;zoom: 1;" src="${document.previewUrl}"/>
                                <script>$('#content').css('overflow','hidden');</script>
                            </c:when>
                            <c:when test="${document.suffix == 'mp3' || document.suffix == 'wav'}">
                                <audio id="mediaView" controls>
                                    <source src="${document.previewUrl}" type="audio/mp3">
                                    您的浏览器不支持Video标签。
                                </audio>
                                <script>$('#content').css('overflow','hidden');</script>
                            </c:when>
                            <c:otherwise>
                                <h3>文档类型（.${document.suffix}）不支持预览</h3>
                            </c:otherwise>
                        </c:choose>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-3 text-left" style="padding-left: 0">
                            <a id="btn_collect" onclick="javascript:collecting()" class="btn  btnReset">
                                <c:choose>
                                    <c:when test="${collected}">
                                        已收藏
                                    </c:when>
                                    <c:otherwise>
                                        收藏
                                    </c:otherwise>
                                </c:choose>
                            </a>
                    </div>
                    <div class="col-md-6 text-center"><%--工具栏--%></div>
                    <div class="col-md-3 ${document.type.id.substring(0,2)=="19"? "hide" : null} text-right">
                        <a href='${ctx}/document/download/${document.id}' onclick="return doDownload();" class="btn  btnColorSubmit">下载</a>
                        <a class="btn btnScore disabled">1积分</a>
                    </div>
                </div>
            </div>
        </div>
        <%--右侧--%>
        <div class="col-md-3">
            <%--文档贡献者--%>



            <div class="container-fluid table-bordered">

                <div class="row relative">文档贡献者</div>
                <div class="row" style="padding: 10px;background-color: #EDEDED">
                    <div class="col-md-3 " >
                        <img style="height: 55px;"
                             src="${document.createUser.pictureUrlDisplay != null ? document.createUser.pictureUrlDisplay : 'http://xuebangsoft-tools.oss-cn-shenzhen.aliyuncs.com/defaultIcon.gif'}"
                             class="img-circle">
                    </div>
                    <div class="col-md-9">
                        <p style="font-size: 16pt;">${document.createUser.name}</p>
                        <p style="font-size: 14pt">上传于${document.createTime}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="container-fluid table-bordered">
                        <div class="row ">
                            <div class="col-md-12">
                                <div class="fuck">评价星级：<span id="rank"></span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <%--相关文档--%>
            <div id="aboutDocuments" class="list-group" style="margin-top: 10px;">
                <div class="relative">相关文档</div>

                <c:forEach var="item" items="${relatedDocuments}">
                    <a href="${ctx}/document/preview/${item.id}" class="text-center list-group-item fuck"  >
                            ${item.name}
                    </a>
                    <%--<div class="row" style="padding-left: 15px;"><h4><b><a href="${ctx}/document/preview/${item.id}">${item.name}</a></b></h4></div>--%>
                </c:forEach>
                <%--<h4><b><a>漫谈数学文化</a></b></h4>--%>
                <%--<h4><b><a>漫谈数学文化</a></b></h4>--%>
                <%--<h4><b><a>漫谈数学文化</a></b></h4>--%>
                <%--<h4><b><a>漫谈数学文化</a></b></h4>--%>
                <%--<h4><b><a>漫谈数学文化</a></b></h4>--%>
            </div>
        </div>
    </div>
</div>

<%@include file="../footer.jsp" %>
<script src="${ctx}/thirdpart/jquery-raty-2.5.2/lib/jquery.raty.min.js"></script>

</body>
</html>
