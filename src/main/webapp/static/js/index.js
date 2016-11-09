/**
 * Created by Administrator on 2015/5/28.
 */


$(document).ready(function(){

    if(flag==="[]"||flag==null||flag==''){
        $("#userInfoMust").modal();
        index.putSubjectOption($("[name=subject]"));

    }


    $(document).on("change", "[name=subject]", function () {
        var ver=$(this).parents(".select_information").find(".select_version");
        ver.attr("defaultValue","");
        ver.attr("value","");
        ver.empty();
        var grade=$(this).parents(".select_information").find(".select_grade");
        grade.attr("defaultValue","");
        grade.attr("value","");
        grade.empty();



        index.putVersion($(this).val(), $(this).parents(".select_information").find(".select_version"));
    });

    $(document).on("change", ".select_version", function () {
        $(this).parents(".select_information").find(".select_grade").attr("defaultValue","");
        $(this).parents(".select_information").find(".select_grade").attr("value","");
        $(this).parents(".select_information").find(".select_grade").empty();

        index.putGrade($(this).val(), $(this).parents(".select_information").find(".select_grade"));
    });
});

var index={
    url: ctx + "/documentTag/getNodes",
    edit:function(){debugger;

        var userList = new Array();
        $(".select_information").each(function (i, item) {

            var param = {};
            var subject = $(item).find(".select_subject").val();
            var teachingVersion = $(item).find(".select_version").val();
            var grade = $(item).find(".select_grade").val();



            param['subject'] = subject;
            param['teachingVersion'] = teachingVersion;
            param['grade'] = grade;
            //if ($(item).find("[name=id]").val()) {
            //    param['id'] = $(item).find("[name=id]").val();
            //}
            userList.push(param);
        });

        for(var i=0;i<userList.length;i++){
            if(userList[i].subject===''||userList[i].subject===null||userList[i].teachingVersion===''||userList[i].teachingVersion===null||userList[i].grade===''||userList[i].grade===null){
                alert("不能保存空的信息！",true);
                //setTimeout(function(){location=location;},"1000");
                return;
            }
        }

        //$("#saveInfo").hide();
        //$("#editInfo").show();
        //$(".showSubject").show();
        //$(".showVersion").show();
        //$(".showGrade").show();
        //$(".select_subject").hide();
        //$(".select_version").hide();
        //$(".select_grade").hide();
        //$(".action").hide();

        $.ajax({
            url: ctx + "/userInformation/saveInformation",
            type: "post",
            data: JSON.stringify(userList),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                if(data.ok==true){
                    $("#userInfoMust").hide();
                    setTimeout(function(){location=location;},"500");
                    alert("保存成功");
                }
            }, error: function (data) {
                if(data.ok==false){
                    alert("保存出错",true);
                }
            }
        });
    },
    putSubjectOption: function (object) {debugger;
        $.get(index.url, {level: 2}, function (data) {
            var selectStr = "<option value=''>请选择可教科目</option>";
            $.each(data, function (i, item) {

                var children = item.children;
                 selectStr += '<optgroup id="' + item.id + '" label="'
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

            });
            $(object).append(selectStr);






            //$(object).jQselectable({
            //    style: 'selectable',
            //    set: 'fadeIn',
            //    out: 'fadeOut',
            //    callback: function () {
            //        $(this).parents(".select_information").find(".select_subject").change();
            //        var subjectVal = $(this).parents(".select_information").find(".select_subject").val();
            //        if ($(object).val(($(this).val()))) {
            //            //index.getVersionNode($(this).val(), $(this).parents(".select_information").find(".select_version"));
            //            //$(this).attr("defaultValue","");
            //            $(this).parents(".select_information").find(".select_version").empty();
            //            $(this).parents(".select_information").find(".select_grade").empty();
            //            index.putVersion(subjectVal, $(this).parents(".select_information").find(".select_version"));
            //        }
            //    },
            //    top: -5
            //
            //});
            debugger;


        })
    },
    putGrade: function (id, domObject) {

        $.get(index.url, {level: 1, id: id}, function (data) {
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


    }
};

