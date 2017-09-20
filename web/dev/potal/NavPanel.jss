dev.potal.NavPanel = function(frames) {
	this.frames = frames;
	var strTitle = '应用集成'.loc();
	if (frames.win) {
		strTitle = '根菜单'.loc();
	} else {
		this.title = '菜单导航'.loc();
		this.tbar = ["->", {
			text : '将选中菜单移动到....',
			icon : '/themes/icon/all/book_next.gif',
			scope : this,
			handler : function(btn) {
				var node = this.menuTree.getNowNode();
				if (node.prop._id == '0') {
					Ext.msg("error", "请先点击要移动的节点");
					return false;
				}

				var tree = new dev.potal.NavPanel({
							win : true
						});
				var win = new Ext.Window({
					title : '选择菜单移动到的位置'.loc(),
					layout : 'fit',
					width : 250,
					tree : tree,
					menuTree : this.menuTree,
					node : node,
					height : 400,
					closeAction : 'close',
					plain : true,
					modal : true,
					items : [tree],
					buttons : [{
						text : '确定'.loc(),
						handler : function() {
							var win = this.ownerCt.ownerCt;
							var node = win.tree.menuTree.getNowNode();
							var p = {
								id : win.node.prop._id,
								pid : node.prop._id
							};
							Ext.Ajax.request({
										url : '/dev/potal/moveMenu.jcp',
										params : p,
										method : 'POST',
										scope : this,
										success : function(response, options) {
											var result = Ext
													.decode(response.responseText)
											if (!result.success) {
												Ext
														.msg("error",
																result.message);
											} else {
												Ext.msg("info", "移动成功");
												win.menuTree.loadRootNode();
												win.close();
											}
										}
									});

							win.close();
						}
					}, {
						text : '取消'.loc(),
						handler : function() {
							var win = this.ownerCt.ownerCt;
							win.close();
						}
					}]
				});
				win.show();
				tree.menuTree.finish(tree.body.dom, document);
			}
		}];
		this.tbar = null;
	}

	this.menuTree = new MenuTree(Tool
			.parseXML('<root _id="root"><forder _hasChild="1" event="event1"><e _id="0" _parent="root" title="'
					+ strTitle
					+ '"  program="portal"  params="isSystem=y&amp;id=0&amp;portal_id=0" url="/dev/potal/tree.jcp?id=0&amp;level=1&amp;root=&amp;view=create"/></forder></root>'));

	this.event1 = new Object();

	this.clickEvent = function(clickNode) {
		var Potals = this.frames.get("Potals");

		if (clickNode.prop.params) {
			var params = {};
			var paramString = clickNode.prop.params.split('&');
			for (var i = 0; i < paramString.length; i++) {
				params[paramString[i].split('=')[0]] = paramString[i]
						.split('=')[1];
			}
			params.parent_id = params.id;

			// Potals.mainPanel.setActiveTab("topMenuBase");
			// params.prgType = 'portal';
			Potals.MenuMianPanel.loadData(params.id);
		}

		// if (clickNode.prop.program == "top") {
		// if (clickNode.prop.params) {
		// var conn = new Ext.data.Connection();
		// conn.request({
		// method : 'GET',
		// url : '/dev/system/getUserType.jcp?',
		// params : {
		// objectId : ""
		// }
		//
		// });
		// conn.on('requestcomplete', function(conn, oResponse) {
		// var utJSON = Ext.decode(oResponse.responseText);
		// var params = {};
		// var paramString = clickNode.prop.params.split('&');
		// for (var i = 0; i < paramString.length; i++) {
		// params[paramString[i].split('=')[0]] = paramString[i]
		// .split('=')[1];
		// }
		// params.parent_id = params.id;
		//							
		//							
		// Potals.mainPanel.setActiveTab("topMenuBase");
		// Potals.topMenu.formEdit();
		// params.prgType = 'top';
		// Potals.topMenu.loadData(params);
		// }, this);
		// }
		// } else if (clickNode.prop.program == "portal") {
		// if (clickNode.prop.params) {
		// var utJSON = Ext.decode(oResponse.responseText);
		// var params = {};
		// var paramString = clickNode.prop.params.split('&');
		// for (var i = 0; i < paramString.length; i++) {
		// params[paramString[i].split('=')[0]] = paramString[i]
		// .split('=')[1];
		// }
		// params.parent_id = params.id;
		//							
		// // Potals.mainPanel.setActiveTab("topMenuBase");
		// // params.prgType = 'portal';
		// Potals.MenuMianPanel.loadData(params.id);
		// }
		// }
	}.createDelegate(this);

	if (frames.win) {
		this.clickEvent = Ext.emptyFn;
	} else {

		this.frames.set("clickEvent", this.clickEvent);
		var titleClick = this.clickEvent;
		this.event1.title_click = function() {
			titleClick(this);
		}
		this.menuTree.setEvent("event1", this.event1);
	}
	dev.potal.NavPanel.superclass.constructor.call(this, {
				region : 'west',
				split : true,
				width : 225,
				collapsible : true,
				resizable : false,
				cmargins : '3 3 3 3'
			});
};
Ext.extend(dev.potal.NavPanel, Ext.Panel, {
			init : function() {
				this.menuTree.finish(this.body.dom, document);
				this.focusHistoryNode();
			},
			getTree : function() {
				return this.menuTree;
			},
			exeHistoryNode : function(menuTree, nowNode) {
				if (nowNode.prop.event && nowNode.prop.params) {
					this.clickEvent(nowNode);
				} else if (nowNode.prop._parent == '0'
						&& nowNode.index() == nowNode.parent.son.length - 1) {
					return;
				} else {
					menuTree.moveNext();
					var newNode = menuTree.getNowNode();
					this.exeHistoryNode(menuTree, newNode)
				}
			},
			focusHistoryNode : function() {
				uStore = new UserStore(tree_store);
				if (uStore.getAttribute("Potals")) {
					this.menuTree.loadHistory("Potals");
					var nowNode = this.menuTree.getNowNode();
				} else {
					var nowNode = this.menuTree.getNowNode();
					this.menuTree.loadHistory("Potals");
				};
				this.exeHistoryNode(this.menuTree, nowNode);
			}
		});
