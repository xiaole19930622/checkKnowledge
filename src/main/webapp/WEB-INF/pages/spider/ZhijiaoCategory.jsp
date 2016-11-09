<%@ page language='java' pageEncoding='utf-8' %>
<%@include file="../header.jsp" %>

<link rel='stylesheet' href='${ctx}/thirdpart/ztree/zTreeStyle/zTreeStyle.css'>
<link rel='stylesheet' href='${ctx}/thirdpart/jPaginate/css/style.css'>

</head>
<body>

<div class="container-fluid">
    <div class="header"><h4>题库知识体系</h4></div>
    <div class="row">
        <div class="col-md-2">
            <ul id="categoryTree" class="ztree" style="overflow: auto;">
            </ul>
        </div>
        <div class="col-md-10">
            <div class="container-fluid">
                <div class="row">
                    <form action="" onsubmit="return false;">
                        <%--<div class="form-group col-md-5">--%>
                            <%--<label class="col-md-2 control-label text-right">编号：</label>--%>
                            <%--<div class="col-md-10">--%>
                                <%--<input id="categoryId"  class="name form-control"  placeholder="编号" >--%>
                            <%--</div>--%>
                        <%--</div>--%>
                        <div class="form-group col-md-5">
                            <label class="col-md-2 control-label text-right">名称：</label>
                            <div class="col-md-10">
                                <input id="categoryName"  class="name form-control"  placeholder="名称" >
                            </div>
                        </div>
                        <div class="col-md-2">
                            <button type="submit" class="btn btn-primary" onclick="search()">查询</button>
                        </div>
                    </form>
                </div>
                <div class="row">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <%--<th>编号</th>--%>
                                <th>名称</th>
                                <th>知识树</th>
                            </tr>
                        </thead>
                        <tbody id="listDataArea">

                        </tbody>
                    </table>
                </div>
                <div class="row padding-bottom-10">
                    <div id="listDataPaginationArea"></div>
                </div>
            </div>
        </div>
    </div>
</div>


<script src='${ctx}/thirdpart/ztree/jquery.ztree.all-3.5.min.js'></script>
<script src='${ctx}/thirdpart/jPaginate/jquery.paginate.js'></script>
<script>

    function search(pageNumber){
        pageNumber = pageNumber || 1;
        var params = {
            pageNumber : pageNumber,
            pageSize : 10
        };

        params['sorts[0].field'] = 'id';
        params['sorts[0].type'] = 'asc';

//        var id = $('#categoryId').val().trim();
//        if(id){
//            params['search_EQ_id'] = id;
//        }

        var name = $('#categoryName').val().trim();
        if(name){
            params['name'] = name;
        }

        var categoryTree = $.fn.zTree.getZTreeObj("categoryTree");
        if(categoryTree){
            var selectedNodes = categoryTree.getSelectedNodes();
            if(selectedNodes.length > 0){
                params['search_LLIKE_id'] = selectedNodes[0].id;
            }
        }


        // 加载数据
        $.get(ctx + '/spiderInterface/spiderZhijiaoCategory/page',params,function(data){
            $('#listDataArea').empty();
            $.each(data.content,function(index,item){
                $('#listDataArea').append('<tr><td style="display: none;">'+ item.id +'</td><td>'+ item.name +'</td><td>'+ '【】'+ item.id+ '$'+ getFullName(item) +'</td></tr>');
            });
            if(pageNumber == 1){
                if(data.totalElements){
                    $("#listDataPaginationArea").paginate({
                        totalCount  : data.totalElements,
                        count 		: data.totalPages,
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
                            search(page);
                        }
                    });
                }else{
                    $("#listDataPaginationArea").empty();
                }
            }
        });
    }

    function getFullName(item,suffix){
        suffix = suffix ? ' <span style="color: blue;"> -> </span>' + suffix : '';
        item.name += suffix;
        if(item.parent){
            return getFullName(item.parent,item.name);
        }
        return item.name;
    }

    // 加载类别树
    $.get(ctx + '/spiderInterface/spiderZhijiaoCategory/getNodes', function(data) {
        data = data.map(function(item,index,array){
            item.isParent = !item.leaf;
            return item;
        });
        $.fn.zTree.init($("#categoryTree"), {
            async : {
                enable : true,// 启用异步加载
                url : ctx + '/spiderInterface/spiderZhijiaoCategory/getChildren', // 异步请求地址
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
                    var zTree = $.fn.zTree.getZTreeObj("categoryTree");
                    treeNode.halfCheck = false;
                    zTree.updateNode(treeNode);
                },
                beforeClick : function(treeId, treeNode) {
                    return true;
                },
                onClick : function(event, treeId, treeNode) {
                    search();
                }
            }
        }, [{
            id : '0',
            name : '目录',
            open : true,
            children : data
        }]);
    });

    search();
</script>

<%@include file="../footer.jsp" %>
</body>
</html>
