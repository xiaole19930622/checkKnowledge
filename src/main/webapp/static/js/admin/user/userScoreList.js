var userManagement = {
    findUserListApi: ctx + '/user/findUserList',
    listGrid: $('#user_list'),
    getStaticSearchParams: function() {
        var staticSearchParams = {};
        if ($('#container_campus').val()) {
            staticSearchParams = {'search_EQ_organization.id': $('#container_campus').val()};
        }
        if ($('#container_name').val()) {
            staticSearchParams = $.extend({}, staticSearchParams, {'search_LIKE_name': $('#container_name').val()});
        }
        return staticSearchParams;
    },
    initListGrid: function(){
        this.listGrid.datagrid({
            url: this.findUserListApi,
            staticSearchParams: this.getStaticSearchParams(),
            columns: [
                {title: '用户名', field: 'name'},
                {title: '归属组织架构', field: 'organization', formatter: function(data, index, record){
                    return userManagement.getFullNameOrg(data);
                }},
                {title: '积分', field: 'score', formatter: function(data, index, record){
                    return "<span id='jf" + record.id + "'>" + record.score + "</span>";
                }},
                {title: '操作', field: 'act', formatter: function(data, index, record){
                    var modifyBtn = "<a id='modifyScore"+ record.id + "' onclick=\"userManagement.modifyScore(this, '" + record.id + "', "+ record.score+ ")\" class='btn btn-xs btn-default' data-original-title='Save Row' href='javascript:void(0)'>修改积分</a>";
                    return modifyBtn;
                }}
            ]
        });
    },
    getFullNameOrg: function(org) {
        if(org.parent) {
            org.parent.name = org.parent.name + ' -> ' + org.name;
            return userManagement.getFullNameOrg(org.parent);
        }
        return org.name;
    },
    showSaveScore: function(id) {
        $(('#modifyScore'+ id)).html("完成");
    },
    modifyScore: function(o, id, score) {
        if($(o).html() == '完成') {
            if (confirm("确定要执行该操作吗？")) {
                $.ajax({
                    url: ctx + "/user/adminScore",
                    type: 'GET',
                    data: {adminId: adminId, userId: id, score: $(('#jf'+ id)).children('input').val()},
                    dataType: 'JSON',
                    success: function() {
                        $(o).html('修改积分');
                        alert('操作成功');
                        userManagement.listGrid.datagrid('reload');
                    }
                });
            }
        } else {
            $(('#jf' + id)).html("<input id='s"+ id +
                "' type='number' min='0'  value='" + score + "' step=\"1\" "
                + " onchange=\"userManagement.showSaveScore('"+ id +"')\" />");
        }
    }
};

var scoreModifyRecord = {
    adminScoreRecordApi: ctx+ '/adminScoreRecord/page',
    listGrid: $('#container_record_list'),
    initListGrid: function() {
        this.listGrid.datagrid({
            url: this.adminScoreRecordApi,
            staticSearchParams: {"sorts[0].field":'createTime'},
            columns: [
                {title: '管理员', field: 'admin.name'},
                {title: '被修改的用户', field: 'user.name'},
                {title: '修改前积分', field: 'oldScore'},
                {title: '修改后积分', field: 'newScore'},
                {title: '操作时间', field: 'createTime'}
            ]
        });
    }
};

function showScoreModifyRecord() {
    scoreModifyRecord.initListGrid();
    $('#container_user_list').hide();
}

$(document).ready(function(){
    userManagement.initListGrid();
    $('#container_campus').multipleSelectPanel({
        panels : [{
            url : ctx + '/organization/all?search_EQ_orgType=CAMPUS',
            allowAny : true
        }]
    });
    $('#btn001').click(function(){
        userManagement.initListGrid();
    });
});