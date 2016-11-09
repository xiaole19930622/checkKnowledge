;(function(){
    DocumentSearch = {
        /**
         * 入口函数
         */
        init : function(){
            var me = this;
            me.clearLastSolid();
            me.initStepSubject();
            me.bindEvents();
            if(!$('#searchKeyword').val()){
                $('#searchKeyword').val(getCookie('searchText'));
            }
            $.datagrid.defaults.emptyTemplate = '<div><img src="'+ ctx +'/static/images/theme-icon-2.png" class="img-responsive" style="display: inline-block;"/><div style="display: inline-block;margin-left:10px;font-size:16px;vertical-align: middle;position: relative;top:-50px;"><img src="'+ ctx +'/static/images/duibuqi.png"><h4 style="width: 380px;">我翻完数据库都没有找到您要的信息，还望老师您请教<a style="color: #795cb3;  font-size: 14px;text-decoration: underline;margin-left: 10px;" href="'+ ctx +'/document/upload">上传资料</a></h4></div></div>'
            $('#listDataArea').datagrid({
                url : ctx + '/document/page',
                showHeader : false,
                searchParams : me.collectSearchParams,
                columns : [{
                    formatter : function(data,index,record){
                        var document = record;
                        var html = '';
                        html += '<dl>';
                        html += '<dd>';
                        html += '<h3><a target=_blank title="'+ document.name +'" style="color:#6e529f;" href="'+ctx+'/document/preview/'+document.id+'">'+ (document.isOfficial ? '<img style="vertical-align:top;margin-right:10px;" src="'+ctx+'/static/images/guangfangtuijian.png"/>' : '') + document.name +'</a></h3>';
                        html += '<h4>文章介绍：'+ (document.description ? document.description : '无') +'</h4>';
                        html += '<ul>';
                        html += '<li>上传时间：'+ document.createTime + '</li>';
                        html += '<li>共'+ (document.pageCount ? document.pageCount : 0) +'页</li>';
                        html += '<li>10积分</li>';
                        html += '</ul>';
                        html += '<span>';
                        //if(document.isOfficial){
                        //    html += '<i class="official-flag"></i>';
                        //}
                        html += '<h5>星级：';
                        for(var i = 0; i < document.rank; i++){
                            html += '<i class="fa fa-star"></i>';
                        }
                        for(var i = 0; i < 5 - document.rank; i++){
                            html += '<i class="fa fa-star" style="color:#ccc;"></i>';
                        }
                        html += '</h5>';
                        html += '<h5>贡献者：'+ document.createUser.name +'</h5>';
                        html += '<h5>下载次数：'+ document.downloadCount +'</h5>';
                        html += '</span>';
                        html += '</dd>';
                        html += '</dl>';
                        return html;
                    }
                }]
            });
        },
        /**
         * 收集查询参数
         * @returns {{}}
         */
        collectSearchParams : function(){
            var me = this;
            var params = {};
            // 搜索关键词
            var searchKeyword = $('#searchKeyword').val().trim();
            if(searchKeyword)params['name'] = searchKeyword;
            // 排序
            var sortField = $('#conditionSort a.filter-active').attr('data');
            if(sortField)params['sorts[0].field'] = sortField;
            // 难度
            var difficulty = $('#conditionDifficulty a.filter-active').attr('data');
            if(difficulty !== undefined)params['search_EQ_difficulty'] = difficulty;
            // 年份
            var year = $('#conditionYear a.filter-active').attr('data');
            if(year !== undefined){
                if(year < 0){
                    params['search_LTE_year'] = new Date().getYear() + 1900; // 更早以前
                }else{
                    params['search_EQ_year'] = year;
                }
            }
            // 地区
            var area = $('#conditionArea a.filter-active').attr('data');
            if(area !== undefined)params['search_LLIKE_areaCode.id'] = area;
            // 文档类型
            var conditionDocumentType = $('.list-nav a.l-active').attr('data');
            if(conditionDocumentType){
                params['search_LLIKE_type.id'] = conditionDocumentType;
            }
            // 文档子类型
            var conditionType = $('#conditionType a.filter-active').attr('data');
            if($('#conditionType').parent().is(':visible') && conditionType){
                params['search_LLIKE_type.id'] = conditionType;
            }
            // 动画类型
            var animationType = $('#conditionAnimationType a.filter-active').attr('data');
            if($('#conditionAnimationType').is(':visible') && animationType){
                params['search_LLIKE_type.id'] = animationType
            }
            // 音频类型
            var audioType = $('#conditionAudioType a.filter-active').attr('data');
            if($('#conditionAudioType').is(':visible') && audioType){
                params['search_LLIKE_type.id'] = audioType
            }
            // 文档标签
            var tag = (function(){
                var tagId = null;
                // 树选中
                var conditionMenuTree = $.fn.zTree.getZTreeObj("conditionMenuTree");
                if(conditionMenuTree){
                    var selectedNodes = conditionMenuTree.getSelectedNodes();
                    if(selectedNodes.length > 0){
                        tagId = selectedNodes[0].id;
                    }
                }
                // 树未选中则查找年级
                if(!tagId){
                    tagId = $('#conditionGrade a.filter-active').attr('data');
                }
                // 年级未选中则查找教材
                if(!tagId){
                    tagId = $('#conditionVersion a.filter-active').attr('data');
                }
                // 教材未选中则查找当前科目
                if(!tagId){
                    tagId = $('#conditionStepSubject').val();
                }
                // 科目未选中则查找学段（如果是升学类型）
                if(!tagId && me.stepSubjectId){
                    tagId = me.stepSubjectId;
                }
                return tagId;
            })();
            //示范课的年级和学科
            if(searchType === '示范课专题' ){
                var  gradeId =   $("#demoGrade a.filter-active").attr('data');
               var subjectId =  $("#demoSubject a.filter-active").attr('data');
                params['search_EQ_grade.id'] = gradeId;
                params['search_EQ_subject.id'] = subjectId;
            }

            if(tag){
                params['search_LLIKE_tags.id'] = tag;
            }

            var isEnterHighSchool = searchType == '小升初' || searchType == '中考' || searchType == '高考';
            if(isEnterHighSchool){
                switch(searchType){
                    case '小升初' :
                        params['tags[0].id'] = 11;
                        break;
                    case '中考' :
                        params['tags[0].id'] = 12;
                        break;
                    case '高考' :
                        params['tags[0].id'] = 13;
                        break;
                }
            }

            return params;
        },
        /**
         * 搜索文档
         */
        searchDocument : function(){
            $('#listDataArea').datagrid('load');
            addCookie('searchText',$('#searchKeyword').val().trim());
            
        },
        /**
         * 初始化学段科目
         */
        initStepSubject : function(){
            
            var me = this;
            me.searchType = searchType;
            if(me.searchType == '小升初'){
                me.stepSubjectId = '11';
            }else if(me.searchType == '中考'){
                me.stepSubjectId = '12';
            }else if(me.searchType == '高考'){
                me.stepSubjectId = '13';
            }
            //2015-11-9 增加家长会 start
            if(me.searchType === '家长会' || me.searchType === '示范课专题')
            {
                $('.left').hide();
                $('#listDataArea').css({
                    //borderLeft : 0,
                    width : 1020,
                    marginLeft : 0
                });

            }
            //2015-11-9  增加家长会 end
            $.get(ctx + '/documentTag/getNodes?level=2',function(data){
                var optionHTML = '<optgroup label=""><option value="">不限</option></optgroup>';
                $.each(data, function(i, item) {
                    // 如果是升学类型则只加载该学段的科目
                    if(me.stepSubjectId && me.stepSubjectId !== item.id){
                        return;
                    }
                    optionHTML += '<optgroup label="'+ item.name +'">';
                    if (item.children) {
                        $.each(item.children, function(i, childItem) {
                            optionHTML += '<option value="' + childItem.id + '">' + childItem.name + '</option>';
                        });
                    }
                    optionHTML += '</optgroup>';
                });
                $('#conditionStepSubject').html(optionHTML).jQselectable({
                    top : -5,
                    target : '#conditionStepSubjectBtn',
                    callback : function(){
                        var selectedOption = $('#conditionStepSubject option:selected');
                        if($(selectedOption).val()){
                            $('#conditionStepSubjectDisplay').text(selectedOption.parent().attr('label') + selectedOption.text());
                        }else{
                            $('#conditionStepSubjectDisplay').text('学段 学科');
                        }
                        addCookie('search_subject',$(this).val());
                        me.initVersion($(this).val());
                        if(!$(this).val())me.searchDocument();
                    }
                });

                if(me.searchType !== '所有文档'&&me.searchType !== '家长会' &&  me.searchType !== '示范课专题'){
                    $('#conditionStepSubject_mat a[name='+ userInformation.subject +']').click()
                }

            });
        },
        /**
         * 初始化教材版本
         * @param parentId
         */
        initVersion : function(parentId){
            var me = this;
            if(parentId){
                $.get(ctx + '/documentTag/getChildren?id=' + parentId,function(data){
                    var optionHTML = '';
                    optionHTML += '<a href="javascript:;">不限</a></li>';
                    $.each(data,function(index,item){
                        optionHTML += '<a href="javascript:;" data="'+ item.id +'">'+ item.name +'</a></li>';
                    });
                    $('#conditionVersion').html(optionHTML).parent().show();
                    me.clearLastSolid();

                    var $userTeachingVersion = $('#conditionVersion a[data='+ userInformation.teachingVersion +']');
                    if($userTeachingVersion.length > 0){
                        $('#conditionVersion a[data='+ userInformation.teachingVersion +']').click();
                    }else{
                        $('#conditionVersion a:eq(0)').click();
                    }
                });
            }else{
                $('#conditionVersion').empty().parent().hide();
                me.initGrade();
                me.clearLastSolid();
            }
            
        },
        /**
         * 初始化年级
         * @param parentId
         */
        initGrade : function(parentId){
            var me = this;
            if(parentId){
                $.get(ctx + '/documentTag/getChildren?id=' + parentId,function(data){
                    var optionHTML = '';
                    if(!isEnterHighSchool){
                        optionHTML += '<a href="javascript:;">不限</a></li>';
                    }
                    $.each(data,function(index,item){
                        if(isEnterHighSchool && item.name.indexOf('专题知识点') == -1){
                            return;
                        }else{
                            optionHTML += '<a href="javascript:;" data="'+ item.id +'">'+ item.name +'</a></li>';
                        }
                    });
                    $('#conditionGrade').html(optionHTML);
                    if(!isEnterHighSchool){
                        $('#conditionGrade').parent().show();
                        me.clearLastSolid();
                    }

                    var $userTeachingGrade = $('#conditionGrade a[data='+ userInformation.grade +']');
                    if($userTeachingGrade.length > 0){
                        $('#conditionGrade a[data='+ userInformation.grade +']').click();
                    }else{
                        $('#conditionGrade a:eq(0)').click();
                    }
                });
            }else{
                $('#conditionGrade').empty().parent().hide();
                me.clearLastSolid();
                me.initMenuTree();
            }
            
        },
        /**
         * 初始化目录树
         */
        initMenuTree : function(parentId){
            
            var me = this;
            if(parentId){
                $.get(ctx + '/documentTag/getChildren?id=' + parentId, function(data) {
                    for(var i = 0; i < data.length; i++){
                        data[i].isParent = !data[i].leaf;
                    }
                    $.fn.zTree.init($("#conditionMenuTree"), {
                        async : {
                            enable : true,// 启用异步加载
                            url : ctx + '/documentTag/getChildren', // 异步请求地址
                            autoParam : ['id=id'],
                            dataFilter : function(treeId,parentNode,responseData){
                                if(responseData){
                                    for(var i = 0; i < responseData.length; i++){
                                        responseData[i].isParent = !responseData[i].leaf;
                                    }
                                }
                                return responseData;
                            }
                        },
                        view : {
                            dblClickExpand : false,
                            showLine : true,
                            selectedMulti : false
                        },
                        data : {
                            simpleData : {
                                enable : true
                            }
                        },
                        callback : {
                            onAsyncSuccess : function(event, treeId, treeNode,msg) {
                                var zTree = $.fn.zTree.getZTreeObj("conditionMenuTree");
                                treeNode.halfCheck = false;
                                zTree.updateNode(treeNode);
                            },
                            beforeClick : function(treeId, treeNode) {
                                return true;
                            },
                            onClick : function(event, treeId, treeNode) {
                                me.searchDocument();
                            }
                        }
                    }, [{
                        id : parentId,
                        name : '目录',
                        open : true,
                        children : data
                    }]);
                });
            }else{
                $('#conditionMenuTree').empty();
            }
            
        },
        /**
         * 全局事件
         */
        bindEvents : function(){
            var me = this;
            // 导航切换
            $('.list-nav li a').click(function(){
                $('.l-active').removeClass('l-active');
                $(this).addClass('l-active');
            });
            // 搜索条件切换底色
            $(document).on('click','#filter dl dd a',function(){
                $(this).addClass('filter-active').siblings().removeClass('filter-active');
            });
            // 搜索条件折叠
            $('.s-filter').click(function(){
                $('#filter').toggle();
            });
            // 搜索按钮
            $(document).on('click','#searchButton',function(){
                me.searchDocument();
            });
            // 类型点选
            $(document).on('click','#conditionType a',function(){
                if($(this).text() === '动画'){
                    $('#conditionAnimationType').parent().show();
                    $('#conditionAudioType').parent().hide();
                }else if($(this).text() === '音频'){
                    $('#conditionAudioType').parent().show();
                    $('#conditionAnimationType').parent().hide();
                }
                me.clearLastSolid();
                me.searchDocument();
            });
            // 动画类型点选
            $(document).on('click','#conditionAnimationType a',function(){
                me.searchDocument();
            });
            // 音频类型点选
            $(document).on('click','#conditionAudioType a',function(){
                me.searchDocument();
            });
            // 版本点击
            $(document).on('click','#conditionVersion a',function(){
                var versionId = $(this).attr('data');
                addCookie('search_teachingVersion',versionId);
                me.initGrade(versionId);
                if(!versionId){
                    me.searchDocument();
                }
            });
            // 年级点击
            $(document).on('click','#conditionGrade a',function(){
                var gradeId = $(this).attr('data');
                addCookie('search_grade',gradeId);
                me.initMenuTree(gradeId);
                me.searchDocument();
            });
            // 难度点选
            $(document).on('click','#conditionDifficulty a',function(){
                me.searchDocument();
            });
            // 年份点选
            $(document).on('click','#conditionYear a',function(){
                me.searchDocument();
            });
            // 地区点选
            $(document).on('click','#conditionArea a',function(){
                me.searchDocument();
            });
            // 示范课 年级选择
            $(document).on('click','#demoGrade a',function(){
                me.searchDocument();
            });

            // 示范课 科目选择
            $(document).on('click','#demoSubject a',function(){
                me.searchDocument();
            });
            // 排序点击
            $(document).on('click','#conditionSort li a',function(){
                $(this).addClass('filter-active').parent().siblings().children().removeClass('filter-active');
                me.searchDocument();
            });
        },
        /**
         * 清除最后一个筛选条件的虚线
         */
        clearLastSolid : function(){
            $('.item dl:visible:last').addClass('clear-last-solid').siblings().removeClass('clear-last-solid');
        }
    };
    $(function(){
        DocumentSearch.init();
    })
})();