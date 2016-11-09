(function($){
    var pluginName = 'simple-data-grid';
    var defaults = {
        url : '', // string 数据URL
        /*
        列模型
        {
            field : 属性名
            title : 表头标题
            formatter(data,index,record) : 可选格式化参数
        }
         */
        columns : [], // array 列模型
        emptyTemplate : '<h3>&nbsp;查询不到数据</h3>', // 结果集为空时内容
        pageSize : 20, // integer 每页最大数据量
        searchParams : {}, // function/object 临时查询参数，可在初始化或调用load函数时传入，支持传入返回参数对象的函数
        staticSearchParams : {}, // object 常量查询参数，每次查询都会附带这些参数
        paginationButtonLength : 5, // integer 页码按钮个数
        showHeader : true, // 是否显示表头
        showCheckbox : false, // 是否显示checkbox
        pageNumberField : 'pageNumber', // string 查询数据时，页码参数名称
        pageSizeField : 'pageSize', // string 查询数据时，每页最大数据量参数名称
        contentField : 'content', // string 返回数据时，数据集合属性名
        totalField : 'totalElements', // string 返回数据时，数据总量属性名
        afterLoad : function(data){} // function 数据加载完毕后回调
    };

    var methods = {
        /**
         * 初始化
         * @param options
         */
        init : function(options){
            var _this = this;
            methods.destroy.call(_this);
            var options = $.extend({},defaults,options);
            $(_this).data('options',options);
            $(_this).data('pageNumber',1);
            $(_this).data('searchParams',options.searchParams);
            // 渲染表格
            $(_this).addClass(pluginName).empty();
            var $table = $('<table>');
            $table.width('100%').addClass('table').addClass('table-bordered');
            var $thead = $('<thead>');
            var $tbody = $('<tbody>');
            // 表头
            if(options.showHeader){
                var $thead_tr = $('<tr>');
                if(options.showCheckbox){
                    var $th = $('<th>');
                    $th.html('<input type=checkbox>');
                    $thead_tr.append($th);
                }
                $.each(options.columns,function(index,item){
                    var $th = $('<th>');
                    //隐藏列
                    if(item.hidden){
                        $th.hide();
                    }
                    $th.text(item.title || item.field);
                    $thead_tr.append($th);
                });
                $thead.append($thead_tr);
                $table.append($thead);
            }
            $table.append($tbody);
            $(_this).append($table);
            // 渲染分页条及分页条事件绑定
            var $pagination = $('<ul>').addClass('pagination');
            var $first = $('<li class="first"><a>第一页</a></li>');
            $pagination.append($first);
            $(_this).on('click.' + pluginName,'.first',function(){
                methods.loadPage.call(_this);
            });
            var $prev = $('<li class="prev"><a>上一页</a></li>');
            $pagination.append($prev);
            $(_this).on('click.' + pluginName,'.prev',function(){
                var pageNumber = $(_this).data('pageNumber') || 1;
                if(pageNumber > 1){
                    pageNumber --;
                }
                methods.loadPage.call(_this,pageNumber);
            });
            var $next = $('<li class="next"><a>下一页</a></li>');
            $pagination.append($next);
            $(_this).on('click.' + pluginName,'.next',function(){
                var pageNumber = $(_this).data('pageNumber') || 1;
                var pageCount = _this.data('pageCount') || 0;
                if(pageNumber < pageCount){
                    pageNumber ++;
                }
                methods.loadPage.call(_this,pageNumber);
            });
            var $last = $('<li class="last"><a>最后一页</a></li>');
            $pagination.append($last);
            $(_this).on('click.' + pluginName,'.last',function(){
                var pageCount = _this.data('pageCount') || 0;
                methods.loadPage.call(_this,pageCount);
            });
            var $displayInfo = $('<li class="display-info"><a>第<input value="1" style="  width: 30px;text-align: right;height: 20px;" class="display-info-page-number">/<span class="display-info-page-count">0</span>页，显示第<span class="display-info-start">0</span>-<span class="display-info-end">0</span>条数据，共<span class="display-info-total">0</span>条数据</a></li>');
            $pagination.append($displayInfo);
            // 页码文本框编辑事件
            $(_this).on('change.' + pluginName,'.display-info-page-number',function(){
                var pageCount = _this.data('pageCount') || 0;
                var pageNumber = $(this).val();
                pageNumber = isNaN(pageNumber) ? 1 : parseInt(pageNumber);
                if(pageNumber < 1){
                    pageNumber = 1;
                }
                if(pageNumber > pageCount){
                    pageNumber = pageCount;
                }
                $(_this).data('pageNumber',pageNumber);
                methods.loadPage.call(_this,pageNumber);
            });
            // 页码按钮点击事件
            $(_this).on('click.' + pluginName,'.page-number',function(){
                methods.loadPage.call(_this,parseInt($(this).text()));
            });
            $(this).append($pagination);
            // 复选框点选事件
            $(_this).on('change.' + pluginName,'thead>tr>th>input[type=checkbox]',function(){
                var checked = this.checked;
                $(_this).find('tbody>tr>td>input[type=checkbox]').each(function(index,item){
                    item.checked = checked;
                });
            });

            methods.load.call(_this);
        },
        /**
         * 销毁组件
         */
        destroy : function(){
            var _this = this;
            $(_this).empty().off();
        },
        /**
         * 加载数据
         * @param params
         */
        load : function(searchParams){
            methods.loadPage.call(this,1,searchParams);
        },
        /**
         * 重新加载数据
         */
        reload : function(searchParams){
            var _this = this;
            $(_this).data('searchParams',searchParams || $(_this).data('searchParams'));
            searchParams = $(_this).data('searchParams');
            var $tbody = $(_this).find('tbody');
            var options = $(_this).data('options');
            var params = {};
            params[options.pageNumberField] = $(_this).data('pageNumber') || 1;
            params[options.pageSizeField] = options.pageSize;
            params = $.extend({},typeof options.staticSearchParams == 'function' ? options.staticSearchParams() : options.staticSearchParams,params,typeof searchParams == 'function' ? searchParams() : searchParams);
            $.get(options.url,params,function(res){
                $(_this).data('data',res);
                $tbody.empty();
                if(res[options.contentField] && res[options.contentField].length){
                    $.each(res[options.contentField],function(dataIndex,data){
                        var $tbody_tr = $('<tr>');
                        if(options.showCheckbox){
                            var $td = $('<td width="1px">');
                            $td.html('<input type=checkbox>');
                            $tbody_tr.append($td);
                        }
                        // 总列宽权值总和
                        var widthSum = 0;
                        $.each(options.columns,function(columnIndex,column){
                            widthSum += column.width && !isNaN(column.width) && column.width > 0 ? column.width : 0;
                        });
                        // 渲染一行数据
                        $.each(options.columns,function(columnIndex,column){
                            var $td = $('<td>');
                            if(column.width){
                                $td.width(column.width / widthSum * 100 + '%');
                            }
                            // 支持多级属性
                            var fields = column.field ? column.field.split('.') : '';
                            var val = data[fields[0]];
                            for(var i = 1; i < fields.length && val; i++){
                                val = val[fields[i]];
                            }
                            $td.html(column.formatter ? column.formatter(val,dataIndex,data,$td) : val);
                            $td.attr('title',$td.text());
                            //隐藏列
                            if(column.hidden){
                                $td.hide();
                            }
                            $tbody_tr.append($td);
                        });
                        $tbody.append($tbody_tr);
                    });
                }else{
                    var emptyContent = typeof options.emptyTemplate == 'function' ? options.emptyTemplate() : options.emptyTemplate;
                    var emptyHTML = '<tr><td colspan="'+ (options.columns.length + (options.showCheckbox ? 1 : 0)) +'">'+ emptyContent +'</td></tr>'
                    $tbody.html(emptyHTML);
                }
                methods.reloadPagination.call(_this);
                if(options.afterLoad){
                    options.afterLoad(res[options.contentField]);
                }
            });
        },
        /**
         * 加载对应页码的数据
         * @param pageNumber
         */
        loadPage : function(pageNumber,params){
            $(this).data('pageNumber',pageNumber || 1);
            methods.reload.call(this,params);
        },
        /**
         * 当球当前数据
         */
        getData : function(index){
            var _this = this;
            var data = $(_this).data('data')[$(this).data('options').contentField];
            if(isNaN(index)){
                return data;
            }else{
                return data[index];
            }
        },
        /**
         * 获取被选中的数据
         * @returns {*}
         */
        getChecked : function(){
            var _this = this;
            var data = $(_this).data('data')[$(this).data('options').contentField];
            return _this.find('tbody>tr>td>input[type=checkbox]:checked').map(function(){
                return data[$(this).parent().parent().index()];
            })

        },
        /**
         * 重新加载分页条数据
         */
        reloadPagination : function(){
            var _this = this;
            var $pagination = $(this).find('.pagination');
            var data = $(this).data('data');
            var options = $(this).data('options');
            if(data){
                var pageNumber = $(_this).data('pageNumber') || 1;
                var pageCount = Math.ceil(data[options.totalField] / options.pageSize);
                var start = (pageNumber - 1) * options.pageSize + 1;
                var end = start + data[options.contentField].length - 1;
                var total = data[options.totalField];
                // 重新渲染页码按钮
                $pagination.find('.page-number').remove();
                var prevButtonCount = Math.floor(options.paginationButtonLength / 2);
                var pageNumberButtonLabel = pageNumber;
                var $pageNumberButton = $('<li class="page-number"><a>'+ pageNumberButtonLabel +'</a></li>');
                $pagination.find('.prev').after($pageNumberButton);
                for(var i = 0; i < prevButtonCount; i++){
                    pageNumberButtonLabel = parseInt($pagination.find('.page-number:first').text()) - 1;
                    if(pageNumberButtonLabel >= 1){
                        $pageNumberButton = $('<li class="page-number"><a>'+ pageNumberButtonLabel +'</a></li>');
                        $pagination.find('.page-number:first').before($pageNumberButton);
                    }
                }
                // 添加当前页往后的页码按钮
                while($pagination.find('.page-number').length < options.paginationButtonLength && parseInt($pagination.find('.page-number:last').text()) !== pageCount && pageCount !== 0){
                    pageNumberButtonLabel = parseInt($pagination.find('.page-number:last').text()) + 1;
                    if(pageNumberButtonLabel <= pageCount){
                        $pageNumberButton = $('<li class="page-number"><a>'+ pageNumberButtonLabel +'</a></li>');
                        $pagination.find('.page-number:last').after($pageNumberButton);
                    }
                }
                // 添加当前页往前的页码按钮
                while($pagination.find('.page-number').length < options.paginationButtonLength && parseInt($pagination.find('.page-number:first').text()) !== 1 && pageCount !== 0){
                    pageNumberButtonLabel = parseInt($pagination.find('.page-number:first').text()) - 1;
                    if(pageNumberButtonLabel >= 1){
                        $pageNumberButton = $('<li class="page-number"><a>'+ pageNumberButtonLabel +'</a></li>');
                        $pagination.find('.page-number:first').before($pageNumberButton);
                    }
                }

                $(_this).find('.page-number:contains("'+ pageNumber +'")').addClass('active');
                $(this)
                    .data('pageNumber',pageNumber).find('.display-info-page-number').val(pageNumber).end()
                    .data('pageCount',pageCount).find('.display-info-page-count').text(pageCount).end()
                    .data('start',start).find('.display-info-start').text(start).end()
                    .data('end',end).find('.display-info-end').text(end).end()
                    .data('total',total).find('.display-info-total').text(total).end();
            }
        }
    };

    $.fn.datagrid = function(option){
        if ( methods[option] ) {
            return methods[ option ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof option === 'object' || ! option ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.datagrid' );
        }
    }
    $.datagrid = {
        defaults : defaults
    };
})(jQuery)
