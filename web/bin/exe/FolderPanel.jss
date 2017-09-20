Ext.namespace("bin.exe");
using("lib.jsvm.MenuTree");
bin.exe.FolderPanel = function(panel, params) {
	this.objectId = params['parent_id']
	this.panel = panel;
	CPM.get({
		method : 'GET',
		url : '/bin/exe/getFolderNav.jcp?parent_id=' + this.objectId,
		scope : this,
		success : function(response, options) {
			var json = Ext.decode(response.responseText);
			this.menuTree = new MenuTree(Tool
					.parseXML('<root _id="root"><forder _hasChild="1" _parent="root" event="event1"><e _id="0"  title="'
							+ json.treeTitle
							+ '" url="'  
							+ json.url
							+ ' '
							+ '" icon0="'
							+ json.startIcon
							+ '" icon1="'
							+ json.endIcon + '"/></forder></root>'));

			var eve = this.clickEvent.createDelegate(this);
			this.menuTree.setEvent("event1", {
						title_click : function() {
							eve(this);
						}
			});
			var dom = this.panel.body.dom;
			this.menuTree.finish(dom, document);
			
			this.panel.nav = this;
			var treeElement = Ext.get(dom).first().first();
			treeElement.setStyle("overflow", "visible");
			treeElement.setStyle("width", "auto");
			this.focusHistoryNode();
		}
	}, true);
};

bin.exe.FolderPanel.prototype = {
	init : Ext.emptyFn,
	getTree : function() {
		return this.menuTree;
	},
	focusHistoryNode : function() {
		uStore = new UserStore(tree_store);
		if (uStore.getAttribute("Folder_" + this.applicationId)) {
			this.menuTree.loadHistory("Folder_" + this.applicationId);
			var nowNode = this.menuTree.getNowNode();
			this.exeHistoryNode(this.menuTree, nowNode);
		} else {
			var nowNode = this.menuTree.getNowNode();
			this.exeHistoryNode(this.menuTree, nowNode);
			this.menuTree.loadHistory("Folder_" + this.applicationId);
		};
	},
	exeHistoryNode : function(menuTree, nowNode) {
		if (nowNode.prop.event && nowNode.prop.eventType=='1') {
			this.clickEvent(nowNode);
		} else if (nowNode.prop._parent == 'root'&& nowNode.index() == nowNode.parent.son.length - 1) {
			return;
		} else {
			menuTree.moveNext();
			var newNode = menuTree.getNowNode();
			this.exeHistoryNode(menuTree, newNode)
		}
	},
	clickEvent : function(clickNode) {    
		if(clickNode.prop.eventType=='1'){
			var targetId=clickNode.prop._id;
			var parentPanel=this.panel.ownerCt;
			var targetPanel = Ext.getCmp(this.panel.ownerCt.hrefPanelId);
			var param={};
			param['parent_id']=targetId;
			param['isfavorite']="false";
			var target={};
			target['type']='2';
			var targets=[];
			var tartgetItem={};
			tartgetItem.id=param.parent_id;
			tartgetItem.frame='7';
			tartgetItem.order=clickNode.prop.order;
			tartgetItem.programType=clickNode.prop.programType;
			targets.push(tartgetItem);
			target['targets']=targets;
			CPM.replaceTarget(targetPanel,parentPanel, param,target);
		}else if(clickNode.prop.eventType=='2'){
			var parentPanel = this.panel.ownerCt;
			var targetPanel=Ext.getCmp(this.panel.ownerCt.hrefPanelId);
			this.frames=new Ext.ux.FrameParams();
			this.frames.set('Query',this);
			using("dev.query.QueryPanel");
			var param={};
			param['parent_id']=targetId;
			var queryPanel = new dev.query.QueryPanel(this.frames);
			targetPanel.remove(targetPanel.getComponent(0), true);
			targetPanel.add(queryPanel.MainTabPanel);
			targetPanel.setActiveTab("queryMainPanel")
			//targetPanel.doLayout();
			//CPM.replacePanel(targetPanel,queryPanel,param);   
		}else if(clickNode.prop.eventType=='3'){
			var targetId=clickNode.prop._id;
			var parentPanel=this.panel.ownerCt;
			var targetPanel = Ext.getCmp(this.panel.ownerCt.hrefPanelId);
			var param={};
			param['parent_id']=targetId;
			param['isfavorite']="true";
			var target={};
			target['type']='2';
			var targets=[];
			var tartgetItem={};
			tartgetItem.id=param.parent_id;
			tartgetItem.frame='7';
			tartgetItem.order=clickNode.prop.order;
			tartgetItem.programType=clickNode.prop.programType;
			targets.push(tartgetItem);
			target['targets']=targets;
			CPM.replaceTarget(targetPanel,parentPanel, param,target);
		}
	}
}
