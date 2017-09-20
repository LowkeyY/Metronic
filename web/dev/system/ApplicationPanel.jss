

dev.system.ApplicationPanel = function(frames,params){
	this.frames=frames;
	var ButtonArray=[];
	this.params=params;
	var System = this.frames.get("System");

	this.retFn = function(main){
		main.setActiveTab("applicationPanel");
		main.setStatusValue(['应用管理'.loc()]);
	}.createCallback(System.mainPanel);

	this.formDS = new Ext.data.Store({
		proxy: new Ext.data.HttpProxy({
			url: '/dev/system/getApplication.jcp',
			method : 'POST'
		}),
		reader: new Ext.data.JsonReader({},["object_id","applogic_name","appphy_name","database_link","target_link","note","lastModifyTime","lastModifyName","terminaltype"]),
		remoteSort: false
	});
	this.terminalTypeDs = new Ext.data.SimpleStore({
		fields : ['terminalCode', 'terminalName'],
		data : [['0', 'PC'], ['1', '移动终端'.loc()]]
	});

//初始化按钮
	ButtonArray.push(new Ext.Toolbar.Button({
				btnId:'applicationBack',
				text: '返回'.loc(),
				icon: '/themes/icon/common/redo.gif',
				cls: 'x-btn-text-icon  bmenu',
				disabled:false,
				state:'create',
				hidden : true,
				scope: this,
				handler :this.params.retFn
	}));

	ButtonArray.push(new Ext.Toolbar.Button({
				btnId:'applicationSave',
				text: '保存'.loc(),
				state:'create',
				icon: '/themes/icon/common/save.gif',
				cls: 'x-btn-text-icon  bmenu',
				disabled:false,
				hidden : false,
				scope: this,
				handler :this.onButtonClick
	}));

	ButtonArray.push(new Ext.Toolbar.Button({
				btnId:'applicationClear',
				text: '清空'.loc(),
				state:'create',
				icon: '/themes/icon/xp/clear.gif',
				cls: 'x-btn-text-icon  bmenu',
				disabled:false,
				scope: this,
				hidden : false,
				handler :this.onButtonClick
	}));

//---------------------编辑状态下的按钮-------------------------------------------------



	ButtonArray.push(new Ext.Toolbar.Button({
				btnId:'applicationUpdatesave',
				text: '保存'.loc(),
				icon: '/themes/icon/common/save.gif',
				cls: 'x-btn-text-icon  bmenu',
				disabled:false,
				state:'edit',
				scope: this,
				hidden : true,
				handler :this.onButtonClick
	}));


	ButtonArray.push(new Ext.Toolbar.Button({
				btnId:'applicationDelete',
				text: '删除'.loc(),
				icon: '/themes/icon/common/delete.gif',
				cls: 'x-btn-text-icon  bmenu',
				disabled:false,
				state:'edit',
				scope: this,
				hidden : true,
				handler :this.onButtonClick
	}));
/*
	ButtonArray.push(new Ext.Toolbar.Button({
				btnId:'install',
				text: '生成安装文件',
				icon: '/themes/icon/common/install.gif',
				cls: 'x-btn-text-icon  bmenu',
				disabled:false,
				state:'edit',
				scope: this,
				hidden : true,
				handler :this.onButtonClick
	}));
*/
	ButtonArray.push(new Ext.Toolbar.Button({
				btnId:'applicationAuth',
				text: '开发权限管理'.loc(),
				icon: '/themes/icon/all/lock_add.gif',
				cls: 'x-btn-text-icon  bmenu',
				disabled:false,
				state:'edit',
				scope: this,
				hidden : true,
				handler :this.onButtonClick
	}));

	ButtonArray.push(new Ext.Toolbar.Button({
				btnId:'initDatabase',
				text: '初始化字典表'.loc(),
				icon: '/themes/icon/database/database_table.gif',
				cls: 'x-btn-text-icon  bmenu',
				disabled:false,
				state:'edit',
				scope: this,
				hidden : true,
				handler :this.onButtonClick
	}));

	ButtonArray.push(new Ext.Toolbar.Button({
				btnId:'downXmlToCpk',
				text: '生成CPK文件',
				icon: '/themes/icon/all/package.gif',
				cls: 'x-btn-text-icon  bmenu',
				disabled:false,
				state:'edit',
				scope: this,
				hidden : true,
				handler :this.onButtonClick
	}));

//系统初始化

	var dataLinkParams={};
	dataLinkParams['type']='new';
	dataLinkParams['optionType']='datalink';

	this.dataLinkDS =new Ext.data.JsonStore({
		url: '/dev/system/getDBLink.jcp',
		baseParams:dataLinkParams,
		root: 'datalink',
		autoLoad :true,
		fields:["id","title"]
	});
	this.applicationForm = new Ext.FormPanel({
        labelWidth: 100, 
		id: 'applicationPanel',
		cached:true,
		labelAlign: 'right',
        url:'/dev/system/create.jcp',
        method:'POST',
        border:false,
        bodyStyle:'padding:20px 0px 0px 0px;height:100%;width:100%;background:#FFFFFF;',
        items: [
		{
			layout:'column',
			border:false,
            items:
			[
				{ 
				   columnWidth:0.40,
				   layout: 'form',
				   
				   border:false,
				   items: [				
						new Ext.form.TextField({
							fieldLabel: '逻辑名称'.loc(),
							name: 'applogic_name',
							regex:/^[^\<\>\'\"\&]+$/,
							regexText:'逻辑名称中不应有'.loc()+'&,<,>,\",'+'字符'.loc(),   
							width: 160,
							maxLength : 16,
							allowBlank:false,
							maxLengthText : '逻辑名称不能超过{0}个字符!'.loc(),
							blankText:'逻辑名称必须提供.'.loc()
						})
					 ]},
			   {
					columnWidth:0.60,
					layout: 'form',
					
					border:false,
					items: [				
						new Ext.form.TextField({
							fieldLabel: '物理名称'.loc(),
							name: 'appphy_name',
							
							width: 160,
							maxLength : 24,
							allowBlank:false,
							maxLengthText : '物理名称不能超过{0}个字符!'.loc(),
							blankText:'物理名称必须提供.'.loc()
						})
					 ]
				}
			]
		},
		{
			layout:'column',
			border:false,
            items:
			[
				{ 
				   columnWidth:0.40,
				   layout: 'form',
				   
				   border:false,
				   items: [	
					   	this.dataBaseLink=new Ext.form.ComboBox({
									fieldLabel: '用户库名'.loc(),
									hiddenName : 'dblink',
									typeAhead: false,
									width:160,
									store:this.dataLinkDS,
									editable: true,
									allowBlank:false,
									triggerAction: 'all',
									displayField: 'title',
									emptyText: '数据库选择'.loc(),
									valueField: 'id'
						})
					 ]}, 
			   {
					columnWidth:0.60,
					layout: 'form',
					
					border:false,
					items: [		
						new Ext.form.ComboBox({
							fieldLabel : '终端类型'.loc(),
							width:220,
							lazyRender : true,
							name : 'terminalType',
							minLength : 1,
							value : 0,
							store : this.terminalTypeDs,
							valueField : 'terminalCode',
							displayField : 'terminalName',
							triggerAction : 'all',
							mode : 'local'
						})
					 ]
				}
			]
		},
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
						this.targetLink=new lib.SelectMenu.SelectMenu({
							dataUrl : '/dev/system/SelectMenu.jcp',
							fieldLabel: '调用菜单'.loc(),
							allowBlank:true,
							qtip:{
								text:'在创建应用时,此处显示当前应用应挂在哪个菜单下.在修改状态时,显示当前应用所创建的菜单'.loc()
							},
							name: 'target_link',
							height:100,
							width:220,
							system_id:this.params['id']
						})
					 ]}
			]
		},
		{
			layout:'column',
			border:false,
            items:
			[
				{columnWidth:1.0,
				   layout: 'form',  
				   border:false,
				   items: [				
						new Ext.form.TextArea({
							fieldLabel: '应用说明'.loc(),
							name: 'note',	
							width: 550,
							height:60,
							maxLength : 1000,
							maxLengthText : '系统说明不能超过{0}个字符!'.loc()
						})
					 ]}
			]
		}
	],
     tbar:ButtonArray
	});
	this.MainTabPanel=this.applicationForm;
};

dev.system.ApplicationPanel.prototype={
	formCreate : function(params){	
		this.params=params;
		this.toggleToolBar('create');
		if(this.MainTabPanel.rendered){
			this.frames.get("System").mainPanel.setStatusValue(['应用管理'.loc()]);
		}
    },
	formEdit : function(){
		this.toggleToolBar('edit');
		this.applicationForm.form.findField('dblink').setDisabled(true);
    },
	loadData : function(params){	
		this.params=params;
		this.formDS.baseParams = params;
		this.formDS.on('load', this.renderForm, this);
		this.formDS.load({params:{start:0, limit:1}});
    },	
	toggleToolBar : function(state){	
		var  tempToolBar=this.applicationForm.getTopToolbar();
		tempToolBar.items.each(function(item){    
			item.hide();
		}, tempToolBar.items);
		tempToolBar.items.each(function(item){ 
			if(item.state==state)
				item.show();
		}, tempToolBar.items);
    },
	renderForm: function(){		
		this.dataLinkDS.load();
		this.applicationForm.form.findField('applogic_name').setValue(this.formDS.getAt(0).data.applogic_name);
		this.applicationForm.form.findField('appphy_name').setValue(this.formDS.getAt(0).data.appphy_name);
		this.applicationForm.form.findField('note').setValue(this.formDS.getAt(0).data.note);
		this.applicationForm.form.findField('terminalType').setValue(this.formDS.getAt(0).data.terminaltype);
		this.applicationForm.form.findField('dblink').setValue(this.formDS.getAt(0).data.database_link);
		this.applicationForm.form.findField('target_link').setValue(this.formDS.getAt(0).data.target_link);	
		this.frames.get('System').mainPanel.setStatusValue(['应用管理'.loc(),this.formDS.getAt(0).data.object_id,this.formDS.getAt(0).data.lastModifyName,this.formDS.getAt(0).data.lastModifyTime]);  
	},
	onButtonClick : function(item){
		var System = this.frames.get("System");
		var frm=this.applicationForm.form;
		if(item.btnId=='applicationUpdatesave'){
			var saveParams=this.params;
			saveParams['database_link']=this.applicationForm.form.findField('dblink').getValue();
			saveParams['target_link']=this.applicationForm.form.findField('target_link').getValue();
			saveParams['terminal_type']=this.applicationForm.form.findField('terminalType').getValue();
			saveParams['type']='updatesave';
		    if (frm.isValid()) {
				  frm.submit({ 
					url:'/dev/system/create.jcp',
					params:saveParams,
					method: 'post',  
					scope:this,
					success:function(form, action){ 
						System.navPanel.getTree().loadSelfNode(action.result.id,System.navPanel.clickEvent);
					},								
					failure: function(form, action) {
						Ext.msg("error",'数据提交失败!,原因:'.loc()+'<br>'+action.result.message);
					}
				  });
            }else{
				Ext.msg("error",'数据不能提交,请修改表单中标识的错误!'.loc());
            }
		}else if(item.btnId=='applicationSave'){
			var saveParams=this.params;
			saveParams['database_link']=this.applicationForm.form.findField('dblink').getValue();
			saveParams['target_link']=this.applicationForm.form.findField('target_link').getValue();
			saveParams['terminal_type']=this.applicationForm.form.findField('terminalType').getValue();
			saveParams['type']='save';
		    if (frm.isValid()) {
				  frm.submit({ 
					url:'/dev/system/create.jcp',
					params:saveParams,
					method: 'post',  
					scope:this,
					success:function(form, action){ 
						System.navPanel.getTree().loadSubNode(action.result.id,System.navPanel.clickEvent);
					},								
					failure: function(form, action) {
						Ext.msg("error",'数据提交失败!,原因:'.loc()+'<br>'+action.result.message);
					}
				  });
            }else{
				Ext.msg("error",'数据不能提交,请修改表单中标识的错误!'.loc());
            }
		}else if(item.btnId=='applicationClear'){
			this.applicationForm.form.reset();
		}else if(item.btnId=='update'){
			this.formEdit();
		}else if(item.btnId=='applicationDelete'){
			 Ext.msg('confirm', '警告:删除应用将导致您的数据不可恢复,确认吗?'.loc(), function (answer){
                   if (answer == 'yes') {
					 Ext.msg('confirm', '请再次确认是否删除应用?'.loc(), function (answer){
						  if (answer == 'yes') {
							 
								var delParams=this.params ;
								delParams['type']='delete';
								frm.submit({ 
									url:'/dev/system/create.jcp',
									params:delParams,
									method: 'post',  
									scope:this,
									success:function(form, action){ 
										System.navPanel.getTree().loadParentNode(System.navPanel.clickEvent);
									},								
									failure: function(form, action) {
										    Ext.msg("error",'数据提交失败,原因:'.loc()+'<br>'+action.result.message);
									}
								 });
						  } 
					 }.createDelegate(this));
				  } 
             }.createDelegate(this));
		}else if(item.btnId=='initDatabase'){
			var tempToolBar = this.applicationForm.getTopToolbar();
			var citem=null;
			if (tempToolBar) {
				tempToolBar.items.each(function(item) {
					if(item.btnId=='initDatabase')
						citem=item;
				}, tempToolBar.items);
				citem.disable();
			}
			var initParams=this.params ;
			Ext.Ajax.request({
				url : '/dev/system/initdict.jcp',
				params:initParams,
				method : 'GET',
				scope : this,
				success : function(response, options) {
					var check = response.responseText;
					var ajaxResult = Ext.util.JSON.decode(check)
					if (ajaxResult.success){
						if (tempToolBar) {
							tempToolBar.items.each(function(item) {
								if(item.btnId=='initDatabase')
									item.enable();
							}, tempToolBar.items);
						}
						Ext.msg("info", '字典表初始化成功!'.loc());
					}else {
						Ext.msg('ERROR', '字典表初始化失败!,原因:'.loc()+'<br>'+ ajaxResult.message);
					}
					citem.enable();
				}
			});
		}else if(item.btnId=='applicationAuth'){
			var conn=new Ext.data.Connection();
			conn.request({    
					method: 'GET',    
					url:'/bin/user/getOrg.jcp?'
			});				
			conn.on('requestcomplete', function(conn, oResponse ){	
				var orgJSON = Ext.decode(oResponse.responseText);
				var name=orgJSON.shortName;
				if(name==""){
					name=orgJSON.name;
				}
				this.params.rootId=orgJSON.id;
				this.params.rootName=name;
				using("dev.system.AuthFramePanel");
				using("dev.system.AuthPanel");
				var authParams=Ext.apply({},this.params); 
				authParams.retFn=this.retFn;
				System.authFramePanel = new dev.system.AuthFramePanel(this.frames,authParams);
				System.mainPanel.add(System.authFramePanel.MainTabPanel);
				System.mainPanel.setActiveTab(System.authFramePanel.MainTabPanel);;
				System.authFramePanel.init(this.params.id);
			},this);
		}else if(item.btnId=='downXmlToCpk'){
			window.location = "/dev/system/createInstallCPK.jcp?type=toXml&object_id="
							+ this.params.id + "&phy_name=" + this.applicationForm.form.findField('appphy_name').getValue()
							+"&cn_name="+this.applicationForm.form.findField('applogic_name').getValue()
							+"&fromType=app";
		}
    }
};