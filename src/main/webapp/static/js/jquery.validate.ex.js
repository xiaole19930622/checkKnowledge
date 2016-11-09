/**
 * Created by xuwen on 2015/4/16.
 */
// 自定义错误弹出方式
$.extend($.validator.defaults, {
    errorClass : 'text-danger',
    errorPlacement : function(error, element) {
        element.popover({
            selector : 'body',
            trigger : 'manual',
            placement : 'bottom',
            html : true,
            content : '<div class="text-danger">' + error.text() + '</div>'
        }).popover('show');
    },
    unhighlight : function( element, errorClass, validClass ){
        if ( element.type === "radio" ) {
            this.findByName( element.name ).removeClass( errorClass ).addClass( validClass );
        } else {
            $( element ).removeClass( errorClass ).addClass( validClass );
        }
        $( element).popover('destroy');
    }
});
//自定义校验规则
$.validator.addMethod("length", function(value, element, param) {
    var length = value.length;
    return this.optional(element) || ( length == value );
}, $.validator.format("请确保输入的值在{0}-{1}个字节之间(一个中文字算2个字节)"));

$.validator.addMethod("selected", function(value,element,param){





    if($(element).val()==-1){
        return false;
    }else{
        return true;
    }



},"请选一个！");

//提示信息
$.extend($.validator.messages, {
    required: "此项为必填项",
    remote: "请选择此项内容",
    email: "请输入有效的电子邮件",
    url: "请输入有效的网址",
    date: "请输入有效的日期",
    dateISO: "请输入有效的日期 (YYYY-MM-DD)",
    number: "请输入正确的数字",
    digits: "只能输入数字",
    creditcard: "请输入有效的信用卡号码",
    equalTo: "输入不一致",
    extension: "请输入有效的后缀",
    maxlength: $.validator.format("最多 {0} 个字"),
    minlength: $.validator.format("最少 {0} 个字"),
    rangelength: $.validator.format("请输入 {0} 到 {1} 个字"),
    range: $.validator.format("请输入 {0} 至 {1} 之间的数字"),
    max: $.validator.format("请输入不大于 {0} 的数字"),
    min: $.validator.format("请输入不小于 {0} 的数字")
});