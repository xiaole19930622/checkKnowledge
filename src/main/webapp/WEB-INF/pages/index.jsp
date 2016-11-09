<%@ page import="com.xuebang.o2o.business.service.realm.RealmUtils" %>
<%@ page language='java' pageEncoding='utf-8' %>
<%@include file="header.jsp" %>
<link rel='stylesheet' href='${ctx}/thirdpart/jPaginate/css/style.css'>
<style>
    #recordDocument a{display:block;line-height:18px;text-decoration:none;font-family:Arial;font-size:12px;}
    #recordDocument a:hover{text-decoration:underline;}
    .boxRecordDocument{width:500px; }
    #recordDocument{height:72px;overflow:hidden;}
    #recordDocument div {
        float: left;
        width: 50%;
    }
    #logo{
        display:inline-block;
    }
    #logo img{

    }
    #logo span{
        margin-left:-5px;
        font-size:13px;
    }
    .upload-info{

    }
    .upload-info ul{
        padding:0;
        margin:0;
    }
    .upload-info ul li{
        float:left;
        width:16.6%;
        text-align:center;
        padding-left:5px;
        padding-right:5px;
        /* border:1px solid #ccc;*/
        list-style:none;
    }
    .upload-info ul li a{
        display:block;
        height:66px;
        border:1px solid #ccc;
    }
</style>
</head>
<body>
<nav class="navbar" style="margin-bottom: 0px;height: 60px;"></nav>
<nav class="navbar navbar-default navbar-fixed-top nav-navbar-top" style="padding-top: 15px;border:0;">
    <div class="container">
        <shiro:guest>
            <div class="navbar-header pull-right">
                请<a href="${ctx}/login">登录</a>后使用
            </div>
        </shiro:guest>
        <shiro:user>
            <a target="_blank" href="${ctx}/redirectXueYiYun" id="logo">
                <img src="${ctx}/static/images/logo1.png" height="28" width="37" alt="">
                <span>免认证登录：星火与学科网合作平台</span>
            </a>
            <div class="navbar-header pull-right">
                <a class="margin-right-10" style="font-size: 16px;">
                    <%=RealmUtils.getCurrentUserAttributes().get("name")%>老师，欢迎您！
                </a>
                <a href="${ctx}/user/userinfo" class="margin-left-10" title="个人信息">
                    <img src="${ctx}/static/images/ICON03.png" /><%--个人信息--%>
                </a>
                <shiro:hasAnyRoles name="管理员,超级管理员">
                    <a href="${ctx}/admin" class="margin-left-10" title="后台管理">
                        <img src="${ctx}/static/images/ICON05.png" class="<c:if test="${menu != '审核管理' && hasAnyUncheckDocument > 0}">red-point-bg</c:if>" /><%--设置，可以考虑做成后台管理入口--%>
                    </a>
                </shiro:hasAnyRoles>
                <a href="${ctx}/logout" class="margin-left-10" title="退出系统">
                    <img src="${ctx}/static/images/ICON06.png" /><%--退出--%>
                </a>
            </div>
        </shiro:user>
    </div>
</nav>
<nav class="nav page-header" style="height: 200px;background-color: #795cb3;margin: 0;">
    <%--<h1 class="text-center" style="color: #fff;margin-top: 60px;"><img src="${ctx}/static/images/ICON2.png"/> 教学资源共享平台</h1>--%>
    <%--搜索输入区--%>
    <form id="indexSearchForm" action="${ctx}/document/search">
        <div class="container">
            <div class="row text-center" style="color: #fff;margin-top: 30px;">
                <h1>教学资源共享平台</h1>
                <h5>Teaching Resource Sharing Platform</h5>
            </div>
            <div class="row" style="padding: 0 15%;">
                <div class="input-group input-group-lg margin-top-10">
                    <%--<span class="input-group-btn">--%>
                    <%--<button id="btn_searchType" type="button" class="btn btn-green dropdown-toggle"--%>
                    <%--data-toggle="dropdown"--%>
                    <%--aria-expanded="false"--%>
                    <%--style="min-width: 120px;">--%>
                    <%--<span>所有文档</span> <span class="caret" style="float: right;margin-top: 10px;"></span>--%>
                    <%--</button>--%>
                    <%--<ul class="dropdown-menu" role="menu">--%>
                    <%--<li><a href="#">所有文档</a></li>--%>
                    <%--<li><a href="#">标准教案</a></li>--%>
                    <%--<li><a href="#">试卷</a></li>--%>
                    <%--<li><a href="#">导学案</a></li>--%>
                    <%--<li><a href="#">课件</a></li>--%>
                    <%--<li><a href="#">教学视频</a></li>--%>
                    <%--<li><a href="#">多媒体</a></li>--%>
                    <%--</ul>--%>
                    <%--</span>--%>
                    <input name="searchText" type="text" class="form-control" placeholder="请输入文档标题/简介/贡献者"
                           aria-describedby="sizing-addon1" <%--autofocus="autofocus"--%> style="border-radius: 0px;outline-color:#d1db2d ;">
                    <input name="searchType" type="hidden" value="所有文档">
                    <span class="input-group-btn">
                        <button class="btn btn-green" type="submit"><img src="${ctx}/static/images/ICON07.png"/> 搜索</button>
                    </span>
                </div>
            </div>
        </div>
    </form>
</nav>
<div class="container">
    <%--中部显示区--%>
    <div class="row">
        <%--分类快捷入口--%>
        <div class="col-md-9">
            <div class="row">
                <div class="col-md-4 index-theme-area">
                    <a href="${ctx}/document/search?searchType=标准教案">
                        <div class="module module1"></div>
                    </a>
                </div>
                <div class="col-md-4 index-theme-area">
                    <a href="${ctx}/document/search?searchType=试卷">
                        <div class="module module2"></div>
                    </a>
                </div>
                <div class="col-md-4 index-theme-area">
                    <a href="${ctx}/document/search?searchType=导学案">
                        <div class="module module3"></div>
                    </a>
                </div>
                <div class="col-md-4 index-theme-area">
                    <a href="${ctx}/document/search?searchType=课件">
                        <div class="module module4"></div>
                    </a>
                </div>
                <div class="col-md-4 index-theme-area">
                    <a href="${ctx}/document/search?searchType=教学视频">
                        <div class="module module5"></div>
                    </a>
                </div>
                <div class="col-md-4 index-theme-area">
                    <a href="${ctx}/document/search?searchType=多媒体">
                        <div class="module module6"></div>
                    </a>
                </div>
                <%--专题快捷入口--%>
                <div class="col-md-4 index-theme-area">
                    <a href="${ctx}/document/search?searchType=小升初">
                        <div class="module module7"></div>
                    </a>
                </div>
                <div class="col-md-4 index-theme-area">
                    <a href="${ctx}/document/search?searchType=中考">
                        <div class="module module8"></div>
                    </a>
                </div>
                <div class="col-md-4 index-theme-area">
                    <a href="${ctx}/document/search?searchType=高考">
                        <div class="module module9"></div>
                    </a>
                </div>
                <div class="col-md-4 index-theme-area">
                    <a href="${ctx}/document/search?searchType=家长会">
                        <div class="module module10"></div>
                    </a>
                </div>
                <div class="col-md-4 index-theme-area">
                    <a href="${ctx}/document/search?searchType=示范课专题">
                        <div class="module module11"></div>
                    </a>
                </div>
            </div>
        </div>
        <%--平台与个人信息展示区--%>
        <div class="col-md-3">
            <div class="container-fluid index-theme-area">
                <div class="row text-center" style="height:30px;background-color: #a489da;color: #ffffff;font: 15pt 微软雅黑;padding: 3px 0;">教师资源平台累计文件</div>
                <div id="documentCount" class="row text-center" style="height:60px;background-color: #f3f3f3;color: #f29e21;font: 36pt Arial;">${documentCount}</div>
            </div>
            <div class="container-fluid index-theme-area">
                <div class="row" style="height: 54px;background-color: #a489da;color: #ffffff;font: 15pt 微软雅黑;">
                    <img style="position: absolute;height: 74px;width: 74px;margin: 10px 0 0 15px;"
                         src="${user.pictureUrlDisplay != null ? user.pictureUrlDisplay : 'http://xuebangsoft-tools.oss-cn-shenzhen.aliyuncs.com/defaultIcon.gif'}"
                         class="img-circle">
                    <a class="col-md-offset-3" style="font: 16pt 微软雅黑;color: #ffffff;text-decoration:none;left: 30px;top: 10px;position: relative;"
                       href="${ctx}/user/userinfo"><b><%=RealmUtils.getCurrentUserAttributes().get("name")%></b>
                        <span style="font-size: 16pt;color: #ffffff;text-decoration:none;">老师</span>
                    </a>
                </div>
                <div class="row text-center" style="min-height: 150px;background-color: #f3f3f3;padding-top: 25px;">
                    <div class="col-md-6">
                        <div style="font-family: arial;font-size: 18pt;color: #f29e21;">${myDocumentsCount}</div>
                        <div style="font: 11pt 微软雅黑;color: #76797E;">上传文档数</div>
                    </div>
                    <div class="col-md-6">
                        <div style="font-family: arial;font-size: 18pt;color: #f29e21;">${user.score}</div>
                        <div style="font: 11pt 微软雅黑;color: #76797E;">积分</div>
                    </div>
                    <div class="col-md-12">
                        <a href="${ctx}/document/upload" class="btn btn-green btn-lg" style="width: 70%;margin-top: 10px;">我要上传</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <%--动态更新区--%>
    <div class="row" style="padding: 15px;">
        <div class="container-fluid table-bordered">
            <div class="row">
                <div class="col-md-6" style="height: 139px;">
                    <div class="row" style="height:34px;background-color: #f3f3f3;color: #585858;font: 15pt 微软雅黑;padding: 3px;font-weight: 600;"><h3 style="margin: 0;">贡献动态<small>&nbsp;Dedication dynamics</small></h3></div>
                    <div class="boxRecordDocument" style="height: 105px;">
                        <div id="recordDocument" style="height: 100%">
                            <c:forEach var="item" items="${lastest3}">
                                <div class="col-md-6 text-muted text-left margin-top-10" style="height: 20px;overflow: hidden;" title="${item.createUser.name}上传了“${item.name}">
                                    <a target="_blank" href="${ctx}/document/preview/${item.id}"><span style="color: #f29e21;font-weight:900;padding:10px;">·</span>${item.createUser.name}上传了“${item.name}”</a>
                                </div>
                            </c:forEach>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="row" style="height:34px;background-color: #f3f3f3;color: #585858;font: 15pt 微软雅黑;padding: 3px;font-weight: 600;"><h3 style="margin: 0;">贡献排行<small>&nbsp;Contribution ranking</small></h3></div>
                    <c:forEach var="item" items="${contributionTop3}" varStatus="status" begin="0" end="2">
                        <div class="col-md-4" title="${item.name}，${item.organization.name}">
                            <div class="row" style="margin-top: 15px;">
                                <div class="col-md-6">
                                    <span style="background-color: #795cb3;padding: 2px 9px;border-radius: 5px;color: #ffffff;font-family: Arial;">${status.index + 1}</span>
                                    <img style="height: 46px;width: 46px;position: absolute;" src="${item.pictureUrlDisplay != null ? item.pictureUrlDisplay : 'http://xuebangsoft-tools.oss-cn-shenzhen.aliyuncs.com/defaultIcon.gif'}" class="img-circle">
                                </div>
                                <div class="col-md-6">
                                    <div style="height: 20px;overflow: hidden;">${item.name}</div>
                                    <div style="height: 20px;overflow: hidden;">${item.organization.name}</div>
                                </div>
                            </div>
                        </div>
                    </c:forEach>
                    <c:forEach var="item" items="${contributionTop3}" varStatus="status" begin="3">
                        <div class="col-md-4" title="${item.name}，${item.organization.name}" style="height: 20px;overflow: hidden;margin-top: 15px;margin-bottom: 15px;">
                            <span style="background-color: #795cb3;padding: 2px 9px;border-radius: 5px;color: #ffffff;font-family: Arial;margin-right: 10px;">
                                    ${status.index + 1}</span>${item.name}，${item.organization.name}
                        </div>
                    </c:forEach>
                </div>
            </div>
        </div>
    </div>
    <p>
        我今天最新上传 ${myDocumentsCountToday}
    </p>
    <div class="upload-info">
        <ul>
            <li>
                <a target="_blank" href="http://www.jyeoo.com">
                    <img src="${ctx}/static/images/jyeoo.jpg" height="64" width="174" alt="">
                </a>
            </li>
            <li>
                <a target="_blank" href="http://www.jinghua.com">
                    <img src="${ctx}/static/images/jinghua.jpg" height="64" width="174" alt="">
                </a>
            </li>
            <li>
                <a target="_blank" href="http://wenku.baidu.com/portal/browse/zoneedu">
                    <img src="${ctx}/static/images/baidu.jpg" height="64" width="174" alt="">
                </a>
            </li>
            <li>
                <a target="_blank" href="http://www.ks5u.com">
                    <img src="${ctx}/static/images/ks5u.jpg" height="64" width="174" alt="">
                </a>
            </li>
            <li>
                <a target="_blank" href="http://edu.iqiyi.com">
                    <img src="${ctx}/static/images/iqiyi.jpg" height="64" width="174" alt="">
                </a>
            </li>
            <li>
                <a target="_blank" href="http://www.12999.com">
                    <img src="${ctx}/static/images/1299.jpg" height="64" width="174" alt="">
                </a>
            </li>
        </ul>
    </div>
</div>
</div>

<div class="modal fade" data-backdrop="static" id="userInfoMust" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog" style="width: 1000px;margin-top: 150px;">
        <div class="modal-content" style="width: 1000px;">
            <div class="modal-header">
                <h4 class="modal-title">选择基本信息</h4>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-3">
                            <img src="${ctx}/static/images/theme-icon-1.jpg"/>
                        </div>
                        <div class="col-md-9">
                            <img src="${ctx}/static/images/2.jpg"/>
                            <div class="selectBody container-fluid" style="margin-top: 20px;">
                                <div class="select_information row ">
                                    <form action="' + ctx + '/userInformation/saveInformation">

                                        <div class="my-select col-md-4">
                                            <label class="col-md-6">可教学科：</label>
                                            <select name="subject" class="select_subject col-md-6"  >
                                            </select>

                                        </div>
                                        <div class="my-select col-md-4">
                                            <label class="col-md-6">教材版本：</label>
                                            <select name="version" class="select_version col-md-6"  >
                                            </select>

                                        </div>
                                        <div class="my-select col-md-4">
                                            <label class="col-md-6">主教年级：</label>
                                            <select name="grade" class="select_grade col-md-6"  >
                                            </select>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btnColorSubmit" onclick="index.edit();"
                        data-loading-text="提交中...">
                    确定
                </button>
            </div>
        </div>
    </div>
</div>
<script>
    var t;//定时器ID
    var c,_=Function;//滚动内置函数变量
    var o = null;//当前节点
    toScroll();//执行滚动

    var flag='${userInfo}';

    $(function () {
        // 绑定搜索类型切换
        $('#btn_searchType').dropdown().next().find('li').click(function () {
            $('#btn_searchType span:first').text($(this).text());
            $('#indexSearchForm input[name=searchType]').val($(this).text());
        });
        // 定时更新最新文档
        setInterval(function () {
            $.get(ctx + '/document/getLastest3', function (res) {
                $('#recordDocument').html('');
                $.each(res, function (index, item) {
                    $('<div  class="col-md-6 text-muted text-left margin-top-10" style="height: 20px;overflow: hidden;" title="'+ item.createUser.name +'上传了“'+ item.name +'”">'+'<a target="_blank" href="'+ ctx +'/document/preview/'+ item.id +'">'+ '<span style="color: #f29e21;font-weight:900;padding:10px;">·</span>' + item.createUser.name+'上传了“'+ item.name +'”</a></div>').appendTo('#recordDocument');
                });
                //每次循环前清理上次定时器
                if(t)
                    clearTimeout(t);
                //实行滚动
                toScroll();
            });
        }, 15000);
        // 表单校验规则
        $('#indexSearchForm').validate({
            rules: {
                searchType: {
                    required: true
                },
                searchText: {
                    required: true,
                    maxlength: 500
                }
            },
            messages: {
                searchText: {
                    required: '亲，输入内容后才能搜索哦'
                }
            }
        });
        $('#indexSearchForm').submit(function(){
            addCookie('searchText',$(this).find('[name=searchText]').val());
            return true;
        });
        $('#indexSearchForm [name=searchText]').val(getCookie('searchText'));
    });
    function  toScroll(){
        o = document.getElementById("recordDocument");
        with(o)
        {
            innerHTML+=innerHTML; onmouseover=_("c=1"); onmouseout=_("c=0");
        }
        (F=_("if(#%18||!c)#++,#%=o.scrollHeight>>1;t=setTimeout(F,100);".replace(/#/g,"o.scrollTop")))();
    }
</script>

<script src="${ctx}/thirdpart/jqselectable/js/jQselectable.js"></script>
<script src="${ctx}/static/js/index.js"></script>
<%@include file="footer.jsp" %>
