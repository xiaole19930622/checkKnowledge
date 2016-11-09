<%@ page import="com.xuebang.o2o.business.service.realm.RealmUtils" %>
<%@page language='java' pageEncoding='utf-8'%>
<%@page isELIgnored="false"%>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<%--jsp作用域属性--%>
<c:set var="ctx" value="${pageContext.request.contextPath}"></c:set>

<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset='utf-8'>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <!-- 上述3个meta标签*必须*放在最前面，任何其他内容都*必须*跟随其后！ -->
    <title>星火教师资源平台</title>

    <%--jquery core--%>
    <script src='${ctx}/thirdpart/jquery/jquery-2.1.3.min.js'></script>
    <%--jquery validation 及扩展，默认中文国际化已拷贝至ex文件--%>
    <script src="${ctx}/thirdpart/jquery-validation-1.13.1/jquery.validate.min.js"></script>
    <script src="${ctx}/static/js/jquery.validate.ex.js"></script>
    <%--cookie--%>
    <script src="${ctx}/static/js/cookie.js"></script>
    <%--bootstrap-growl提醒插件--%>
    <script src="${ctx}/thirdpart/ifightcrime-bootstrap-growl-162daa4/jquery.bootstrap-growl.js"></script>
    <%--jquery scroll to top--%>
    <script src='${ctx}/thirdpart/jQuery-scrollTopTop-v1.0/js/jquery.scrollToTop.min.js'></script>
    <link rel='stylesheet' href='${ctx}/thirdpart/jQuery-scrollTopTop-v1.0/css/style.css'>

    <%--全局js--%>
    <script>
        var ctx = '${ctx}';
        // 覆写弹窗
        window.alert = function(msg,isDanger,personalImg){
            var img = isDanger ? '${ctx}/static/images/theme-icon-3.png' : '${ctx}/static/images/theme-icon-1.jpg';
            if(personalImg)img = personalImg;
            var html = '<div><img src="'+ img +'" class="img-responsive" style="display: inline-block;"/><div style="display: inline-block;margin-left:10px;width:150px;font-size:16px;">'+ msg +'</div></div>'
            $.bootstrapGrowl(html,{type : 'normal',align : 'center',centerBlock : true,delay:1000});
        };
        // ajax超时
        $(document).on('ajaxSuccess',function(event, jqXHR, options){
            if(jqXHR.responseText.indexOf('<meta name="pageName" content="登陆页">') != -1){
                window.top.location.href = ctx + '/login';
            }
        });
        $(document).on('ajaxError',function(event, jqXHR, options){
            alert(jqXHR.responseJSON.msg,true);
        });

        // js原型扩展
        Date.prototype.format = function(fmt)
        { //author: meizz
            var o = {
                "M+" : this.getMonth()+1,                 //月份
                "d+" : this.getDate(),                    //日
                "h+" : this.getHours(),                   //小时
                "m+" : this.getMinutes(),                 //分
                "s+" : this.getSeconds(),                 //秒
                "q+" : Math.floor((this.getMonth()+3)/3), //季度
                "S"  : this.getMilliseconds()             //毫秒
            };
            if(/(y+)/.test(fmt))
                fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
            for(var k in o)
                if(new RegExp("("+ k +")").test(fmt))
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
            return fmt;
        }

        // placeholder焦点消失
        $(function(){
            $('[placeholder]').focus(function(){
                $(this).attr('placeholderBackup',$(this).attr('placeholder')).removeAttr('placeholder');
            }).blur(function(){
                var placeholderBackup = $(this).attr('placeholderBackup');
                if(placeholderBackup){
                    $(this).attr('placeholder',placeholderBackup);
                }
            })
        });
    </script>
    <%--以上部分copy from header.jsp--%>
    <link rel='stylesheet' href='${ctx}/thirdpart/jqselectable/skin/selectable/style.css'>
    <link rel='stylesheet' href='${ctx}/thirdpart/ztree/zTreeStyle/zTreeStyle.css'>
    <link rel='stylesheet' href='${ctx}/thirdpart/jPaginate/css/style.css'>
    <link rel='stylesheet' href='${ctx}/static/css/document/search.css'>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <title>Document</title>
    <!-- <link rel="stylesheet" href="css/amazeui.min.css"> -->
    <link rel="stylesheet" href="${ctx}/static/newui/css/font-awesome.min.css">
    <link rel="stylesheet" href="${ctx}/static/newui/css/SimpleTree.css">
    <link rel="stylesheet" href="${ctx}/static/newui/css/main.css">
</head>
<body>
<div style="height: 62px;width: 100%;float:left;"></div>
<div class="top" style="height:62px;width:100%;position: fixed;z-index:1001;">
    <div class="container" >
        <div class="right" style="padding-top: 18px;">
            <a href="${ctx}/user/userinfo" title="个人信息">
                <img style="margin-left: 10px;" src="${ctx}/static/images/ICON03.png" /><%--个人信息--%>
            </a>
            <shiro:hasAnyRoles name="管理员,超级管理员">
                <a href="${ctx}/admin" title="后台管理">
                    <img style="margin-left: 10px;" src="${ctx}/static/images/ICON05.png" class="<c:if test="${menu != '审核管理' && hasAnyUncheckDocument > 0}">red-point-bg</c:if>"/><%--设置，可以考虑做成后台管理入口--%>
                </a>
            </shiro:hasAnyRoles>
            <a href="${ctx}/logout" title="退出系统">
                <img style="margin-left: 10px;" src="${ctx}/static/images/ICON06.png" /><%--退出--%>
            </a>
        </div>
        <div class="right" id="admin">
            <%--<img style="border-radius: 50%;" src="${user.pictureUrlDisplay != null ? user.pictureUrlDisplay : 'http://xuebangsoft-tools.oss-cn-shenzhen.aliyuncs.com/defaultIcon.gif'}" height="40" width="41" alt="">--%>
            <span><%=RealmUtils.getCurrentUserAttributes().get("name")%>老师，您好！</span>

        </div>
    </div>
</div>
<div class="container" style="display: block;">
    <a href="${ctx}/index">
    <div class="info-left">
        <h3>
            教学资源共享平台
        </h3>
        <h4>
            TEACHING RESOURCE SHARING PLATFORM
        </h4>
    </div>
    </a>
    <div class="info-right">
        <form id="documentSearchFrm" name="search" method="post" onsubmit="return false;" action="" class="input-group" style="width: 659px;padding-left: 55px;">
            <!-- <button class="form-control-feedback" style="color: #fff;font-size: 18px;left:0;z-index: 3;">搜索</button> -->
            <input id="searchKeyword" type="text" class="form-control" placeholder="请输入文档标题/简介/贡献者">
            <button id="searchButton" class="form-control-feedback" type="submit" style="color: #000;font-size: 20px;font-family:微软雅黑;width: 90px;cursor: pointer;">
                <span><img src="/o2o/static/images/ICON07.png" style="height: 17px;width: 17px;margin-right: 3px;">搜索</span>
            </button>
        </form>
    </div>
    <div class="list-nav">
        <ul>
            <li>
                <a href="${ctx}/index" class="n-title">
                    首页
                </a>
            </li>
            <li>
                <a href="${ctx}/document/search" class="n-title<c:if test="${searchType == null || searchType == '所有文档'}"> l-active</c:if>">
                    所有文档
                </a>
            </li>
            <li >
                <a href="${ctx}/document/search?searchType=标准教案" data="11" class="n-title<c:if test="${searchType == '标准教案'}"> l-active</c:if>">
                    标准教案
                </a>
            </li>
            <li>
                <a href="${ctx}/document/search?searchType=试卷" data="12" class="n-title<c:if test="${searchType == '试卷'}"> l-active</c:if>">
                    试卷
                </a>
            </li>
            <li>
                <a href="${ctx}/document/search?searchType=课件" data="13" class="n-title<c:if test="${searchType == '课件'}"> l-active</c:if>">
                    课件
                </a>
            </li>
            <li>
                <a href="${ctx}/document/search?searchType=教学视频" data="15" class="n-title<c:if test="${searchType == '教学视频'}"> l-active</c:if>">
                    教学视频
                </a>
            </li>
            <li>
                <a href="${ctx}/document/search?searchType=导学案" data="14" class="n-title<c:if test="${searchType == '导学案'}"> l-active</c:if>">
                    导学案
                </a>
            </li>
            <li>
                <a href="${ctx}/document/search?searchType=多媒体" class="n-title<c:if test="${searchType == '多媒体'}"> l-active</c:if>">
                    多媒体
                </a>
            </li>
            <li>
                <a href="${ctx}/document/search?searchType=小升初" class="n-title<c:if test="${searchType == '小升初'}"> l-active</c:if>">
                    小升初
                </a>
            </li>
            <li>
                <a href="${ctx}/document/search?searchType=中考" class="n-title<c:if test="${searchType == '中考'}"> l-active</c:if>">
                    中考
                </a>
            </li>
            <li>
                <a href="${ctx}/document/search?searchType=高考" class="n-title<c:if test="${searchType == '高考'}"> l-active</c:if>">
                    高考
                </a>
            </li>

            <li>
                <a href="${ctx}/document/search?searchType=家长会" data="18" class="n-title<c:if test="${searchType == '家长会'}"> l-active</c:if>">
                    家长会
                </a>
            </li>
            <li>
                <a href="${ctx}/document/search?searchType=示范课专题" data="19" class="n-title<c:if test="${searchType == '示范课专题'}"> l-active</c:if>">
                    示范课
                </a>
            </li>
        </ul>
        <div class="load" style="background-color: #6E529F;text-align: center;width: 76px;">
            <a href="${ctx}/document/upload">我要上传</a>
        </div>
    </div>
    <div class="filter">
        首页>${searchType}
        <div class="s-filter" style="cursor: pointer;">
            收起筛选 <i class="fa fa-angle-down" style="color:#999"></i>
        </div>
    </div>
    <div class="item" id="filter">
        <%--文档类型--%>
        <dl style="">
            <dt>
                类型：
            </dt>
            <dd id="conditionType">
                <c:choose>
                    <c:when test="${searchType == '所有文档' || searchType == '小升初' || searchType == '中考' || searchType == '高考'}">
                        <a href="javascript:;" class="filter-active">不限</a>
                        <a href="javascript:;" data="11">标准教案</a>
                        <a href="javascript:;" data="12">试卷</a>
                        <a href="javascript:;" data="13">课件</a>
                        <a href="javascript:;" data="14">导学案</a>
                        <a href="javascript:;" data="15">教学视频</a>
                        <a href="javascript:;" data="16">多媒体</a>
                    </c:when>
                    <c:when test="${searchType == '标准教案'}">
                        <a href="javascript:;" class="filter-active">不限</a>
                        <a href="javascript:;" data="1101">同步教案</a>
                        <a href="javascript:;" data="1102">复习教案</a>
                        <a href="javascript:;" data="1103">专题教案</a>
                    </c:when>
                    <c:when test="${searchType == '试卷'}">
                        <a href="javascript:;" class="filter-active">不限</a>
                        <a href="javascript:;" data="1201">高考真题</a>
                        <a href="javascript:;" data="1202">中考真题</a>
                        <a href="javascript:;" data="1203">期中试卷</a>
                        <a href="javascript:;" data="1204">期末试卷</a>
                        <a href="javascript:;" data="1205">联考卷</a>
                        <a href="javascript:;" data="1206">模拟卷</a>
                        <a href="javascript:;" data="1207">月考卷</a>
                        <a href="javascript:;" data="1208">同步练习</a>
                        <a href="javascript:;" data="1209">单元测试</a>
                        <a href="javascript:;" data="1210">专题汇编</a>
                    </c:when>
                    <c:when test="${searchType == '课件'}">
                        <a href="javascript:;" class="filter-active">不限</a>
                        <a href="javascript:;" data="1301">同步课件</a>
                        <a href="javascript:;" data="1302">复习课件</a>
                        <a href="javascript:;" data="1303">专题课件</a>
                        <a href="javascript:;" data="1304">讲座课件</a>
                    </c:when>
                    <c:when test="${searchType == '导学案'}">
                        <a href="javascript:;" class="filter-active">不限</a>
                        <a href="javascript:;" data="1401">同步导学案</a>
                        <a href="javascript:;" data="1402">复习导学案</a>
                        <a href="javascript:;" data="1403">专题导学案</a>
                    </c:when>
                    <c:when test="${searchType == '教学视频'}">
                        <a href="javascript:;" class="filter-active">不限</a>
                        <a href="javascript:;" data="1501">微型课</a>
                        <a href="javascript:;" data="1502">专题讲座</a>
                        <a href="javascript:;" data="1503">同步课程</a>
                        <a href="javascript:;" data="1504">演讲视频</a>
                    </c:when>
                    <c:when test="${searchType == '多媒体'}">
                        <a href="javascript:;" data="16" class="filter-active">动画</a></li>
                        <a href="javascript:;" data="17">音频</a></li>
                    </c:when>

                    <c:when test="${searchType == '家长会'}">
                        <a href="javascript:;" class="filter-active">不限</a>
                        <a href="javascript:;" data="1801">视频</a>
                        <a href="javascript:;" data="1802">文档</a>
                        <a href="javascript:;" data="1803">其它</a>
                    </c:when>
                    <c:when test="${searchType == '示范课专题'}">
                        <a href="javascript:;" class="filter-active">不限</a>
                        <a href="javascript:;" data="1901">视频</a>
                        <a href="javascript:;" data="1902">文档</a>
                        <a href="javascript:;" data="1903">其它</a>
                    </c:when>
                </c:choose>
            </dd>
        </dl>
        <div style="clear:both"></div>
        <%--动画--%>
        <dl style="<c:if test="${searchType != '多媒体'}">display: none;</c:if>">
            <dt>
                子类型：
            </dt>
            <dd id="conditionAnimationType">
                <a href="javascript:;" class="filter-active">不限</a></li>
                <a href="javascript:;" data="1601">知识点</a>
                <a href="javascript:;" data="1602">特色课程</a>
                <a href="javascript:;" data="1603">专题</a>
                <a href="javascript:;" data="1604">其他</a>
            </dd>
        </dl>
        <div style="clear:both"></div>
        <%--音频--%>
        <dl style="display: none;">
            <dt>
                子类型：
            </dt>
            <dd id="conditionAudioType">
                <a href="javascript:;" class="filter-active">不限</a>
                <a href="javascript:;" data="1701">英语听力</a>
                <a href="javascript:;" data="1702">课程录音</a>
                <a href="javascript:;" data="1703">其他音频</a>
            </dd>
        </dl>
        <div style="clear:both"></div>
            <%--示范课专题--%>

            <dl style="<c:if test="${searchType != '示范课专题'}">display: none;</c:if>">
                <dt>年级 :
                </dt>
                <dd  id ='demoGrade'>
                    <c:forEach items="${requestScope.demoGrade}" var="g" varStatus="index">
                    <a href="javascript:;" data="${g.id}"  class="${index.index ==0 ? 'filter-active' : null }">${g.name}</a>
                    </c:forEach>

                </dd>
            </dl>

            <dl style="<c:if test="${searchType != '示范课专题'}">display: none;</c:if>">
                <dt>学科 :
                </dt>
                <dd id ='demoSubject'>
                    <c:forEach items="${requestScope.demoSubject}" var="s" varStatus="index">
                        <a href="javascript:;" data="${s.id}"  class="${index.index ==0 ? 'filter-active' : null }">${s.name}</a>
                    </c:forEach>
                </dd>

            </dl>
            <div style="clear:both"></div>
        <%--教材版本--%>
        <dl style="display: none;">
            <dt>
                教材版本：
            </dt>
            <dd id="conditionVersion">
            </dd>
        </dl>
        <div style="clear:both"></div>


        <%--年级--%>
        <dl style="display: none;">
            <dt>
                年级：
            </dt>
            <dd id="conditionGrade">
            </dd>
        </dl>
        <div style="clear:both"></div>
        <%--难度--%>
        <c:if test="${searchType == '标准教案' || searchType == '课件' || searchType == '导学案'}">
        <dl style="">
            <dt>
                难度：
            </dt>
            <dd id="conditionDifficulty">
                <a href="javascript:;" class="filter-active">不限</a></li>
                <a href="javascript:;" data="1">难</a>
                <a href="javascript:;" data="2">中</a>
                <a href="javascript:;" data="3">易</a>
            </dd>
        </dl>
        </c:if>
        <div style="clear:both"></div>
        <%--年份--%>
        <c:if test="${searchType == '试卷'||searchType == '家长会' || searchType == '示范课专题' }">
        <dl style="">
            <dt>
                年份：
            </dt>
            <dd id="conditionYear">
                <a href="javascript:;" class="filter-active">不限</a>
                <c:forEach var="item" items="${conditionYears}">
                    <a href="javascript:;" data="${item}">${item}</a>
                </c:forEach>
                <a href="javascript:;" data="4419">更早以前</a>
            </dd>
        </dl>
        </c:if>
        <div style="clear:both"></div>
        <%--地区--%>
        <c:if test="${searchType == '试卷' || searchType == '小升初' || searchType == '中考' || searchType == '高考'||searchType == '家长会' || searchType == '示范课专题'}">
        <dl style="">
            <dt>
                所属地区：
            </dt>
            <dd id="conditionArea">
                <a href="javascript:;" class="filter-active">不限</a>
                <a href="javascript:;" data="4419">东莞</a>
                <a href="javascript:;" data="4406">佛山</a>
                <a href="javascript:;" data="4499">顺德</a>
                <a href="javascript:;" data="4413">惠州</a>
                <a href="javascript:;" data="4420">中山</a>
                <a href="javascript:;" data="4407">江门</a>
                <a href="javascript:;" data="4404">珠海</a>
                <a href="javascript:;" data="5301">昆明</a>
                <a href="javascript:;" data="3601">南昌</a>
                <a href="javascript:;" data="3401">合肥</a>
                <a href="javascript:;" data="3702">青岛</a>
                <a href="javascript:;" data="3310">台州</a>
                <a href="javascript:;" data="3301">杭州</a>
                <a href="javascript:;" data="3205">苏州</a>
                <a href="javascript:;" data="3202">无锡</a>
                <a href="javascript:;" data="3204">常州</a>
                <a href="javascript:;" data="3210">扬州</a>
                <a href="javascript:;" data="4408">湛江</a>
                <a href="javascript:;" data="6101">西安</a>
                <a href="javascript:;" data="3501">福州</a>
                <a href="javascript:;" data="4301">长沙</a>
                <a href="javascript:;" data="5201">贵阳</a>
                <a href="javascript:;" data="3303">温州</a>
                <a href="javascript:;" data="3206">南通</a>
                <a href="javascript:;" data="2102">大连</a>
                <a href="javascript:;" data="1501">呼和浩特</a>
                <a href="javascript:;" data="4101">郑州</a>
                <a href="javascript:;" data="4403">深圳</a>
                <a href="javascript:;" data="3307">金华</a>
                <a href="javascript:;" data="3306">绍兴</a>
            </dd>
        </dl>
        </c:if>
        <div style="clear:both"></div>
    </div>
    <%--<div class="item">--%>
        <%--<dl style="position: relative;padding-bottom: 0;min-height: 0">--%>
            <%--<dt>--%>
                <%--所有分类：--%>
            <%--</dt>--%>
            <%--<dd>--%>

            <%--</dd>--%>
        <%--</dl>--%>
    <%--</div>--%>
    <div class="i-content">
        <ul id="conditionSort">
            <li>
                <a href="javascript:;" class="filter-active">综合排序</a>
            </li>
            <li>
                <a data="downloadCount" href="javascript:;">下载量</a>
            </li>
            <li>
                <a data="createTime" href="javascript:;">最新</a>
            </li>
            <li>
                <a data="rank" href="javascript:;">好评</a>
            </li>
            <c:if test="${searchType != '小升初' && searchType != '中考' && searchType != '高考'}">
                <li>
                    <a data="pageCount" href="javascript:;">页数</a>
                </li>
            </c:if>
        </ul>
        <%--<div class="page">--%>
            <%--<i class="fa fa-angle-left" style="color:#999;cursor: pointer"></i> 1/50 <i class="fa fa-angle-right" style="color:#999;cursor: pointer"></i>--%>
        <%--</div>--%>
    </div>
    <div class="i-detail">
        <div class="left">
            <div style="height: 40px;width: 100%;">
                <button id="conditionStepSubjectBtn" class="btn btn-lg btn-purple" style="width: 80%;height: 100%;">
                    <span class="fa fa-list" style="float: left;"></span>
                    <span id="conditionStepSubjectDisplay" >学段 学科</span>
                    <span class="fa fa-caret-down" style="float: right;"></span>
                </button>
                <select style="display: none;" id="conditionStepSubject"></select>
            </div>
            <div class="zsd-tree-div">
                <ul id="conditionMenuTree" class="ztree col-md-12 padding-left-10" style="overflow-x: auto;overflow: auto;width: 78%;"></ul>
            </div>
        </div>
        <div id="listDataArea" class="right">

        </div>
    </div>

</div>
<%--<div style="clear: both"></div>--%>
<%--<div class="bottom">--%>
    <%--<div class="copy">--%>
        <%--Copyright &copy; 2015 学邦信息技术有限公司 All Rights Reserved--%>
    <%--</div>--%>
<%--</div>--%>
<script src="${ctx}/static/newui/js/SimpleTree.js"></script>
<%--<script>--%>
    <%--$('#admin').on('click', function(e) {--%>
        <%--if($(this).is('.info-active')){--%>
            <%--$(this).removeClass('info-active');--%>
            <%--$('.info-panal').hide();--%>

        <%--}else{--%>
            <%--$(this).addClass('info-active');--%>
            <%--$('.info-panal').show();--%>

        <%--}--%>
    <%--});--%>
<%--</script>--%>
<script src='${ctx}/thirdpart/ztree/jquery.ztree.all-3.5.min.js'></script>
<script src='${ctx}/thirdpart/jqselectable/js/jQselectable.js'></script>
<script src='${ctx}/thirdpart/jPaginate/jquery.paginate.js'></script>

<script src="${ctx}/static/js/component/datagrid.js"></script>
<script>
    var searchType = '${searchType}';
    var isEnterHighSchool = searchType == '小升初' || searchType == '中考' || searchType == '高考';
    var userInformation = {
        subject : getCookie('search_subject') ?  getCookie('search_subject') : ${userInformation.subject},
        teachingVersion : getCookie('search_teachingVersion') ?  getCookie('search_teachingVersion') : ${userInformation.teachingVersion},
        grade : getCookie('search_grade') ?  getCookie('search_grade') : ${userInformation.grade}
    }
</script>
<script src='${ctx}/static/js/document/search.js'></script>
<%@include file="../footer.jsp" %>
</body>
</html>
