Ext.namespace("dev.statistics");
dev.statistics.diyufenxi = function(tabWidth) {

	var today = new Date();

	var ds = new Ext.data.JsonStore({
				method : 'GET',
				url : '/dev/statistics/diyufenxi.jcp',
				root : 'authArray',
				fields : ["xitong", "pv", "pvbili", "uv", "ip"],
				remoteSort : true
			});
	ds.load({
				params : {
					'startdate' : today.add(Date.DAY, -7).format('Y/m/d'),
					'enddate' : today.format('Y/m/d')
				}
			});

	var toolbar = new Ext.Toolbar({
				width : "100%",
				items : [{
							xtype : 'tbspacer'
						}, {
							xtype : 'tbspacer'
						}, {
							xtype : 'tbspacer'
						}, {
							xtype : 'tbspacer'
						}, '开始时间:', {
							xtype : 'tbspacer'
						}, {
							xtype : 'datefield',
							id : 'startdate8',
							fieldLabel : '开始日期',
							name : 'startdate8',
							// The value matches the format; will be parsed and
							// displayed using that format.
							format : 'Y/m/d',
							emptyText : today.add(Date.DAY, -7),
							value : today.add(Date.DAY, -7)
						}, {
							xtype : 'tbspacer'
						}, '-', {
							xtype : 'tbspacer'
						}, '结束时间:', {
							xtype : 'tbspacer'
						}, {
							xtype : 'datefield',
							fieldLabel : '结束日期',
							id : 'enddate8',
							name : 'enddate8',
							// The value does not match the format, but does
							// match an altFormat; will be parsed
							// using the altFormat and displayed using the
							// format.
							format : 'Y/m/d',
							altFormats : 'm,d,Y|m.d.Y',
							emptyText : today,
							value : today
						}, {
							xtype : 'tbspacer'
						}, {
							xtype : 'tbspacer'
						}, new Ext.Button({
									text : '确定',
									id : 'qd',
									handler : function() {
										creattu3(ds)
									}
								})]
			});

	var height = (Ext.getBody().getHeight() - 83) * .70, chartOne = Ext.id(), chartTwo = Ext
			.id(), colWidth = tabWidth / ds.fields.length, panl = new Ext.Panel(
			{
				layout : 'border',
				tbar : toolbar,

				items : [{
							height : height,
							region : 'north',
							layout : 'hbox',
							border : false,
							layoutConfig : {
								align : 'stretch',
								pack : 'start'
							},
							items : [{
										id : chartTwo,
										border : false,
										flex : 1,
										html : '<div id="'+chartOne+'" style="height:90%;width:80%;margin:0 auto;"></div>'
									}]
						}, {

							region : 'center',
							xtype : 'grid',
							store : ds,
							columnLines : true,
							closable : false,
							border : true,
							viewConfig : {
								forceFit : true
							},
							frame : false,
							columns : [{
										header : "省份",
										width : colWidth,
										dataIndex : "xitong",
										sortable : false
									}, {
										header : "PV",
										width : colWidth,
										dataIndex : "pv",
										sortable : false
									}, {
										header : "PV比例",
										width : colWidth,
										dataIndex : "pvbili",
										sortable : false
									}, {
										header : "UV",
										width : colWidth,
										dataIndex : "uv",
										sortable : false
									}, {
										header : "IP",
										width : colWidth,
										dataIndex : "ip",
										sortable : false
									}]
						}]
			})
	function randomData() {
		return Math.round(Math.random() * 1000);
	}

	Ext.Ajax.request({
				url : '/dev/statistics/diyufenxitu.jcp',
				params : {
					'startdate' : today.add(Date.DAY, -7).format('Y/m/d'),
					'enddate' : today.format('Y/m/d')
				},
				scope : this,
				method : 'Post',
				success : function(response, options) {

					var check = response.responseText;
					var ajaxResult = Ext.util.JSON.decode(check);
					var list = ajaxResult.authArray;

					var myChart = echarts.init(document.getElementById(chartOne));
					
					
					option = {
						title : {
							text : '用户地域统计',
							subtext : '',
							left : 'center'
						},
						tooltip : {
							trigger : 'item'
						},
						legend : {
							orient : 'vertical',
							left : 'left',
							data : ['iphone3']
						},
						visualMap : {
							min : 0,
							max : ajaxResult.maxlength,
							left : 'left',
							top : 'bottom',
							text : ['高', '低'], // 文本，默认为数值文本
							calculable : true
						},
						toolbox : {
							show : true,
							orient : 'vertical',
							left : 'right',
							top : 'center',
							feature : {
								dataView : {
									readOnly : false
								},
								restore : {},
								saveAsImage : {}
							}
						},
						series : [{
									name : 'PV数量',
									type : 'map',
									mapType : 'china',
									roam : true,
									label : {
										normal : {
											show : true
										},
										emphasis : {
											show : true
										}
									},
									data : list
								}]
					};
					myChart.setOption(option);

				}
			}, this);

	function creattu3(ds) {
		var today = new Date();
		var startdate8 = Ext.getCmp('startdate8').getRawValue();
		var enddate8 = Ext.getCmp('enddate8').getRawValue();
		ds.load({
					params : {
						'startdate' : startdate8,
						'enddate' : enddate8
					}
				});

		Ext.Ajax.request({
			url : '/dev/statistics/diyufenxitu.jcp',
			params : {
				'startdate' : startdate8,
				'enddate' : enddate8
			},
			scope : this,
			method : 'Post',
			success : function(response, options) {
					
					var check = response.responseText;
					var ajaxResult = Ext.util.JSON.decode(check);
					var list = ajaxResult.authArray;
					
					var myChart = echarts.init(document.getElementById(chartOne));
					
					
					option = {
						title : {
							text : '用户地域统计',
							subtext : '',
							left : 'center'
						},
						tooltip : {
							trigger : 'item'
						},
						legend : {
							orient : 'vertical',
							left : 'left',
							data : ['iphone3']
						},
						visualMap : {
							min : 0,
							max : ajaxResult.maxlength,
							left : 'left',
							top : 'bottom',
							text : ['高', '低'], // 文本，默认为数值文本
							calculable : true
						},
						toolbox : {
							show : true,
							orient : 'vertical',
							left : 'right',
							top : 'center',
							feature : {
								dataView : {
									readOnly : false
								},
								restore : {},
								saveAsImage : {}
							}
						},
						series : [{
									name : 'PV数量',
									type : 'map',
									mapType : 'china',
									roam : true,
									label : {
										normal : {
											show : true
										},
										emphasis : {
											show : true
										}
									},
									data : list
								}]
					};
					myChart.setOption(option);

				}
		}, this);

	}
	return panl;
}