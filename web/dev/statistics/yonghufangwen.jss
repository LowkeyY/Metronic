Ext.namespace("dev.statistics");
dev.statistics.yonghufangwen = function(tabWidth) {

	var today = new Date();

	stasticDS = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : "/bin/log/userstat.jcp",
							method : 'GET'
						}),
				autoLoad : false,
				reader : new Ext.data.JsonReader({
							root : 'dataItem',
							totalProperty : 'totalCount',
							id : '姓名'
						}, [{
									name : '姓名',
									mapping : '姓名'
								}, {
									name : '访问次数',
									type : 'int'
								}, {
									name : '使用时间(分钟)',
									type : 'int'
								}, {
									name : '最后访问时间'
								}]),
				remoteSort : true
			});
	stasticDS.setDefaultSort('姓名', 'desc');

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
							id : 'startdate100',
							fieldLabel : '开始日期',
							name : 'startdate100',
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
							id : 'enddate100',
							name : 'enddate100',
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
						width : tabWidth - 40,
						style : 'padding-left:20px;',
						xtype : 'box', // 或者xtype: 'component',
						autoEl : {
							tag : 'img', // 指定为img标签
							src : '/bin/log/pic.jcp?firtim='
									+ today.add(Date.DAY, -7).format('Y/m/d')
									+ '&sectim=' + today.format('Y/m/d')
									+ '&curve=2&view=2&height=' + height
									+ '&width=' + (tabWidth - 40) + '&ran='
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
								header : "姓名",
								width : colWidth,
								dataIndex : "姓名",
								sortable : false
							}, {
								width : colWidth,
								header : '访问次数'.loc(),
								dataIndex : '访问次数',
								sortable : true,
								align : 'right'
							}, {
								width : colWidth,
								header : '使用时间'.loc() + '(' + '分钟'.loc() + ')',
								dataIndex : '使用时间(分钟)',
								sortable : true,
								align : 'right'
							}, {
								width : colWidth,
								header : '最后访问时间'.loc(),
								dataIndex : '最后访问时间',
								sortable : true,
								align : 'right'
							}]
				}]
			})

	function creattu3(ds) {

		var today = new Date();
		var startdate100 = Ext.getCmp('startdate100').getRawValue();
		var enddate100 = Ext.getCmp('enddate100').getRawValue();

		Ext.getCmp(chartOne).getEl().dom.src = '/bin/log/pic.jcp?firtim='
				+ startdate100 + '&sectim=' + enddate100
				+ '&curve=2&view=2&height=' + height + '&width='
				+ (tabWidth - 40) + '&ran=' + Math.random();
		ds.baseParams = {
			"first" : startdate100,
			"second" : enddate100
		};
		ds.load({
					params : {}
				});

	}
	return panl;
}