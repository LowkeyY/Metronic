Ext.namespace("etc.liveUpdate");

etc.liveUpdate.NavPanel = function(frames){
	this.frames=frames;
	this.menuTree = new MenuTree(Tool.parseXML('<root _id="root"><forder _hasChild="1" event="event0"><e _id="top" operationType="0" _parent="root" title="'+'系统架构体系'.loc()+'"  params="top"   icon0="/themes/icon/xp/axx.gif" icon1="/themes/icon/xp/axx.gif"/><e _id="100" operationType="1" _parent="top" _hasChild="0" title="'+'系统注册'.loc()+'"  icon1="/themes/icon/xp/comp.gif" icon0="/themes/icon/xp/comp.gif" /><e _id="101" operationType="2"  _parent="top" _hasChild="0" title="'+'平台更新'.loc()+'"   icon1="/themes/icon/xp/dhd.gif" icon0="/themes/icon/xp/dhd.gif"/><e _id="102" operationType="3"  _parent="top" _hasChild="0" title="'+'应用查询'.loc()+'" icon1="/themes/icon/xp/script.gif" icon0="/themes/icon/xp/script.gif"/><e _id="104" operationType="4" _parent="top" _hasChild="0" title="'+'应用更新查询'.loc()+'" icon1="/themes/icon/xp/script.gif" icon0="/themes/icon/xp/script.gif"/><e _id="103" _hasChild="0"  operationType="5" _parent="top" title="'+'Bug反馈'.loc()+'" icon1="/themes/icon/xp/operation.gif" icon0="/themes/icon/xp/operation.gif"/></forder></root>'));


	this.event0 = new Object();
	this.clickEvent=function(clickNode){
		var Update=this.frames.get("update");
		  if(clickNode.prop.operationType=="1"){
			if(!Update.mainPanel.havePanel("RegisterBase")){
				using("etc.liveUpdate.RegisterPanel");
				Update.basePanel = new etc.liveUpdate.RegisterPanel(this.frames,'liveUpdate');
				Update.mainPanel.add(Update.basePanel.MainTabPanel);
			}
			Update.mainPanel.setActiveTab("RegisterBase"); 
			//Update.basePanel.formEdit();
			//Update.basePanel.loadData(params);
		}else if(clickNode.prop.operationType=="2"){
			if(!Update.mainPanel.havePanel("liveUpdateBase")){
				using("etc.liveUpdate.PlatformPanel");
				Update.liveUpdatePanel = new etc.liveUpdate.PlatformPanel(this.frames);
				Update.mainPanel.add(Update.liveUpdatePanel.MainTabPanel);
			}
			Update.mainPanel.setActiveTab("liveUpdateBase");
		}else if(clickNode.prop.operationType=="3"){
			if(clickNode.prop.params){
				var params={};
				var paramString=clickNode.prop.params.split('&');
				for(var i=0;i<paramString.length;i++){
					params[paramString[i].split('=')[0]]=paramString[i].split('=')[1];
				}	
				if(!Update.mainPanel.havePanel("systemRole")){
					using("dev.Update.RolePanel");
					Update.rolePanel = new dev.Update.RolePanel(this.frames,params);	 
					Update.mainPanel.add(Update.rolePanel.MainTabPanel);
				}
				Update.mainPanel.setActiveTab("systemRole");
				params['type']='new';
				Update.rolePanel.formCreate(params);
				Update.rolePanel.systemRoleForm.form.reset();
			}
		}else if(clickNode.prop.operationType=="4"){
			if(clickNode.prop.params){
				var params={};
				var paramString=clickNode.prop.params.split('&');
				for(var i=0;i<paramString.length;i++){
					params[paramString[i].split('=')[0]]=paramString[i].split('=')[1];
				}	
				if(!Update.mainPanel.havePanel("systemRole")){
					using("dev.Update.RolePanel");
					Update.rolePanel = new dev.Update.RolePanel(this.frames,params);	 
					Update.mainPanel.add(Update.rolePanel.MainTabPanel);
				}
				Update.mainPanel.setActiveTab("systemRole");
				Update.rolePanel.formEdit();
				Update.rolePanel.loadData(params);
			}
		}else if(clickNode.prop.operationType=="5"){
			if(clickNode.prop.params){
				var params={};
				var paramString=clickNode.prop.params.split('&');
				for(var i=0;i<paramString.length;i++){
					params[paramString[i].split('=')[0]]=paramString[i].split('=')[1];
				}	
				if(!Update.mainPanel.havePanel("systemRole")){
					using("dev.Update.RolePanel");
					Update.rolePanel = new dev.Update.RolePanel(this.frames,params);	 
					Update.mainPanel.add(Update.rolePanel.MainTabPanel);
				}
				Update.mainPanel.setActiveTab("systemRole");
				Update.rolePanel.formEdit();
				Update.rolePanel.loadData(params);
			}
		}
	}.createDelegate(this);
	this.frames.set("clickEvent",this.clickEvent);
	var titleClick=this.clickEvent;
	this.event0.title_click = function(){
		titleClick(this);
	}
	this.menuTree.setEvent("event0",this.event0);
   
	etc.liveUpdate.NavPanel.superclass.constructor.call(this,{
			id:'updateNavigator',
            title: '注册与更新'.loc(),
            region: 'west',
            split: true,
            width: 240,
            collapsible: true,
            cmargins:'3 3 3 3'
    });
};
Ext.extend(etc.liveUpdate.NavPanel, Ext.Panel, {
	init : function(){
		this.menuTree.finish(this.body.dom,document);
		this.focusHistoryNode();
	},
	getTree : function(){
		return this.menuTree;
	},
	exeHistoryNode : function(menuTree,nowNode){
		if(nowNode.prop.event&&nowNode.prop.params){
				this.clickEvent(nowNode);
		}else if(nowNode.prop._parent=='0'&&nowNode.index()==nowNode.parent.son.length -1){
			return;
		}else{
			menuTree.moveNext();
			var newNode=menuTree.getNowNode();
			if(nowNode.prop._id==newNode.prop._id){
				return;
			}else{
				this.exeHistoryNode(menuTree,newNode)
			}
		}
	},
	focusHistoryNode: function (){
		uStore=new UserStore(tree_store);
		if(uStore.getAttribute("update")){
			this.menuTree.loadHistory("update");
			var nowNode=this.menuTree.getNowNode();
			this.exeHistoryNode(this.menuTree,nowNode);
		}else{
			var nowNode=this.menuTree.getNowNode();	
			this.exeHistoryNode(this.menuTree,nowNode);
			this.menuTree.loadHistory("update");
		};
	}
});

