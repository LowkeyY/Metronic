
home.system.help.HelpPublishPanel= function(frames,params,newpart){
	this.params=params;
	
	Ext.form.Field.prototype.msgTarget='side';
	this.frames = frames;
	
	this.ButtonArray=[];

	this.ButtonArray.push(new Ext.Toolbar.Button({
				id:'save',
				text: '保存'.loc(),
				icon: '/themes/icon/common/save.gif',
				cls: 'x-btn-text-icon  bmenu',
				disabled:false,
				state:'create',
				scope: this,
				hidden : false,
				handler :function(){
					if(this.params['parent_id']==null){
						Ext.msg("error",'不能完成保存操作!,必须选择一应用下建立目录定义'.loc());
					}else{
						var saveParams=this.params;
						saveParams['type']=this.frm.findField("newpart").getValue();
						if (this.frm.isValid()) {
							  this.frm.submit({ 
								url:'/home/system/help/publish.jcp',
								params:saveParams,
								method: 'post',  
								scope:this,
								success:function(form, action){ 
									Help.navPanel.getTree().loadSubNode(action.result.id,Help.navPanel.clickEvent);
								},								
								failure: function(form, action) {
									Ext.msg("error",'数据提交失败!,原因'.loc()+':<br>'+action.result.message);
								}
							  });
						}else{
							Ext.msg("error",'数据不能提交,请修改表单中标识的错误!'.loc());
						}
					}
				}
	}));
	this.ButtonArray.push(new Ext.Toolbar.Button({
				id:'clear',
				text: '清空'.loc(),
				icon: '/themes/icon/xp/clear.gif',
				cls: 'x-btn-text-icon  bmenu',
				disabled:false,
				state:'create',
				scope: this,
				hidden : false,
				handler :function(){
					this.frm.reset();
				}
	}));
	this.ButtonArray.push(new Ext.Toolbar.Button({
				id:'redo',
				text: '返回'.loc(),
				icon: '/themes/icon/common/redo.gif',
				cls: 'x-btn-text-icon  bmenu',
				disabled:false,
				state:'create',
				scope: this,
				hidden : false,
				handler :function(){
					Help.mainPanel.items.each(function(item){   
						if(item.id.indexOf('programPanel')==-1){
							Help.mainPanel.remove(item);	
						}
					}, Help.mainPanel.items);		
					Help.HelpPanel = new home.system.help.HelpPanel(this.frames,this.params);
					Help.mainPanel.add(Help.HelpPanel.MainTabPanel);
					Help.Frame.doLayout();
					Help.HelpPanel.loadData(this.params);
					Help.HelpPanel.formEdit();
				}
	}));


	this.publishForm = new Ext.form.FormPanel({
		title:'商典帮助'.loc(),
		labelAlign: 'right',
        url:'/home/system/help/publish.jcp',
        method:'POST',
        border:false,
		height : 250,
		autoScroll :false,
        bodyStyle:'padding:10px 0px 0px 0px;background:#FFFFFF;',
		items: [
		   {
			layout:'column',
			border:false,
            items:
			[
				{ 
				   columnWidth:1.0,
				   layout: 'form',
				   
				   border:false,
				   items: [				
						{
							xtype:'textfield',
							fieldLabel: '序号'.loc(),
							name: 'seq',
							hidden:newpart=='',
							width: 300
						},{
							xtype:'textfield',
							fieldLabel: '标题'.loc(),
							name: 'dir_name',
							
							width: 300,
							maxLength : 100,
							allowBlank:false,
							maxLengthText : '标题不能超过{0}个字符!'.loc(),
							blankText:'标题必须填写.'.loc()
						},
						new lib.FCKeditor.ExtFckeditor( {
							name : 'file_detail',
							id : 'file_detail',
							height : 450,
							hideLabel : true,
							allowBlank : false,
							PluginsPath : '/lib/FCKeditor/editor/plugins/',
							blankText : '必须输入报告模板文档'.loc(),
							ToolbarSet : "help",
							SkinPath : '/lib/FCKeditor/editor/skins/office2003/'
						}),
						{
							xtype:'hidden',
							name:'newpart',
							value:newpart
						}
					 ]
				}
			]
		}
	],tbar:this.ButtonArray});
	
	this.MainTabPanel = new Ext.TabPanel( {
		id : 'helpTablePanel',
		border : false,
		activeTab : 0,
		tabPosition : 'bottom',
		items :[ this.publishForm]
	})
	this.frm = this.publishForm.form;
	this.baseParams=false;
	


};

Ext.extend(home.system.help.HelpPublishPanel, Ext.Panel, {
	init : function(params){	
		this.params = params;
		this.toggleToolBar('create');
	},
	loadData:function(params){
		Help.mainPanel.items.each(function(item){   
				Help.mainPanel.remove(item);	
		}, Help.mainPanel.items);
		Help.helpPanle = new home.system.help.HelpDetailPanel(this.frames,params);
		Help.mainPanel.add(Help.helpPanle.MainTabPanel);
		Help.Frame.doLayout();
	},
	toggleToolBar : function(state){	
		var  tempToolBar=this.publishForm.getTopToolbar();
		tempToolBar.items.each(function(item){    
			item.hide();
		}, tempToolBar.items);
		tempToolBar.items.each(function(item){ 
			if(item.state==state)
				item.show();
		}, tempToolBar.items);
    }
});