dev.search.SearchNavPanel = function() {

	var str = '搜索引擎导航'.loc();
	this.menuTree = new MenuTree(Tool
			.parseXML('<root _id="root"><forder _hasChild="1" ><e _id="0" _parent="root" title="'
					+ str
					+ '" url="/dev/system/tree.jcp?rootNode=0&amp;_id=0&amp;type=36"   icon0="/themes/icon/all/magnifier_zoom_in.gif" icon1="/themes/icon/all/magnifier_zoom_in.gif"/></forder></root>'));

	this.event0 = new Object();

	this.clickEvent = function(clickNode) {
		var Search = this.frames.get('Search');
		var prop = clickNode.prop.params;
		var params = {};
		var paramString = prop.split('&');
		for (var i = 0; i < paramString.length; i++) {
			params[paramString[i].split('=')[0]] = paramString[i].split('=')[1];
		}

		if (clickNode.prop.objectType == '1') {
			if (!Search.mainPanel.havePanel("searchBasePanel")) {
				using("dev.search.SearchBasePanel");
				Search.SearchBasePanel = new dev.search.SearchBasePanel(
						this.frames, params);
				Search.mainPanel.add(Search.SearchBasePanel.MainTabPanel);
			}
			Search.mainPanel.setActiveTab("searchBasePanel");
		} else if (clickNode.prop.objectType == '35') {
			if (!Search.mainPanel.havePanel("searchPanel")) {
				using("dev.search.SearchPanel");
				Search.SearchPanel = new dev.search.SearchPanel(this.frames,
						params);
				Search.mainPanel.add(Search.SearchPanel.MainTabPanel);
			}
			Search.mainPanel.setActiveTab("searchPanel");
		} else if (clickNode.prop.objectType == '36') {
			if (!Search.mainPanel.havePanel("searchBasePanel")) {
				using("dev.search.SearchBasePanel");
				Search.SearchBasePanel = new dev.search.SearchBasePanel(
						this.frames, params);
				Search.mainPanel.add(Search.SearchBasePanel.MainTabPanel);
			}
			Search.mainPanel.setActiveTab("searchBasePanel");
		} else if (clickNode.prop.objectType == '7') {
			if (!Search.mainPanel.havePanel("SearchProgramPanel")) {
				using("dev.program.ProgramPanel");
				using("dev.program.ProgramGrid");
				Search.programPanel = this.frames
						.createPanel(new dev.program.ProgramPanel('Search',
								Search));
				Search.mainPanel.add(Search.programPanel.MainTabPanel);
			}
			Search.mainPanel.setActiveTab("SearchProgramPanel");
		}

		if (clickNode.prop.objectType == '1') {
			Search.SearchBasePanel.init(params);
		} else if (clickNode.prop.objectType == '36') {
			Search.SearchBasePanel.loadData(params);
			Search.SearchBasePanel.formEdit();
		} else if (clickNode.prop.objectType == '35') {
			Search.SearchPanel.loadData(params);
			Search.SearchPanel.formEdit();
		} else if (clickNode.prop.objectType == '7') {
			params.returnFunction = function(main) {
				main.setActiveTab('SearchProgramPanel');
			}.createCallback(Search.mainPanel)
			Search.programPanel.loadData(params, Search.mainPanel);
		}
	}.createDelegate(this);

	var titleClick = this.clickEvent;
	this.event0.title_click = function() {
		titleClick(this);
	}
	this.menuTree.setEvent("event0", this.event0);

	dev.search.SearchNavPanel.superclass.constructor.call(this, {
				id : 'SearchNavigator',
				title : '搜索引擎'.loc(),
				region : 'west',
				split : true,
				width : 260,
				collapsible : true,
				cmargins : '3 3 3 3'
			});
};
Ext.extend(dev.search.SearchNavPanel, Ext.Panel, {
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
				} else if (nowNode.prop.objectType == '0'
						&& nowNode.index() == nowNode.parent.son.length - 1
						&& nowNode.parent.son.length != 1) {
					return;
				} else {
					menuTree.moveNext();
					var newNode = menuTree.getNowNode();
					if (nowNode.prop._id == newNode.prop._id) {
						return;
					} else {
						this.exeHistoryNode(menuTree, newNode)
					}
				}
			},
			focusHistoryNode : function() {
				var uStore = new UserStore(tree_store);
				if (uStore.getAttribute("Search")) {
					this.menuTree.loadHistory("Search");
					var nowNode = this.menuTree.getNowNode();
				} else {
					var nowNode = this.menuTree.getNowNode();
					this.menuTree.loadHistory("Search");
				};
				this.exeHistoryNode(this.menuTree, nowNode);
			}
		});
