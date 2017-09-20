// using("usr.cms.fuzhigaojianBtn");
// usr.cms.fuzhigaojianBtn(btn);

Ext.ns("usr.cms");
usr.cms.fuzhigaojianBtn = function(btn) {
	var panel = Ext.getCmp(btn.panelId);
	var win = panel.findParentByType(Ext.Window);
	var tree = panel.getComponent(0);
	var node = tree.getSelectionModel().getSelectedNode();
	
	if(node==null){
		Ext.msg("warn","请选择一个目标栏目。");
		return;
	}
	if(Ext.isDefined(node.attributes.isLanMu) && node.attributes.isLanMu){
		
		win.getEl().mask("复制中...");
		
		if(win.fromPanelConfig.copyFormLanmu == node.attributes.id)
			win.fromPanelConfig.isCommit = true;
		else
			win.fromPanelConfig.isCommit = false;
		
		Ext.Ajax.request({
			url : '/usr/cms/fuzhigaojian.jcp',
			params : {
				pmks : win.fromPanelConfig.pmks,
				copyType : win.fromPanelConfig.copyType,
				copyFormLanmu : win.fromPanelConfig.copyFormLanmu,
				lanmu : node.attributes.id
			},
			scope : this,
			method : 'Post',
			success : function(response, options) {
				win.getEl().unmask();
				var result = Ext.decode(response.responseText);
				if(result.success){
					Ext.msg("info", result.message);
					win.close();
				}else
					Ext.msg("warn", result.message);
			},
			failure : function(response, options) {
				win.getEl().unmask();
				Ext.msg("error", CPM.getResponeseErrMsg(response));
			}
		});
	}else{
		Ext.msg("warn","只能复制到一个栏目下，请选择一个栏目。");
		return;
	}
}