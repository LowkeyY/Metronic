Ext.namespace("dev.ctrl");
dev.ctrl.WorkflowProperty= function(params){
	this.params = params;
	var ButtonArray=[];
	ButtonArray.push(new Ext.Toolbar.Button({
				text: '保存'.loc(),
				icon: '/themes/icon/xp/save.gif',
				cls: 'x-btn-text-icon  bmenu',
				disabled:false,
				scope: this,
				handler :function(btn){
					var retParam=this.params;
					retParam.importitem=this.propertyForm.form.findField('importitem').getValue();
					Ext.Ajax.request({
							   url: '/dev/ctrl/WorkflowProperty.jcp',
							   method:'POST',
							   params: retParam,
							   scope:this,
							   success:function(){
								 Ext.msg("info",'保存成功'.loc());
							   }    
					});
				}
	}));
	ButtonArray.push(new Ext.Toolbar.Button({
				text: '返回'.loc(),
				icon: '/themes/icon/xp/undo.gif',                
				cls: 'x-btn-text-icon  bmenu',
				disabled:false,
				scope: this,
				hidden : false,
				handler :this.params.returnFunction
	}));
	
	this.propertyForm = new Ext.form.FormPanel({
        labelWidth: 100, 
		labelAlign: 'right',
		url:'/dev/ctrl/WorkflowProperty.jcp',
        method:'POST',
        border:false,
        bodyStyle:'padding:20px 0px 0px 0px;height:100%;width:100%;background:#FFFFFF;',
        items: [
		this.importColumn=new lib.multiselect.ItemSelector({
				name:"importitem",
				fieldLabel:'数据项'.loc(),
				dataFields:["value", "text"],
				fromData:[],
				fromStore:new Ext.data.JsonStore({
					url: '/dev/ctrl/WorkflowPropertyTab.jcp',
					root: 'items',
					autoLoad:true,
					fields:["value","text"],
					baseParams:{object_id:this.params.parent_id}
				}),
				toData:[],
				msWidth:230,
				msHeight:400,
				drawTopIcon:false,
				drawBotIcon:false,
				valueField:"value",
				displayField:"text",
				imagePath:"/lib/multiselect",
				toLegend:'已选项'.loc(),
				fromLegend:'可选项'.loc()
			})
	],
     tbar:ButtonArray
	});
	this.MainTabPanel=this.propertyForm;
	
	this.ds = new Ext.data.Store({
		proxy: new Ext.data.HttpProxy({
		url: '/dev/ctrl/WorkflowProperty.jcp',
			method : 'GET'
		}),
		reader: new Ext.data.JsonReader({},["object_id","importitem"]),
		remoteSort: false
	});
};

dev.ctrl.WorkflowProperty.prototype={
	loadData : function(params,mainPanel){	
		this.ds.baseParams = params;
		this.ds.on('load', this.renderForm, this);
		this.ds.load({params:{start:0, limit:1}});
		mainPanel.setStatusValue(['流程参数'.loc()]);
    },
	renderForm: function(){
		(function(fm,exp) {
			fm.findField('importitem').setValue(exp);
		}).defer(500,this, [this.propertyForm.form,this.ds.getAt(0).data.importitem]);
	}     
};