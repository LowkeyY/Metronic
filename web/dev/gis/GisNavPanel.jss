Ext.namespace("dev.gis");
dev.gis.GisNavPanel = function(frames){
	var str='地图导航'.loc();
	this.frames=frames;
	this.menuTree = new MenuTree(Tool.parseXML('<root _id="root"><forder _hasChild="1"><e _id="0" _parent="root" title="'+str+'" url="/dev/system/tree.jcp?rootNode=0&amp;_id=0&amp;type=11"  icon0="/themes/icon/xp/axx.gif" icon1="/themes/icon/xp/axx.gif"/></forder></root>'));
	this.event0 = new Object();
	
	var NavParams={};
	var nowNodeTitle="";            
	var navPanel=this;

	var nodType;

	this.GisButtonArray=[];
	this.GisButtonArray.push(new Ext.Toolbar.Button({
				text: '新建'.loc(),
				icon: '/themes/icon/xp/newfile.gif',
				cls: 'x-btn-text-icon  bmenu',
				btnId:'new',
				disabled:false,
				scope: this,
				hidden : false,
				tooltip:'新建图层组'.loc()+'/'+'菜单'.loc(),
				handler :onAdd
	}));
	this.GisButtonArray.push(new Ext.Toolbar.Button({
				text: '修改'.loc(),
				icon: '/themes/icon/common/update.gif',
				cls: 'x-btn-text-icon  bmenu',
				btnId:'update',
				disabled:false,
				scope: this,
				hidden : false,
				tooltip:'修改图层组'.loc()+'/'+'菜单'.loc(),
				handler :onEdit
	}));
	this.GisButtonArray.push(new Ext.Toolbar.Button({
				text: '删除'.loc(),
				icon: '/themes/icon/common/delete.gif',
				cls: 'x-btn-text-icon  bmenu',
				btnId:'deleteCategory',
				disabled:false,
				scope: this,
				hidden : false,
				tooltip:'删除图层组'.loc()+'/'+'菜单'.loc(),
				handler :onDelete
	}));

	this.clickEvent=function(clickNode){
		var params={};
		var paramString=clickNode.prop.params.split('&');
		for(var i=0;i<paramString.length;i++){
			params[paramString[i].split('=')[0]]=paramString[i].split('=')[1];
		}	 
		nowNodeTitle=clickNode.prop.title;
		var Gis=this.frames.get('Gis'); 
		nodType=clickNode.prop.objectType;
		if(clickNode.prop.objectType=="1"||clickNode.prop.objectType=="11"){
			if(!Gis.mainPanel.havePanel("GisPanel")){
				using("dev.gis.GisPanel");
				Gis.gisPanel =new dev.gis.GisPanel(this.frames);
				Gis.mainPanel.add(Gis.gisPanel.MainTabPanel);
			}
			Gis.mainPanel.setActiveTab("GisPanel");
		}else if(clickNode.prop.objectType=="12"||clickNode.prop.objectType=="13"){
			if(!Gis.mainPanel.havePanel("MapLayerPanel")){
				using("dev.gis.MapLayerPanel");	
				Gis.mapLayerPanel = new dev.gis.MapLayerPanel(this.frames,params);
				Gis.mainPanel.add(Gis.mapLayerPanel.MainTabPanel);
			}
			Gis.mainPanel.setActiveTab("MapLayerPanel");
		}else if(clickNode.prop.objectType=="14"){	
			if(!Gis.mainPanel.havePanel("MapPOIPanel")){
				using("dev.gis.MapPOIPanel");
				Gis.mapPOIPanel =new dev.gis.MapPOIPanel(this.frames,params,"Query");
				Gis.mainPanel.add(Gis.mapPOIPanel.MainTabPanel);
			}
			Gis.mainPanel.setActiveTab("MapPOIPanel");
		}else if(clickNode.prop.objectType=="15"){	
			using("lib.ComboRemote.ComboRemote");
			using("lib.ComboTree.ComboTree");
			using("dev.program.ProgramPanel");
			using("dev.program.ProgramGrid");
			Ext.Ajax.request({
					url : '/dev/module/SelectTerminalType.jcp',
					params : {
						id:clickNode.prop._id
					},
					method : 'GET',
					scope : this,
					success : function(response, options) {
						var result = Ext.decode(response.responseText);
						if (result.success) {
							var terminalType = result.terminalType;
							var programType='Gis';
							Gis.programPanel=this.frames.createPanel(new dev.program.ProgramPanel(programType,Gis));
							Gis.mainPanel.add(Gis.programPanel.MainTabPanel);
							Gis.mainPanel.setActiveTab(Gis.programPanel.MainTabPanel);
							var newParams={};
							newParams['terminalType']=terminalType;
							newParams['grand_parent']=clickNode.prop._parent;
							newParams['parent_id']=clickNode.prop._id;
							newParams['objectId']=clickNode.prop._id;
							Gis.programPanel.init(newParams,Gis.mainPanel);
						}else{
							Ext.msg("error", result.message);
						}
					}
			},this);
		}else if (clickNode.prop.objectType=='7'){
			if(!Gis.mainPanel.havePanel("GisProgramPanel")){
				using("lib.ComboRemote.ComboRemote");
				using("lib.ComboTree.ComboTree");
				using("dev.program.ProgramPanel");
				using("dev.program.ProgramGrid");
				Gis.programPanel =this.frames.createPanel(new dev.program.ProgramPanel('Gis',Gis)); 
				Gis.mainPanel.add(Gis.programPanel.MainTabPanel);
			}
			Gis.mainPanel.setActiveTab("GisProgramPanel");
		}else if(clickNode.prop.objectType=="19"){	
			if(!Gis.mainPanel.havePanel("MapPOIPanel")){
				using("dev.gis.MapPOIPanel");
				Gis.mapPOIPanel =new dev.gis.MapPOIPanel(this.frames,params,"Edit");
				Gis.mainPanel.add(Gis.mapPOIPanel.MainTabPanel);
			}
			Gis.mainPanel.setActiveTab("MapPOIPanel");  
		}
		if(clickNode.prop.objectType=="1"){
			if(clickNode.prop.params){
				Gis.gisPanel.init(params);
			}
		}else if(clickNode.prop.objectType=="11"){
			if(clickNode.prop.params){
				Gis.gisPanel.loadData(params);
			}
			this.hideToolBar();
			this.showToolBar('new');	
		}else if(clickNode.prop.objectType=="12"){
			Gis.mapLayerPanel.init(params);
			Gis.mapLayerPanel.formCreate();
			this.hideToolBar();
			this.showToolBar('update');
			this.showToolBar('deleteCategory');
		}else if(clickNode.prop.objectType=="13"){
			this.hideToolBar();
			this.showToolBar('new');
			Gis.mapLayerPanel.formEdit();
			Gis.mapLayerPanel.loadData(params);
		}else if(clickNode.prop.objectType=="14"){
			this.hideToolBar();
			this.showToolBar('new');
			Gis.mapPOIPanel.formEdit();
			Gis.mapPOIPanel.loadData(params);
		}else if(clickNode.prop.objectType=="15"){
			this.hideToolBar();
			this.showToolBar('update');
			this.showToolBar('deleteCategory');
		}else if (clickNode.prop.objectType=='7'){
			this.hideToolBar();
			params.returnFunction=(function(main){
				main.setActiveTab('GisProgramPanel');
			}).createCallback(Gis.mainPanel);
			Ext.Ajax.request({
				url : '/dev/module/SelectTerminalType.jcp',
				params : {
					id:params.objectId
				},
				method : 'GET',
				scope : this,
				success : function(response, options) {
					var result = Ext.decode(response.responseText);
					if (result.success) {
						var terminalType = result.terminalType;
						params.terminalType=terminalType;
						Gis.programPanel.loadData(params,Gis.mainPanel); 
					}else{
						Ext.msg("error", result.message);
					}
				}
			});	
			
		}else if(clickNode.prop.objectType=="19"){
			this.hideToolBar();
			Gis.mapPOIPanel.formEdit();
			Gis.mapPOIPanel.loadData(params);
		}			
		NavParams=params; 
	}.createDelegate(this);

	var titleClick=this.clickEvent;

	this.event0.title_click = function(){
		titleClick(this);
	}
	this.menuTree.setEvent("event0",this.event0);	

	dev.gis.GisNavPanel.superclass.constructor.call(this, {
			id:'GisNavigator',
            title: '地图管理'.loc(),
            region: 'west',
            split: true,
            width: 250,
            collapsible: true,
            cmargins:'3 3 3 3',
			tbar:this.GisButtonArray
    });

	function saveIt(btn,text){
		if(btn=='ok'){
			var saveParams=NavParams;
			saveParams['type']='save';
			saveParams['group_name']=text;
			if(text.length>50){
				Ext.msg("error",'数据修改失败!,原因:字符数大于50'.loc());
				return;
			}else if(text==null||text.length==0){
				Ext.msg("error",'数据保存失败!,原因:新建图层分组不能为空'.loc());
				return;
			}else if(/[\<\>\'\"\&]/.test(text)){
				Ext.msg("error",'不应有'.loc()+'&,<,>,\",'+'字符'.loc());
				return;
			}
			Ext.Ajax.request({
				url: '/dev/gis/createMapGroup.jcp',
				method:'POST',
				params: saveParams,
				success:function(response, options){ 
						var check = response.responseText;
						var ajaxResult=Ext.util.JSON.decode(check);
						if(ajaxResult.success){
							this.getTree().loadSubNode(ajaxResult.id,this.clickEvent);
						}else{
							    Ext.msg("error",'数据保存失败!,原因:'.loc()+'<br>'+ajaxResult.message);
						}
				},
				scope: this
			});
		}
    };
    function onAdd() {
		var msgTitle='图层分组'.loc();
		var msgMsg='新建图层分组'.loc();
		if(nodType=='14'||nodType=='13'){
			msgTitle='查询菜单'.loc();
			msgMsg='新建查询菜单'.loc();
		}
		Ext.MessageBox.show({
			   title: msgTitle,
			   msg: msgMsg,
			   width:300,
			   buttons: Ext.MessageBox.OKCANCEL,
			   prompt : true,
			   scope: this,
			   fn: saveIt
		});
    };
	function updateIt(btn,text){
		if(btn=='ok'){
			var saveParams=NavParams;
			saveParams['type']='updatesave';
			saveParams['group_name']=text;
			if(text.length>50){
				Ext.msg("error",'数据修改失败!,原因:字符数大于50'.loc());
				return;
			}else if(text==null||text.length==0){
				Ext.msg("error",'数据保存失败!,原因:新建图层分组不能为空'.loc());
				return;
			}else if(/[\<\>\'\"\&]/.test(text)){
				Ext.msg("error",'不应有'.loc()+'&,<,>,\",'+'字符'.loc());
				return;
			}
			Ext.Ajax.request({
				url: '/dev/gis/createMapGroup.jcp',
				method:'POST',
				params: saveParams,
				success:function(response, options){ 
						var check = response.responseText;
						var ajaxResult=Ext.util.JSON.decode(check);
						if(ajaxResult.success){
							this.getTree().loadSelfNode(ajaxResult.id,this.clickEvent);
						}else{
							    Ext.msg("error",'数据保存失败!,原因:'.loc()+'<br>'+ajaxResult.message);
						}
				},
				scope: this
			});
		}
    };

    function onEdit() {
		var msgTitle='图层分组'.loc();
		var msgMsg='新建图层分组'.loc();
		if(nodType=='15'){
			msgTitle='查询菜单'.loc();
			msgMsg='新建查询菜单'.loc();
		}
		Ext.MessageBox.show({
		   title: msgTitle,
		   msg: msgMsg,
		   value:nowNodeTitle,
           width:300,
           buttons: Ext.MessageBox.OKCANCEL,
           prompt : true,
           fn: updateIt,
		   scope: this,
           animEl: 'navtoolbar'
       });
    };

    function onDelete() {
		 Ext.msg('confirm', '确认删除?'.loc(), function (answer){
			if (answer == 'yes') {
				var delParams=NavParams;
				delParams['type']='delete';
				Ext.Ajax.request({
					url: '/dev/gis/createMapGroup.jcp',
					method:'POST',
					params: delParams,
					success:function(response, options){ 
							var check = response.responseText;
							var ajaxResult=Ext.util.JSON.decode(check);
							if(ajaxResult.success){
								this.getTree().loadParentNode(this.clickEvent);
							}else{
								    Ext.msg("error",'删除失败!,原因:'.loc()+'<br>'+ajaxResult.message);
							}
					},
					scope: this
				});
		  } 
		}.createDelegate(this));
    };
};
Ext.extend(dev.gis.GisNavPanel, Ext.Panel, {
	init : function(){
		this.menuTree.finish(this.body.dom,document);
		this.focusHistoryNode();
	},
	getTree : function(){
		return this.menuTree;
	},	
	hideToolBar : function(){	
		var  tempToolBar=this.getTopToolbar();
		tempToolBar.items.each(function(item){   
				item.disable();
		}, tempToolBar.items);
    },
	showToolBar : function(state){	
		var  tempToolBar=this.getTopToolbar();
		tempToolBar.items.each(function(item){ 
			if(item.btnId==state)
				item.enable();
		}, tempToolBar.items);
    },
	exeHistoryNode : function(menuTree,nowNode){
		if(nowNode.prop.event&&nowNode.prop.params){
			this.clickEvent(nowNode);
		}else if(nowNode.prop._parent=='0'&&nowNode.index()==nowNode.parent.son.length -1&&nowNode.parent.son.length!=1){
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
		if(uStore.getAttribute("gis")){
			this.menuTree.loadHistory("gis");
			var nowNode=this.menuTree.getNowNode();
		}else{
			var nowNode=this.menuTree.getNowNode();
			this.menuTree.loadHistory("gis");
		};
		this.exeHistoryNode(this.menuTree,nowNode);
	}
});



