/*
 name:cookie 名
 value:cookie 值
 */
//写入cookie
function addCookie(name,value)
{
    //var Days = 30; //此 cookie 将被保存 30 天
    //var exp = new Date();
    //exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";path=/;expires=" + Number.MAX_VALUE;
    return document.cookie;
}
///删除cookie
function deleteCookie(name)
{
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}
//读取cookie
function getCookie(name)
{
    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
    if(arr != null){
        return unescape(arr[2]);
    }
    return null;
}