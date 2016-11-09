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
    <%--bootstrap--%>
    <script src='${ctx}/thirdpart/bootstrap-3.3.4-dist/js/bootstrap.min.js'></script>
    <!--[if lt IE 9]>
    <script src='http://cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js'></script>
    <script src='http://cdn.bootcss.com/respond.js/1.4.2/respond.min.js'></script>
    <![endif]-->
    <link rel='stylesheet' href='${ctx}/thirdpart/bootstrap-3.3.4-dist/css/bootstrap.min.css'>
    <%--<link rel='stylesheet' href='${ctx}/thirdpart/bootstrap-3.3.4-dist/css/bootstrap-theme.min.css'>--%>
    <%--jquery validation 及扩展，默认中文国际化已拷贝至ex文件--%>
    <script src="${ctx}/thirdpart/jquery-validation-1.13.1/jquery.validate.min.js"></script>
    <script src="${ctx}/static/js/jquery.validate.ex.js"></script>
    <%--日期选择--%>
    <link rel='stylesheet' href='${ctx}/thirdpart/bootstrap-datetimepicker-master/css/bootstrap-datetimepicker.min.css'>
    <script src="${ctx}/thirdpart/bootstrap-datetimepicker-master/js/bootstrap-datetimepicker.js"></script>
    <script src="${ctx}/thirdpart/bootstrap-datetimepicker-master/js/locales/bootstrap-datetimepicker.zh-CN.js"></script>
    <%--cookie--%>
    <script src="${ctx}/static/js/cookie.js"></script>
    <%--bootstrap-growl提醒插件--%>
    <script src="${ctx}/thirdpart/ifightcrime-bootstrap-growl-162daa4/jquery.bootstrap-growl.js"></script>
    <%--jquery scroll to top--%>
    <script src='${ctx}/thirdpart/jQuery-scrollTopTop-v1.0/js/jquery.scrollToTop.min.js'></script>
    <link rel='stylesheet' href='${ctx}/thirdpart/jQuery-scrollTopTop-v1.0/css/style.css'>
    <%--自定义css--%>
    <link rel='stylesheet' href='${ctx}/static/css/global.css' />



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