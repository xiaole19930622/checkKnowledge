/**
 * Created by Administrator on 2015/5/5.
 */

var userInfo = {
    url: ctx + "/documentTag/getNodes",
    deleteIds: [],
    reinitPage:true,
    init: function () {
        userInfo.searchUserInfo(user);
    },
    searchUserInfo: function (user) {
        $.get(ctx + "/userInformation/page", {"search_EQ_user.id": user}, function (response) {
            var userInfos = response.content;

            $.each(userInfos, function (i, item) {
                var infoRow = '<div class="select_information row "> '
                    + ' <form action="' + ctx + '/userInformation/saveInformation">  '
                    + ' <input type="hidden" name="id" value="' + item.id + '"> '
                    + ' <div class="my-select col-md-3"> '
                    + ' <label class="col-md-5">可教学科：</label> '
                    + ' <select name="subject" class="select_subject col-md-6" defaultValue="' + item.subject + '" value=""> '
                    + ' </select> '
                    + ' </div>  '
                    + '  <div class="my-select col-md-3"> '
                    + '   <label class="col-md-5">教材版本：</label> '
                    + ' <select name="version" class="select_version col-md-6" defaultValue="' + item.teachingVersion + '" value="" > '
                    + ' </select> '
                    + ' </div> '
                    + ' <div class="my-select col-md-3"> '
                    + ' <label class="col-md-5">主教年级：</label> '
                    + ' <select name="grade" class="select_grade col-md-6" defaultValue="' + item.grade + '" value=""> '
                    + ' </select> '
                    + '  </div> ' +
                    '<div class="action col-md-3">  ' +
                    '   <div type="button" class="btn btn-sm col-md-2 glyphicon glyphicon-minus"> </div>' +
                    '    <div type="button" class="btn btn-sm col-md-2 glyphicon glyphicon-plus"> </div>' +
                    '</div>'
                    + ' </form> '
                    + ' </div> '
                $(".panel-body").children("div:first").append(infoRow);
                userInfo.getSubjectNode($("input[value='" + item.id + "']").parents(".select_information").find(".select_subject"));

            });
            //
            var num=$(".select_information").length;
            if(num===0){
                $(".panel-body").children("div:first").append(scoreTable.getSampleTr());
                userInfo.getSubjectNode($(".select_subject"));
            }
            scoreTable.initIcon();
            scoreTable.bangdingEvent();


            $(".select_subject").attr("disabled", "disabled");
            $(".select_version").attr("disabled", "disabled");
            $(".select_grade").attr("disabled", "disabled");
            userInfo.bindChange($(".select_subject"), $(".select_version"), $(".select_grade"));
            userInfo.initSelect2($(".select_subject"), {placeholder: '选择科目'});
            userInfo.initSelect2($(".select_version"), {placeholder: '选择版本'});
            userInfo.initSelect2($(".select_grade"), {placeholder: '选择年级'});


        });
    },
    initSelect2: function (selectObj, data) {
        var option = {allowClear: true};
        $.extend(option, data)
        $(selectObj).select2(option);
    },
    bindSubjectChange: function (subjectObj) {
        $(subjectObj).unbind("change");
        $(subjectObj).change(function () {
            $(this).parents(".select_information").find(".select_version").empty().val(null).change();

            $(this).parents(".select_information").find(".select_grade").empty().val(null).change();
            var subjectVal = $(this).parents(".select_information").find(".select_subject").val();
            if (subjectVal) {

                userInfo.getVersionNode($(this).val(), $(this).parents(".select_information").find(".select_version"));
                //$(this).attr("defaultValue","");
            }
        });
    },
    bindVersionChange: function (versionObj) {
        $(versionObj).unbind("change");
        $(versionObj).change(function () {
            $(this).parents(".select_information").find(".select_grade").empty().val(null).change();
            var versionVal = $(this).parents(".select_information").find(".select_version").val();
            if (versionVal) {

                userInfo.getGradeNode($(this).val(), $(this).parents(".select_information").find(".select_grade"));
                //$(this).attr("defaultValue","");
            }
        });
    },

    bindChange: function (subjectObj, versionObj, gradeObj) {
        $(subjectObj).unbind("change");
        $(versionObj).unbind("change");
        $(gradeObj).unbind("change");
        $(subjectObj).change(function () {
            $(this).parents(".select_information").find(".select_version").empty().val(null).change();

            $(this).parents(".select_information").find(".select_grade").empty().val(null).change();
            var subjectVal = $(this).parents(".select_information").find(".select_subject").val();
            if (subjectVal) {

                userInfo.getVersionNode($(this).val(), $(this).parents(".select_information").find(".select_version"));
                //$(this).attr("defaultValue","");
            }
        });

        $(versionObj).change(function () {
            $(this).parents(".select_information").find(".select_grade").empty().val(null).change();
            var versionVal = $(this).parents(".select_information").find(".select_version").val();
            if (versionVal) {

                userInfo.getGradeNode($(this).val(), $(this).parents(".select_information").find(".select_grade"));
                //$(this).attr("defaultValue","");
            }
        });
    },
    putOption: function (data, dom) {
        
        $.each(data, function (i, item) {

            var children = item.children;
            var selectStr = '<optgroup id="' + item.id + '" label="'
                + item.name + '">';
            var optionHtml = "";

            if (children) {
                $.each(children, function (i, item1) {
                    optionHtml += '<option value="' + item1.id
                    + '">' + item1.name + '</option>';
                });
            }
            selectStr += optionHtml;
            selectStr += "</optgroup>";

            $(".select_subject").append(selectStr);


        });
        var defaultValue = $(dom).attr("defaultValue");
        if (defaultValue) {
            $(dom).val(defaultValue).trigger("change");
        }

    },
    putVersion: function (data, domObject) {
        //$(domObject).empty().change();

        $.each(data, function (i, item) {

            var children = item.children;
            $.each(children, function (i, item1) {
                if (item1.name === "章节") {
                    var versions = item1.children;
                    var optionHtml = "";

                    $.each(versions, function (i, item1) {
                        optionHtml += '<option value="' + item1.id
                        + '">' + item1.name + '</option>';
                    });
                    $(domObject).append(optionHtml);

                    return false;
                }
            });
        });
        var defaultValue = $(domObject).attr("defaultValue");
        if (defaultValue) {
            $(domObject).val(defaultValue).trigger("change");
        }

    },
    putGrade: function (data, domObject) {
        //$(domObject).empty().change();

        $.each(data, function (i, item) {

            var children = item.children;
            $.each(children, function (i, item1) {

                var gradeName = item1.name;
                var optionHtml = "";


                optionHtml += '<option value="' + item1.id
                + '">' + gradeName + '</option>';

                $(domObject).append(optionHtml);


            });
        });
        var defaultValue = $(domObject).attr("defaultValue");
        if (defaultValue) {
            $(domObject).val(defaultValue).trigger("change");
        }

    },
    edit: function () {

        var list = [];
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
            if(userList[i].subject===null||userList[i].teachingVersion===null||userList[i].grade===null){
                alert("不能保存空的信息！",true);
                setTimeout(function(){location=location;},"1000");
                return;
            }
        }

        $.ajax({
            url: ctx + "/userInformation/saveInformation",
            type: "post",
            data: JSON.stringify(userList),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                alert("保存成功");
            }, error: function (data) {
                alert("保存出错",true);
            }
        });

    },

    getSubjectNode: function (dom) {
        
        $.get(userInfo.url, {level: 2}, function (data) {
            
            userInfo.putOption(data, dom);

        })
    },
    getVersionNode: function (id, domObject) {
        $.get(userInfo.url, {level: 2, id: id}, function (data) {
            userInfo.putVersion(data, domObject)
        })
    },
    getGradeNode: function (id, domObject) {
        $.get(userInfo.url, {level: 1, id: id}, function (data) {
            userInfo.putGrade(data, domObject)

        })
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
    showMyContribution:function(jsonsObj){
        console.log(jsonsObj);
        var documentList=$("#document tbody");
        $("#org").html("来源");
        $("#selectAll").siblings().remove();
        $("#readingAmountOrCategory").html("阅读量");
        $("#downloadAmount").html("下载量");
        $("#areaOrscore").html("积分");
        $("#orgOrRank").html("星级评价");
        $("#time").html("上传时间");
        $(documentList).empty();
        if(jsonsObj.totalElements>0) {
            var contents = jsonsObj.content;
            $.each(contents, function (i,item) {
                $(documentList).append(
                              ' <tr>                               ' +
                              '  <td width="2%"><input name="checkbox" type="checkbox"> </td> '+
                              ' <td width="8%" class="name"><a target=_blank href="'+ctx+'/document/preview/'+item.id+'" style="width:100%;color:#000;text-decoration:none;display:block;overflow: hidden;height: 18px;" title="'+item.name+'">'+userInfo.replaceMorechar(item.name)+'</a></td>           ' +
                              ' <td width="10%" class="readingAmount">'+item.readCount+'</td>           ' +
                              ' <td width="30%" class="downloadCount">'+item.downloadCount+'</td>          ' +
                              ' <td width="20%" class="score">暂时没有</td>       ' +
                              ' <td width="20%" class="rank">'+userInfo.rankPic(item.rank)+'</td>   ' +
                              ' <td width="10%"  class="createTime"> <a style="color:#000;text-decoration:none;display:block;overflow: hidden;height: 18px;" title="'+item.createTime+'"> '+item.createTime+'</a> </td>     ' +
                              ' </tr>                              '
                );
            });
            if(userInfo.reinitPage){
                userInfo.initPageination({curPage:jsonsObj.number+1,maxPage:jsonsObj.totalPages,totalCount : jsonsObj.totalElements},userInfo.searchContribution);
            }
        }
    },
    rankPic: function(rank){
        var html="";
        for(var i = 0; i < rank; i++){
            html += '<img style="height: 15px;width: 15px;" src="'+ ctx +'/thirdpart/jquery-raty-2.5.2/lib/img/star-on.png"/> ';
        }
        for(var i = 0; i < 5 - rank; i++){
            html += '<img style="height: 15px;width: 15px;" src="'+ ctx +'/thirdpart/jquery-raty-2.5.2/lib/img/star-off.png"/> ';
        }
        return html;
    },
    doBatchCancelCollecting:function(){
        var boxes=document.getElementsByName("checkbox");
        var ids="";
        for(var i= 0;i<boxes.length;i++){
            if(boxes[i].checked===true) {
                ids += boxes[i].nextElementSibling.defaultValue+",";
            }
        }
        if(ids!==""){
            $.get(ctx+"/documentCollectRecord/doBatchCancelCollecting",{'ids':ids},function(responseJSON){
                if(responseJSON.ok===true){
                    userInfo.searchMyCollection();
                    alert("取消收藏成功");
                }else{
                    alert("取消收藏失败!",true);
                }
            })
        }else{
            alert("没有选择哦");
        }

    },
    showMyCollection:function(jsonsObj){

        var documentList=$("#document tbody");
        $("#selectAll").siblings().remove();
        $("#selectAll").after("<button id='doBatchCancelCollecting' class='btn btn-default btn-sm' onclick='userInfo.doBatchCancelCollecting();' style='margin-left: 20px'>取消收藏</button>");
        $("#org").html("贡献者");
        $("#readingAmountOrCategory").html("分类");
        $("#areaOrscore").html("地区");
        $("#downloadAmount").html("文件类型");
        $("#orgOrRank").html("贡献者");
        $("#time").html("收藏时间");
        $(documentList).empty();
        if(jsonsObj.totalElements>0) {
            var contents = jsonsObj.content;
            $.each(contents, function (i,item) {
                $(documentList).append(
                    ' <tr>                               ' +
                    '  <td width="2%"><input name="checkbox" type="checkbox"><input type="hidden" value="'+item.document.id+'"> </td> '+
                    ' <td width="8%" class="name"><a target=_blank href="'+ctx+'/document/preview/'+item.document.id+'" style="color:#000;text-decoration:none;display:block;overflow: hidden;height: 18px;" title="'+item.document.name+'">'+userInfo.replaceMorechar(item.document.name)+'</a></td>           ' +
                    ' <td width="10%"  class="tags"><a style="color:#000;text-decoration:none;display:block;overflow: hidden;height: 18px;" title="'+(item.document.tags.length==1?getTagsParentName(item.document.tags[0]):"无")+'">'+(item.document.tags.length==1?getTagsParentName(item.document.tags[0]):"无")+'</a></td>           ' +
                    ' <td width="30%"  class="type">'+userInfo.replaceNullObj(item.document.type,"无",'name')+'</td>          ' +
                    ' <td width="20%"  class="areaCode">'+userInfo.replaceNullObj(item.document.areaCode,"无",'name')+'</td>       ' +
                    ' <td width="20%"  class="createUser">'+userInfo.replaceNullObj(item.document.createUser,"无",'name')+'</td>   ' +
                    ' <td width="10%"  class="createTime"> <a style="color:#000;text-decoration:none;display:block;overflow: hidden;height: 18px;" title="'+item.createTime+'"> '+item.createTime+'</a> </td>     ' +
                    ' </tr>                              '
                );
            });
            if(userInfo.reinitPage){
                userInfo.initPageination({curPage:jsonsObj.number+1,maxPage:jsonsObj.totalPages,totalCount : jsonsObj.totalElements},userInfo.searchMyCollection);
            }
        }
    },
    showMyDownload :function(jsonsObj){
        var documentList=$("#document tbody");
        $("#selectAll").siblings().remove();
        $("#org").html("贡献者");
        $("#readingAmountOrCategory").html("分类");
        $("#downloadAmount").html("文件类型");
        $("#areaOrscore").html("地区");
        $("#orgOrRank").html("贡献者");
        $("#time").html("下载时间");
        $(documentList).empty();
        if(jsonsObj.totalElements>0) {
            var contents = jsonsObj.content;
            $.each(contents, function (i,item) {
                $(documentList).append(
                    ' <tr>                               ' +
                    '  <td width="2%"><input name="checkbox" type="checkbox"> </td> '+
                    ' <td width="8%" class="name"><a target=_blank href="'+ctx+'/document/preview/'+item.document.id+'" style="color:#000;text-decoration:none;display:block;overflow: hidden;height: 18px;" title="'+item.document.name+'">'+userInfo.replaceMorechar(item.document.name)+'</a></td>           ' +
                    ' <td width="10%" class="tags"><a style="color:#000;text-decoration:none;display:block;overflow: hidden;height: 18px;" title="'+(item.document.tags.length==1?getTagsParentName(item.document.tags[0]):"无")+'">'+(item.document.tags.length==1?getTagsParentName(item.document.tags[0]):"无")+'</a></td>          ' +
                    ' <td width="30%" class="type">'+userInfo.replaceNullObj(item.document.type,"无",'name')+'</td>          ' +
                    ' <td width="20%" class="areaCode">'+userInfo.replaceNullObj(item.document.areaCode,"无",'name')+'</td>       ' +
                    ' <td width="20%" class="organization">'+userInfo.replaceNullObj(item.document.createUser,"无",'name')+'</td>   ' +
                    ' <td width="10%" class="createTime"><a style="color:#000;text-decoration:none;display:block;overflow: hidden;height: 18px;" title="'+item.createTime+'"> '+item.createTime+'</a></td>     ' +
                    ' </tr>                              '
                );
            });
            if(userInfo.reinitPage){
                userInfo.initPageination({curPage:jsonsObj.number+1,maxPage:jsonsObj.totalPages,totalCount : jsonsObj.totalElements},userInfo.searchMyDownload);
            }
        }
    }
    ,
    replaceNullObj : function(srcObj, replaceStr,property) {
        //
        if (srcObj == null) {
            return replaceStr;
        }
        return srcObj[property];
    },

    searchContribution:function(currentPage,totalPage){
        userInfo.reinitPage=true;
        $("#selectAll").removeAttr("checked");
        var url=ctx+"/document/page";
        var param={};
        param["pageSize"]=10;
        param["pageNumber"]=1;
        if(arguments.length>0){
            userInfo.reinitPage=false;
            param["pageSize"]=totalPage;
            param["pageNumber"]=currentPage;
        }
        param["search_EQ_createUser.id"]=user;
        param["sorts[0].field"] = 'createTime';
        $.get(url,param,function(jsonsObj){
            userInfo.showMyContribution(jsonsObj);
        });
    },
    searchMyCollection :function(currentPage,totalPage){
        userInfo.reinitPage=true;
        $("#selectAll").removeAttr("checked");
        var param={};
        param["pageSize"]=10;
        param["pageNumber"]=1;
        if(arguments.length>0){
            userInfo.reinitPage=false;
            param["pageSize"]=totalPage;
            param["pageNumber"]=currentPage;
        }
        param["search_EQ_createUser.id"]=user;
        param["sorts[0].field"] = 'createTime';
        $.get(ctx+"/documentCollectRecord/page",param,function(jsonsObj){
            userInfo.showMyCollection(jsonsObj);
        });
    },
    searchMyDownload :function(currentPage,totalPage){
        userInfo.reinitPage=true;
        $("#selectAll").removeAttr("checked");
        var param={};
        param["pageSize"]=10;
        param["pageNumber"]=1;
        if(arguments.length>0){
            userInfo.reinitPage=false;
            param["pageSize"]=totalPage;
            param["pageNumber"]=currentPage;
        }
        param["search_EQ_createUser.id"]=user;
        param["sorts[0].field"] = 'createTime';
        $.get(ctx+"/documentDownloadRecord/page",param,function(jsonsObj) {
            userInfo.showMyDownload(jsonsObj);
        });
    },
    initPageination : function(options,func) {
        
        $(".pagination").paginate({
            totalCount  : options.totalCount || -1,
            count 		: options.maxPage,
            start 		: 1,
            display     : 12,
            border					: true,
            border_color			: '#785ab4',
            text_color  			: '#414141',
            background_color    	: '#ffffff',
            border_hover_color		: '#785ab4',
            text_hover_color  		: '#ffffff',
            background_hover_color	: '#785ab4',
            rotate      : false,
            images		: false,
            mouse		: 'press',
            onChange     			: function(page){
                 func(page,10);
            }
        });
    }


}

var scoreTable = {
    addIcon: '<div type="button" class="btn btn-sm col-md-2 glyphicon glyphicon-plus"> </div>',
    delIcon: '<div type="button" class="btn btn-sm col-md-2 glyphicon glyphicon-minus"> </div>',
    getSampleTr: function () {
        var trHtml = '<div class="select_information row "> '
            + ' <form>  '
            + ' <input type="hidden" name="id" value=""> '
            + ' <div class="my-select col-md-3"> '
            + ' <label class="col-md-5 ">可教学科：</label> '
            + ' <select name="subject" class="select_subject col-md-6" defaultValue="" value=""> '
            + ' </select> '
            + ' </div>  '
            + '  <div class="my-select col-md-3"> '
            + '   <label class="col-md-5 ">教材版本：</label> '
            + ' <select name="version" class="select_version col-md-6" defaultValue="" value="" > '
            + ' </select> '
            + ' </div> '
            + ' <div class="my-select col-md-3"> '
            + ' <label class="col-md-5 ">主教年级：</label> '
            + ' <select name="grade" class="select_grade col-md-6" defaultValue="" value=""> '
            + ' </select> '
            + '  </div> ' +
            '<div class="action col-md-3">  ' +
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
        //scoreTable.addOneRow();
    },
    addOneRow: function () {
        $(".panel-body").children("div:first").append(scoreTable.getSampleTr());
        $(".action").show();
        scoreTable.initIcon();

        userInfo.getSubjectNode($(".select_information:last").find(".select_subject"));
        var subjectObj = $(".select_information:last").find(".select_subject");
        var versionObj = $(".select_information:last").find(".select_version");
        var gradeObj = $(".select_information:last").find(".select_grade");
        userInfo.bindChange(subjectObj, versionObj, gradeObj);
        userInfo.initSelect2(subjectObj, {placeholder: '选择科目'});
        userInfo.initSelect2(versionObj, {placeholder: '选择版本'});
        userInfo.initSelect2(gradeObj, {placeholder: '选择年级'});
        //countOfCourse++;
    },
    deleteOneRow: function (deleteIconItem) {
        
        var deleteId = $(deleteIconItem).parent().parent().find("[name=id]").val();
        //if(deleteId){
        //    userInfo.deleteIds.push(deleteId);
        //}
        //
        if (deleteId) {
            $.get(ctx + "/userInformation/deleteInfo", {"id": deleteId}, function (response) {
                if (response) {
                    $(deleteIconItem).parent().parent().parent().remove();
                }
                scoreTable.initIcon();
            });
        } else {
            $(deleteIconItem).parent().parent().parent().remove();
            scoreTable.initIcon();
        }


    },
    initIcon: function () {
        
        $(".select_information").find('.action').empty();
        //// 如果只有一行，不加 delIcon； 如果大于一行，每一加入delIcon
        if ($(".select_information").length > 1) {
            $(".select_information").find('.action').append(scoreTable.delIcon);
        }
        ;
        //// 最后一行加上一个 addIcon
        $(".selectBody .select_information").find('.action').append(scoreTable.addIcon);


    },
    bangdingEvent: function () {
        $(document).on('click', '.glyphicon-plus', function () {
            scoreTable.addOneRow();
        });

        $(document).on('click', '.glyphicon-minus', function () {
            
            var that = this;
            scoreTable.deleteOneRow(that);
        })
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

            console.log('init',[xsize,ysize]);
            $('#target').Jcrop({
                onChange: updatePreview,
                onSelect: updatePreview,
                aspectRatio: xsize / ysize,
                boxWeight:400,
                boxHeight:400
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



function getTagsParentName(tag){
    var str="";
    if(tag.parent===null){
        str=tag.name+str;
        return str;
    }else{
        str=getTagsParentName(tag.parent)+"->"+ tag.name+str;
        return str;
    }

}

$(document).ready(function () {

    userInfo.init();

    scoreTable.initIcon();
    $("#nav_list").find("a").click(function (obj) {
        $("#nav_list a").removeClass("active");
        $(this).addClass("active");
    });

    $("#saveInfo").hide();
    $("#editInfo").on('click', function () {
        $(".select_subject").prop("disabled", false);
        $(".select_version").prop("disabled", false);
        $(".select_grade").prop("disabled", false);
        $(".action").show();
        $("#editInfo").hide();
        $("#saveInfo").show();
    });

    $("#saveInfo").on('click', function () {
        $("#saveInfo").hide();
        $("#editInfo").show();
        $(".select_subject").prop("disabled", true);
        $(".select_version").prop("disabled", true);
        $(".select_grade").prop("disabled", true);
        $(".action").hide();
        userInfo.edit();
    });



    $("#uploadPicture").on('click', function () {
        $("#addFile").click();
    });

    $("#picSubmit").on("click",function(){
        $("#saveCutedPic").submit();

    })

    $("#selectAll").on("click",function(){
        if($("#selectAll").prop("checked")){
           var boxes=document.getElementsByName("checkbox");
            if  (boxes.length<1)  return;
            for(var i = 0;i<boxes.length;i++){
                if(boxes[i].type == "checkbox") boxes[i].checked = true;
            }
        }else{
            $("[name='checkbox']").removeAttr("checked");
        }
    });

    userInfo.searchMyCollection();


});