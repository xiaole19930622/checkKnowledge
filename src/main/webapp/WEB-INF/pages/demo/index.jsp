<%@ page language='java' pageEncoding='utf-8' %>
<%@include file="../header.jsp" %>
<link rel='stylesheet' href='${ctx}/thirdpart/FlexPaper_Zine_Trial/css/flexpaper.css' />
<link rel="stylesheet" href="${ctx}/static/css/document/preview.css">
<script>
    $(function(){
        $('#content').height($('#content').width() * 0.5);
        $('#content').children().height($('#content').height());
        $.fn.raty.defaults.path = ctx + '/thirdpart/jquery-raty-2.5.2/lib/img';
        // 文档得分
        $('#score').raty({
            readOnly: true,
            score : 5,
            width : false
        });
        // 文档预览
        if($('#documentViewer').length > 0){
            $('#content').css('overflow','hidden');
            $('#documentViewer').FlexPaperViewer(
                    { config : {
                        SWFFile : '${ctx}/demo/previewFile/${document.id}',
                        Scale : 0.6,
                        ZoomTransition : 'easeOut',
                        ZoomTime : 0.5,
                        ZoomInterval : 0.2,
                        //FitPageOnLoad : true,
                        FitWidthOnLoad : true,
                        FullScreenAsMaxWindow : false,
                        ProgressiveLoading : false,
                        MinZoomSize : 0.2,
                        MaxZoomSize : 5,
                        SearchMatchAll : true,
                        InitViewMode : 'Portrait',
                        RenderingOrder : 'flash',
                        StartAtPage : '',
                        ViewModeToolsVisible : false, // 工具栏上是否显示样式选择框
                        ZoomToolsVisible : true, // 工具栏上是否显示缩放工具
                        NavToolsVisible : true, // 工具栏上是否显示导航工具
                        CursorToolsVisible : false, // 工具栏上是否显示光标工具
                        SearchToolsVisible : true, // 工具栏上是否显示搜索
                        WMode : 'window',
                        localeChain: 'zh_CN'
                    }}
            );
        }
        // 多媒体
        if($('#mediaView').length > 0){
            $('#content').css('overflow','hidden');
        }
    })
</script>
</head>
<body>
<nav class="navbar" style="margin-bottom: 0px;height: 60px;"></nav>
<nav class="navbar navbar-default navbar-fixed-top nav-navbar-top">
    <div class="container-fluid">
        <div class="navbar-header pull-left">
            <a href="${ctx}/index?demo=true" class="banner">星火教育远程学习分享平台(Demo)——测评系统专题</a>
        </div>
    </div>
</nav>

<div class="container-fluid" >

    <%--顶部名称、上传按钮等--%>
    <div class="row">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-9">
                    <h3 class="fileName">${document.name}</h3>
                    <div  class="start">星级：<div id="score" style="display: inline-block;"></div>&nbsp;&nbsp;阅读：<span>${document.readCount}</span>&nbsp;</span></div>

                </div>
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-3" style="padding-top: 30px;">
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
                    <div id="content" class="container-fluid table-bordered text-center" style="overflow: auto;padding: 0;">
                        <c:choose>
                            <c:when test="${document.previewUrl == null || document.previewUrl == ''}">
                                <h3>文档预览失败</h3>
                            </c:when>
                            <c:when test="${document.suffix == 'swf'}">
                                <embed id="flashView" style="width:100%;height: 500px;zoom: 2;" src="${document.previewUrl}"/>
                            </c:when>
                            <c:when test="${document.suffix == 'flv'}">
                                <object class id="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" width="100%" height="500">
                                    <param name="movie" value="${ctx}/thirdpart/flvplayer.swf">
                                    <param name="quality" value="high">
                                    <param name="allowFullScreen" value="true">
                                    <param name="FlashVars" value="vcastr_file=${document.previewUrl}&LogoText=www.lanrentuku.com&BufferTime=3&IsAutoPlay=1">
                                    <embed src="flvplayer.swf" allowfullscreen="true" flashvars="vcastr_file=${document.previewUrl}&LogoText=www.lanrentuku.com&IsAutoPlay=1" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="500" height="100%"></embed>
                                </object>
                            </c:when>
                            <c:when test="${document.suffix == 'doc' || document.suffix == 'docx' || document.suffix == 'xls' || document.suffix == 'xlsx' || document.suffix == 'ppt' || document.suffix == 'pptx' || document.suffix == 'odt' || document.suffix == 'wps' || document.suffix == 'rtf' || document.suffix == 'pot' || document.suffix == 'pdf' || document.suffix == 'txt' || document.suffix == 'vsd'}">
                                <div id="documentViewer" class="flexpaper_viewer center-block" style="width:100%;height:500px"></div>
                            </c:when>
                            <c:when test="${document.suffix == 'mp4'}">
                                <video id="mediaView" controls>
                                    <source src="${document.previewUrl}" type="video/mp4">
                                    您的浏览器不支持Video标签。
                                </video>
                            </c:when>
                            <c:when test="${document.suffix == 'mp3' || document.suffix == 'wav'}">
                                <audio id="mediaView" controls>
                                    <source src="${document.previewUrl}" type="audio/mp3">
                                    您的浏览器不支持Video标签。
                                </audio>
                            </c:when>
                            <c:otherwise>
                                <h3>文档类型（.${document.suffix}）不支持预览</h3>
                            </c:otherwise>
                        </c:choose>
                    </div>
                </div>
            </div>
        </div>
        <%--右侧--%>
        <div class="col-md-3">
            <%--文档贡献者--%>



            <div class="container-fluid table-bordered">

            <%--相关文档--%>
            <div id="aboutDocuments" class="list-group" style="margin-top: 10px;">
                <div class="relative">相关文档</div>

                <c:forEach var="item" items="${relatedDocuments}">
                    <a href="${ctx}/demo/${item.id}" class="text-left list-group-item fuck"  >
                            ${item.name}
                    </a>
                    <%--<div class="row" style="padding-left: 15px;"><h4><b><a href="${ctx}/demo/${item.id}">${item.name}</a></b></h4></div>--%>
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
<script src="${ctx}/thirdpart/FlexPaper_Zine_Trial/js/flexpaper.js"></script>
<script src="${ctx}/thirdpart/FlexPaper_Zine_Trial/js/flexpaper_handlers.js"></script>
</body>
</html>
