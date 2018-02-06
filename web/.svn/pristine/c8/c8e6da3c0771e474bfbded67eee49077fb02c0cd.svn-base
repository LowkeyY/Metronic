Ext.namespace("dev.statistics");
dev.statistics.xitongfangwen = function(tabWidth) {

	var today = new Date();

	stasticDS = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : "/bin/log/getstastic.jcp",
							method : 'GET'
						}),
				autoLoad : false,
				reader : new Ext.data.JsonReader({
							root : 'dataItem',
							totalProperty : 'totalCount',
							id : '日期'
						}, [{
									name : '日期',
									mapping : '日期'
								}, {
									name : '当日访问人数',
									type : 'int'
								}, {
									name : '当日访问人次',
									type : 'int'
								}, {
									name : '当日使用时间(分钟)',
									type : 'int'
								}, {
									name : '单次停留(分钟)',
									type : 'int'
								}]),
				remoteSort : true
			});
	stasticDS.setDefaultSort('日期', 'desc');

	stasticDS.baseParams = {
		"first" : today.add(Date.DAY, -7).format('Y/m/d'),
		"second" : today.format('Y/m/d')
	};
	stasticDS.load({
				params : {}
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
							id : 'startdate9',
							fieldLabel : '开始日期',
							name : 'startdate9',
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
							id : 'enddate9',
							name : 'enddate9',
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
										creattu3(stasticDS)
									}
								})]
			});

	var height = (Ext.getBody().getHeight() - 83) * .55, chartOne = Ext.id(), chartTwo = Ext
			.id(), colWidth = tabWidth / stasticDS.fields.length, panl = new Ext.Panel(
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
						id : chartOne,
						width : tabWidth-40,
						style:'padding-left:20px;',
						xtype : 'box', // 或者xtype: 'component',
						autoEl : {
							tag : 'img', // 指定为img标签
							src : '/bin/log/pic.jcp?firtim='
									+ today.add(Date.DAY, -7).format('Y/m/d')
									+ '&sectim=' + today.format('Y/m/d')
									+ '&curve=1&view=1&height=' + height
									+ '&width=' + (tabWidth-40) + '&ran='
									+ Math.random() // 指定url路径
						}
					}]
				}, {

					region : 'center',
					xtype : 'grid',
					store : stasticDS,
					columnLines : true,
					closable : false,
					border : true,
					viewConfig : {
						forceFit : true
					},
					frame : false,
					columns : [{
								header : "日期",
								width : colWidth,
								dataIndex : "日期",
								sortable : false
							}, {
								width : colWidth,
								header : '当日访问人数'.loc(),
								dataIndex : '当日访问人数',
								sortable : true,
								align : 'right'
							}, {
								width : colWidth,
								header : '当日访问人次'.loc(),
								dataIndex : '当日访问人次',
								sortable : true,
								align : 'right'
							}, {
								width : colWidth,
								header : '当日使用时间'.loc() + '(' + '分钟'.loc()
										+ ')',
								dataIndex : '当日使用时间(分钟)',
								sortable : true,
								align : 'right'
							}, {
								width : colWidth,
								header : '单次停留'.loc() + '(' + '分钟'.loc() + ')',
								dataIndex : '单次停留(分钟)',
								sortable : true,
								align : 'right'
							}]
				}]
			})

	function creattu3(ds) {

		var today = new Date();
		var startdate9 = Ext.getCmp('startdate9').getRawValue();
		var enddate9 = Ext.getCmp('enddate9').getRawValue();

		Ext.getCmp(chartOne).getEl().dom.src = '/bin/log/pic.jcp?firtim='
				+ startdate9 + '&sectim=' + enddate9
				+ '&curve=1&view=1&height=' + height + '&width=' + (tabWidth-40)
				+ '&ran=' + Math.random();
		ds.baseParams = {
			"first" : startdate9,
			"second" : enddate9
		};
		ds.load({
					params : {}
				});

	}
	return panl;
}
