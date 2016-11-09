var genericCharts = {
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
        pointFormat: '',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    }
};
var userStatics = {
    getBranchLoginApi: ctx + "/loginLog/totalBranchLogin",
    getBranchUsageApi: ctx + "/operateLog/o2oUsage",
    exportBranchLoginApi:ctx+"/loginLog/exportBranchLogin",
    getBranchLoginData: function(){
        var params={
            startDate : $('#login_start_date').val(),
            endDate : $('#login_end_date').val(),
            branchId: $('#container_campus_branch01').val(),
            campusId: $('#container_campus_campus01').val()
        };
        if(!params.startDate || !params.endDate){
            alert('亲，请选择时间哦~');
            return;
        }
        $.ajax({
            url: userStatics.getBranchLoginApi,
            data:params,
            type: "GET",
            dataType:'json',
            success:function(data,textStatus){
                var loginChart = genericCharts;
                var categories=[];
                var seriesData=[];
                $.each(data,function(i,item){
                    categories.push(item.name);
                    seriesData.push({y:item.count});
                });

                loginChart.legend.enabled = false;
                loginChart.xAxis.categories = categories;
                loginChart.tooltip.pointFormat =
                    '<tr><td style="color:{series.color};padding:0"> </td><td style="padding:0"><b>{point.y} 人</b></td></tr>';
                loginChart.series = [{name:'', data: seriesData}];

                $("#container_branch_login").highcharts(loginChart);
            }
        });
    },
    exportBranchLoginData :function(){
        var params={
            startDate : $('#login_start_date').val(),
            endDate : $('#login_end_date').val(),
            branchId: $('#container_campus_branch01').val(),
            campusId: $('#container_campus_campus01').val()
        };
        if(!params.startDate || !params.endDate){
            alert('亲，请选择时间哦~');
            return;
        }
        var branchId = $('#container_campus_branch01').val();
        var campusId =  $('#container_campus_campus01').val();
        if(branchId==null || branchId == "null"){
            branchId = "";
        }
        if(campusId==null || campusId == "null"){
            campusId = "";
        }
        //alert("campusId="+campusId);
        window.location.href =userStatics.exportBranchLoginApi+"?startDate="+$('#login_start_date').val()
        +"&endDate="+$('#login_end_date').val()+"&branchId="+branchId+"&campusId="+campusId;

        //$.ajax({
        //    url: userStatics.exportBranchLoginApi,
        //    data:params,
        //    type: "GET",
        //    dataType:'json',
        //    success:function(data,textStatus){
        //        alert('导出成功!')
        //    }
        //});
    },
    getBranchUsageData: function() {
        var params = {
            startDate: $('#usage_start_date').val(),
            endDate: $('#usage_end_date').val(),
            branchId: $('#container_campus_branch02').val(),
            campusId: $('#container_campus_campus02').val()
        };
        if (!params.startDate || !params.endDate) {
            alert('亲，请选择时间哦~');
            return;
        }
        $.ajax({
            url: userStatics.getBranchUsageApi,
            data: params,
            type: "GET",
            dataType: "json",
            success: function(data, textStatus){
                var usageChart = genericCharts;
                var categories = [];
                var o2o = [];
                var xuekewang = [];
                $.each(data, function(i, item){
                    categories.push(item.name);
                    o2o.push(item.o2o);
                    xuekewang.push(item.xuekewang);
                });

                usageChart.legend.enabled = true;
                usageChart.xAxis.categories = categories;
                usageChart.tooltip.pointFormat =
                    '<tr><td style="color:{series.color};padding:0">{series.name}: </td><td style="padding:0"><b>{point.y}</b></td></tr>';
                usageChart.series = [{name:'共享平台', data: o2o}, {name:'学科网', data: xuekewang}];

                $('#container_branch_usage').highcharts(usageChart);
            }
        })
    }
};

$('input.date').datetimepicker({
    language : 'zh-CN',
    format : 'yyyy-mm-dd',
    autoclose : true,
    todayBtn : true,
    minView : 2
});

$(document).ready(function(){
    $('#btn001').click(function(){
        userStatics.getBranchLoginData();
    });
    $('#btn002').click(function(){
        userStatics.getBranchUsageData();
    });
    $("#btn0012").click(function(){
        userStatics.exportBranchLoginData();
    });
    $('#container_campus_branch01,#container_campus_branch02').multipleSelectPanel({
        panels : [{
            url : ctx + '/organization/all?search_EQ_orgType=BRENCH',
            allowAny : true
        }]
    });
    $('#container_campus_campus01,#container_campus_campus02').multipleSelectPanel({
        panels : [{
            url : ctx + '/organization/all?search_EQ_orgType=CAMPUS',
            allowAny : true
        }]
    });
});

dateUtil = {
    getCurrentDate: function(){
        return new Date().format("yyyy-MM-dd");
    },
    getOneMonthAgo: function(){
        return new Date(new Date() - 30*24*60*60*1000).format("yyyy-MM-dd");
    }
}
$('#login_start_date').val(dateUtil.getOneMonthAgo());
$('#login_end_date').val(dateUtil.getCurrentDate());
$('#usage_start_date').val(dateUtil.getOneMonthAgo());
$('#usage_end_date').val(dateUtil.getCurrentDate());

userStatics.getBranchLoginData();
userStatics.getBranchUsageData();

$('.date').after('<i class="glyphicon glyphicon-menu-down dateinput-icon" style="left: -20px;" onclick="javascript:$(this).prev().datetimepicker(\'show\');"></i>');