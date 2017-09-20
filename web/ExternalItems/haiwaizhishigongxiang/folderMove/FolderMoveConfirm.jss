Ext.ns("ExternalItems.haiwaizhishigongxiang.folderMove")

ExternalItems.haiwaizhishigongxiang.folderMove.FolderMoveConfirm = function(btn) {
	var panel = Ext.getCmp(btn.panelId), frm = panel.form , win = panel.findParentByType(Ext.Window);
	if (frm && win && frm.isValid()) {
		var targetNodeId = frm.findField('SELECT_NODE').getValue(),
			newFilePath = frm.findField('NEW_FILE_PATH').getValue();
			newFilePathText = frm.findField('SELECT_SPACE').getValue();
		var index = 0 , folderName = "" , folderPath = "" , oldFilePathText = panel.param.oldFilePathText , confirmMsg = "";
		if((index = oldFilePathText.lastIndexOf("/")) > 0){
			folderName = oldFilePathText.substring(index + 1);
			folderPath = oldFilePathText.substring(0 , index);
			confirmMsg = "目录名称：\"" + folderName + "\"<br>" + "原位置: \""+ folderPath + "\"<br> 移动至位置: \""+newFilePathText+"\"<br>";
		}
		
		Ext.msg("confirm", confirmMsg+"确认移动?", function(answer) {
			if (answer == 'yes') {
				win.el.mask('操作中...');
				Ext.Ajax.request({
					url : '/ExternalItems/haiwaizhishigongxiang/folderMove/FolderMoveConfirm.jcp',
					params : {
						'targetNodeId' : targetNodeId,
						'newFilePath' : newFilePath,
						'sourceNodeId' : panel.param.dataId,
						'oldFilePath' : panel.param.oldFilePath
					},
					method : 'post',
					scope : this,
					success : function(response, options) {
						win.el.unmask();
						var result = Ext.decode(response.responseText);
						if (result.success) {
							Ext.msg(result.type , result.message);
							if(result.type == "info" && !result.nochange && win.refreshSelfNode){
								win.refreshSelfNode(result.path);
							}
							win.close();
						} else{
							if(Ext.isDefined(result.success))
								Ext.msg(result.type , result.message);
						}
					},
					failure: function(response, opts) {
						win.el.unmask();
						var result = Ext.decode(response.responseText);
						if(Ext.isDefined(result.success))
							Ext.msg(result.type , result.message);
					}
				});
			}
		});
	} else {
		Ext.msg("warn" , "无法移动，请刷新页面重试。");
	}
}