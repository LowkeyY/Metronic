Ext.namespace("dev.statistics");

loadcss("lib.GroupTabPanel.GroupTab");
using("lib.GroupTabPanel.GroupTabPanel");
using("lib.GroupTabPanel.GroupTab");

dev.statistics.MainPanel = Ext.extend(WorkBench.baseNode, {
	main : function(launcher) {
		var initHeight = Ext.getBody().getHeight();
		var panel = new Ext.Panel({
			// title : '统计分析',
			layout : 'fit',
			modal : true,
			// resizable : true,
			closeAction : 'hide',
			// plain : true,
			minimizable : true,
			maximizable : true,
			// floating : true,
			autoShow : true,
			// bodyStyle:"padding:10 10 0px;",
			// modal : false,
			width : '100%',
			height : '100%',
			// buttons : [{
			// text : '关闭',
			// handler : function() {
			// win.close();
			// }
			// }],

			items : [{
				xtype : 'grouptabpanel',
				tabWidth : 200,
				winHeight : initHeight,
				// bodyStyle:"padding:10 10 0px",
				// layout:'fit',
				// columnWidth:.5,
				// y:10,
				// tabHeight:50,
				activeGroup : 0,
				mainItem : 3,
				draggable : true,
				fit : false,
				border : false,
				autoScroll : false,
				listeners : {
					scope : this,
					// width:500,
					beforegroupchange : function(tab, newtab, oldtab) {
						newtab = newtab.items.get(0);
						if (newtab.loaded == false) {
							var panel, tabWidth = Math.max(
									tab.getWidth() - 210, 800);
							if (newtab.astep == 0) {
								using("dev.statistics.quanzhandianjiliang");
								panel = new dev.statistics.quanzhandianjiliang(tabWidth);
							} else if (newtab.astep == 1) {
								using("dev.statistics.shiduanfenbu");
								panel = new dev.statistics.shiduanfenbu(tabWidth);
							} else if (newtab.astep == 2) {
								using("dev.statistics.caozuoxitong");
								panel = new dev.statistics.caozuoxitong(tabWidth);
							} else if (newtab.astep == 3) {
								using("dev.statistics.liulanqitongji");
								panel = new dev.statistics.liulanqitongji(tabWidth);
							} else if (newtab.astep == 4) {
								using("dev.statistics.yuyantongji");
								panel = new dev.statistics.yuyantongji(tabWidth);
							} else if (newtab.astep == 5) {
								using("dev.statistics.fenbianlvtongji");
								panel = new dev.statistics.fenbianlvtongji(tabWidth);
							} else if (newtab.astep == 6) {
								using("dev.statistics.flashtongji");
								panel = new dev.statistics.flashtongji(tabWidth);
							} else if (newtab.astep == 7) {
								using("dev.statistics.kehuduanfenxi");
								panel = new dev.statistics.kehuduanfenxi(tabWidth);
							} else if (newtab.astep == 8) {
								using("dev.statistics.diyufenxi");
								panel = new dev.statistics.diyufenxi(tabWidth);
							} else if (newtab.astep == 9) {
								using("dev.statistics.xitongfangwen");
								panel = new dev.statistics.xitongfangwen(tabWidth);
							} else if (newtab.astep == 10) {
								using("dev.statistics.yonghufangwen");
								panel = new dev.statistics.yonghufangwen(tabWidth);
							}
							newtab.add(panel);
							newtab.doLayout();
							newtab.loaded = true;
						}
					}
				},
				items : [{ // xtype:'panel',
					// bodyStyle:"padding:10 10 0px;",
					// width:300,
					iconCls : 'x-icon-tickets-1',
					items : {
						title : '全站访问量',
						layout : 'fit',
						astep : 0,
						loaded : false,
						tabTip : '全站访问量',
						autoScroll : false

					}
				}, {	// xtype:'panel',
							// bodyStyle:"padding:10 10 0px;",
							// width:300,
							iconCls : 'x-icon-tickets-2',
							items : {
								title : '时段分布统计',
								layout : 'fit',
								astep : 1,
								loaded : false,
								iconCls : 'x-icon-tickets',
								tabTip : '时段分布统计',
								autoScroll : false

							}
						}, { // xtype:'panel',
							// bodyStyle:"padding:10 10 0px;",
							// width:300,
							iconCls : 'x-icon-tickets-3',
							items : {
								title : '操作系统比例',
								layout : 'fit',
								astep : 2,
								loaded : false,
								iconCls : 'x-icon-configuration',
								tabTip : '操作系统比例',
								autoScroll : false

							}
						}, { // xtype:'panel',
							// bodyStyle:"padding:10 10 0px;",
							// width:300,
							iconCls : 'x-icon-tickets-4',
							items : {
								title : '浏览器统计',
								layout : 'fit',
								astep : 3,
								loaded : false,
								iconCls : 'x-icon-configuration',
								tabTip : '浏览器统计',
								autoScroll : false

							}
						}, { // xtype:'panel',
							// bodyStyle:"padding:10 10 0px;",
							// width:300,
							iconCls : 'x-icon-tickets-5',
							items : {
								title : '语言统计',
								layout : 'fit',
								astep : 4,
								loaded : false,
								iconCls : 'x-icon-configuration',
								tabTip : '语言统计',
								autoScroll : false

							}
						}, { // xtype:'panel',
							// bodyStyle:"padding:10 10 0px;",
							// width:300,
							iconCls : 'x-icon-tickets-6',
							items : {
								title : '分辨率统计',
								layout : 'fit',
								astep : 5,
								loaded : false,
								iconCls : 'x-icon-configuration',
								tabTip : '分辨率统计',
								autoScroll : false

							}
						}, { // xtype:'panel',
							// bodyStyle:"padding:10 10 0px;",
							// width:300,
							iconCls : 'x-icon-tickets-7',
							items : {
								title : 'Flash版本统计',
								layout : 'fit',
								astep : 6,
								loaded : false,
								iconCls : 'x-icon-configuration',
								tabTip : 'Flash版本统计',
								autoScroll : false

							}
						}, { // xtype:'panel',
							// bodyStyle:"padding:10 10 0px;",
							// width:300,
							iconCls : 'x-icon-tickets-8',
							items : {
								title : '移动客户端分析',
								layout : 'fit',
								astep : 7,
								loaded : false,
								iconCls : 'x-icon-configuration',
								tabTip : '移动客户端分析',
								autoScroll : false

							}
						}, { // xtype:'panel',
							// bodyStyle:"padding:10 10 0px;",
							// width:300,
							iconCls : 'x-icon-tickets-9',
							items : {
								title : '用户地域统计',
								layout : 'fit',
								astep : 8,
								loaded : false,
								iconCls : 'x-icon-configuration',
								tabTip : '用户地域统计',
								autoScroll : false

							}
						}, { // xtype:'panel',
							// bodyStyle:"padding:10 10 0px;",
							// width:300,
							iconCls : 'x-icon-tickets-10',
							items : {
								title : '系统访问统计',
								layout : 'fit',
								astep : 9,
								loaded : false,
								iconCls : 'x-icon-configuration',
								tabTip : '系统访问统计',
								autoScroll : false

							}
						}, { // xtype:'panel',
							// bodyStyle:"padding:10 10 0px;",
							// width:300,
							iconCls : 'x-icon-tickets-11',
							items : {
								title : '系统用户访问统计',
								layout : 'fit',
								astep : 10,
								loaded : false,
								iconCls : 'x-icon-configuration',
								tabTip : '系统用户访问统计',
								autoScroll : false

							}
						}]
			}]
		});

		return panel;
	}
});