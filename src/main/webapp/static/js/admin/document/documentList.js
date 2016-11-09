var curDocumentType = "documentInfoReport";
var documentManagement = {
    getDocumentsApi: ctx + "/document/findDocumentList",
    delDocumentApi:ctx+"/document/delete",
    freezeUserApi:ctx+"/user/save",
    getDocumentTypeApi: ctx + "/documentType/getNodes",
    typeData: [],
    curParam:{},
    listGrid : $("#documentList"),
    initListGrid : function() {
        this.listGrid.datagrid({
            url : documentManagement.getDocumentsApi,
            staticSearchParams : {
                "sorts[0].field" : 'createTime'
            },
            columns : [
                { title : "文件名",field : 'name',formatter : function(data,index,record){
                    return '<a target=_blank href="' + ctx + '/document/preview/'+ record.id +'">' + data + '</a>';
                }},
                { title : "上传时间",field : 'createTime'},
                { title : "贡献者",field : 'createUser.name',formatter : function(data,index,record){
                    if(record.createUser.status == 1){
                        return '<span style="color:red;">'+ data +'</span>';
                    }else{
                        return data;
                    }
                }},
                { title : "预览状态",field : 'convertStatus',formatter : function(data,index,record){
                    if(data == 0 || data == 3 ){
                        return '格式转换中';
                    }else if(data == 1){
                        return '可预览';
                    }else{
                        return '<span title="失败原因：'+ record.convertFailReason +'">格式转换失败</span>';
                    }
                }},
                { title : "审核人",field : 'checkUser.name'},
                { title : "下载次数",field : 'downloadCount'},
                { title :"操作",field : 'act',formatter : function(data,index,record){
                    var modifyBtn = "<a class='btn btn-xs btn-default' data-original-title='Save Row' href=\"javascript:documentManagement.editDocument('" + record.id+"');\">属性修改</a>";
                    var delBtn = "<a class='btn btn-xs btn-default' data-original-title='Save Row' href=\"javascript:documentManagement.delDocument('" + record.id+"');\">删除文件</a>";
                    var freezeBtn="";
                    if(record.createUser.status == 0){
                        freezeBtn = "<a class='btn btn-xs btn-default' data-original-title='Save Row' href=\"javascript:documentManagement.freezeUser('" + record.createUser.id +"','" + record.createUser.name +"');\">冻结该帐号</a>";
                    }else{
                        freezeBtn = "<a class='btn btn-xs btn-default' data-original-title='Save Row' href=\"javascript:documentManagement.unFreezeUser('" + record.createUser.id +"','" + record.createUser.name +"');\">解冻该帐号</a>";
                    }
                    return modifyBtn + delBtn + freezeBtn;
                }},
            ]
        });

    },
    showTypeLayer: function () {
        if (documentManagement.typeData.length == 0) {
            $.get(documentManagement.getDocumentTypeApi, {
                level:1
            }, function (jsonsObj) {
                documentManagement.typeData = jsonsObj;
                documentManagement.showTypeToDom();
            });
        } else {
            documentManagement.showTypeToDom();
        }
    },
    showTypeToDom: function () {
        $("#type_item").remove();
        if (documentManagement.typeData.length > 0) {
            var ulHtml = '<ul class="sec-item" id="type_item">'
                + '<li class="text active"><a data="0" onclick="documentManagement.clickSecItemText(this)" href="javascript:void(0)" hidefocus="true" alog-text="不限">不限</a></li>';
            $.each(documentManagement.typeData, function (i, item) {
                ulHtml += '<li class="text"><a data="'
                + item.id
                + '" onclick="documentManagement.clickSecItemText(this)" href="javascript:void(0)" hidefocus="true" alog-text="'
                + item.name + '">' + item.name + '</a></li>';
            });
            ulHtml += '</ul>';
            $("#sec_items").prepend(ulHtml);
        }
    },
    showLayer: function () {
        searchDocument.options.showAreaFunc();
        documentManagement.showTypeLayer();
    },

    clickSecItemText: function (obj) {
        // 点击类型时
        searchDocument.options.clickSecItemTextFunc(obj);
    },


    clickFifthSecItemText: function (obj) {
         
        if ($(obj).length) {
            $(obj).parents("ul").find("li").removeClass("active");
            $(obj).parents("li").addClass("active");
            var parentId = $(obj).attr("data");
            searchDocument.curSelectedTag = parentId;
            searchDocument.options.searchDocumentFunc();
        }
    },
    curPage:1,
    getCurrentParam:function(){
        var param = {};
        param['search_LLIKE_tags.id'] = searchDocument.curSelectedTag;
        //类型
        var typeId = $("#type_item .active a").attr("data");
        if (typeId != "0" && typeId!==undefined) {
            param['search_LLIKE_type.id'] = typeId;
        }
        var area = $("#area_item .active a").attr("data");
        if (area != "0" && area!==undefined) {
            param['search_LLIKE_areaCode.id'] = area;
        }
        var searchText = $("#search_keyword").val();
        if (searchText != "") {
            param["name"] = searchText;
            param["description"] = searchText;
        }
        return param;
    },
    // current
    searchDocument: function (option) {
        var params=documentManagement.getCurrentParam(option);
        documentManagement.listGrid.datagrid('load',params);
        return true;
    },
    editDocument:function(id){
        window.location.href= ctx + "/admin/document/update?id="+id;
    },
    delDocument:function(id){
        if(confirm("确定要删除么？")){
            $.ajax({
                url: documentManagement.delDocumentApi+"/"+id,
                type: "GET",
                dataType:'json',
                success:function(){
                    alert("操作成功");
                    documentManagement.listGrid.datagrid('reload');
                }
            });
        }
    },
    freezeUser:function(id,name){
         
        if(confirm("想清楚真的要冻结？")){
            $.ajax({
                url: documentManagement.freezeUserApi,
                data:{
                    id:id,
                    name:name,
                    status:1
                },
                type: "GET",
                dataType:'json',
                success:function(){
                    alert("操作成功");
                    documentManagement.listGrid.datagrid('reload');
                }
            });
        }
    },
    unFreezeUser:function(id,name){
         
        if(confirm("想清楚真的要取消冻结？")){
            $.ajax({
                url: documentManagement.freezeUserApi,
                data:{
                    id:id,
                    name:name,
                    status:0
                },
                type: "GET",
                dataType:'json',
                success:function(){
                    alert("操作成功");
                    documentManagement.listGrid.datagrid('reload');
                }
            });
        }
    }
}

$(document).ready(function () {
    searchDocument.init({
        searchDocumentFunc: documentManagement.searchDocument,
        showFilterLayerFunc: documentManagement.showLayer
    });
    documentManagement.initListGrid();
    searchDocument.loadTop2();
    $("#search_button").click(function(){
        documentManagement.searchDocument();
    });
    $(".sec-sort").find(".text a").click(function () {
        documentManagement.clickSecItemText(this);
    });
    documentManagement.showTypeLayer();
    searchDocument.options.showAreaFunc();
    //searchDocument.options.searchDocumentFunc();
});