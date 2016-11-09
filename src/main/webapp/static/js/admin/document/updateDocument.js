/**
 * Created by Administrator on 2015/5/16.
 */



function loadTagTree() {

    $.get(ctx + "/documentTag/getNodes", {level: 1}, function (jsonsObj) {
        showTagTree(jsonsObj);
    });
}

function showTagTree(result) {

    var zNodes = new Array();
    $.each(result, function (i, item) {
        var node = {};
        node.id = item.id;
        node.isParent = !item.leaf;
        node.name = item.name;
        zNodes.push(node);
    });
    var setting = {
        async: {
            enable: true,//启用异步加载
            url: ctx + "/documentTag/getChildren", //异步请求地址
            autoParam: ["id=id"],//需要传递的参数,为你在ztree中定义的参数名称
            dataFilter : function(treeId,parentNode,responseData){
                if(responseData){
                    for(var i = 0; i < responseData.length; i++){
                        responseData[i].isParent = !responseData[i].leaf;
                    }
                }
                return responseData;
            }
        },
        view: {
            dblClickExpand: false,
            showLine: true,
            selectedMulti: false
        },
        data: {
            simpleData: {
                enable: true
            }
        },
        callback: {
            onAsyncSuccess: function (event, treeId, treeNode, msg) {

                var zTree = $.fn.zTree.getZTreeObj("zsdTreeOfTag");
                treeNode.halfCheck = false;
                zTree.updateNode(treeNode);
            },
            beforeClick: function (treeId, treeNode) {
                return true;
//						    var zTree = $.fn.zTree.getZTreeObj("zsdTree");
//						     if (treenode.isLeaf) {
//							      zTree.expandNode(treeNode);
//							      return true;
//						     } else {
//							      //productIframe.attr("src",treeNode.url);
//							      return true;
//						     }
            },
            onClick: function (event, treeId, treeNode) {

            }
        }
    };

    /*
     $.each(result, function(i, item) {
     !item.leaf=true;
     });*/
    $.fn.zTree.init($("#zsdTreeOfTag"), setting, zNodes);
}


function loadAreaCodeTree() {

    $.get(ctx + "/areaCode/getNodes", {level: 0}, function (jsonsObj) {
        showAreaCodeTree(jsonsObj);
    });
}

function showAreaCodeTree(result) {

    var zNodes = new Array();
    $.each(result, function (i, item) {
        var node = {};
        node.id = item.id;
        node.isParent = !item.leaf;
        node.name = item.name;
        zNodes.push(node);
    });
    var setting = {
        async: {
            enable: true,//启用异步加载
            url: ctx + "/areaCode/getChildren", //异步请求地址
            autoParam: ["id=id"],//需要传递的参数,为你在ztree中定义的参数名称
            dataFilter : function(treeId,parentNode,responseData){
                if(responseData){
                    for(var i = 0; i < responseData.length; i++){
                        responseData[i].isParent = !responseData[i].leaf;
                    }
                }
                return responseData;
            }
        },
        view: {
            dblClickExpand: false,
            showLine: true,
            selectedMulti: false
        },
        data: {
            simpleData: {
                enable: true
            }
        },
        callback: {
            onAsyncSuccess: function (event, treeId, treeNode, msg) {

                var zTree = $.fn.zTree.getZTreeObj("zsdTreeOfTag");
                treeNode.halfCheck = false;
                zTree.updateNode(treeNode);
            },
            beforeClick: function (treeId, treeNode) {
                return true;
//						    var zTree = $.fn.zTree.getZTreeObj("zsdTree");
//						     if (treenode.isLeaf) {
//							      zTree.expandNode(treeNode);
//							      return true;
//						     } else {
//							      //productIframe.attr("src",treeNode.url);
//							      return true;
//						     }
            },
            onClick: function (event, treeId, treeNode) {

            }
        }
    };

    /*
     $.each(result, function(i, item) {
     !item.leaf=true;
     });*/
    $.fn.zTree.init($("#zsdTreeOfAreaCode"), setting, zNodes);
}


function loadZsdTree(getDataUrl) {

    $.get(ctx + "/documentType/getNodes", {level: 1}, function (jsonsObj) {
        showZsdTree(jsonsObj);
    });
}
function showZsdTree(result) {

    var zNodes = new Array();
    $.each(result, function (i, item) {
        var node = {};
        node.id = item.id;
        node.isParent = !item.leaf;
        node.name = item.name;
        zNodes.push(node);
    });
    var setting = {
        async: {
            enable: true,//启用异步加载
            url: ctx + "/documentType/getChildren", //异步请求地址
            autoParam: ["id=id"],//需要传递的参数,为你在ztree中定义的参数名称
            dataFilter : function(treeId,parentNode,responseData){
                if(responseData){
                    for(var i = 0; i < responseData.length; i++){
                        responseData[i].isParent = !responseData[i].leaf;
                    }
                }
                return responseData;
            }
        },
        view: {
            dblClickExpand: false,
            showLine: true,
            selectedMulti: false
        },
        data: {
            simpleData: {
                enable: true
            }
        },
        callback: {
            onAsyncSuccess: function (event, treeId, treeNode, msg) {

                var zTree = $.fn.zTree.getZTreeObj("zsdTree");
                treeNode.halfCheck = false;
                zTree.updateNode(treeNode);
            },
            beforeClick: function (treeId, treeNode) {
                return true;
//						    var zTree = $.fn.zTree.getZTreeObj("zsdTree");
//						     if (treenode.isLeaf) {
//							      zTree.expandNode(treeNode);
//							      return true;
//						     } else {
//							      //productIframe.attr("src",treeNode.url);
//							      return true;
//						     }
            },
            onClick: function (event, treeId, treeNode) {

            }
        }
    };

    /*
     $.each(result, function(i, item) {
     !item.leaf=true;
     });*/
    $.fn.zTree.init($("#zsdTree"), setting, zNodes);
}


function loadOrganizationTree(getDataUrl) {

    $.get(ctx + "/organization/getChildren", {id: '000001'}, function (jsonsObj) {
        showOrganizationTree(jsonsObj);
    });
}
function showOrganizationTree(result) {

    var zNodes = new Array();
    $.each(result, function (i, item) {
        var node = {};
        node.id = item.id;
        node.isParent = !item.leaf;
        node.name = item.name;
        zNodes.push(node);
    });
    var setting = {
        async: {
            enable: true,//启用异步加载
            url: ctx + "/organization/getChildren", //异步请求地址
            autoParam: ["id=id"],//需要传递的参数,为你在ztree中定义的参数名称
            dataFilter : function(treeId,parentNode,responseData){
                if(responseData){
                    for(var i = 0; i < responseData.length; i++){
                        responseData[i].isParent = !responseData[i].leaf;
                    }
                }
                return responseData;
            }
        },
        view: {
            dblClickExpand: false,
            showLine: true,
            selectedMulti: false
        },
        data: {
            simpleData: {
                enable: true
            }
        },
        callback: {
            onAsyncSuccess: function (event, treeId, treeNode, msg) {

                var zTree = $.fn.zTree.getZTreeObj("zsdTree");
                treeNode.halfCheck = false;
                zTree.updateNode(treeNode);
            },
            beforeClick: function (treeId, treeNode) {
                return true;
//						    var zTree = $.fn.zTree.getZTreeObj("zsdTree");
//						     if (treenode.isLeaf) {
//							      zTree.expandNode(treeNode);
//							      return true;
//						     } else {
//							      //productIframe.attr("src",treeNode.url);
//							      return true;
//						     }
            },
            onClick: function (event, treeId, treeNode) {

            }
        }
    };

    /*
     $.each(result, function(i, item) {
     !item.leaf=true;
     });*/
    $.fn.zTree.init($("#zsdTreeOfOrganization"), setting, zNodes);
}



function onSubmitType(){
    var typeId = "";
    var selectTypeName = "";
    var treeObjOfType = $.fn.zTree.getZTreeObj("zsdTree");
    var selectNodes = treeObjOfType.getSelectedNodes();
    if (selectNodes.length > 0) {
        var node = selectNodes[0];
        typeId = node.id;
        selectTypeName = node.name;
    }
    var selectId=typeId.substring(0,2);
    //年份
    $year=$('.selectDocumentType').parents('.col-md-7').siblings(".col-md-4").find(".form-group:eq(2)");
    //难度
    $difficulty=$('.selectDocumentType').parents('.col-md-7').siblings(".col-md-4").find(".form-group:eq(3)");

    var $tag = $("input[name= tag]").parent().parent().parent();

    var $subject  = $("[name=subject]").parent().parent().parent();
    var $grade =  $("[name=grade]").parent().parent().parent();
    var y= $year.addClass("hide").find("select");
    y.val("-1");

    var d= $difficulty.addClass("hide").find("select");

    d.val("-1");

    if(selectId==="12" || selectId==="18" || selectId==="19"){//选择试卷
        $year.removeClass("hide");
        if(selectId==="19"){
           $tag.addClass("hide");
           $grade.removeClass("hide");
           $subject.removeClass("hide");
        }else{
            $grade.addClass("hide");
            $subject.addClass("hide");
            $("[name=subject]").val(null);
            $("[name=grade]").val(null);
        }
    }else if(selectId==="11" ||selectId==="13" ||selectId==="14") {   //选择的是标准教案or课件or导学案
        $difficulty.removeClass("hide");
        $tag.removeClass("hide");
    }else{
        $year.addClass("hide");
        y.val("-1");
        $difficulty.addClass("hide");
        d.val("-1");
        $grade.addClass("hide");
        $subject.addClass("hide");
        $("[name=subject]").val(null);
        $("[name=grade]").val(null);
        $tag.removeClass("hide");
    }
    findNode(typeId,'documentType');
    $('.selectDocumentType').parent().parent().children().eq(0).val(typeId);
    $("#selectType").modal("hide");
}

function findNode(id,param){

    switch(param)
    {
        case 'documentTag':
            $.get(ctx+"/"+param+"/"+id,function(data){
                var selectTagName= getParentName(data);
                $('.selectDocumentTag').parent().parent().children().eq(1).val(selectTagName);
                $('.selectDocumentTag').parent().parent().children().eq(1).attr("title",selectTagName);
                $("#fm").validate();
                $("#fm").valid();
            });
            break;
        case 'documentType':
            $.get(ctx+"/"+param+"/"+id,function(data){
                var selectTypeName= getParentName(data);
                $('.selectDocumentType').parent().parent().children().eq(1).val(selectTypeName);
                $('.selectDocumentType').parent().parent().children().eq(1).attr("title",selectTypeName);
                $("#fm").validate();
                $("#fm").valid();
            });
            break;
        case 'areaCode':
            $.get(ctx+"/"+param+"/"+id,function(data){
                var areaCodeName= getParentName(data);
                $('.selectDocumentAreaCode').parent().parent().children().eq(1).val(areaCodeName);
                $('.selectDocumentAreaCode').parent().parent().children().eq(1).attr("title",areaCodeName);
                $("#fm").validate();
                $("#fm").valid();
            });
            break;
        default:
            $.get(ctx+"/organization/"+id,function(data){
                var organizationName=getParentName(data);
                $('.selectDocumentOrganization').parent().parent().children().eq(1).val(organizationName);
                $('.selectDocumentOrganization').parent().parent().children().eq(1).attr("title",organizationName);
                $("#fm").validate();
                $("#fm").valid();
            });
    }


}

function getParentName(data){
    var str="";
    if(data.parent===null){
        str=data.name+str;
        return str;
    }else{
        str=getParentName(data.parent)+"->"+ data.name+str;
        return str;
    }

}


function onSubmitTags() {



    var tagId = "";
    var selectTagName = "";
    var treeObjOfTag = $.fn.zTree.getZTreeObj("zsdTreeOfTag");

    var selectNode = treeObjOfTag.getSelectedNodes();

    if (selectNode.length > 0) {
        var node = selectNode[0];
        tagId = node.id;
        selectTagName = node.name;
    }

    findNode(tagId,'documentTag');
    $('.selectDocumentTag').parent().parent().children().eq(0).val(tagId);
    $("#selectTag").modal("hide");
}

function onSubmitAreaCode(){
    var areaCodeId="";
    var areaCodeName="";
    var zsdTreeOfAreaCode = $.fn.zTree.getZTreeObj("zsdTreeOfAreaCode");
    var selectNode =zsdTreeOfAreaCode.getSelectedNodes();
    if (selectNode.length > 0) {
        var node = selectNode[0];
        areaCodeId = node.id;
        areaCodeName = node.name;
    }
    findNode(areaCodeId,'areaCode');
    $('.selectDocumentAreaCode').parent().parent().children().eq(0).val(areaCodeId);
    $("#selectAreaCode").modal("hide");
}

function onSubmitOrganization(){
    var organizationId="";
    var organizationName="";
    var zsdTreeOfOrganization = $.fn.zTree.getZTreeObj("zsdTreeOfOrganization");
    var selectNode =zsdTreeOfOrganization.getSelectedNodes();
    if (selectNode.length > 0) {
        var node = selectNode[0];
        organizationId = node.id;
        organizationName = node.name;
    }
    findNode(organizationId);
    $('.selectDocumentOrganization').parent().parent().children().eq(0).val(organizationId);
    $("#selectOrganization").modal("hide");
}


var update={
    selectTypeTree: null,
    selectTagTree: null,
    selectTypeBtn: function () {
        $("#selectType").modal("show");
        loadZsdTree();
    },
    selectTagBtn: function () {
        $("#selectTag").modal("show");
        loadTagTree();
    },
    selectAreaCodeBtn :function(){
        $("#selectAreaCode").modal("show");
        loadAreaCodeTree();
    },
    selectOrganizationBtn :function(){
        $("#selectOrganization").modal("show");
        loadOrganizationTree();
    }
}

$(document).ready(function(){
    (function init(){
        var idOftype=$("[name=type]").val().substring(0,2);
        var yr=$("[name=year]").parents(".form-group");
        var df=$("[name=difficulty]").parents(".form-group");
        if(idOftype==="12"){//选择试卷
            yr.removeClass("hide");
        }else if(idOftype==="11" ||idOftype==="13" ||idOftype==="14") {   //选择的是标准教案or课件or导学案
            df.removeClass("hide");
        }else{
            yr.addClass("hide");
            $("[name=year]").val("-1");
            df.addClass("hide");
            $("[name=difficulty]").val("-1");
        }
    })();
    $(document).on('click', 'button:contains(选择类型)', function () {
        $('.selectDocumentType').removeClass('selectDocumentType');
        $(this).addClass('selectDocumentType');
        update.selectTypeBtn();
    });

    $(document).on('click', 'button:contains(选择标签)', function () {
        $('.selectDocumentTag').removeClass('selectDocumentTag');
        $(this).addClass('selectDocumentTag');
        update.selectTagBtn()
    });


    $(document).on('click', 'button:contains(选择地区)', function () {
        $('.selectDocumentAreaCode').removeClass('selectDocumentAreaCode');
        $(this).addClass('selectDocumentAreaCode');
        update.selectAreaCodeBtn()
    });

    $(document).on('click', 'button:contains(选择来源)', function () {
        $('.selectDocumentOrganization').removeClass('selectDocumentOrganization');
        $(this).addClass('selectDocumentOrganization');
        update.selectOrganizationBtn()
    });


    jQuery.validator.addClassRules({
        name: {
            required: true,
            maxlength: 100
        },
        typeOfDocument:{
            required:true
        },
        tagOfDocument:{
            required:true
        },
        areaCode:{
            required:true
        },
        organization:{
            required:true
        },
        year:{
            selected:true
        },
        difficulty:{
            selected:true
        },
        isOfficial:{
            selected:true
        }
    });

    $("#saveFileInfo").on('click',function(){
        $("#fm").validate({

        });
        if (!$("#fm").valid()) {
            return false;
        }
        var param={};
        param["id"]=$("[name=id]").val();
        param["name"]=$("[name=name]").val();
        param["description"]=$("[name=description]").val();
        param["type.id"]=$("[name=type]").val();
        param["tags[0].id"]=$("[name=tag]").val();
        param["areaCode.id"]=$("[name=areaCode]").val();
        param["organization.id"]=$("[name=organization]").val();
        param["year"]=$("[name=year]").val();
        param["difficulty"]=$("[name=difficulty]").val();
        param["checkStatus"]=$("[name=checkStatus]").val();
        param["grade.id"] = $("[name=grade]").val();
        param["subject.id"]=$("[name=subject]").val();
        param["isOfficial"]=$("[name=isOfficial]").val();
        $.post(ctx+"/document/updateDocument",param,function(response){
            window.location.href=ctx+"/admin/document/list";
        });
    });

})