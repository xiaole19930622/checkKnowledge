var searchDocument = {
	curSelectedTag : '',
	top2Url : ctx + "/documentTag/getNodes",
	top2Data : [],
	thirdLayerData : [],
	fourthLayerData : [],
	fifthLayerData : [],
	zhangjie : "章节",
	zsd : "知识点",
	selectedXueDuan:'',
	xiaoxue:'小学',
	chuzhong:'初中',
	gaozhong:'高中',
	pageReInit:true,
	type : {
		teachingCase : '1',
		report : '2',
		courseWare : '3',
		teachingVideo : '4',
		guideStudyCase : '5',
		media : '6'
	},
	options : {
		curType : "1",
		getChildrenApi : ctx + "/documentTag/getChildren",
		searchDocumentFunc : function() {},
		showFilterLayerFunc : function() {},
		showThirdLayerFunc:function(layerData){},
		showFourthLayerFunc:function(layerData){},
		showFifthLayerFunc:function(layerData){},
		clickTagItemTextFunc:function(){},
		clickSecItemTextFunc:function(){},
		clickFifthSecItemTextFunc:function(){},
		showAreaFunc:function(){},
		pageSize : 20
	},

	/**
	 * curType:当前文档类型 showDocumentFunc:显示文档的方法 showFilterLayerFunc：显示过滤字段层的方法，
	 * 
	 * @param {curType,showDocumentFunc,showFilterLayerFunc}
	 *            options
	 */
	init : function(options) {
		this.options.showThirdLayerFunc=this.showThirdLayerByDefault;
		this.options.clickTagItemTextFunc=this.clickTagItemTextByDefault;
		this.options.clickSecItemTextFunc=this.clickSecItemTextByDefault;
		this.options.clickFifthSecItemTextFunc=this.clickFifthSecItemTextByDefault;
		this.options.showFourthLayerFunc=this.showFourthLayerByDefault;
		this.options.showFifthLayerFunc=this.showFifthLayerByDefault;
		this.options.showAreaFunc=this.showAreaLayer;
		$.extend(this.options, options);
		return this;
	},
	/**
	 * 
	 * @param {parentId,onCatalogTreeClick}
	 *            pPptions
	 */
	loadCatagoryTree : function(pPptions) {
		var options = {
			parentId : "",
			onCatalogTreeClick : searchDocument.onClickTreeNode
		};
		debugger;
		$.extend(options, pPptions);
		$.get(searchDocument.options.getChildrenApi, {
					id : options.parentId
				}, function(jsonsObj) {
					var result = [{
								id : options.parentId,
								name : '根目录',
								open : true,
								children : jsonsObj
							}];
					var setting = {
						async : {
							enable : true,// 启用异步加载
							url : searchDocument.options.getChildrenApi, // 异步请求地址
							autoParam : ["id=id"]
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
							onAsyncSuccess : function(event, treeId, treeNode,
									msg) {
								debugger;
								var zTree = $.fn.zTree.getZTreeObj("zsdTree");
								treeNode.halfCheck = false;
								zTree.updateNode(treeNode);
							},
							beforeClick : function(treeId, treeNode) {
								return true;
							},
							onClick : function(event, treeId, treeNode) {
								debugger;
								options.onCatalogTreeClick(treeNode.id);
							}
						}
					};
					$.fn.zTree.init($("#zsdTree"), setting, result);
				});
	},

	onClickTreeNode : function(nodeId) {
		debugger;
		$(".pagination").hide();
		// 重置排序选中
		$(".sec-sort").find(".text").removeClass("active");
		$(".sec-sort").find(".text:first").addClass("active");
		searchDocument.curSelectedTag = nodeId;
		searchDocument.options.searchDocumentFunc();
	},

	emptyCatTree : function() {
		if($("#zsdTree").length)
			$("#zsdTree").empty();
	},

	showFilterLayer : function() {
		searchDocument.options.showFilterLayerFunc();
	},

	/**
	 * 
	 * @param {curPage,maxPage,showDocumentFunc}
	 *            options
	 */
	initPageination : function(options) {
		debugger;
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
				searchDocument.getDocumentsByPage(page, searchDocument.options.pageSize);
			}
		});
	},
	getDocumentsByPage : function(pageNumber, pageSize) {
		debugger;
		var param = {};
		param['pageNumber'] = pageNumber;
		param['pageSize'] = pageSize;
		searchDocument.options.searchDocumentFunc(param);
	},

	/**
	 * 
	 * @param {源}
	 *            srcStr
	 * @param {用来替代的值}
	 *            replaceStr
	 * @return {}
	 */
	replaceEmptyOrNull : function(srcStr, replaceStr) {
		debugger;
		if (srcStr == "" || srcStr == null) {
			return replaceStr;
		}
		return srcStr;
	},

	// 加载显示年级和科目数据
	loadTop2 : function() {
		if (searchDocument.top2Data.length == 0) {
			$.get(searchDocument.top2Url, {
						level : 2
					}, function(jsonsObj) {
						searchDocument.top2Data = jsonsObj;
						searchDocument.showTop2();
					});
		} else {
			searchDocument.showTop2();
		}
	},
	showTop2 : function() {
        var optionHTML = '<optgroup label=""><option value="">不限</option></optgroup>';
		$.each(searchDocument.top2Data, function(i, item) {
            optionHTML += '<optgroup label="'+ item.name +'">';
            if (item.children) {
                $.each(item.children, function(i, childItem) {
                    optionHTML += '<option value="' + childItem.id + '">' + childItem.name + '</option>';
                });
            }
            optionHTML += '</optgroup>';
        });
		$("#tag_top2_select").append(optionHTML).jQselectable({
            top : 16,
            target : '#conditionStepSubjectBtn',
            callback : function(){
                var selectedOption = $('#tag_top2_select option:selected');
                if($(selectedOption).val()){
                    $('#conditionStepSubjectDisplay').text(selectedOption.parent().attr('label') + selectedOption.text());
                }else{
                    $('#conditionStepSubjectDisplay').text('学段 学科');
                }
                $("#sec_items").empty();
                searchDocument.emptyCatTree();
                //原系统缺陷 #891点击学科，选择不限，下面的搜索条件都会消失；   开始
				documentManagement.showTypeLayer();
				searchDocument.options.showAreaFunc();
                //原系统缺陷 #891         结束
                var selectedVal = $(this).val();
                searchDocument.curSelectedTag = selectedVal;
                //if (selectedVal){
                    searchDocument.selectedXueDuan=$("#tag_top2_select").find("option[value='"+selectedVal+"']").parent("optgroup").attr("label");
                    searchDocument.loadLayerData(selectedVal,searchDocument.fourthLayerData,searchDocument.options.showFourthLayerFunc);
                //}
            }
        });
	},

	loadLayerData : function(parentId, layerData, showFunc) {
		if (layerData.length == 0) {
			$.get(searchDocument.options.getChildrenApi, {
						id : parentId
					}, function(jsonsObj) {
						layerData[parentId] = jsonsObj;
						showFunc(layerData[parentId]);
					});
		} else {
			if (!layerData[parentId]) {
				$.get(searchDocument.options.getChildrenApi, {
							id : parentId
						}, function(jsonsObj) {
							layerData[parentId] = jsonsObj;
							showFunc(layerData[parentId]);
						});
			} else {
				showFunc(layerData[parentId]);
			}
		}
	},

	// 显示第三层
	showThirdLayerByDefault : function(layerData) {
		// debugger;
		searchDocument.thirdLayerData = layerData;
		if (searchDocument.thirdLayerData.length > 0) {
			// debugger;
			var ulHtml = '<ul class="sec-item black" id="third_item">';
			$.each(searchDocument.thirdLayerData, function(i, item) {
				ulHtml += '<li class="text"><a name="'
						+ item.name
						+ '" data="'
						+ item.id
						+ '" onclick="searchDocument.options.clickTagItemTextFunc(this)" href="javascript:void(0)" hidefocus="true" alog-text="'
						+ item.name + '">' + item.name + '</a></li>';
			});
			ulHtml += '</ul>';
			$("#sec_items").append(ulHtml);
			$("#third_item").find("li:first").find("a").click();
		}
	},

	// 显示第四层
	showFourthLayerByDefault : function(layerData) {
		searchDocument.fourthLayerData = layerData;
		if (searchDocument.fourthLayerData.length > 0) {
			var ulHtml = '<ul class="sec-item" id="fourth_item">';
			ulHtml += '<li class="text active"><a name="不限" data="'
					+ searchDocument.curSelectedTag
					+ '" onclick="searchDocument.options.clickTagItemTextFunc(this)" href="javascript:void(0)" hidefocus="true" alog-text="不限">不限</a></li>';
			$.each(searchDocument.fourthLayerData, function(i, item) {
				ulHtml += '<li class="text"><a name="'
						+ item.name
						+ '" data="'
						+ item.id
						+ '" onclick="searchDocument.options.clickTagItemTextFunc(this)" href="javascript:void(0)" hidefocus="true" alog-text="'
						+ item.name + '">' + item.name + '</a></li>';
			});
			ulHtml += '</ul>';
			$("#sec_items").append(ulHtml);
			searchDocument.showFilterLayer();
		}
        searchDocument.options.searchDocumentFunc();
    },

	// 显示第五层
	showFifthLayerByDefault : function(layerData) {
		searchDocument.fifthLayerData = layerData;
		if (searchDocument.fifthLayerData.length > 0) {
			var ulHtml = '<ul class="sec-item black" id="fifth_item">';
			ulHtml += '<li class="text active"><a name="不限" data="'
					+ searchDocument.curSelectedTag
					+ '" onclick="searchDocument.options.clickFifthSecItemTextFunc(this)" href="javascript:void(0)" hidefocus="true" alog-text="不限">不限</a></li>';
			$.each(searchDocument.fifthLayerData, function(i, item) {
				ulHtml += '<li class="text"><a name="'+item.name+'" data="'
						+ item.id
						+ '" onclick="searchDocument.options.clickFifthSecItemTextFunc(this)" href="javascript:void(0)" hidefocus="true" alog-text="'
						+ item.name + '">' + item.name + '</a></li>';
			});
			ulHtml += '</ul>';
			$("#fourth_item").after(ulHtml);
		}
		$("#fifth_item").find("li:first").find("a").click();
		searchDocument.emptyCatTree();
		//searchDocument.showFilterLayer();
	},

	clickTagItemTextByDefault : function(obj) {
		debugger;
		$(obj).parents("ul").find("li").removeClass("active");
		$(obj).parents("li").addClass("active");

		var id = $(obj).attr("data");
		var name = $(obj).attr("name");
		searchDocument.curSelectedTag = id;
		if (name == searchDocument.zhangjie) {
			searchDocument.emptyCatTree();
			$("#fourth_item").remove();
			$("#area_item").remove();
			searchDocument.loadLayerData(id, searchDocument.fourthLayerData,
					searchDocument.options.showFourthLayerFunc);
		} else if (name == searchDocument.zsd) {
			searchDocument.options.showAreaFunc();
			$("#fourth_item").remove();
			$("#fifth_item").remove();
			searchDocument.loadCatagoryTree({
						parentId : id
					});
		} else {// 点击第四层(版本层)
			$("#fifth_item").remove();
			searchDocument.emptyCatTree();
			if (name != "不限") {

				searchDocument.loadLayerData(id, searchDocument.fifthLayerData,
						searchDocument.options.showFifthLayerFunc);
			}
		}
		searchDocument.options.searchDocumentFunc();
	},
	clickSecItemTextByDefault:function(obj){
		$(obj).parents("ul").find("li").removeClass("active");
		$(obj).parents("li").addClass("active");
		searchDocument.options.searchDocumentFunc();
	},
	clickFifthSecItemTextByDefault : function(obj) {
		$(obj).parents("ul").find("li").removeClass("active");
		$(obj).parents("li").addClass("active");
		var parentId = $(obj).attr("data");
		var name=$(obj).attr("name");
		searchDocument.curSelectedTag = parentId;
		searchDocument.emptyCatTree();
		if(name!=="不限"){
			searchDocument.loadCatagoryTree({
					parentId : parentId
				});
		}
		searchDocument.options.searchDocumentFunc();
	},
	showAreaLayer:function(){
		$("#area_item").remove();
		var ulHtml = '<ul class="sec-item" id="area_item">'
			+ '<li class="text active"><a data="0" onclick="searchDocument.options.clickSecItemTextFunc(this)" href="javascript:void(0)" hidefocus="true" alog-text="不限">不限</a></li>'
			+ '<li class="text"><a data="4419" onclick="searchDocument.options.clickSecItemTextFunc(this)" href="javascript:void(0)" hidefocus="true" alog-text="东莞">东莞</a></li>'
			+ '<li class="text"><a data="4406" onclick="searchDocument.options.clickSecItemTextFunc(this)" href="javascript:void(0)" hidefocus="true" alog-text="佛山">佛山</a></li>'
			+ '<li class="text"><a data="4499" onclick="searchDocument.options.clickSecItemTextFunc(this)" href="javascript:void(0)" hidefocus="true" alog-text="顺德">顺德</a></li>'
			+ '<li class="text"><a data="4413" onclick="searchDocument.options.clickSecItemTextFunc(this)" href="javascript:void(0)" hidefocus="true" alog-text="惠州">惠州</a></li>'
			+ '<li class="text"><a data="4420" onclick="searchDocument.options.clickSecItemTextFunc(this)" href="javascript:void(0)" hidefocus="true" alog-text="中山">中山</a></li>'
			+ '<li class="text"><a data="4407" onclick="searchDocument.options.clickSecItemTextFunc(this)" href="javascript:void(0)" hidefocus="true" alog-text="江门">江门</a></li>'
			+ '<li class="text"><a data="4404" onclick="searchDocument.options.clickSecItemTextFunc(this)" href="javascript:void(0)" hidefocus="true" alog-text="珠海">珠海</a></li>'
			+ '<li class="text"><a data="5301" onclick="searchDocument.options.clickSecItemTextFunc(this)" href="javascript:void(0)" hidefocus="true" alog-text="昆明">昆明</a></li>'
			+ '<li class="text"><a data="3601" onclick="searchDocument.options.clickSecItemTextFunc(this)" href="javascript:void(0)" hidefocus="true" alog-text="南昌">南昌</a></li>'
			+ '<li class="text"><a data="3401" onclick="searchDocument.options.clickSecItemTextFunc(this)" href="javascript:void(0)" hidefocus="true" alog-text="合肥">合肥</a></li>'
			+ '<li class="text"><a data="3702" onclick="searchDocument.options.clickSecItemTextFunc(this)" href="javascript:void(0)" hidefocus="true" alog-text="青岛">青岛</a></li>'
			+ '<li class="text"><a data="3310" onclick="searchDocument.options.clickSecItemTextFunc(this)" href="javascript:void(0)" hidefocus="true" alog-text="台州">台州</a></li>'
			+ '<li class="text"><a data="3301" onclick="searchDocument.options.clickSecItemTextFunc(this)" href="javascript:void(0)" hidefocus="true" alog-text="杭州">杭州</a></li>'
			+ '<li class="text"><a data="3205" onclick="searchDocument.options.clickSecItemTextFunc(this)" href="javascript:void(0)" hidefocus="true" alog-text="苏州">苏州</a></li>'
			+ '<li class="text"><a data="3202" onclick="searchDocument.options.clickSecItemTextFunc(this)" href="javascript:void(0)" hidefocus="true" alog-text="无锡">无锡</a></li>'
			+ '<li class="text"><a data="3204" onclick="searchDocument.options.clickSecItemTextFunc(this)" href="javascript:void(0)" hidefocus="true" alog-text="常州">常州</a></li>'
			+ '<li class="text"><a data="3210" onclick="searchDocument.options.clickSecItemTextFunc(this)" href="javascript:void(0)" hidefocus="true" alog-text="扬州">扬州</a></li>'
			+ '<li class="text"><a data="4408" onclick="searchDocument.options.clickSecItemTextFunc(this)" href="javascript:void(0)" hidefocus="true" alog-text="湛江">湛江</a></li>'
			+ '<li class="text"><a data="4301" onclick="searchDocument.options.clickSecItemTextFunc(this)" href="javascript:void(0)" hidefocus="true" alog-text="长沙">长沙</a></li>'
			+ '<li class="text"><a data="5201" onclick="searchDocument.options.clickSecItemTextFunc(this)" href="javascript:void(0)" hidefocus="true" alog-text="贵阳">贵阳</a></li>'
			+ '<li class="text"><a data="6101" onclick="searchDocument.options.clickSecItemTextFunc(this)" href="javascript:void(0)" hidefocus="true" alog-text="西安">西安</a></li>'
			+ '<li class="text"><a data="2102" onclick="searchDocument.options.clickSecItemTextFunc(this)" href="javascript:void(0)" hidefocus="true" alog-text="大连">大连</a></li>'
			+ '<li class="text"><a data="3303" onclick="searchDocument.options.clickSecItemTextFunc(this)" href="javascript:void(0)" hidefocus="true" alog-text="温州">温州</a></li>'
			+ '<li class="text"><a data="3501" onclick="searchDocument.options.clickSecItemTextFunc(this)" href="javascript:void(0)" hidefocus="true" alog-text="福州">福州</a></li>'
			+ '<li class="text"><a data="3206" onclick="searchDocument.options.clickSecItemTextFunc(this)" href="javascript:void(0)" hidefocus="true" alog-text="南通">南通</a></li>'
			+ '<li class="text"><a data="1501" onclick="searchDocument.options.clickSecItemTextFunc(this)" href="javascript:void(0)" hidefocus="true" alog-text="呼和浩特">呼和浩特</a></li>'
			+ '<li class="text"><a data="4101" onclick="searchDocument.options.clickSecItemTextFunc(this)" href="javascript:void(0)" hidefocus="true" alog-text="郑州">郑州</a></li>'
			+ '<li class="text"><a data="4403" onclick="searchDocument.options.clickSecItemTextFunc(this)" href="javascript:void(0)" hidefocus="true" alog-text="深圳">深圳</a></li>'
			+ '<li class="text"><a data="3307" onclick="searchDocument.options.clickSecItemTextFunc(this)" href="javascript:void(0)" hidefocus="true" alog-text="金华">金华</a></li>'
			+ '<li class="text"><a data="3306" onclick="searchDocument.options.clickSecItemTextFunc(this)" href="javascript:void(0)" hidefocus="true" alog-text="绍兴">绍兴</a></li>';
		ulHtml += '</ul>';
		$("#sec_items").append(ulHtml);
	},
    /**
     * 渲染单个文档
     */
    renderDocumentItem : function(document,parentNode){
        var html = '';
        html += '<li class="list-group-item">                                            ';
        html += '<div class="row">                                                       ';
        html += '<div class="col-md-12" title="'+ document.name +'" style="max-height: 60px;overflow: hidden;">                                                  ';
        html += '<h3><a target=_blank href="'+ctx+'/document/preview/'+document.id+'">'+ document.name +'</a></h3>';
        html += '</div>                                                                  ';
        html += '<div class="col-md-9">                                    ';
        html += '<div class="row">                                                       ';
        html += '<div class="col-md-12" title="'+ searchDocument.replaceEmptyOrNull(document.description,"无") +'" style="max-height: 30px;overflow: hidden;">                                                 ';
        html += '<h4><strong>简介：</strong>'+ searchDocument.replaceEmptyOrNull(document.description,"无") +'</h4>                                     ';
        html += '</div>                                                                  ';
        html += '</div>                                                                  ';
        html += '<div class="row margin-top-10">                                                       ';
        html += '<div class="col-md-3" title="'+ document.createTime +'" style="max-height: 20px;overflow: hidden;"><strong>上传日期：</strong>'+ document.createTime +'</div>            ';
        html += '<div class="col-md-3">共'+ searchDocument.replaceEmptyOrNull(document.pageCount,"0") +'页</div>                                         ';
        html += '<div class="col-md-3">10积分</div>                                        ';
        html += '<div class="col-md-3"><strong>贡献者：</strong>'+ document.createUser.name +'</div>                    ';
        html += '</div>                                                                  ';
        html += '</div>                                                                  ';
        html += '<div class="col-md-3">                                    ';
        html += '<div class="row">                                                       ';
        html += '<div class="col-md-12">                                                 ';
        html += '<h4><strong>星级：</strong>';
        for(var i = 0; i < document.rank; i++){
            html += '<img style="height: 20px;width: 20px;" src="'+ ctx +'/thirdpart/jquery-raty-2.5.2/lib/img/star-on.png"/> ';
        }
        for(var i = 0; i < 5 - document.rank; i++){
            html += '<img style="height: 20px;width: 20px;" src="'+ ctx +'/thirdpart/jquery-raty-2.5.2/lib/img/star-off.png"/> ';
        }
        html += '</h4>';
        html += '</div>                                                                  ';
        html += '<div class="col-md-12" style="color: #a489da;">                         ';
        html += searchDocument.replaceEmptyOrNull(document.downloadCount,"0") + '人已下载                                                                  ';
        html += '</div>                                                                  ';
        html += '</div>                                                                  ';
        html += '</div>                                                                  ';
        html += '</div>                                                                  ';
        html += '</li>    ';
        $(parentNode).append(html);
    }
}