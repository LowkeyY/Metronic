Ext.namespace("dev.ctrl");
 
dev.ctrl.ListSearchManage = function(params,returnFunction) {
	var params = this.params = params;
	var ButtonArray = [];
	ButtonArray.push(new Ext.Toolbar.Button({
		text : '返回'.loc(),
		icon : '/themes/icon/common/repeal.gif',
		cls : 'x-btn-text-icon  bmenu',
		disabled : false,
		state : 'create',
		scope : this,
		hidden : false,
		handler : returnFunction   
	}));
	var saveButton=new Ext.Toolbar.Button({
		text : '保存'.loc(),
		icon : '/themes/icon/xp/save.gif',
		cls : 'x-btn-text-icon  bmenu',
		disabled : false,
		scope : this,
		hidden : false,
		handler : function() {
			var returnJson = this.inPanel.getJson();
			if(returnJson==null)
				return false;
			returnJson['object_id']=this.params['objectId'];
			Ext.Ajax.request({
				url : '/dev/ctrl/listsearch.jcp',
				params : returnJson,
				success:function(response, options){ 
					var ajaxResult=Ext.util.JSON.decode(response.responseText);
					if(ajaxResult.success){
						Ext.msg("info", '数据保存成功!'.loc());
					}else{
						Ext.msg("error",'数据提交失败,原因:'.loc()+'<br>'+ajaxResult.message);
					}
				}
			});
		}
	})
	ButtonArray.push(saveButton);
	var delButton=new Ext.Toolbar.Button({
		text : '重置'.loc(),
		icon : '/themes/icon/xp/refresh.gif',
		cls : 'x-btn-text-icon  bmenu',
		disabled : false,
		state : 'create',
		scope : this,
		hidden : false,
		handler : function() {
			Ext.Ajax.request({
				url : '/dev/ctrl/listsearch.jcp?object_id='+this.params['objectId']+'&'+Math.random(),
				method:'get',
				scope:this,
				callback : function(options, success, response){
					this.inPanel.reload();
					try{
						Ext.msg("info", '查询条件重置成功!'.loc());
					}catch(e){}
				}
			});
		}
	});
	ButtonArray.push(delButton);
	this.inPanel = new dev.ctrl.SearchColumnPanel(this.params);
	var formPanel = new Ext.Panel({
		layout : 'fit',
		region : 'center',
		style : 'padding:0px 0px 0px 0px;',
		wdith : 400,
		border : false,
		items : this.inPanel
	});
	this.MainTabPanel = new Ext.Panel({
			id : 'dev.ctrl.ListSearchManage',
			tbar : ButtonArray,
			layout : 'border',
			border : false,
			items : [formPanel]
	});
};
