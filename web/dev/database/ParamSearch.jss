Ext.namespace("dev.database");
using("lib.jsvm.MenuTree");
using("dev.database.MetaTableNavPanel");
dev.database.ParamSearch = function(result, navPanel) {
	var nav = navPanel;
	var tree = nav.menuTree;
	this.store = new Ext.data.JsonStore({
				fields : ["lname", "pname", "object_id", "path"],
				data : result,
				scope : this,
				autoLoad : true,
				root : 'data'
			});
	var cm = new Ext.grid.ColumnModel([new Ext.grid.RowNumberer(), {
				header : '逻辑名称'.loc(),
				width : 180,
				sortable : true,
				align : 'center',
				defaultSortable : true,
				dataIndex : 'lname'
			}, {

				header : '物理名称'.loc(),
				width : 120,
				sortable : true,
				align : 'center',
				dataIndex : 'pname'
			}, {
				header : "ID",
				width : 120,
				sortable : true,
				align : 'center',
				dataIndex : 'object_id'
			}]);
	this.grid = new Ext.grid.GridPanel({
				store : this.store,
				cm : cm,
				stripeRows : true,
				scope : this,
				viewConfig : {
					forceFit : true
				},
				sm : new Ext.grid.RowSelectionModel({
							singleSelect : true
						})
			});
	var grid = this.grid;
	this.grid.on('rowclick', function(grid, rowIndex, e) {
				var path = grid.getSelectionModel().getSelected().get("path");
				tree.loadPath(path);
				var nowNode = tree.getNowNode();
				this.exeHistoryNode(tree, nowNode);
				this.clickEvent(nowNode);
				Ext.getCmp("regWindow").close();
			}, nav);

	var desktop = WorkBench.Desk.getDesktop();
	var winWidth = desktop.getViewWidth() * 0.6;
	var winHeight = desktop.getViewHeight() * 0.6;
	this.win = new Ext.Window({
				id : 'regWindow',
				title : '数据列表'.loc(),
				modal : false,
				layout : 'fit',
				width : winWidth,
				height : winHeight,
				buttons : [{
							text : '关闭'.loc(),
							handler : function() {
								this.win.close();
							}.createDelegate(this)
						}],
				items : this.grid
			});
};
Ext.extend(dev.database.ParamSearch, Ext.Window, {
			show : function() {
				this.win.show();
			},
			windowCancel : function() {
				this.win.close();
			}
		});