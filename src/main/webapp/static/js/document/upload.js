/**
 * Created by Administrator on 2015/4/24.
 */

var $fileFormTemplate;
var currentFileName = "";
var intervalReq =  window.setInterval(nullRequest,5*1000*60);;//定时请求   上传时触发,成功后销毁
$('#dropArea').dmUploader({
    url: ctx + '/document/doUpload',
    dataType: 'json',
    allowedTypes: '*',
    extFilter: 'doc;docx;ppt;pptx;xls;xlsx;vsd;pot;rtf;wps;pdf;txt;swf;mp3;wav;mp4;flv',//jpg;png;gif
    maxFileSize:1024*1024*2048,
    onInit: function () {

    },
    onBeforeUpload: function (id) {
        $("#dropArea").data('dmUploader').settings.extraData = {
            no_upload: currentFileName
        }
    },
    onNewFile: function (id, file) {
        if (currentFileName.length==0) {
            currentFileName =  file.name.substring(0, file.name.lastIndexOf(".")) + (id + 1);
        } else{
            currentFileName = currentFileName + "," + file.name.substring(0, file.name.lastIndexOf(".")) + (id + 1);
        }
        var $newRow = $fileFormTemplate.clone();


        $newRow
            .attr('id', 'fileInfo' + id)
            //.find('label:eq(0)').text('#' + (id + 1)).end()
            .find('label:eq(0)').text(id + 1).end()
            .find('label:eq(1)').text(file.name).end()
            .find('#noupload').attr("id",file.name.substring(0, file.name.lastIndexOf("."))+(id + 1))
            .attr("rowid",'fileInfo' + id).end()
            .find('.progress-bar').width('0%').text('0%').end()
            .find('[name=name]').val(file.name.substring(0, file.name.lastIndexOf("."))).end()
            .find('[name=name]').attr("name","documents["+id+"].name").end()
            .find('[name=description]').attr("name","documents["+id+"].description").end()
            .find('[name=type]').attr("name","documents["+id+"].type.id").end()
            .find('[name=subject]').attr("name","documents["+id+"].subject.id").end()
            .find('[name=grade]').attr("name","documents["+id+"].grade.id").end()
            .find('[name=tag]').attr("name","documents["+id+"].tags[0].id").end()
            //.find('[name=organization]').attr("name","documents["+id+"].organization.id").end()
            .find('[name=areaCode]').attr("name","documents["+id+"].areaCode.id").end()
            .find('[name=year]').attr("name","documentVos["+id+"].year").end()
            .find('[name=difficulty]').attr("name","documentVos["+id+"].difficulty").end()
            .find('[name=typeDisplay]').attr("name","documentVos["+id+"].typeDisplay").end()
            .find('[name=tagDisplay]').attr("name","documentVos["+id+"].tagDisplay").end()
            .find('[name=areaCodeDisplay]').attr("name","documentVos["+id+"].areaCodeDisplay").end()
            //.find('[name=organizationDisplay]').attr("name","documentVos["+id+"].organizationDisplay").end()
            .appendTo('#fileInfos');
        var addCopyPreviousAttr=($(".progress-bar").length>1);
        if(addCopyPreviousAttr){
            $newRow.find('label:eq(1)').after('<div class="btn btn-default btnColorSubmit pull-right" style="margin: 10px;" onclick="upload.copyPreviousAttr(this);">复制上一个描述</div>');
        }
         $('#fileInfos').find('[name="documents['+id+'].type.id"]').multipleSelectPanel({
            panels : [{
                url : ctx + '/documentType/getNodes?level=0'
            }],
            defaultPanel : {
                url : ctx + '/documentType/getChildren?id={param}'
            },
             placeholder : '请选择类型',
             onCompleteSelect: function(val){

                 var selectId=val.substring(0,2);


                 var strOfType=$(".selectDocumentType").parent().prev().attr("name");
                 var start=strOfType.indexOf("[")+1;
                 var end=strOfType.indexOf("]");
                 var position=strOfType.substring(start,end);

                 //年份
                 $year=$("#fileInfo"+position).find(".form-group.year");
                 //难度
                 $difficulty=$("#fileInfo"+position).find(".form-group.difficulty");

                 //标签
                 $tag=$("#fileInfo"+position).find(".form-group.tagOfDocument");

                 var $grade = $("#fileInfo"+position).find(".form-group.gradeOfDocument");
                 var $subject = $("#fileInfo"+position).find(".form-group.subjectOfDocument");

                 var y= $year.addClass("hide").find("select");
                 y.val(new Date().getFullYear());

                 var d= $difficulty.addClass("hide").find("select");

                 d.val("-1");

                 if(selectId==="12"||selectId==="18"){//选择试卷  或者家长会
                     $year.removeClass("hide");
                     if (selectId==="18")
                     {//不要标签
                         $tag.addClass('hide').find('select').val('');//置空标签
                     }
                 }else if(selectId==="11" ||selectId==="13" ||selectId==="14") {   //选择的是标准教案or课件or导学案
                     $difficulty.removeClass("hide");
                     y.val("-1");
                 }else if(selectId==="19"){
                     $tag.addClass('hide').find('select').val('');//置空标签
                     $grade.removeClass("hide");
                     $subject.removeClass("hide");
                 } else{
                     $year.addClass("hide");
                     y.val("-1");
                     $difficulty.addClass("hide");
                     d.val("-1");
                 }

                 if(selectId !="19"){
                     $grade.addClass("hide").find('select').val('');
                     $subject.addClass("hide").find('select').val('');
                 }
             }
         });
        $('#fileInfos').find('[name="documents['+id+'].tags[0].id"]').multipleSelectPanel({
            panels : [{
                url : ctx + '/documentTag/getNodes?level=1'
            }],
            defaultPanel : {
                url : ctx + '/documentTag/getChildren?id={param}'
            },
            placeholder : '选择标签',
            onCompleteSelect :function(val) {
                console.log(val);
            }
        });

        $('#fileInfos').find('[name="documents['+id+'].areaCode.id"]').multipleSelectPanel({
            panels : [{
                //url : ctx + '/areaCode/getNodes?level=0'
                url : ctx + '/areaCode/findByPage'//只显示审核页面上面的那些城市
            }],
            //defaultPanel : {
            //    url : ctx + '/areaCode/getChildren?id={param}'
            //},
            placeholder : '选择地区'
        });

        $('#fileInfos').find('[name="documents['+id+'].subject.id"]').multipleSelectPanel({
            panels : [{
                url : ctx + '/subject/all'//
            }],
            placeholder : '科目'
        });
        $('#fileInfos').find('[name="documents['+id+'].grade.id"]').multipleSelectPanel({
            panels : [{
                url : ctx + '/grade/all'//
            }],
            placeholder : '年级'
        });

        if(isok == 'ok'){
            $('#fileInfos').find('[name="documents['+id+'].tags[0].id"]').multipleSelectPanel("setValue",tagId,tagName);
            //areaCodeNames
            //$('#fileInfos').find('[name="documents['+id+'].areaCode.id"]').multipleSelectPanel("setValue",areaCodeId,areaCodeNames);
        }else{
            alert("上传失败");
        }

        window.document.body.scrollTop=window.document.body.scrollHeight;

        checkDocumentName(file.name.substring(0, file.name.lastIndexOf(".")),"documents["+id+"].name");

    },
    onComplete: function () {
        $('#confirmUpload').show();
        $('#cancel').show();
    },
    onUploadProgress: function (id, percent) {

        $('#fileInfo' + id).find('.progress-bar').width(percent + '%').text(percent + '%');
    },
    onUploadSuccess: function (id, data) {

        $('#fileInfo' + id).find('[name=uploadStatus]').text("上传成功");
        alert("成功")
        $('#successfulFileCount').text(parseInt($('#successfulFileCount').text()) + 1);

    },
    onUploadError: function (id, message) {

        $('#fileInfo' + id).find('[name=uploadStatus]').text("上传失败").addClass('text-danger');
    },
    onFileTypeError: function (file) {

        alert("不支持该类型文件")

    },
    onFileSizeError: function (file) {

        alert("上传文件大小超出500Mb!");


    },
    onFallbackMode: function (message) {

    },
    onFileExtError: function (file) {
        alert("不支持该类型文件！")
    }
});

function checkDocumentName(name,domName){
    $.get(ctx + '/document/existsDocumentName?name=' + name,function(res){
        if(res.ok){
            name = name + '.重命名';
            $('[name="' + domName + '"]').val(name);
            alert('文档名称重复，已自动重命名，可以自行修改');
            checkDocumentName(name,domName);
        }
    });
}

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
//						     if (treeNode.isParent) {
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
     item.isParent=true;
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
//						     if (treeNode.isParent) {
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
     item.isParent=true;
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
//						     if (treeNode.isParent) {
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
     item.isParent=true;
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
//						     if (treeNode.isParent) {
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
    var selectId=typeId.substring(0,2);debugger;
    //年份
    $year=$('.selectDocumentType').parents('.col-md-7').siblings(".col-md-4").find(".form-group:eq(1)");
    //难度
    $difficulty=$('.selectDocumentType').parents('.col-md-7').siblings(".col-md-4").find(".form-group:eq(2)");
    var y= $year.addClass("hide").find("select");
    y.val("-1");

    var d= $difficulty.addClass("hide").find("select");

    d.val("-1");

    if(selectId==="12"){//选择试卷
        $year.removeClass("hide");
    }else if(selectId==="11" ||selectId==="13" ||selectId==="14") {   //选择的是标准教案or课件or导学案
        $difficulty.removeClass("hide");
    }else{
        $year.addClass("hide");
        y.val("-1");
        $difficulty.addClass("hide");
        d.val("-1");
    }
    findNode(typeId,'documentType');
    $('.selectDocumentType').parent().parent().children().eq(0).val(typeId);

    $("#fm").validate();
    $("#fm").valid()
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

var upload = {
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
    },
    copyPreviousAttr: function(obj){
        var $target=$(obj).parents("div.container-fluid.table-bordered");
        var source=$target.prev();

        var type= source.find("[name$='.type.id']").val();
        var typeDisplay=source.find("[name$='.type.id']").next().find(".display-info").html();
        $target.find("[name$='.type.id']").append("<option value='"+type+"'></option>");
        $target.find("[name$='.type.id']").val(type);
        $target.find("[name$='.type.id']").next().find(".display-info").html(typeDisplay);

        var tags= source.find("[name$='.tags[0].id']").val();
        var tagsDisplay=source.find("[name$='.tags[0].id']").next().find(".display-info").html();
        $target.find("[name$='.tags[0].id']").append("<option value='"+tags+"'></option>");
        $target.find("[name$='.tags[0].id']").val(tags);
        $target.find("[name$='.tags[0].id']").next().find(".display-info").html(tagsDisplay);

        var areaCode= source.find("[name$='.areaCode.id']").val();
        var areaCodeDisplay=source.find("[name$='.areaCode.id']").next().find(".display-info").html();
        $target.find("[name$='.areaCode.id']").append("<option value='"+areaCode+"'></option>");
        $target.find("[name$='.areaCode.id']").val(areaCode);
        $target.find("[name$='.areaCode.id']").next().find(".display-info").html(areaCodeDisplay);

        if(source.find("[name$='.year']").val()!=="-1"){
            $target.find("div.year").removeClass("hide");
            $target.find("[name$='.year']").val(source.find("[name$='.year']").val());
        }else{
            $target.find("div.year").addClass("hide");
            $target.find("[name$='.year']").val(-1);
        }
        console.log(source.find("[name$='.difficulty']").val());
        if(source.find("[name$='.difficulty']").val()!=="-1"){
            $target.find("div.difficulty").removeClass("hide");
            $target.find("[name$='.difficulty']").val(source.find("[name$='.difficulty']").val());
        }else{
            $target.find("div.difficulty").addClass("hide");
            $target.find("[name$='.difficulty']").val(-1);
        }


        console.log(source.find("[name$='.year']").val());

    }
}

function donedata(){
    //do something before submit...
    alert('处理完结！');

}

$(document).ready(function () {

    var $elem = $('#content');

    // show the buttons
    $('#nav_up').fadeIn('slow');
    $('#nav_down').fadeIn('slow');

    // whenever we scroll fade out both buttons
    $(window).bind('scrollstart', function(){
        $('#nav_up,#nav_down').stop().animate({'opacity':'0.2'});
    });
    // ... and whenever we stop scrolling fade in both buttons
    $(window).bind('scrollstop', function(){
        $('#nav_up,#nav_down').stop().animate({'opacity':'1'});
    });

    // clicking the "down" button will make the page scroll to the $elem's height
    $('#nav_down').click(
        function (e) {
            $('html, body').animate({scrollTop: $elem.height()}, 800);
        }
    );
    // clicking the "up" button will make the page scroll to the top of the page
    $('#nav_up').click(
        function (e) {
            $('html, body').animate({scrollTop: '0px'}, 800);
        }
    );

    $(document).on('click', '.typeOfDocument button', function () {
        $('.selectDocumentType').removeClass('selectDocumentType');
        $(this).addClass('selectDocumentType');
    });

    $(document).on('click', '.tagOfDocument button', function () {
        $('.selectDocumentTag').removeClass('selectDocumentTag');
        $(this).addClass('selectDocumentTag');

    });


    $(document).on('click', '.areaCode button', function () {
        $('.selectDocumentAreaCode').removeClass('selectDocumentAreaCode');
        $(this).addClass('selectDocumentAreaCode');

    });

    //$(document).on('click', '', function () {
    //    $('.selectDocumentOrganization').removeClass('selectDocumentOrganization');
    //    $(this).addClass('selectDocumentOrganization');
    //
    //});



    // 文件模板
    $fileFormTemplate = $("#fileInfos").children().remove().show();

    $("#uploadMyDocument").on('click', function () {
        $("#addFile").click();
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
        //organization:{
        //    required:true
        //},
        //year:{
        //    selected:true
        //},
        difficulty:{
            selected:true
        }
    });

    $('#confirmUpload').on('click',function(){
        $("#fm").validate({

        });
        if (!$("#fm").valid()) {
            return false;
        }

        // 重名检查
        var names = $('input.name').map(function(){return $(this).val()});
        for(var i = 0; i < names.length; i++){
            for(var j = 0; j < names.length; j++){
                if(i !== j && names[i] === names[j]){
                    alert('第' + (i + 1) + '篇文档标题与第' + (j + 1) + '篇文档标题重复，请手动修改文档标题后再提交',true);
                    return false;
                }
            }
        }
        var flag = true;
        $('#fileInfos>div').each(function(index,item){
            var val = $(item).find('select.typeId').val();
            if(!$(item).find('select.typeId').val()){
                alert('第' + (index + 1) + '份文档的类型没有填写');
                flag = false;
            }
        });

        $('#fileInfos>div').each(function(index,item){
            if(!$(item).find('.tagOfDocument select').val()){
                if (!$(item).find('select.typeId').val().substr(0,2)==='18'){ //家长会不用填写标签
                    alert('第' + (index + 1) + '份文档的标签没有填写');
                    flag = false;
                }
            }
        });
        $('#fileInfos>div').each(function(index,item){
                if (!$(item).find(' .areaCodeId').val()){ //家长会不用填写标签
                    alert('第' + (index + 1) + '份文档的地区没有填写');
                    flag = false;
                }
        });


        return flag;
        //$("#fm").submit();
    });

    $('#cancel').on('click',function(){
        window.location.href=window.location.href;
    });

    $(document).on('change','input.name',function(){
        checkDocumentName($(this).val(),$(this).attr('name'));
    });
});
function noupload(obj){
    var id = $(obj).attr("id");
    $.post(ctx+ '/document/noupload/'+ id,{id:id},function(data){
          if(data.ok){
              //alert($(obj).attr("rowid"));
              $("#"+$(obj).attr("rowid")).remove();
              var counts =  parseInt($("#successfulFileCount").html());
              $("#successfulFileCount").html(counts-1<1?0:counts-1);
              alert(data.msg);
          }else{
              alert("操作失败！");
          }
    });
}


//一个空的请求后台 保证上传时session不失效
function nullRequest(){
    $.post(ctx+"/document/nullRequest");
}