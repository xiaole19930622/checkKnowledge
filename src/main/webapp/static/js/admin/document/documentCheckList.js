var documentManagement = {
    saveDocumentApi:ctx+"/document/save",
    getDocumentsApi: ctx + "/document/page",
    delDocumentApi:ctx+"/document/delete",
    freezeUserApi:ctx+"/user/save",
    getDocumentTypeApi: ctx + "/documentType/getNodes",
    typeData: [],
    curParam:{},
    listGrid : $("#content_list"),
    initListGrid : function() {
        this.listGrid.datagrid({
            url : ctx + "/document/findDocumentCheck",
            staticSearchParams : {
                "sorts[0].field":'createTime',
                "search_EQ_checkStatus":0
            }, // object 常量查询参数，每次查询都会附带这些参数
            columns : [
                { title : "文件名",field : 'name',formatter : function(data,index,record){
                    return '<a target=_blank style="width:240px;display:block;" href="' + ctx + '/document/preview/'+ record.id +'">'
                        +
                        data
                        + '</a>';
                }},
                { title : "文件类型",field : 'type',formatter:function(data,index,record){
                    var str = '';
                    str += documentManagement.getFullNameType(data);
                    return str;
                }},
              //  { title : "学段学科",field : 'tags'},
              //  { title : "教材版本",field : 'tags'},
              //  { title : "年级",field : 'tags'},
                { title : "标签",field : 'tags',formatter:function(data,index,record){
                    var str = '';
                    $.each(data,function(index,item){
                        str += documentManagement.getFullName(item);
                    });
                    return "<span style='width:240px;display:block;'>"+str.replace("章节 -> ","")+"</span>";
                }},
                { title : "难度",field : 'difficulty',formatter : function(data,index,record){
                    if(record.difficulty == 1){
                        return '<span style="">'+ "难" +'</span>';
                    }if(record.difficulty == 2){
                        return '<span style="">'+ "中" +'</span>';
                    }if(record.difficulty == 3){
                        return '<span style="">'+ "易" +'</span>';
                    }else{
                        return "未知";
                    }
                }},
                { title : "年份",field : 'year',formatter : function(data,index,record){
                    if(data == '-1'){
                        return '<span style="width:100%;text-align: center;display:block">-</span>';
                    }
                    return data;
                }},
                { title : "预览状态",field : 'convertStatus',formatter : function(data,index,record){
                    if(data == 0){
                        return '格式转换中';
                    }else if(data == 1){
                        return '可预览';
                    }else{
                        return '<span title="失败原因：'+ record.convertFailReason +'">格式转换失败</span>';
                    }
                }},
                { title : "审核状态",field : 'checkStatus',formatter : function(data,index,record){
                    var vst = "";
                    if(data == '0'){
                        vst =  "未审核";
                    }else if(data == '1'){
                        vst =   "通过";
                    }else if(data == '2'){
                        vst =   "不通过";
                    }else{
                        vst =   "未知";
                    }
                    return '<span  id="zt'+record.id+'" style="width:67px;display:block;">'+vst+'</span>';
                }},
                { title : "不通过原因",field : 'checkReason',formatter : function(data,index,record){
                 return '<input type="text" id="cr'+record.id+'" style="margin-top:auto;margin-bottom:auto;display:block;visibility:hidden;width:240px"/>';
                }},
                { title :"状态修改",field : 'act',formatter : function(data,index,record){
                    var modifyBtn = "<a id='_oper" + record.id +"' onclick=\"javascript:documentManagement.operClick(this,'"+record.id+"','"+record+"');\" class='btn btn-xs btn-default' data-original-title='Save Row' href=\"javascript:void(0)\">修改</a>";
                    return modifyBtn;// + delBtn + freezeBtn;
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
    showResion: function (obj,rid) {
        $("#_oper"+rid).html('完成');
        if($(obj).val()==2){//如果状态为不通过，则显示不通过输入框
            $(('#cr'+rid)).css('visibility',"");
        }else{
            $(('#cr'+rid)).css('visibility',"hidden");
        }
    },
   // _operClick
    operClick: function (o,rId,obj) {

        if($(o).html()=='完成'){
            if(confirm("确定要执行该操作么？")){
                $.ajax({
                    url: documentManagement.saveDocumentApi,
                    type: "GET",
                    data:{id:rId,checkReason:$('#cr'+rId).val(),checkStatus:$('#selcStuta').val()},
                    dataType:'json',
                    success:function(){
                        $(o).html('修改');
                        alert("操作成功");
                        documentManagement.listGrid.datagrid('reload');
                    }
                });
            }
        }else{
            $(('#zt'+rId)).html('<select id="selcStuta" style="width:67px" onchange=\"javascript:documentManagement.showResion(this,'+rId+');\"><option value="0">未审核</option><option value="1">通过</option><option value="2">不通过</option></select>');
        }
    },
    clickSecItemText: function (obj) {
        // 点击类型时
        searchDocument.options.clickSecItemTextFunc(obj);
    },
    getFullName:function(item){
        try{
            if(item.parent!=null){
                return documentManagement.getFullName(item.parent) +' -> '+ item.name
            }
        }catch(e){
            return "";
        }

        return  item.name!=null?item.name:"";
    },
    getFullNameType:function(item){
        try{
            if(item.parent==null){
                return item.name;
            }else{
                return documentManagement.getFullName(item.parent) +' -> '+ item.name
            }
        }catch(e){
               return "";
        }

        return  item.name!=null?item.name:"";
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
        }
        param["sorts[0].field"] = 'createTime';
        documentManagement.curPage=param['pageNumber'];
        return param;
    },
    // current
    searchDocument: function (option) {
        var params=documentManagement.getCurrentParam(option);
        documentManagement.listGrid.datagrid('load',params);
        return true;
    },
    editDocument:function(id){
        window.location.href="/o2o/documentManagement/updateDocument?id="+id;
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
                url: documentManagement.saveDocumentApi,
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
                url: documentManagement.saveDocumentApi,
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
    $("#refresh").click(function(){
        documentManagement.listGrid.datagrid('reload');
    });

    $(".sec-sort").find(".text a").click(function () {
        documentManagement.clickSecItemText(this);
    });
    documentManagement.showTypeLayer();
    searchDocument.options.showAreaFunc();
    searchDocument.options.searchDocumentFunc();
});