/**
 * Created by Administrator on 2015/5/25.
 */
$(document).ready(function () {
    //$("#nav_list").find("a").click(function (obj) {
    //    $("#nav_list a").removeClass("active");
    //    $(this).addClass("active");
    //});

    // 表单校验规则
    $('#searchForm').validate({
        rules: {
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

    $(document).on('click','li.active-li',function(){
        $(this).addClass('active').siblings().removeClass('active');
    });

    //$(document).find("li").click(function(){
    //    //$(this).addClass('active').siblings().removeClass('active');
    //    $("li a").removeClass("active");
    //    $(this).addClass("active");
    //});

    information.init(user);
    information.bindChange();
    $("#saveInfo").hide();
    $("#editInfo").on('click', function () {
        $(".showSubject").hide();
        $(".showVersion").hide();
        $(".showGrade").hide();
        $(".sctble_display").show();
        $(".select_version").show();
        $(".select_grade").show();
        $(".action").show();
        $("#editInfo").hide();
        $("#saveInfo").show();
    });

    $("#saveInfo").on('click', function () {
        information.edit();
    });



    $("#uploadPicture").on('click', function () {
        $("#addFile").click();
    });

    $("#picSubmit").on("click",function(){
        //要选择图片才能提交
        if("x=&y=&finalWidth=&finalHeight="===$("#saveCutedPic").serialize()) {
            alert("请选择图片", true);
            return;
        }
        $("#saveCutedPic").submit();
    });

    myCollection.initListGrid();
    myMessage.hasAnyNewMessage();
});

var myCollection={
    listGrid : $("#myCollection"),

    initListGrid : function(){


        $("#myScore").hide();
        $("#myContribution").hide();
        $("#myDownload").hide();
        $("#myMessage").hide();
        $("#deleteDownloadRecord").hide();
        $("#deleteMyMessage").hide();
        $("#myCollection").show();
        $("#doBatchCancelCollecting").show();
        this.listGrid.html('<div  class="loading">正在加载中...</div>');

        this.listGrid.datagrid({
            url:ctx+"/documentCollectRecord/page",
            pageSize : 10,
            emptyTemplate:'没有收藏的信息哦，亲~~',
            searchParams: {"search_EQ_createUser.id":user,"sorts[0].field":'createTime'},
            showCheckbox:true,
            columns :[
                {title:"ID",hidden:true,field :'id'},
                {title : "文档名称",width:2,field : 'document',formatter:function(document){
                    var name= "<a target=_blank href='"+ctx+"/document/preview/"+document.id+"' style='color:#000;display:block;text-decoration:none;overflow: hidden;height: 18px;width:100%;' title='"+document.name+"'>"+document.name+"</a>";
                    return name;
                }},
                {title : "分类",width:2,field : 'document.tags',formatter:function(data){
                    var tag="<a  style='color:#000;text-decoration:none;display:block;overflow: hidden;height: 18px;width:100%;' title='"+(data.length===0?"无":getTagsParentName(data[0]))+"'>"+(data.length===0?"无":getTagsParentName(data[0]))+"</a>";
                    return tag;
                }},
                {title : "文件类型",width:1,field : 'document.type.name'},
                {title : "地区",width:1,field : 'document.areaCode.name'},
                {title : "贡献者",width:1,field : 'document.createUser.name'},
                {title : "收藏时间",width:2,field : 'createTime'}
            ]
        })
        this.listGrid.find("table").before('首页>个人中心>我的收藏<div class="header">我的收藏 <a id="doBatchCancelCollecting"  href="javascript:{this.disabled=true;information.doBatchCancelCollecting();}" class="del"> 删除 </a> </div>');
    }
};

var myContribution={
    listGrid :$("#myContribution"),
    initListGrid :function(){
        $("#myScore").hide();
        $("#doBatchCancelCollecting").hide();
        $("#myCollection").hide();
        $("#deleteMyMessage").hide();
        $("#deleteDownloadRecord").hide();
        $("#myDownload").hide();
        $("#myMessage").hide();
        $("#myContribution").show();
        this.listGrid.html('<div  class="loading">正在加载中...</div>');
        this.listGrid.datagrid({
            url:ctx+"/document/findDocumentAll",
            emptyTemplate:'没有贡献的信息哦，亲~~',
            pageSize : 10,
            searchParams: {"search_EQ_createUser.id":user,"sorts[0].field":'createTime'},
            showCheckbox:true,
            columns :[
                {title : "文档名称",width:2,field :"name",formatter:function(value,index,record){
                    var name= "<a target=_blank href='"+ctx+"/document/preview/"+record.id+"' style='color:#000;text-decoration:none;display:block;overflow: hidden;height: 18px;width:100%;' title='"+record.name+"'>"+record.name+"</a>";
                    return name;
                }},
                {title : "阅读量",width:1,field :"readCount"},
                {title : "下载量",width:1,field :"downloadCount"},
                {title : "积分",width:1,field :"rank"},
                {title : "星级评价",width:2,field :"rank",formatter:function(data){
                    return information.rankPic(data);
                }},
                {title : "上传时间",width:2,field :"createTime"}
            ]
        })
        this.listGrid.find("table").before('首页>个人中心>我的贡献<div class="header">我的贡献  </div>');
    }
};

var myDownload={
    listGrid:$("#myDownload"),
    initListGrid:function(){
        $("#myScore").hide();
        $("#doBatchCancelCollecting").hide();
        $("#myCollection").hide();
        $("#myContribution").hide();

        $("#deleteMyMessage").hide();
        $("#myMessage").hide();
        $("#deleteDownloadRecord").show();
        $("#myDownload").show();
        this.listGrid.html('<div  class="loading">正在加载中...</div>');
        this.listGrid.datagrid({
            url:ctx+"/documentDownloadRecord/page",
            emptyTemplate:'没有下载的信息哦，亲~~',
            searchParams: {"search_EQ_createUser.id":user,"sorts[0].field":'createTime',"search_EQ_logicdelete":false},
            showCheckbox:true,
            pageSize : 10,
            columns :[
                {title:"ID",field:"id",hidden:true},
                {title :"文档名称",width:2,field:"document",formatter:function(document){
                    var name= "<a target=_blank href='"+ctx+"/document/preview/"+document.id+"' style='color:#000;display:block;text-decoration:none;overflow: hidden;height: 18px;width:100%;' title='"+document.name+"'>"+document.name+"</a>";
                    return name;
                }},
                {title :"分类",width:2,field:"document.tags",formatter:function(data){
                    var tag="<a  style='color:#000;text-decoration:none;display:block;overflow: hidden;height: 18px;width:100%;' title='"+(data.length==1?getTagsParentName(data[0]):"无")+"'>"+(data.length==1?getTagsParentName(data[0]):"无")+"</a>";
                    return tag;
                }},
                {title :"文件类型",width:1,field:"document.type.name"},
                {title :"地区",width:1,field:"document.areaCode.name"},
                {title :"贡献者",width:1,field:"document.createUser.name"},
                {title :"下载时间",width:2,field:"createTime"}
            ]
        })
        this.listGrid.find("table").before('首页>个人中心>我的下载<div class="header">我的下载 <a id="deleteDownloadRecord"  href="javascript:{this.disabled=true;information.doBatchDownloadLogicDelete();}" class="del"> 删除 </a> </div>');
    }
};

var myMessage={
    listGrid:$("#myMessage"),
    hasAnyNewMessage:function(){
        $.get(ctx+"/systemMessage/hasAnyNewMessage",function(result){
            if(result){
                if($("a:contains(我的消息)").find("i").length===0){
                    $("a:contains(我的消息)").append("<i class='W_new'></i>");
                }
            }else{
                $("a:contains(我的消息)").find("i").remove();
            }
        });
    },
    initListGrid:function(){
        //清楚红点
        $("a:contains(我的消息)").find("i").remove();
        $("#myScore").hide();
        $("#doBatchCancelCollecting").hide();
        $("#myCollection").hide();
        $("#myContribution").hide();
        $("#myDownload").hide();
        $("#deleteDownloadRecord").hide();
        $("#deleteMyMessage").show();
        $("#myMessage").show();
        this.listGrid.html('<div  class="loading">正在加载中...</div>');
        this.listGrid.datagrid({
            url:ctx+"/systemMessage/page",
            emptyTemplate:'没有系统信息哦，亲~~',
            pageSize : 10,
            searchParams: {"search_EQ_recipient.id":user,"sorts[0].field":'createTime',"search_EQ_logicdelete":false},
            showCheckbox:true,
            columns :[
                {title:"ID",field:"id",hidden:true},
                {title :"标题",width:8,field:"title",formatter:function(val,dataIndex,data,$td){
                    var maxLength = 40;
                    if(val && val.length > maxLength){
                        val = val.substring(0,maxLength);
                    }
                    if(data.readed===false){
                        $td.css({"color":"red"});
                        val+="<sup style='font-size: x-small;margin-left: 8px;'>NEW</sup>";
                    }
                    val+="<span style='color: #aaaaaa;margin-left: 20px;' class='glyphicon glyphicon-menu-right'></span>";
                    return val;
                }},
                {title :"时间",width:2,field:"createTimeDisplay"}
            ],
            afterLoad : function(data,_this){
                console.log(_this);
                myMessage.listGrid.find("tbody tr").each(function(index,item){
                    $(item).after("<tr><td style='display: none' colspan='"+ $(item).children().length +"'>"+data[index].content+"</td></tr>");
                    $(item).find("td:eq(2)").css({"cursor":"pointer"}).click(function(){
                        var mid=$(item).find("td:eq(1)").text();
                        if($(item).find("td:eq(2)").find("sup").length!=0){
                            $.get(ctx+"/systemMessage/readMessage",{"messageId":mid},function(data){
                                if(data.ok===true){
                                    var $title= $(item).find("td:eq(2)");
                                    $title.css({"color":""})
                                    $title.find("sup").remove();
                                    //检查是否还有未读消息
                                    //myMessage.hasAnyNewMessage();
                                }
                            });
                        }
                        var $display = $(item).next().find('td');
                        var $title=$(item).find("td span");

                        if($display.is(':visible')){
                            $title.removeClass("glyphicon glyphicon-menu-down");
                            $title.addClass("glyphicon glyphicon-menu-right");
                            $display.slideUp();
                        }else{
                            $title.removeClass("glyphicon glyphicon-menu-right");
                            $title.addClass("glyphicon glyphicon-menu-down");
                            $display.slideDown();
                        }
                    });
                });


            }
        });
        this.listGrid.find("table").before('首页>个人中心>我的消息<div class="header">我的消息 <a id="deleteMyMessage"  href="javascript:{this.disabled=true;information.doBatchMyMessage();}" class="del"> 删除 </a> </div>');
        this.listGrid.find("table").removeClass("table-bordered");
    }
};

var myScore={
    listGrid:$("#myScore"),
    initListGrid:function() {
        $("#doBatchCancelCollecting").hide();
        $("#myCollection").hide();
        $("#myContribution").hide();
        $("#deleteMyMessage").hide();
        $("#myMessage").hide();
        $("#deleteDownloadRecord").hide();
        $("#myDownload").hide();
        this.listGrid.show();
        this.listGrid.html("<div class='loading'>正在加载中...</div>");
        this.listGrid.datagrid({
            url:ctx+"/scoreRecord/page",
            emptyTemplate:'没有积分的信息哦，亲~~',
            searchParams: {"search_EQ_user.id":user,"sorts[0].field":'createTime'},
            pageSize : 10,
            columns :[
                {title :"得分",field:"score"},
                {title :"得分来源",formatter:function(data, index, record){
                    return record.rule.name;
                }},
                {title :"文档", formatter: function(data, index, record){
                    return "<a target='_blank' " +
                                "href='"+ ctx +"/document/preview/"+record.document.id
                                +"' style=\"color:#000;display:block;text-decoration:none;overflow: hidden;height: 18px;width:100%;\""
                                +" tile='"+record.document.name+"'>"
                                + record.document.name + "</a>";
                }},
                {title :"时间",field:"createTime"}
            ]
        });
        this.listGrid.find("table").before('首页>个人中心>我的积分<div class="header">我的积分</div>');
    }
};

var information = {
    url: ctx + "/documentTag/getNodes",
    init: function (user) {
        $.get(ctx + "/userInformation/page", {"search_EQ_user.id": user}, function (response) {
            $.each(response.content, function (i, info) {
                var row = '<div class="select_information row ">'
                    + '<form action="' + ctx + '/userInformation/saveInformation"> '
                    + '<input type="hidden" name="id" value="' + info.id + '"> '
                    + '<div class="my-select col-md-3" style="display: inline-flex">'
                    + '<label class="">可教学科：</label>'
                    + ' <select name="subject" class="select_subject " defaultValue="' + info.subject + '" value="' + info.subject + '"> '
                    + ' </select> '
                    + '<div class="showSubject"></div> '
                    + ' </div>  '
                    + '  <div class="my-select col-md-4" style="display: inline-flex"> '
                    + '   <label class="">教材版本：</label> '
                    + ' <select name="version" class="select_version col-md-6" defaultValue="' + info.teachingVersion + '" value="' + info.teachingVersion + '" > '
                    + ' </select> '
                    + '<div class="showVersion"></div> '
                    + ' </div> '
                    + ' <div class="my-select col-md-4" style="display: inline-flex"> '
                    + ' <label class="">主教年级：</label> '
                    + ' <select name="grade" class="select_grade col-md-6" defaultValue="' + info.grade + '" value="' + info.grade + '"> '
                    + ' </select> '
                    + '<div class="showGrade"></div>'
                    + '  </div> '
                    + '<div class="action row" style="padding-left: 0;">'
                    + '</div>'
                    + ' </form> '
                    + ' </div> '
                $(".panel-body").append(row);
                information.putSubjectOption($("input[value='" + info.id + "']").parents(".select_information").find(".select_subject"));
                information.putVersion(info.subject, $("input[value='" + info.id + "']").parents(".select_information").find(".select_version"));
                information.putGrade(info.teachingVersion, $("input[value='" + info.id + "']").parents(".select_information").find(".select_grade"));
                infoTable.initIcon();
                $(".select_version").hide();
                $(".select_grade").hide();
            });
        });
    },
    bindChange: function () {

        $(document).on('click', 'span:contains(添加)', function () {
            infoTable.addOneRow();
        });

        $(document).on('click', 'span:contains(删除)', function () {

            var that = this;
            infoTable.deleteOneRow(that);
        });

        $(document).on("change", "[name=subject]", function () {
            var ver = $(this).parents(".select_information").find(".select_version");
            ver.attr("defaultValue", "");
            ver.attr("value", "");
            ver.empty();
            var grade = $(this).parents(".select_information").find(".select_grade");
            grade.attr("defaultValue", "");
            grade.attr("value", "");
            grade.empty();
            grade.next().text(grade.find("option:selected").text());

            $(this).nextAll(".showSubject").text($(this).find("option:selected").text());
            information.putVersion($(this).val(), $(this).parents(".select_information").find(".select_version"));
        });

        $(document).on("change", ".select_version", function () {
            $(this).parents(".select_information").find(".select_grade").attr("defaultValue", "");
            $(this).parents(".select_information").find(".select_grade").attr("value", "");
            $(this).parents(".select_information").find(".select_grade").empty();

            $(this).next().text($(this).find("option:selected").text());
            information.putGrade($(this).val(), $(this).parents(".select_information").find(".select_grade"));
        });

        $(document).on("change", ".select_grade", function () {
            $(this).next().text($(this).find("option:selected").text());
        });
    },
    rankPic: function (rank) {
        var html = "";
        for (var i = 0; i < rank; i++) {
            html += '<img style="height: 15px;width: 15px;" src="' + ctx + '/thirdpart/jquery-raty-2.5.2/lib/img/star-on.png"/> ';
        }
        for (var i = 0; i < 5 - rank; i++) {
            html += '<img style="height: 15px;width: 15px;" src="' + ctx + '/thirdpart/jquery-raty-2.5.2/lib/img/star-off.png"/> ';
        }
        return html;
    },
    replaceNullObj: function (srcObj, replaceStr, property) {
        //
        if (srcObj == null) {
            return replaceStr;
        }
        return srcObj[property];
    },
    doBatchCancelCollecting: function () {
        var ids = "";
        var $input = $("#myCollection").find("input[type='checkbox']");

        for (var i = 1; i < $input.length; i++) {
            if ($input.eq(i).is(':checked') === true) {
                ids += $input.eq(i).parent().next().html() + ",";
            }
        }
        if (ids !== "" && ids !== undefined) {
            $.get(ctx + "/documentCollectRecord/doBatchCancelCollecting", {'ids': ids}, function (responseJSON) {
                if (responseJSON.ok === true) {
                    myCollection.initListGrid();
                    alert("取消收藏成功");
                } else {
                    alert("取消收藏失败!", true);
                }
            })
        } else {
            alert("没有选择哦",true);
        }

    },
    doBatchDownloadLogicDelete: function () {
        var ids = "";
        var $input = $("#myDownload").find("input[type='checkbox']");

        for (var i = 1; i < $input.length; i++) {
            if ($input.eq(i).is(':checked') === true) {
                ids += $input.eq(i).parent().next().html() + ",";
            }
        }
        if (ids !== "" && ids !== undefined) {
            $.get(ctx + "/documentDownloadRecord/doBatchDownloadLogicDelete", {'ids': ids}, function (responseJSON) {
                if (responseJSON.ok === true) {
                    myDownload.initListGrid();
                    $("#deleteDownloadRecord").removeAttr("disabled");
                    alert("删除下载记录成功");
                } else {
                    alert("删除下载记录失败!", true);
                }
            })
        } else {
            alert("没有选择哦",true);
        }

    },
    doBatchMyMessage: function () {
        if(confirm("确定要执行该操作么？")){
            var ids = "";
            var $input = $("#myMessage").find("input[type='checkbox']");

            for (var i = 1; i < $input.length; i++) {
                if ($input.eq(i).is(':checked') === true) {
                    ids += $input.eq(i).parent().next().html() + ",";
                }
            }
            if (ids !== "" && ids !== undefined) {
                $.get(ctx + "/systemMessage/doBatchMyMessageLogicDelete", {"ids": ids}, function (responseJSON) {
                    if (responseJSON.ok === true) {
                        myMessage.initListGrid();
                        $("#deleteMyMessage").removeAttr("disabled");
                        alert("删除消息成功");
                    } else {
                        alert("删除消息失败！", true);
                    }
                });
            } else {
                alert("没有选择哦",true);
            }
        }
    },
    replaceMorechar: function(str){
        var result="";
        if(str.length>7){
            result=str.substring(0,7);
            result+="...";
        }else{
            result=str;
        }
        return result;
    },
    edit:function(){

        var userList = new Array();
        $(".select_information").each(function (i, item) {

            var param = {};
            var subject = $(item).find(".select_subject").val();
            var teachingVersion = $(item).find(".select_version").val();
            var grade = $(item).find(".select_grade").val();



            param['subject'] = subject;
            param['teachingVersion'] = teachingVersion;
            param['grade'] = grade;
            if ($(item).find("[name=id]").val()) {
                param['id'] = $(item).find("[name=id]").val();
            }
            userList.push(param);
        });

        for(var i=0;i<userList.length;i++){
            if(userList[i].subject===''||userList[i].subject===null||userList[i].teachingVersion===''||userList[i].teachingVersion===null||userList[i].grade===''||userList[i].grade===null){
                alert("不能保存空的信息！",true);
                //setTimeout(function(){location=location;},"1000");
                return;
            }
        }

        $("#saveInfo").hide();
        $("#editInfo").show();
        $(".showSubject").show();
        $(".showVersion").show();
        $(".showGrade").show();
        $(".select_subject").hide();
        $(".select_version").hide();
        $(".select_grade").hide();
        $(".action").hide();
        $.ajax({
            url: ctx + "/userInformation/saveInformation",
            type: "post",
            data: JSON.stringify(userList),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                if(data.ok==true){
                    alert("保存成功");
                }
            }, error: function (data) {
                if(data.ok==false){
                    alert("保存出错",true);
                }
            }
        });
    },
    putGrade: function (id, domObject) {

        $.get(information.url, {level: 1, id: id}, function (data) {
            $(domObject).empty();
            if(data.length>0){
                var children = data[0].children;
                var optionHtml = '<option value="">请选择年级</option>';
                $.each(children, function (i, item) {
                    var gradeName = item.name;
                    optionHtml += '<option value="' + item.id
                    + '">' + gradeName + '</option>';
                });
                $(domObject).append(optionHtml);
                if ($(domObject).attr("defaultValue")) {
                    $(domObject).val($(domObject).attr("defaultValue"));
                    $(domObject).next().html($(domObject).find("option:selected").text());
                }

                $(domObject).next().text($(domObject).find("option:selected").text());
            }

        });



    },
    putVersion: function (id, domObject) {
        $.get(ctx + "/documentTag/getChildren", {id: id}, function (data) {

            $(domObject).empty();
            var optionHtml = '<option value="">请选择教材版本</option>';
            $.each(data, function (i, item) {
                optionHtml += '<option value="' + item.id
                + '">' + item.name + '</option>';
            });
            $(domObject).append(optionHtml);
            if ($(domObject).attr("defaultValue")) {
                $(domObject).val($(domObject).attr("defaultValue"));
                $(domObject).next().html($(domObject).find("option:selected").text());
            }
            $(domObject).next().text($(domObject).find("option:selected").text());

        });




    },
    putSubjectOption: function (object) {
        $.get(information.url, {level: 2}, function (data) {

            $.each(data, function (i, item) {

                var children = item.children;
                var selectStr = '<optgroup id="' + item.id + '" label="'
                    + item.name + '">';
                var optionHtml = "";

                if (children) {
                    $.each(children, function (j, child) {
                        optionHtml += '<option value="' + child.id
                        + '">' + child.name + '</option>';
                    });
                }
                selectStr += optionHtml;
                selectStr += "</optgroup>";

                $(object).append(selectStr);


            });
            var defaultValue = $(object).attr("defaultValue");

            $(object).val(defaultValue);
            $(object).next().html($(object).find("option:selected").text());


            $(object).jQselectable({
                style: 'selectable',
                set: 'fadeIn',
                out: 'fadeOut',
                callback: function () {
                    $(this).parents(".select_information").find(".select_subject").change();
                    var subjectVal = $(this).parents(".select_information").find(".select_subject").val();
                    if ($(object).val(($(this).val()))) {
                        //information.getVersionNode($(this).val(), $(this).parents(".select_information").find(".select_version"));
                        //$(this).attr("defaultValue","");
                        $(this).parents(".select_information").find(".select_version").empty();
                        $(this).parents(".select_information").find(".select_grade").empty();
                        information.putVersion(subjectVal, $(this).parents(".select_information").find(".select_version"));
                    }
                },
                top: -5
                //left:-10
            });

            if(defaultValue){
                $(object).val(defaultValue);
                $(".select_subject").hide();
            }

        })
    }


};

//递归取得的全部父子内容
function getTagsParentName(tag){
    var str="";
    if(tag.parent===null){
        str=tag.name+str;
        return str;
    }else{
        if(tag.name==="章节"){
            str=getTagsParentName(tag.parent)+str;
        }else{
            str=getTagsParentName(tag.parent)+"->"+ tag.name+str;
        }
        return str;
    }

}


var infoTable = {
    addIcon: '<span style="cursor: pointer">添加 </span>',
    delIcon: '<span style="cursor: pointer">删除</span>',
    getSampleTr: function () {
        var trHtml = '<div class="select_information row "> '
            + ' <form>  '
            + ' <input type="hidden" name="id" value=""> '
            + ' <div class="my-select col-md-3" style="display: inline-flex"> '
            + ' <label class="">可教学科：</label> '
            + ' <select name="subject" class="select_subject " defaultValue="" value=""> '
            + ' </select> '
            + '<div class="showSubject"></div> '
            + ' </div>  '
            + '  <div class="my-select col-md-4" style="display: inline-flex"> '
            + '   <label class="">教材版本：</label> '
            + ' <select name="version" class="select_version col-md-6" defaultValue="" value="" > '
            + ' </select> '
            + '<div class="showVersion"></div> '
            + ' </div> '
            + ' <div class="my-select col-md-4" style="display: inline-flex"> '
            + ' <label class="">主教年级：</label> '
            + ' <select name="grade" class="select_grade col-md-6" defaultValue="" value=""> '
            + ' </select> '
            + '<div class="showGrade"></div>'
            + '  </div> ' +
            '<div class="action row">  ' +
            '    ' +
            '    ' +
            '</div>'
            + ' </form> '
            + ' </div> ';
        return trHtml;
    },//<div type="button" class="btn btn-sm col-md-2 glyphicon glyphicon-minus"> </div>'       <div type="button" class="btn btn-sm col-md-2 glyphicon glyphicon-plus"> </div>
    initial: function () {
        //$("#typeExam").val("");
        //$("#time").val("");
        //$("#score_Table tbody").html("");
        //infoTable.addOneRow();
    },
    addOneRow: function () {
        $(".panel-body").append(infoTable.getSampleTr());
        $(".action").show();
        infoTable.initIcon();


        information.putSubjectOption($(".select_information:last").find(".select_subject"));

        $(".showSubject").hide();
        $(".showVersion").hide();
        $(".showGrade").hide();


        //countOfCourse++;
    },
    deleteOneRow: function (deleteIconItem) {

        var deleteId = $(deleteIconItem).parent().parent().find("[name=id]").val();
        //if(deleteId){
        //    information.deleteIds.push(deleteId);
        //}
        //
        if (deleteId) {
            $.get(ctx + "/userInformation/deleteInfo", {"id": deleteId}, function (response) {
                if (response) {
                    $(deleteIconItem).parent().parent().parent().remove();
                }
                infoTable.initIcon();
            });
        } else {
            $(deleteIconItem).parent().parent().parent().remove();
            infoTable.initIcon();
        }


    },
    initIcon: function () {debugger;

        $(".select_information").find('.action').empty();


        //// 最后一行加上一个 addIcon
        $(".select_information").find('.action').append(infoTable.addIcon);

        //// 如果只有一行，不加 delIcon； 如果大于一行，每一加入delIcon
        if ($(".select_information").length > 1) {
            $(".select_information").find('.action').append(infoTable.delIcon);
        }


    }
};

$('#dropArea').dmUploader({
    url: ctx + '/user/upload',
    dataType: 'json',
    allowedTypes: '*',
    extFilter: 'jpg;png;gif;jpeg',//
    maxFileSize: 1024 * 1024 * 3,
    onInit: function () {

    },
    onBeforeUpload: function (id) {



    },
    onUploadError: function (id, message) {



    },
    onNewFile: function (id, file) {

    },
    onComplete: function () {

    },
    onUploadSuccess: function (id, data) {


        $("#editPic").empty();
        var str= '  <img src="" id="target" />   '
            +' <div id="preview-pane">                                 '
            +' <div class="preview-container">                         '
            +'  <img src="" class="jcrop-preview" id="preview"  />     '
            +'   </div>                                                '
            +'   </div>                                                '
        $("#editPic").append(str);
        $("#target").attr("src","/o2o"+data);
        $("#preview").attr("src","/o2o"+data);


        // Create variables (in this scope) to hold the API and image size
        var jcrop_api,
            boundx,
            boundy,

        // Grab some information about the preview pane
            $preview = $('#preview-pane'),
            $pcnt = $('#preview-pane .preview-container'),
            $pimg = $('#preview-pane .preview-container img'),

            xsize = $pcnt.width(),
            ysize = $pcnt.height();

        //console.log('init',[xsize,ysize]);
        $('#target').Jcrop({
            onChange: updatePreview,
            onSelect: updatePreview,
            aspectRatio: xsize / ysize,
            boxWeight:300,
            boxHeight:300
        },function(){
            // Use the API to get the real image size
            var bounds = this.getBounds();
            boundx = bounds[0];
            boundy = bounds[1];
            // Store the API in the jcrop_api variable
            jcrop_api = this;

            // Move the preview into the jcrop container for css positioning
            $preview.appendTo(jcrop_api.ui.holder);
        });


        function updatePreview(c)
        {
            if (parseInt(c.w) > 0)
            {
                var rx = xsize / c.w;
                var ry = ysize / c.h;

                var width;
                var height;
                var x;
                var y;

                $pimg.css({
                    width: Math.round(rx * boundx) + 'px',
                    height: Math.round(ry * boundy) + 'px',
                    marginLeft: '-' + Math.round(rx * c.x) + 'px',
                    marginTop: '-' + Math.round(ry * c.y) + 'px'
                });

                $("#x").val(Math.round(rx * c.x));
                $("#y").val(Math.round(ry * c.y));
                $("#width").val(Math.round(rx * boundx));
                $("#height").val(Math.round(ry * boundy));
            }
        };






    },
    onUploadProgress: function (id, percent) {

        //$('#fileInfo').find('.progress-bar').width(percent + '%').text(percent + '%');
    }
    ,
    onFileTypeError: function (file) {

        alert("不支持该类型文件")

    },
    onFileSizeError: function (file) {


        alert("上传图片大小超出3Mb!");


    },
    onFallbackMode: function (message) {

    },
    onFileExtError: function (file) {

        alert("不支持该类型文件！")

    }
})