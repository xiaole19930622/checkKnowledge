var documentStaitcs={
    subjectData:[],
    brenchGradeData:[],
    getBrenchApi:ctx + "/document/totalBreanchUpload",
    exportBrenchApi:ctx + "/document/exportBreanchUpload",
    exportBrenchDownloadApi:ctx + "/document/exportBreanchDownload",
    getCampusApi:ctx + "/document/totalCampusUpload",
    getBrenchDetailApi:ctx + "/document/totalBreanchUploadDetail",
    firstLoadBrench : true,
    firstLoadCampus : true,
    firstLoadBrenchDetail : true,
    top2Url : ctx + "/documentTag/getNodes",
    getChart:function(containerObj,categories,series){
        return containerObj.highcharts({
                chart: {
                    type: 'column'
                },
                credits:{
                    enabled: false,
                    text: '资源共享平台'
                },
                title: {
                    text: ''
                },
                xAxis: {
                    categories: categories,
                    title:''
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: ''
                    }
                },
                legend: {
                    enabled:false
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0"> </td><td style="padding:0"><b>{point.y} 份</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                },
                series: [{
                    name:'',
                    data: series
                }]
            });
    },
    getBrenchData:function(){
        var params={
            tagId : $('#select1').val(),
            startDate : $('#dt_organize11').val(),
            endDate : $('#dt_organize12').val(),
            typeId : $('#dt_type1').val()
        };
        if(!documentStaitcs.firstLoadBrench && (!params.startDate || !params.endDate)){
            alert('亲，请选择时间哦~');
            return;
        }
        documentStaitcs.firstLoadBrench = false;
        $.ajax({
            url: documentStaitcs.getBrenchApi,
            data:params,
            type: "GET",
            dataType:'json',
            success:function(data,textStatus){
                var categories=[];
                var series=[];
                $.each(data,function(i,item){
                    categories.push(item.name);
                    series.push({y:item.count});
                });
                documentStaitcs.getChart($("#container_brench"),categories,series);
            }
        });
    },
    exportBrenchData:function(){
        var params={
            tagId : $('#select1').val(),
            startDate : $('#dt_organize11').val(),
            endDate : $('#dt_organize12').val(),
            typeId : $('#dt_type1').val()
        };
        if(!documentStaitcs.firstLoadBrench && (!params.startDate || !params.endDate)){
            alert('亲，请选择时间哦~');
            return;
        }
        documentStaitcs.firstLoadBrench = false;
        var tagId = $('#select1').val();
        var typeId = $('#dt_type1').val();
        if(tagId==null || tagId == "null"){
            tagId = "";
        }
        if(typeId==null || typeId == "null"){
            typeId = "";
        }
        window.location.href= documentStaitcs.exportBrenchApi+"?startDate="+$('#dt_organize11').val()+"&endDate="+$('#dt_organize12').val()
                            +"&tagId="+tagId+"&typeId="+typeId;
    },
    exportBrenchDownloadData:function(){
        var params={
            tagId : $('#select1').val(),
            startDate : $('#dt_organize11').val(),
            endDate : $('#dt_organize12').val(),
            typeId : $('#dt_type1').val()
        };
        if(!documentStaitcs.firstLoadBrench && (!params.startDate || !params.endDate)){
            alert('亲，请选择时间哦~');
            return;
        }
        documentStaitcs.firstLoadBrench = false;
        var tagId = $('#select1').val();
        var typeId = $('#dt_type1').val();
        if(tagId==null || tagId == "null"){
            tagId = "";
        }
        if(typeId==null || typeId == "null"){
            typeId = "";
        }
        window.location.href= documentStaitcs.exportBrenchDownloadApi+"?startDate="+$('#dt_organize11').val()+"&endDate="+$('#dt_organize12').val()
                            +"&tagId="+tagId+"&typeId="+typeId;
    },
    getCampusData:function(){
        var params={
            tagId : $('#select2').val(),
            startDate : $('#dt_organize21').val(),
            endDate : $('#dt_organize22').val(),
            breanchId : $('#container_campus_brench23').val(),
            typeId : $('#dt_type2').val()
        };
        if(!documentStaitcs.firstLoadCampus && (!params.startDate || !params.endDate)){
            alert('亲，请选择时间哦~');
            return;
        }
        documentStaitcs.firstLoadCampus = false;
        $.ajax({
            url: documentStaitcs.getCampusApi,
            data:params,
            type: "GET",
            dataType:'json',
            success:function(data,textStatus){
                var categories=[];
                var series=[];
                $.each(data,function(i,item){
                    categories.push(item.name);
                    series.push({y:item.count});
                });
                documentStaitcs.getChart($("#container_campus"),categories,series);
            },
            error:function(er){
                alert(er);
            }
        });
    },
    getBrenchSubject : function() {
        if (documentStaitcs.subjectData.length == 0) {
            $.get(documentStaitcs.top2Url, {
                level : 2
            }, function(jsonsObj) {
                documentStaitcs.subjectData = jsonsObj;
                documentStaitcs.showBrenchSubject();
            });
        } else {
            documentStaitcs.showBrenchSubject();
        }
    },
    showBrenchSubject : function() {
        $.each(documentStaitcs.subjectData, function(i, item) {
            var children = item.children;
            var selectStr = '<option value="-1">请选择一个科目</option><optgroup id="' + item.id + '" label="'
                + item.name + '">';
            var optionHtml = "";
            if (children) {
                $.each(children, function(i, item1) {
                    optionHtml += '<option value="' + item1.id
                    + '">' + item1.name + '</option>';
                });
            }
            selectStr += optionHtml;
            selectStr += "</optgroup>";
            $("#brench_subject_select").append(selectStr);
        });
        $("#brench_subject_select").unbind("change");
        $("#brench_subject_select").change(function() {
            debugger;
            var selectedVal = $(this).val();
            if (selectedVal){

            }
        }).select2({
            placeholder : "选择一个科目",
            allowClear : true
        });
        $("#brench_subject_select").change();
    },
    loadgetBrenchDetailData : function(){
        var params = {
            tagId : $('#select3').val(),
            startDate : $('#dt_organize31').val(),
            endDate : $('#dt_organize32').val(),
            breanchId : $('#container_campus_brench33').val(),
            campusId : $('#container_campus_campus43').val(),
            typeId : $('#dt_type3').val()
        };
        if(!documentStaitcs.firstLoadBrenchDetail && (!params.startDate || !params.endDate)){
            alert('亲，请选择时间哦~');
            return;
        }
        documentStaitcs.firstLoadBrenchDetail = false;
        $.get(documentStaitcs.getBrenchDetailApi,params,function(datas){
            $('#container_brench_detail tbody').empty();
            var html = '';
            for(var i = 0; i < datas.length; i++){
                html += '<tr><td>'+ datas[i].name +'</td><td>'+ datas[i].organization +'</td><td>'+ datas[i].count +'</td></tr>';
            }
            $('#container_brench_detail tbody').html(html);
        });
    }
}
$(document).ready(function(){
    $("#btn001").click(function(){
        documentStaitcs.getBrenchData();
    });
    $("#btn0012").click(function(){
        documentStaitcs.exportBrenchData();
    });
    //各公司下载数量
    $("#btn0013").click(function(){
        documentStaitcs.exportBrenchDownloadData();
    });
    $("#btn002").click(function(){
        documentStaitcs.getCampusData();
    });
    $("#btn003").click(function(){
        documentStaitcs.loadgetBrenchDetailData();
    });
    $('#dt_type1,#dt_type2,#dt_type3').multipleSelectPanel({
        panels : [{
            url : ctx + '/documentType/getNodes',
            allowAny : true
        }]
        //panels : [{
        //    url : ctx + '/documentType/getNodes'
        //},{
        //    url : ctx + '/documentType/getChildren?id={param}'
        //}]
    });
    $('#container_campus_brench23,#container_campus_brench33').multipleSelectPanel({
        panels : [{
            url : ctx + '/organization/all?search_EQ_orgType=BRENCH',
            allowAny : true
        }]
    });
    $('#container_campus_campus43').multipleSelectPanel({
        panels : [{
            url : ctx + '/organization/all?search_EQ_orgType=CAMPUS',
            allowAny : true
        }]
    });
    $('#select1,#select2,#select3').multipleSelectPanel({
        panels : [{
            url : ctx + '/documentTag/getNodes',
            allowAny : true
        },{
            url : ctx + '/documentTag/getChildren?id={param}',
            allowAny : true
        }]
    });
    $('input.date').datetimepicker({
        language : 'zh-CN',
        format : 'yyyy-mm-dd',
        autoclose : true,
        todayBtn : true,
        minView : 2
    });
    //
    documentStaitcs.getBrenchData();
    documentStaitcs.getCampusData();
    documentStaitcs.getBrenchSubject();
    documentStaitcs.loadgetBrenchDetailData();

    $('.date').after('<i class="glyphicon glyphicon-menu-down dateinput-icon" style="left: -20px;" onclick="javascript:$(this).prev().datetimepicker(\'show\');"></i>');
});