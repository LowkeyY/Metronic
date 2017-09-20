

dev.integrate.InstancePanel = function(frames,params){
	this.params=params;
	this.frames= frames;
	IntegrateInstance = this.frames.get("IntegrateInstance");
	this.retFn = function(main){
		main.setActiveTab("instancePanel");
		main.setStatusValue(['集成实例管理'.loc()]);
	}.createCallback(IntegrateInstance.mainPanel);

	var ButtonArray=[];
	ButtonArray.push(new Ext.Toolbar.Button({
				btnId:'save',
				text: '保存'.loc(),
				icon: '/themes/icon/common/save.gif',
				cls: 'x-btn-text-icon  bmenu',
				disabled:false,
				hidden : false,
				scope: this,
				state:'create',
				handler :this.onButtonClick
	}));
	ButtonArray.push(new Ext.Toolbar.Button({
				btnId:'updatesave',
				text: '保存'.loc(),
				icon: '/themes/icon/common/save.gif',
				cls: 'x-btn-text-icon  bmenu',
				disabled:false,
				scope: this,
				hidden : true,
				state:'edit',
				handler :this.onButtonClick
	}));
	ButtonArray.push(new Ext.Toolbar.Button({
				btnId:'delete',
				text: '删除'.loc(),
				icon: '/themes/icon/common/delete.gif',
				cls: 'x-btn-text-icon  bmenu',
				disabled:false,
				scope: this,
				hidden : true,
				state:'edit',
				handler :this.onButtonClick
	}));
	ButtonArray.push(new Ext.Toolbar.Button({
				btnId:'authSet',
				text: '权限设置'.loc(),
				icon: '/themes/icon/common/lock.gif',
				cls: 'x-btn-text-icon  bmenu',
				disabled:false,
				scope: this,
				hidden : true,
				state:'edit',
				handler :this.onButtonClick
	}));

	this.instanceForm = new Ext.FormPanel({
        labelWidth: 150, 
		labelAlign: 'right',
		id: 'instancePanel',
		cached:true,
        url:'/dev/integrate/instancemag.jcp',
        border:false,
        bodyStyle:'padding:20px 0px 0px 0px;height:100%;width:100%;background:#FFFFFF;',
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
						new Ext.form.TextField({
							fieldLabel: '名称'.loc(),
							name: 'instanceName',
							regex:/^[^\<\>\'\"\&]+$/,
							regexText:'实例名称中不应有'.loc()+'&,<,>,\",'+'字符'.loc(),   
							width: 250,
							maxLength : 50,
							allowBlank:false,
							maxLengthText : '实例名称不能超过{0}个字符!'.loc(),
							blankText:'实例名称必须提供.'.loc()
						})
					 ]}
			]
		},
		{
			layout:'column',
			border:false,
            items:
			[{ 
				   columnWidth:0.45,
				   layout: 'form',
				   border:false,
				   items: [				
						{
							xtype:'textfield',
							fieldLabel: '主机'.loc(),
							name: 'host',
							width: 160,
							maxLength : 50,
							regex:/^[^\<\>\'\"\&]+$/,
							regexText:'主机中只能包含是数字,英文字符和.'.loc(),   
							allowBlank:false,
							maxLengthText : '主机不能超过{0}个字符!'.loc(),
							blankText:'主机必须提供.'.loc()
						},						
						{
							xtype:'textfield',
							fieldLabel: '用户名'.loc(),
							name: 'userName',
							width: 160,
							maxLength :20,
							allowBlank:false,
							maxLengthText : '用户名不能超过{0}个字符!'.loc(),
							blankText:'用户名必须提供.'.loc()
						}
					 ]
				},{ 
				   columnWidth:0.55,
				   layout: 'form',
				   border:false,
				   items: [				
						{
							xtype:'numberfield',
							fieldLabel: '端口'.loc(),
							name: 'hostPort',
							minValue: 1,
							maxValue: 100000,
							width: 150,
							allowBlank:true
						},{ xtype:'textfield',
							fieldLabel: '口令'.loc(),
							name: 'password',							
							inputType:'password',
							width: 150,
							maxLength : 20,
							allowBlank:false,
							maxLengthText : '口令不能超过{0}个字符!'.loc(),
							blankText:'口令必须提供.'.loc()
						}
					]
				}
			]
		},	
		{
			xtype:'textfield',
			fieldLabel: '启动程序'.loc(),
			name: 'program',
			width: 360,
			maxLength : 128,
			allowBlank:false,
			maxLengthText : '启动程序不能超过{0}个字符!'.loc(),
			blankText:'启动程序必须提供.'.loc()
		},	
		{
			xtype:'textfield',
			fieldLabel: '运行参数'.loc(),
			name: 'args',
			width: 360,
			maxLength : 128, 
			allowBlank:true,
			maxLengthText : '启动程序不能超过{0}个字符!'.loc(),
			blankText:'启动程序必须提供.'.loc()
		},
		new Ext.form.TextArea({
			fieldLabel: '实例描述'.loc(),
			name: 'Note',
			width: 450,
			height:60,
			maxLength : 255,
			maxLengthText : '实例描述不能超过{0}个字符!'.loc()
		})
	],
	tbar:ButtonArray});
	this.MainTabPanel=this.instanceForm;
};

dev.integrate.InstancePanel.prototype= {
	formCreate : function(params){		
		this.params = params;
		if(this.MainTabPanel.rendered){
			this.toggleToolBar('create');
			this.instanceForm.form.reset();
			this.frames.get("IntegrateInstance").mainPanel.setStatusValue(['集成实例管理'.loc(),params.parent_id]);
		}
    },
	formEdit : function(){
		this.toggleToolBar('edit');
    },
	toggleToolBar : function(state){	
		var  tempToolBar=this.instanceForm.getTopToolbar();
		tempToolBar.items.each(function(item){    
			item.hide();
		}, tempToolBar.items);
		tempToolBar.items.each(function(item){ 
			if(item.state==state)
				item.show();
		}, tempToolBar.items);
    },
	loadData:function(params){	
		this.params = params;
		var main=this.frames.get("IntegrateInstance").mainPanel;
		this.instanceForm.form.load({
			method:'GET',
			params:params,
			scope:this,
			success:function(fm,action){
				var data=action.result.data;
				this.toggleToolBar('edit');
				main.setStatusValue(['集成实例管理'.loc(),params.parent_id,data.entryName,data.entryDate]);
			}
		});   
    },
	onButtonClick : function(item){
		var frm=this.instanceForm.form;
		if(item.btnId=='save'){
			var saveParams=this.params;
			saveParams['type']='save';
			if (frm.isValid()){
				  frm.submit({ 
					url:'/dev/integrate/instancemag.jcp',
					params:saveParams,
					method: 'post',  
					scope:this,
					success:function(form, action){ 
						IntegrateInstance.navPanel.getTree().loadSubNode(action.result.instanceId,IntegrateInstance.navPanel.clickEvent);
					},								
					failure: function(form, action) {
							Ext.msg("error",'数据提交失败!,原因:'.loc()+'<br>'+action.result.message);
					}
				  });
			}else{
				Ext.msg("error",'数据不能提交,请修改表单中标识的错误!'.loc());
			}
		}else if(item.btnId=='clear'){
			this.instanceForm.form.reset();
		}else if(item.btnId=='delete'){
			 Ext.msg('confirm', '确认删除?'.loc(), function (answer){
                   if (answer == 'yes') {
						var delParams=this.params;
						delParams['type']='delete';
						 frm.submit({ 
							url:'/dev/integrate/instancemag.jcp',
							params:delParams,
							method: 'post',  
							scope:this,
							success:function(form, action){ 
								IntegrateInstance.navPanel.getTree().loadParentNode(IntegrateInstance.navPanel.clickEvent);
							},								
							failure: function(form, action) {
								    Ext.msg("error",'数据删除失败!,原因:'.loc()+'<br>'+action.result.message);
							}
						  });
				  } 
               }.createDelegate(this));
		}else if(item.btnId=='updatesave'){
		    if (frm.isValid()) {
			  var updateParams=this.params;
			  updateParams['type']='updatesave';
			 frm.submit({ 
					url:'/dev/integrate/instancemag.jcp',
					params:updateParams,
					method: 'post',  
					scope:this,
					success:function(form, action){ 
						IntegrateInstance.navPanel.getTree().loadSelfNode(action.result.instanceId,IntegrateInstance.navPanel.clickEvent);
					},								
					failure: function(form, action) {
						    Ext.msg("error",'数据提交失败,原因:'.loc()+'<br>'+action.result.message);
					}
				  });
            }else{
				Ext.msg("error",'数据不能提交,请修改表单中标识的错误!'.loc());
            }
		}else if(item.btnId=='authSet'){
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
				this.params.retFn = this.retFn;
				this.params.rootId=orgJSON.id;
				this.params.rootName=name;
				using("dev.integrate.AuthFramePanel");
				using("dev.integrate.InstanceAuthPanel");
				this.params.retFn = this.retFn;
				IntegrateInstance.authFramePanel = new dev.integrate.AuthFramePanel(this.frames,this.params);
				IntegrateInstance.mainPanel.add(IntegrateInstance.authFramePanel.MainTabPanel);
				IntegrateInstance.mainPanel.setActiveTab(IntegrateInstance.authFramePanel.MainTabPanel);
				IntegrateInstance.authFramePanel.init(this.params.instanceId,this.params.parent_id);
			},this);
		}   
    }
};