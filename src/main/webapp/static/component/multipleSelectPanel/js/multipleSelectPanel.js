/**
 * multiple-select-panel V1.0
 * @author xuwen
 * @date 2015-06-05
 */
(function ($) {
    var pluginName = 'multiple-select-panel';
    var defaults = {
        panel: {
            allowAny : false, // 允许不限（空值）
            label: 'name',
            value: 'id'
        },
        placeholder: '请选择',
        onCompleteSelect: function (val) {
        }
    };

    var methods = {
        /**
         * 初始化
         * @param options
         */
        init: function (options) {
            var _this = this;
            methods.destroy.call(_this);
            options = $.extend({}, defaults, options);
            var $container = $('<div>');
            $container.show();
            $container.attr('class', $(_this).attr('class')).attr('style', $(_this).attr('style'));
            $container.addClass(pluginName);
            var $display = $('<button type="button" class="display btn btn-default">');
            $display.html('<span class="glyphicon glyphicon-list"></span><span class="display-info">' + options.placeholder + '</span><span class="glyphicon glyphicon-menu-down"></span>');
            $container.append($display);
            $panel = $('<div class="panel">');
            $panel.addClass('container').hide();
            $.each(options.panels, function (index, item) {
                var $select = $('<select multiple="multiple">');
                options.panels[index] = $.extend({}, defaults.panel, item);
                $select.data('options', options.panels[index]);
                $panel.append($select);
            });
            $container.append($panel);
            _this.hide().after($container);

            _this.data('$container', $container);
            _this.data('$display', $display);
            _this.data('$panel', $panel);
            _this.data('options', options);

            // 事件绑定 start
            // 点击展开面板
            $container.on('click.' + pluginName, '.display', function () {
                $panel = $(this).next();
                if ($panel.is(':visible')) {
                    $panel.hide();
                    return;
                }
                methods.resetPosition.call(_this); // 重新定位
                var $selects = $panel.find('select');
                //清除option
                if ($(_this).val()) {
                    methods.resetValue.call(_this);
                    return;
                }else{
                    $selects.empty();
                }
                if ($selects.length > 0) {
                    var panelOptions = $selects.first().data('options');
                    $.get(panelOptions.url, function (res) {
                        //判断是否第一个select是否有数据，没有才添加
                        if($selects[0].children.length===0){
                            if(panelOptions.allowAny){
                                $selects.first().append($('<option value="">不限</option>'));
                            }
                            $.each(res, function (index, item) {
                                var $option = $('<option>');
                                $option.attr('value', item[panelOptions.value]).html(item[panelOptions.label]);
                                $selects.first().append($option);
                            });
                        }
                        $('.' + pluginName).find('.panel').hide();
                        $panel.show();
                    });
                }
            });
            // 面板点选
            $container.on('change.' + pluginName, '.panel select', function () {
                var $next = $(this).next();
                if ($next.length > 0) {
                    // 加载下层面板数据
                    var panelOptions = $next.data('options');
                    $.get(panelOptions.url.replace('{param}', $(this).val()), function (res) {
                        $next.empty();
                        if (res.length > 0) {
                            if(panelOptions.allowAny){
                                $next.append($('<option value="">不限</option>'));
                            }
                            $.each(res, function (index, item) {
                                var $option = $('<option>');
                                $option.attr('value', item[panelOptions.value]).html(item[panelOptions.label]);
                                $next.append($option);
                            });
                            //清空next的nextAll
                            $next.nextAll().empty();
                        } else {
                            options.onCompleteSelect($(_this).val());
                            $panel.hide();
                        }
                    });
                } else {
                    // 无限层次递归面板
                    if (options.defaultPanel) {
                        var $next = $('<select multiple="multiple">');
                        $next.data('options', $.extend({}, defaults.panel, options.defaultPanel));
                        $panel.append($next);
                        $(this).trigger('change');
                    } else {
                        $panel.hide();
                    }
                }
                // 显示选择的标签
                var display = $(this).prevAll().add(this).find('option:selected').map(function () {
                    return $(this).text();
                }).get().join(' > ');
                var $currentSelect = $(this);
                var val = $currentSelect.val()[0];
                while(!val && $currentSelect.prev().length > 0){
                    $currentSelect = $currentSelect.prev();
                    val = $currentSelect.val();
                }
                methods.setValue.call(_this, val, display);
            });

            return this;
        },
        /**
         * 设值的时候重新定位panel的位置
         */
        resetPosition: function () {
            var _this = this;
            var $panel = $(_this).data('$panel');
            var $display = $(_this).data('$display');
            $panel.css({
                top: $display.get(0).offsetTop + $display.get(0).offsetHeight,
                left: $display.get(0).offsetLeft
            });
        },
        /**
         * 设置值
         */
        setValue: function (value, label) {
            var _this = this;
            var $display = $(_this).data('$display');
            $display.find('.display-info').text(label ? label : value);
            var $valueOption = $('<option>');
            $valueOption.attr('value', value);
            $(_this).html($valueOption);
            methods.resetPosition.call(_this);
        },
        /**
         * 重新显示值
         */
        resetValue : function(){
            tt = this;
            var _this = this;
            var $panel = $(_this).data('$panel');
            var options = $(_this).data('options');
            var values =  (function(val){
                var array = [];
                for(var i = 0; i < val.length / 2; i++){
                    array.push(val.substring(0,(i + 1) * 2));
                }
                return array;
            })($(_this).val());
            var selectValues = $panel.children().map(function(){
                return $(this).val();
            });
            if(selectValues.length > values.length){
                values = selectValues;
            }
            $panel.empty();
            var $select = $('<select multiple="multiple">');
            var panelOptions = options.panels[0];
            $select.data('options', panelOptions);
            $panel.append($select);
            $.get(panelOptions.url, function (res) {
                if(panelOptions.allowAny){
                    $panel.children().eq(0).append($('<option value="">不限</option>'));
                }
                $.each(res, function (index, item) {
                    var $option = $('<option>');
                    $option.attr('value', item[panelOptions.value]).html(item[panelOptions.label]);
                    $panel.children().eq(0).append($option);
                });
                $panel.children().eq(0).val(values[0]);
            });
            $.each(values,function(index,item){
               if(index == 0)return;
                if(!options.panels[index] && !options.defaultPanel)return;
                var $select = $('<select multiple="multiple">');
                var panelOptions = $.extend({}, defaults.panel, options.panels.length > index ? options.panels[index] : options.defaultPanel);
                $select.data('options', panelOptions);
                $panel.append($select);
                $.get(panelOptions.url.replace('{param}',values[index - 1]), function (res) {
                    if(panelOptions.allowAny){
                        $panel.children().eq(index).append($('<option value="">不限</option>'));
                    }
                    $.each(res, function (innerIndex, innerItem) {
                        var $option = $('<option>');
                        $option.attr('value', innerItem[panelOptions.value]).html(innerItem[panelOptions.label]);
                        $panel.children().eq(index).append($option);
                    });
                    $panel.children().eq(index).val(values[index]);
                });
            });
            if(values.length == 1 && (options.panels.length > 1 || options.defaultPanel)){
                var $select = $('<select multiple="multiple">');
                $select.data('options', options.panels[1] || options.defaultPanel);
                $panel.append($select);
            }
            setTimeout(function(){$panel.show()},500);
        },
        /**
         * 销毁组件
         */
        destroy: function () {
            var _this = this;
            $(_this).show().next('.multiple-select-panel').remove();
        }
    };

    $.fn.multipleSelectPanel = function (option) {
        var _arguments = arguments;
        if (methods[option]) {
            return methods[option].apply(this, Array.prototype.slice.call(_arguments, 1));
        } else if (typeof option === 'object' || !option) {
            return this.map(function () {
                return methods.init.apply($(this), _arguments);
            });
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.multipleSelectPanel');
        }
    }
})(jQuery)
